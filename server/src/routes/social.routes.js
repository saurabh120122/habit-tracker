import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { searchUsers, followUser, getFriendFeed } from "../controllers/social.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/search").get(searchUsers);
router.route("/follow/:id").post(followUser);
router.route("/feed").get(getFriendFeed);

export default router;