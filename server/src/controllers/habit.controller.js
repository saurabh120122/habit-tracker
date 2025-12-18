const { Habit, CheckIn } = require("../models");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const createHabit = asyncHandler(async (req, res) => {
    const { name, frequency, category } = req.body;

    try {
        const habit = await Habit.create({
            name,
            frequency,
            category,
            UserId: req.user.id
        });
        return res.status(201).json(new ApiResponse(201, habit, "Habit created successfully"));
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new ApiError(409, "Habit with this name already exists");
        }
        throw error;
    }
});

const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.findAll({
        where: { UserId: req.user.id },
        include: [{ model: CheckIn, limit: 5, order: [['date', 'DESC']] }]
    });
    return res.status(200).json(new ApiResponse(200, habits, "Habits fetched successfully"));
});

const checkInHabit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const habit = await Habit.findOne({ where: { id, UserId: req.user.id } });

    if (!habit) throw new ApiError(404, "Habit not found");

    const today = new Date().toISOString().slice(0, 10);
    
    // Check for double check-in
    const existingCheckIn = await CheckIn.findOne({ where: { HabitId: id, date: today } });
    if (existingCheckIn) {
        throw new ApiError(400, "Already checked in today");
    }

    // Streak Logic
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const lastCheckIn = await CheckIn.findOne({
        where: { HabitId: id },
        order: [['date', 'DESC']]
    });

    if (lastCheckIn && lastCheckIn.date === yesterday) {
        habit.streak += 1;
    } else {
        habit.streak = 1;
    }

    await CheckIn.create({ date: today, HabitId: id });
    await habit.save();

    return res.status(200).json(new ApiResponse(200, habit, "Check-in successful"));
});

module.exports = { createHabit, getHabits, checkInHabit };