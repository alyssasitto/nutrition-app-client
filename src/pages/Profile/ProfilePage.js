import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import { DimensionsContext } from "../../context/dimensions.context";
import CalendarComponent from "../../components/Calendar/Calendar";
import SearchPage from "../SearchPage/SearchPage";

import { useNavigate, useNavigation } from "react-router-dom";

import "./profile.css";

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const [food, setFood] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dropdown, setDropdown] = useState("hide");
	const [showDropdown, setShowDropdown] = useState(false);

	const storedToken = localStorage.getItem("authToken");

	const handleClick = (e) => {
		console.log(e.target.value);
	};

	console.log(dropdown, setShowDropdown);

	const navigate = useNavigate();

	const searchBreakfast = () => {
		navigate("/search", { state: { foodType: "Breakfast" } });
	};

	const searchLunch = () => {
		navigate("/search", { state: { foodType: "Lunch" } });
	};

	const searchDinner = () => {
		navigate("/search", { state: { foodType: "Dinner" } });
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/day`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={bg}>
			{loading && <p>Loading...</p>}

			{!loading && (
				<>
					<CalendarComponent />

					<div className="meals">
						<div>
							<h2>Breakfast</h2>
							<button onClick={searchBreakfast}>add breakfast</button>
						</div>

						<div>
							<h2>Lunch</h2>
							<button onClick={searchLunch}>add lunch</button>
						</div>

						<div>
							<h2>Dinner</h2>
							<button onClick={searchDinner}>add dinner</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ProfilePage;
