import { User, Habit } from "../models/index.js";
import { Op } from "sequelize";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const searchUsers = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const users = await User.findAll({
        where: { username: { [Op.like]: `%${q}%` } },
        attributes: ["id", "username"]
    });
    return res.status(200).json(new ApiResponse(200, users, "Users fetched"));
});

const followUser = asyncHandler(async (req, res) => {
    if (req.params.id == req.user.id) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const currentUser = await User.findByPk(req.user.id);
    const targetUser = await User.findByPk(req.params.id);

    if (!targetUser) throw new ApiError(404, "User to follow not found");

    await currentUser.addFollowing(targetUser);
    
    return res.status(200).json(new ApiResponse(200, {}, "Followed successfully"));
});

const getFriendFeed = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        include: [{
            model: User,
            as: "Following",
            attributes: ["id", "username"],
            include: [{
                model: Habit,
                attributes: ["name", "streak", "updatedAt"]
            }]
        }]
    });

    return res.status(200).json(new ApiResponse(200, user.Following, "Feed fetched"));
});

export { searchUsers, followUser, getFriendFeed };