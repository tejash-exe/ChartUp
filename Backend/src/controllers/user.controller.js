// Models
import User from "../models/User.model.js";
//Utils
import options from "../utils/CookiesOptions.js";
import ApiResponse from "../utils/ApiResponse.js";
import oauth2client from "../utils/googleConfig.js";
//Packages
import "dotenv/config";

const generateAccessAndRefreshToken = async (userid) => {
    try {
        const user = await User.findById(userid);
        if (!user) {
            throw new Error("User not found!");
        };

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        const savedUser = await user.save({ validateBeforeSave: false });
        if (!savedUser) throw new Error("Cannot save user while generating tokens!!");

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    };
};

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`, { method: 'GET' });

        const response = await userRes.json();

        const { name, email, picture } = response;

        let user = await User.findOne({ email: email });
        if (user) {
            user.name = name;
            user.picture = picture.toString();

            user = await user.save();
            if (!user) throw new Error("Cannot able to save user!!");
        }
        else {
            user = await User.create({
                name: name,
                email: email,
                picture: picture,
            });
            if (!user) throw new Error("Cannot able to create new user!!");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);

        const loggedInUser = await User.findById(user._id).select(" -accessToken ").lean();
        if (!loggedInUser) throw new Error("Cannot find user!!");

        console.log(loggedInUser.name + " logged in!");

        res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Logged in Succesfully!", {
                user: loggedInUser,
            }));
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(400, error.message));
    };
};

const logout = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    refreshToken: "",
                },
            },
            {
                new: true,
            });

        if (!user) {
            throw new Error("Cannot find user!");
        };

        console.log(user.name + " logged out!");
        res
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, "Logged out Succesfully!"));
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(400, error.message));
    };
};

const saveGraphs = async (req, res) => {
    try {
        const { graphs } = req.body;

        if (!Array.isArray(graphs)) {
            return res.json(new ApiResponse(400, "Graphs must be an array."));
        };

        for (const graph of graphs) {

            if (!graph.title || graph.title.length > 20) {
                return res.json(new ApiResponse(400, "Graph title is required and must be ≤ 20 characters."));
            };

            const allowedTypes = ['Bar', 'Line', 'Pie'];
            if (!allowedTypes.includes(graph.type)) {
                return res.json(new ApiResponse(400, `Invalid graph type '${graph.type}'. Allowed types: Bar, Line, Pie.`));
            };

            if (!Array.isArray(graph.graph)) {
                return res.json(new ApiResponse(400, "Graph data must be an array."));
            };

            for (const item of graph.graph) {
                if (!item.id) {
                    return res.json(new ApiResponse(400, "Each graph item must include an id."));
                };

                if (!item.label || item.label.length > 20) {
                    return res.json(new ApiResponse(400, "Each label is required and must be ≤ 20 characters."));
                };

                if (item.value === undefined || item.value < 0) {
                    return res.json(new ApiResponse(400, "Value must be provided and cannot be negative."));
                };
            };
        };

        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    graphs: graphs,
                },
            },
            {
                new: true,
            });
        if (!user) {
            throw new Error("Cannot find user!");
        };

        console.log("Graphs saved for " + user.name);
        // console.log(graphs);
        res.json(new ApiResponse(200, "Graphs saved successfully!"));
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(400, error.message));
    };
};

const getGraphs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("graphs updatedAt").lean();
        if (!user) {
            throw new Error("Cannot find user!");
        };

        console.log("Graphs fetched for " + req.user.name);
        // console.log(user.graphs);
        console.log(user.updatedAt);
        res.json(new ApiResponse(200, "Graphs fetched successfully!", {
            graphs: user.graphs,
            updatedAt: user.updatedAt,
        }));
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(400, error.message));
    };
};

export {
    googleLogin,
    logout,
    saveGraphs,
    getGraphs,
};