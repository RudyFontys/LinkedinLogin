import express from "express";
import axios from "axios";
import path from "path";

const app = express();
const PORT = 80;

// Config (via env vars)
const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://linkedinlogin.bouland.com/callback";

// Static files
app.use(express.static("public"));

/**
 * Stap 1 – Redirect naar LinkedIn
 */
app.get("/login", (req, res) => {
    const state = Math.random().toString(36).substring(2);

    const authUrl =
        "https://www.linkedin.com/oauth/v2/authorization" +
        "?response_type=code" +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent("openid profile email")}` +
        `&state=${state}`;

    res.redirect(authUrl);
});

/**
 * Stap 2 – Callback van LinkedIn
 */
app.get("/callback", async (req, res) => {
    const code = req.query.code;

    try {
        // Exchange code → access token
        const tokenResponse = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const accessToken = tokenResponse.data.access_token;

        // User info (OIDC)
        const userInfo = await axios.get(
            "https://api.linkedin.com/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log("LinkedIn user:", userInfo.data);

        // TODO: sessie / JWT / cookie, dit kan pas als de PV storage werkt.
        res.redirect("/home.html");

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("LinkedIn login failed");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
