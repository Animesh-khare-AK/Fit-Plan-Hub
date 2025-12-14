import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Plans from "../../components/Plans/Plans";
import Reasons from "../../components/Reasons/Reasons";
import { fetchDataforUnloggedUser } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function UnloggedDashboard() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchDataforUnloggedUser();

                if (res.data?.success) {
                    setData(res.data.list || []);
                } else {
                    showToast("Failed to load data", "error");
                }
            } catch (err) {
                if (err.response) {
                    showToast(
                        err.response.data?.msg || "Request failed",
                        "error"
                    );
                } else {
                    showToast("Network error", "error");
                }
                setError("Unable to fetch data");
            }
        };

        fetchData();
    }, [showToast]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleGetStarted = () => {
        navigate('/register');
    };

    const handleLearnMore = () => {
        document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="dashboard-wrapper">
            <Hero onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
            
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Explore Our <span className="highlight">Premium Plans</span></h1>
                    <p>Choose from expert-crafted training plans designed to transform your fitness journey.</p>
                </div>

                {error ? (
                    <div className="error-container">
                        <p className="error">{error}</p>
                    </div>
                ) : (
                    <Plans user={user} data={data} onLogin={handleLogin} />
                )}
            </div>

            <Reasons />
        </div>
    );
}

export default UnloggedDashboard;
