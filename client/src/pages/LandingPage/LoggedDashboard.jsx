import { useEffect, useState, useContext } from "react";
import Card from "../Global Components/Card";
import { fetchDataforloggedUser } from "../../api/auth";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
function LoggedDashboard() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { showToast } = useToast();
    const { user, Role } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchDataforloggedUser();

                if (res.data?.success) {
                    setData(res.data.data);
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

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="Main-Container">
            <Card
                user={user}
                data={data}
            />

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default LoggedDashboard;
