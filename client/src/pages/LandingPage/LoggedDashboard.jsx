import { useEffect, useState } from "react";
import Card from "../Global Components/Card";
import { fetchDataforloggedUser, fetchPurchasedPlans, fetchFollowedTrainers } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function LoggedDashboard() {
    const [feedData, setFeedData] = useState([]);
    const [purchasedData, setPurchasedData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [activeTab, setActiveTab] = useState("feed");
    const [loading, setLoading] = useState(false);
    
    const { showToast } = useToast();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            setLoading(true);
            try {
                if (activeTab === "feed") {
                    const res = await fetchDataforloggedUser(user);
                    if (res.data?.success) setFeedData(res.data.list);
                } else if (activeTab === "purchased") {
                    const res = await fetchPurchasedPlans(user);
                    if (res.data?.success) setPurchasedData(res.data.list);
                } else if (activeTab === "following") {
                    const res = await fetchFollowedTrainers(user);
                    if (res.data?.success) setFollowingData(res.data.list);
                }
            } catch (err) {
                console.error(err);
                // Optional: showToast("Failed to load data", "error");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, activeTab]);

    return (
        <div className="Main-Container">
            <div className="dashboard-tabs">
                <button 
                    className={activeTab === "feed" ? "active" : ""} 
                    onClick={() => setActiveTab("feed")}
                >
                    Feed
                </button>
                <button 
                    className={activeTab === "purchased" ? "active" : ""} 
                    onClick={() => setActiveTab("purchased")}
                >
                    Purchased Plans
                </button>
                <button 
                    className={activeTab === "following" ? "active" : ""} 
                    onClick={() => setActiveTab("following")}
                >
                    Following
                </button>
            </div>

            {loading ? (
                <div className="loading" style={{textAlign: 'center', color: 'white', marginTop: '2rem'}}>Loading...</div>
            ) : (
                <div className="dashboard-content">
                    {activeTab === "feed" && (
                        <Card user={user} data={feedData} />
                    )}
                    
                    {activeTab === "purchased" && (
                        purchasedData.length > 0 ? (
                            <Card user={user} data={purchasedData} />
                        ) : (
                            <p className="no-data">You haven't purchased any plans yet.</p>
                        )
                    )}

                    {activeTab === "following" && (
                        <div className="following-list">
                            {followingData.length > 0 ? (
                                followingData.map((trainer, index) => (
                                    <div key={index} className="trainer-item">
                                        <span>{trainer}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">You are not following any trainers.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default LoggedDashboard;
