import axios from "axios";
import { Request, Response } from "express";
import { gitHubClientId, gitHubClientSecret } from "../config";
import { errorHandler, responseHandler, throwError, getUserData, reviewPRWithAI, fetchDiff } from "../utils";
import { ResponsStatus } from "../types";
import { storeToken } from "../db";

export const connectGitHub = async (req: Request, res: Response): Promise<any> => {
    try {
        const code = req.query.code as string;

        if (!code) {
            return throwError({ message: "Authorization code not found", statusCode: ResponsStatus.BadRequest });
        }

        const { data } = await axios.post(
            `https://github.com/login/oauth/access_token?`,
            {
                client_id: gitHubClientId,
                client_secret: gitHubClientSecret,
                code,
            },
            { headers: { Accept: "application/json" } }
        );

        if (data.error) {
            return throwError({ message: data.error_description, statusCode: ResponsStatus.BadRequest });
        }

        const token = data.access_token;

        const user = await getUserData(`Bearer ${token}`);

        storeToken(user.id, token);

        return responseHandler(res, { token, data: user, message: "Connected successfully" });
    } catch (error: any) {
        console.error("Error in GitHub OAuth:", error);
        return errorHandler(res, error, "Failed to authenticate with GitHub");
    }
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
    const authToken = req.header("Authorization"); // Bearer token
    try {
        const user = await getUserData(authToken || "");

        return responseHandler(res, { data: user });
    } catch (error: any) {
        console.error("Error in CheckAuth OAuth:", error);
        return errorHandler(res, error, "Failed to get user data from github");
    }
}

export const webhookHandler = async (req: Request, res: Response) => {
    const { action, pull_request } = req.body;

    if (action === 'opened' || action === 'synchronize') {

        const prTitle = pull_request.title;
        const prUrl = pull_request.html_url;
        const prDiffUrl = pull_request.diff_url;
        const prDiff = await fetchDiff(prDiffUrl);

        console.log(`PR Event: ${action}, Title: ${prTitle}, URL: ${prUrl}`);

        const aiReview = await reviewPRWithAI(pull_request.body, prDiff);
        console.log(aiReview)
    }

    res.send('Webhook received');
}
