import Input from "../../components/Inputs/Inputs";
import { validateEmail } from "../../Utils/validator";
import Lbutton from "../../components/Buttons/Lbutton";
import Eyebutton from "../../components/Buttons/Eyebutton";
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css"

function Login() {
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Emailerror, setEmailError] = useState("");
    const [Disabled, setDisabled] = useState(true);
    const [eyesymbol, seteyesymbol] = useState(false);
    const { showToast } = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const isValid =
            Email !== "" &&
            Password !== "" &&
            Emailerror === "";

        setDisabled(!isValid);
    }, [Email, Password, Emailerror]);


    const handleseebutton = () => {
        eyesymbol ? seteyesymbol(false) : seteyesymbol(true);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(validateEmail(e.target.value));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlesumbitLogin = async () => {

        try {
            const res = await loginApi(Email, Password);

            if (!res.data.success) {
                showToast(res.data.msg, "error");
                setEmail("");
                setPassword("");
                return;
            }
            login(res.data);
            showToast(res.data.msg, "success");
            
            if (res.data.Role === "Trainer") {
                navigate("/");
            } else {
                navigate("/");
            }
        }
        catch (error) {
            showToast("Internal server error", "error");
            console.error(error)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-form">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">
                            Enter your credentials to access your account.
                        </p>
                    </div>
                    <div className="auth-input-group">
                        <Input
                            label="Email"
                            type="email"
                            value={Email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            error={Emailerror}
                        />
                    </div>
                    <div className="auth-input-group auth-password-group">
                        <Input
                            label="Password"
                            type={eyesymbol ? "password" : "text"}
                            value={Password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                        />
                        <Eyebutton
                            hadleButtonclick={handleseebutton}
                            variant="primary"
                            seen={eyesymbol ? "false" : "true"}
                        />
                    </div>
                    <div className="auth-forgot">
                        <button className="auth-forgot-btn">Forgot Password?</button>
                    </div>
                    <div className="auth-submit">
                        <Lbutton
                            hadleButtonclick={handlesumbitLogin}
                            text="Login"
                            disabled={Disabled}
                            variant="primary"
                        />
                    </div>
                    
                    <div className="auth-footer">
                        <p>Don't have an account?</p>
                        <button className="auth-link-btn" onClick={() => navigate("/Register")}>Create Account</button>
                    </div>

                </div>
                <div className="auth-side">
                    <div className="auth-side-content">
                        <h2>Transform Your Body</h2>
                        <p>Join our community and achieve your fitness goals with expert trainers.</p>
                    </div>
                </div>

            </div>

        </div>
    );


}

export default Login;