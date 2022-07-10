// IMPORTING MODULES/PACKAGES
import {atom} from "recoil";

// STORES TASK INPUT
export const taskInput = atom({
    key: "taskInput",
    default: ""
});

// STORES DARK MODE STATE
export const darkMode = atom({
    key: "darkMode",
    default: false
});

// STORES ACTIVE TASKS
export const activeTasks = atom({
    key: "activeTasks",
    default: null
});

// STORES COMPLETED TASKS
export const completedTasks = atom({
    key: "completedTasks",
    default: null
});