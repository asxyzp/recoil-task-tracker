/**
 * @name getCompletedTasks
 * @description METHOD TO FETCH ACTIVE TASK DATA FROM /active
 * @returns {Promise} response
 */
 const getCompletedTasks = async () => {
    const res = await fetch("http://localhost:8000/completed");
    return res;
};

export default getCompletedTasks;