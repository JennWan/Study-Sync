const axios = require("axios");

const tokenEndpoint = "https://dev-he67ed27e5efteag.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
    const code = req.query.code;

    if(!code) {
        res.status(401).send("No Authorization Code");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", "UOUG6NsewHiGB1NfAqCfpV3p9EbNPGHy");
    params.append("client_secret", "i6MxZszQLm66ta5GqM4dQguu8Eu0a3L2FAUHZeW5Fvn2LLmnFiAn7Ur_b4EaJAIN");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/tasks");

    axios.post(tokenEndpoint, params)
    .then(response => {
        req.oauth = response.data;
        next();
    })
    .catch(err => {
        console.log(err);
        res.status(403).json(`Reason: ${err.message}`);
    })
}

module.exports = oAuth;