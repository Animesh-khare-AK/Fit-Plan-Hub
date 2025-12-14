import { useState } from "react";
import Popup from "./Popup";
import { unFollowRequest, FollowRequest } from "../../api/auth";
import { useToast } from "../../context/ToastContext";

function Card({ data, user }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { showToast } = useToast();

    const handleFollow = async (TrainerEmail, isFollowed) => {
        try {
            const res = isFollowed
                ? await unFollowRequest(TrainerEmail, user?.Email)
                : await FollowRequest(TrainerEmail, user?.Email);
            if (res.data?.success) {
                showToast(res.data.msg, "success");
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
                        <p>{item.TrainerEmail}</p>
                        <p>₹ {item.Price}</p>
                        <p>{item.Duration} days</p>

                        {user && (
                            <button
                                onClick={() =>
                                    handleFollow(item.TrainerEmail, item.isFollowed)
                                }>
                                {item.isFollowed ? "Unfollow" : "Follow"}
                            </button>
                        )}

                        <button onClick={() => handleBuy(item)}>
                            Buy Plan
                        </button>
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
