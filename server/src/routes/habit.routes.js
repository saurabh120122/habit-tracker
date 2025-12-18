import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createHabit, getHabits, checkInHabit } from "../controllers/habit.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getHabits).post(createHabit);
router.route("/:id/checkin").post(checkInHabit);

export default router;