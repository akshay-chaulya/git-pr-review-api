import dotenv from "dotenv";
dotenv.config();

const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET
const gitHubClientId = process.env.GITHUB_CLIENT_ID
const openAiKey = process.env.OPEN_AI_KEY;
const dbUrl = process.env.DB_URL!;

export { dbUrl, gitHubClientId, gitHubClientSecret, openAiKey }