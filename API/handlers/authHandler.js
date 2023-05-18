// const {} = require("../controllers/userController");
require('dotenv').config();
const { OAuth2Client, UserRefreshClient } = require("google-auth-library");
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);
async function googleLogin(req, res) {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);

    res.json(tokens);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function refreshToken (req, res) {
    const user = new UserRefreshClient(
        clientId,
        clientSecret,
        req.body.refreshToken,
      );
      const { credentials } = await user.refreshAccessToken(); // optain new tokens
      res.json(credentials);
}

module.exports = {
  googleLogin,
  refreshToken,
};
