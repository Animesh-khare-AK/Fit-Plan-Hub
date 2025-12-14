import { useState } from "react";
import BuyPopup from "./PopUp";
import { unFollowRequest, FollowRequest } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import "./Card.css"; 

function Card({ data, user }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { showToast } = useToast();

    const handleFollow = async (TrainerEmail, isFollowed) => {
        try {
            const res = isFollowed
                ? await unFollowRequest(TrainerEmail, user)
                : await FollowRequest(TrainerEmail, user);
            
            if (res.data?.success) {
                showToast(res.data.msg, "success");
                window.location.reload(); 
            }
        } catch (err) {
            showToast(
                err.response?.data?.msg || "Action failed",
                "error"
            );
        }
    };

    const handleBuy = (plan) => {
        if (!user) {
            showToast("You need to login first ", "error");
            return;
        }
        setSelectedPlan(plan);
    };

    return (
        <>
            <div className="cards-wrapper">
                {data.map((item) => (
                    <div key={item.uuid} className="card">
                        <h3>{item.Title}</h3>
                        <p className="trainer-email">Trainer: {item.TrainerEmail}</p>
                        <div className="card-details">
                            <span className="price">₹ {item.Price}</span>
                            <span className="duration">{item.Duration} days</span>
                        </div>
                        
                        {item.Description && (
                            <p className="description">{item.Description}</p>
                        )}

                        <div className="card-actions">
                            {user && (
                                <button
                                    className={`btn-follow ${item.followed ? 'unfollow' : ''}`}
                                    onClick={() =>
                                        handleFollow(item.TrainerEmail, item.followed)
                                    }>
                                    {item.followed ? "Unfollow" : "Follow"}
                                </button>
                            )}

                            <button className="btn-buy" onClick={() => handleBuy(item)}>
                                Buy Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <BuyPopup
                    plan={selectedPlan}
                    user={user}
                    onClose={() => setSelectedPlan(null)}
                />
            )}
        </>
    );
}

export default Card;
