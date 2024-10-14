import { Router } from "express";

import { connectGitHub, checkAuth, webhookHandler, } from "../controllers";

const router = Router();

// Endpoint to authenticate with GitHub and exchange code for access token
router.post("/auth/github/callback", connectGitHub);

// Endpoint to fetch user data from GitHub
router.get("/auth/check-auth", checkAuth);

// webhook
router.post("/webhook-handler", webhookHandler)

export default router;