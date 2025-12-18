import { User } from './user.model.js';
import { Habit } from './habit.model.js';
import { CheckIn } from './checkin.model.js';

// User -> Habits
User.hasMany(Habit, { onDelete: "CASCADE" });
Habit.belongsTo(User);

// Habit -> CheckIns
Habit.hasMany(CheckIn, { onDelete: "CASCADE" });
CheckIn.belongsTo(Habit);

// Social (Self-referential)
User.belongsToMany(User, { as: "Followers", through: "Follows", foreignKey: "followingId" });
User.belongsToMany(User, { as: "Following", through: "Follows", foreignKey: "followerId" });

export { User, Habit, CheckIn };