import { Router } from "express";
// Middlewares
import verifyJWTUser from "../middlewares/authUser.middleware.js";
// Controllers
import { 
    googleLogin,
    logout,
    saveGraphs,
    getGraphs,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(googleLogin);
router.route("/logout").post(verifyJWTUser, logout);
router.route("/save-graphs").post(verifyJWTUser, saveGraphs);
router.route("/get-graphs").get(verifyJWTUser, getGraphs);

export default router;