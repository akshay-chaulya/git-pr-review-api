import axios from "axios";

const getUserData = async (authToken: string) => {
    try {
        if (!authToken) {
            throw ("Missing Authorization token");
        }

        // Fetch user data from GitHub API
        const { data } = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: authToken,
            },
        });

        if (!data) {
            throw ("Unauthorized - Invalid token")
        }

        return data
    } catch (error: any) {
        console.error("Error in getUserData: ", error);
        throw (error);
    }
}

export default getUserData