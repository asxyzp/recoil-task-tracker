/**
 * @name getActiveTasks
 * @description METHOD TO FETCH ACTIVE TASK DATA FROM /active
 * @returns {Promise} response
 */
const getActiveTasks = async () => {
    const res = await fetch("http://localhost:8000/active");
    return res;
};

export default getActiveTasks;