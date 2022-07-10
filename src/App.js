// IMPORTING MODULES/PACKAGES
import './App.css';
import React from 'react';
import { useRecoilState } from 'recoil';
import NoContentBox from './Components/Custom/NoContentBox';
import { Animation, LightMode, DarkMode } from '@mui/icons-material';
import { taskInput, activeTasks, completedTasks, darkMode } from './Context/atoms';
import { Box, Button, CssBaseline, InputBase, ThemeProvider, Typography, FormControl, IconButton, Tabs, Tab, Skeleton } from '@mui/material';

// IMPORTING API ENDPOINTS
import getActiveTasks from './API/getActiveTasks';
import getCompletedTasks from './API/getCompletedTasks';

// IMPORTING THEMES
import DarkTheme from './Theme/Dark';
import LightTheme from './Theme/Light';

// IMPORTING IMAGES
import TakenImg from "./Resources/taken.svg";
import TowingImg from "./Resources/towing.svg";

// COMPONENTS
/**
 * @name TabPanel
 * @description TAB PANEL COMPONENT
 * @param {*} props COMPONENT PROPS
 * @returns <TabPanel /> (JSX)
 */
function TabPanel(props) {

    // GETTING PROP VALUES
    const { children, tabValue, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={tabValue !== index}
            id={`task-tabpanel-${index}`}
            aria-labelledby={`task-tab-${index}`}
            sx={{ mt: "1rem" }}
            className="tabpanel"
            {...other}>
            {
                tabValue === index &&
                <>{children}</>
            }
        </Box>
    );
}

function App() {

    // GETTING ATOM STATE
    const [darkModeState, setDarkModeState] = useRecoilState(darkMode);
    const [taskInputState, setTaskInputState] = useRecoilState(taskInput);
    const [activeTaskState, setActiveTaskState] = useRecoilState(activeTasks);
    const [completedTaskState, setCompletedTaskState] = useRecoilState(completedTasks);

    // SETTING LOCAL STATE
    const [tabValue, setValue] = React.useState(0);

    // METHODS
    /**
     * @name changeTabValue
     * @description METHOD TO CHANGE TAB VALUE
     * @param {*} event EVENT OBJECT
     * @param {*} newTabValue NEW TAB VALUE
     * @returns undefined
     */
    const changeTabValue = (event, newTabValue) => {
        event.preventDefault();
        setValue(newTabValue);
    };

    /**
     * @name tabProps
     * @description METHOD TO SET TAB PROPS
     * @param {*} index TAB INDEX
     * @returns {Object} tabPropsObj
     */
    const tabProps = (index) => {
        return {
            id: `task-tab-${index}`,
            'aria-controls': `task-tabpanel-${index}`,
        };
    }

    /**
     * @name changeDarkModeState
     * @description METHOD TO CHANGE DARK MODE
     * @param event EVENT OBJECT
     * @returrns undefined
     */
    const changeDarkModeState = (event) => {
        event.preventDefault();
        setDarkModeState(!darkModeState);
    };

    /**
     * @name getTaskData
     * @description METHOD TO GET TASK DATA FOR ACTIVE & COMPLETED TASKS
     * @returns undefined
     */
    const getTaskData = async () => {

        let res = await getActiveTasks();
        if (res.status === 200) {
            const tasks = await res.json();
            setActiveTaskState([...tasks]);
        }

        res = await getCompletedTasks();
        if (res.status === 200) {
            const tasks = await res.json();
            setCompletedTaskState([...tasks]);
        }
    };

    React.useEffect(() => {
        getTaskData();
    }, []);

    return (
        <ThemeProvider theme={darkModeState === true ? DarkTheme : LightTheme}>
            <CssBaseline />
            <Box className="app-container">

                <Box sx={{ display: "flex", width: "100%", flexDirection: "row-reverse" }}>
                    <IconButton color="primary" size="large" onClick={changeDarkModeState}>
                        {darkModeState === true ? <DarkMode fontSize="inherit" /> : <LightMode fontSize="inherit" />}
                    </IconButton>
                </Box>

                <Typography variant="h4" color="primary">recoil-task-tracker</Typography>
                <Typography variant="body1" sx={{ textAlign: "center", px: "10px" }}>A simple task tracking application built using React & Recoil.js</Typography>
                <form id="input-form">
                    <FormControl>
                        <InputBase
                            id="task-input"
                            varaint="outlined"
                            multiline={true}
                            value={taskInputState}
                            onChange={(event)=>{setTaskInputState(event.target.value)}}
                            placeholder="Enter task name"
                            startAdornment={<Animation fontSize="medium" sx={{ m: "5px", color: "primary.main" }} />}
                            sx={{ "&.MuiInputBase-root": { m: "5px" } }} />
                    </FormControl>
                    <Typography variant="caption" sx={{ textAlign: "right", my: "5px" }}>{taskInputState.length} characters</Typography>
                    <Button variant="outlined" sx={{ textTransform: "none", fontSize: "1rem" }} disabled={!(taskInputState.length > 0 && taskInputState.length < 280)}> Add new task </Button>
                </form>

                <Tabs value={tabValue} onChange={changeTabValue} aria-label="Task tab" sx={{ mt: "1rem", "& .MuiTabs-indicator": { display: "none" } }}>
                    <Tab sx={{ "&.MuiTab-root": { textTransform: "none", flexGrow: "1" }, "&.Mui-selected": { backgroundColor: "primary.main", color: "common.white", borderRadius: "5px" } }} label="Active" {...tabProps(0)} />
                    <Tab sx={{ "&.MuiTab-root": { textTransform: "none", flexGrow: "1" }, "&.Mui-selected": { backgroundColor: "primary.main", color: "common.white", borderRadius: "5px" } }} label="Completed" {...tabProps(1)} />
                </Tabs>

                <TabPanel tabValue={tabValue} index={0}>
                    {
                        activeTaskState === null ?
                            <Skeleton variant="rectangular" sx={{ width: "100%", height: "40vh", borderRadius: "5px" }} /> :
                            activeTaskState.length === 0 ?
                                <NoContentBox imgSrc={TakenImg} text="No active tasks" /> :
                                "Some active tasks here"
                    }
                </TabPanel>
                <TabPanel tabValue={tabValue} index={1}>
                    {
                        completedTaskState === null ?
                            <Skeleton variant="rectangular" sx={{ width: "100%", height: "40vh", borderRadius: "5px" }} /> :
                            completedTaskState.length === 0 ?
                                <NoContentBox imgSrc={TowingImg} text="No completed tasks" /> :
                                "Some completed tasks here"
                    }
                </TabPanel>

                <Typography variant="body2" sx={{ my: "10px" }}>
                    Built with ❤️ by <a href="https://twitter.com/asxyzp" style={{ textDecoration: "none" }}><Typography color="primary" variant="body2" sx={{ display: "inline" }}>@asxyzp</Typography></a>
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default App;