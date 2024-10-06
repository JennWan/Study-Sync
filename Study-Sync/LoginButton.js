import React from "react";

const LoginButton = () => {
    const login = async () => {
        const domain = "dev-he67ed27e5efteag.us.auth0.com";
        const audience = "https://www.study-sync-api.com";
        const scope = "read:tasks";
        const clientId = "UOUG6NsewHiGB1NfAqCfpV3p9EbNPGHy";
        const responseType = "code";
        const redirectUri = "http://localhost:3000/tasks";

        const reponse = fetch(
            `https://${domain}/authorize?` + 
            `audience=${audience}&` + 
            `scope=${scope}&` + 
            `clientId=${clientId}&` + 
            `responseType=${responseType}&` + 
            `redirectUri=${redirectUri}`, {
                redirect: "manual"
            }
        );
        window.location.replace(response.url);
    };

    return (
        <button className="Login-button" onClick={() => login()}>
            Log In
        </button>
    );
};

export default LoginButton;