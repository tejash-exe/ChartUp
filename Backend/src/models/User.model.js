// Packages
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Error! Must include name'],
    },
    email: {
        type: String,
        required: [true, 'Error! Must include email'],
    },
    picture: {
        type: String,
    },
    graphs: [
        {
            title: {
                type: String,
                required: [true, 'Error! Must include title!'],
                maxlength: [20, 'Error! Title cannot be more than 20 characters!'],
            },
            type: {
                type: String,
                enum: {
                    values: ['Bar', 'Line', 'Pie'],
                    message: '{VALUE} is not a valid graph type. Allowed types are bar, line, pie.'
                },
                default: 'Bar',
            },
            graph: [
                {
                    id: {
                        type: String,
                        required: [true, 'Error! Must include id!'],
                    },
                    label: {
                        type: String,
                        required: [true, 'Error! Must include label!'],
                        maxlength: [20, 'Error! Label cannot be more than 20 characters!'],
                    },
                    value: {
                        type: Number,
                        required: [true, 'Error! Must include value!'],
                        min: [0, 'Error! Value cannot be negative!'],
                    }
                }
            ]
        }
    ],
    refreshToken: {
        type: String,
        default: "",
    },
}, { timestamps: true });

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            profilePicture: this.profilePicture,
        },
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY,
        },
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.USER_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_REFRESH_TOKEN_EXPIRY,
        },
    );
};

const User = mongoose.model('User', userSchema);

export default User;