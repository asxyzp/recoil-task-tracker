// IMPORTING MODULES/PACKAGES
import React from 'react';
import { useRecoilState } from "recoil";
import { Delete, Done, MoreHorizOutlined } from "@mui/icons-material";
import { activeTasks, completedTasks } from '../../Context/atoms';
import { Box, Chip, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";

// IMPORTING MODULES/PACKAGES
const TaskListItem = (props) => {

    // GETTING COMPONENT PROPS
    const taskData = props.taskData;

    // GETTING ATOM STATE
    const [activeTaskState, setActiveTaskState] = useRecoilState(activeTasks);
    const [completedTaskState, setCompletedTaskState] = useRecoilState(completedTasks);

    // SETTING LOCAL STATE
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // METHODS
    /**
     * @name openMenu
     * @description METHOD TO OPEN MENU
     * @param {*} event EVENT OBJECT
     * @returns undefined
     */
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * @name closeMenu
     * @description METHOD TO CLOSE MENU
     * @param {*} event EVENT OBJECT
     * @returns undefined
     */
    const closeMenu = () => {
        setAnchorEl(null);
    };

    /**
     * @name deleteTask
     * @description METHOD TO DELETE TASK
     * @param {*} taskType TYPE OF TASK
     * @param {*} taskId ID OF TASL
     * @returns undefined
     */
    const deleteTask = (taskType, taskId) => {
        if (taskType === "active") {
            const index = activeTaskState.findIndex((activeTask) => activeTask.id === taskId);
            setActiveTaskState([...activeTaskState.slice(0,index),...activeTaskState.slice(index+1)]);
        }
        else {
            const index = completedTaskState.findIndex((completedTask) => completedTask.id === taskId);
            setCompletedTaskState([...completedTaskState.slice(0,index), ...completedTaskState.slice(index+1)]);
        }
        closeMenu();
    };

    /**
     * @name completeTask
     * @description METHOD TO COMPLETE TASK
     * @param {*} taskId ID OF TASK
     * @returns undefined
     */
    const completeTask = (taskId) => {
        const index = activeTaskState.findIndex((activeTask) => activeTask.id === taskId);
        let completedTask = activeTaskState[index];
        completedTask = {
            id: completedTask.id,
            type: "completed",
            task: completedTask.task,
            addedOn: completedTask.addedOn,
            completedOn: Date.now(),
            addedBy: "defaultUser"
        };
        setActiveTaskState([...activeTaskState.slice(0,index),...activeTaskState.slice(index+1)]);
        setCompletedTaskState([completedTask, ...completedTaskState]);
        closeMenu();
    };

    return (
        <>
            <Box sx={{ p: "10px", position: "relative" }}>
                <Typography variant="body1">{taskData.task}</Typography>
                <Chip variant="outlined" label={`Started on ${new Date(taskData.addedOn).getDate()}/${new Date(taskData.addedOn).getMonth()}/${new Date(taskData.addedOn).getFullYear()} at ${new Date(taskData.addedOn).getHours()}H ${new Date(taskData.addedOn).getMinutes()}M`} color="secondary" sx={{ mt: "5px" }} />
                {taskData.type === "completed" && <Chip variant="outlined" label={`Completed on ${new Date(taskData.completedOn).getDate()}/${new Date(taskData.completedOn).getMonth()}/${new Date(taskData.completedOn).getFullYear()} at ${new Date(taskData.completedOn).getHours()}H ${new Date(taskData.completedOn).getMinutes()}M`} color="success" sx={{ mt: "5px", ml: "5px" }} />}
                <IconButton onClick={openMenu} sx={{ position: "absolute", bottom: "0", right: "0" }}>
                    <MoreHorizOutlined />
                </IconButton>
                <Menu
                    open={open}
                    id="task-menu"
                    anchorEl={anchorEl}
                    onClose={closeMenu}
                    aria-labelledby="task-menu-button"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                    {
                        taskData.type === "active" &&
                        <MenuItem onClick={() => completeTask(taskData.id)}>
                            <ListItemIcon>
                                <Done fontSize="small" />
                            </ListItemIcon>
                            Complete
                        </MenuItem>
                    }
                    <MenuItem onClick={() => deleteTask(taskData.type, taskData.id)}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>
            <Divider />
        </>
    );
};

export default TaskListItem;