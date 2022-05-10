import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Header from "./Header";

const Authentication = () => {
    const clientId =
        "998452743005-etmguubtqm5kk5kp4185k7lbqq26mpvf.apps.googleusercontent.com";
    //states for hiding and showing header and button
    const [showloginButton, setShowloginButton] = useState(false);
    const [ShowHeader, setShowHeader] = useState(true);
    //google login success
    const onLoginSuccess = (res) => {
        console.log("Login Success:", res.profileObj);
        setShowloginButton(false);
        setShowHeader(true);
    };
    //google login failure
    const onLoginFailure = () => {
        alert("something went wrong..login failed.Please try again");
        setShowloginButton(true);
    };

    return (
        //after login success the login button hide and show the header component
        <div>
            {showloginButton ? (
                <div id="grad1">
                    <h1 className="das">Welcome To Our Library! </h1>

                    <div className="g-signin">
                        <div className="customBtn">
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="log in with google to continue"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={"single_host_origin"}
                                isSignedIn={true}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            {ShowHeader && <Header />}
        </div>
    );
};

export default Authentication;
