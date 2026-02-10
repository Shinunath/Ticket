export const setUserInStorage = (user) => {
    try {
        const userData = JSON.stringify(user);
        localStorage.setItem("user", userData);
    } catch (error) {
        console.error("Error saving user to storage:", error);
    }

};

export const getUserFromStorage = () => {
    try {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Error retrieving user from storage:", error);
        return null;
    }
};