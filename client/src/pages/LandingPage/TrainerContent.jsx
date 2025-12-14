import { useEffect, useState } from "react";
import { uploadnewPlans, editExitingPlan, deletePlan, getAllPlans, } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import Reasons from "../../components/Reasons/Reasons";
import Footer from "../Global Components/Footer";
import "./TrainerContent.css";

const initialForm = {
    Title: "",
    Description: "",
    Price: "",
    Duration: "",
};

function TrainerContent() {
    const [plans, setPlans] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");
    const [disabled, setdisabled] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { showToast } = useToast();
    const { user } = useAuth();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                // Pass user email to fetch only their plans
                const res = await getAllPlans(user);
                setPlans(res.data.data || res.data);
            } catch {
                setError("Failed to fetch plans");
            }
        };
        if (user) {
            fetchPlans();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setdisabled(true);

        try {
            let res;
            // Include user email in the data sent to backend
            const dataToSend = { ...formData, Email: user };

            if (editId) {
                res = await editExitingPlan(editId, dataToSend);
            } else {
                res = await uploadnewPlans(dataToSend);
            }

            if (res.data?.success) {
                showToast(res.data.msg, "success");
                setFormData(initialForm);
                setEditId(null);

                const updated = await getAllPlans(user);
                setPlans(updated.data.data || updated.data);
                setShowForm(false);
            } else {
                showToast("Operation failed", "error");
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    showToast(err.response.data.msg || "Invalid data", "error");
                } else if (err.response.status === 404) {
                    showToast(err.response.data.msg, "error");
                } else {
                    showToast(err.response.data?.msg || "An error occurred", "error");
                }
            } else {
                showToast("Network error or server is down", "error");
            }
        } finally {
            setdisabled(false);
        }
    };

    const handleEdit = (plan) => {
        setEditId(plan._id);
        setFormData({
            Title: plan.Title,
            Description: plan.Description,
            Price: plan.Price,
            Duration: plan.Duration,
        });
        setShowForm(true);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateNew = () => {
        setEditId(null);
        setFormData(initialForm);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditId(null);
        setFormData(initialForm);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this plan?")) return;
        try {
            const res = await deletePlan(id);

            if (res.data?.success) {
                showToast(res.data.msg, "success");
                setPlans((prev) => prev.filter((p) => p._id !== id));
            }
        } catch (err) {
            if (err.response?.status === 404) {
                showToast("Plan not found", "error");
            } else {
                showToast("Delete failed", "error");
            }
        }
    };

    return (
        <div className="trainer-dashboard">
            {/* Create/Edit Section */}
            <div className="trainer-section">
                <div className="section-header">
                    <span>{editId ? "Edit" : "Create"}</span>
                    <span className="stroke-text">YOUR PLAN</span>
                </div>
                
                {!showForm ? (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button 
                            className="btn-join" 
                            onClick={handleCreateNew}
                            style={{padding: '1rem 2rem', fontSize: '1.2rem'}}
                        >
                            Create New Plan
                        </button>
                    </div>
                ) : (
                    <div className="plan-form-container">
                        <h3>{editId ? "Update Plan Details" : "New Plan Details"}</h3>
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <input
                                name="Title"
                                placeholder="Plan Title"
                                value={formData.Title}
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="Description"
                                placeholder="Plan Description"
                                value={formData.Description}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                name="Price"
                                placeholder="Price (₹)"
                                value={formData.Price}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                name="Duration"
                                placeholder="Duration (days)"
                                value={formData.Duration}
                                onChange={handleChange}
                                required
                            />

                            <div style={{display: 'flex', gap: '1rem'}}>
                                <button type="submit" disabled={disabled} style={{flex: 1}}>
                                    {editId ? "Update Plan" : "Create Plan"}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleCancel}
                                    style={{flex: 1, backgroundColor: 'transparent', border: '1px solid var(--orange)', color: 'white'}}
                                >
                                    Cancel
                                </button>
                            </div>

                            {error && <p className="error-msg">{error}</p>}
                        </form>
                    </div>
                )}
            </div>

            {/* Your Plans Section */}
            <div className="trainer-section">
                <div className="section-header">
                    <span>YOUR</span>
                    <span className="stroke-text">CREATED PLANS</span>
                </div>

                {plans.length === 0 ? (
                    <div className="no-plans-msg">You haven't created any plans yet.</div>
                ) : (
                    <div className="trainer-plans-grid">
                        {plans.map((plan) => (
                            <div key={plan._id} className="trainer-plan-card">
                                <h4>{plan.Title}</h4>
                                <span className="price">₹ {plan.Price}</span>
                                <span className="duration">{plan.Duration} Days</span>
                                <p className="description">{plan.Description}</p>

                                <div className="card-actions">
                                    <button className="btn-edit" onClick={() => handleEdit(plan)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(plan._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Reasons />
        </div>
    );
}

export default TrainerContent;
