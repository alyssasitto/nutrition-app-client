import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import { DimensionsContext } from "../../context/dimensions.context";

import SearchPage from "../SearchPage/SearchPage";
import Calendar from "react-calendar";

import { useNavigate, useNavigation } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

import "./profile.css";

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const [food, setFood] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dropdown, setDropdown] = useState("hide");
	const [showDropdown, setShowDropdown] = useState(false);

	const [date, setDate] = useState(new Date());
	const [calender, setCalender] = useState("hide");

	const onChange = (date) => {
		setDate(date);
	};

	const handleCalender = () => {
		if (calender === "hide") {
			setCalender("show");
		}

		if (calender === "show") {
			setCalender("hide");
		}
	};

	const storedToken = localStorage.getItem("authToken");

	const dateString = date.toDateString();

	const handleClick = (e) => {
		console.log(e.target.value);
	};

	console.log(dropdown, setShowDropdown);

	const navigate = useNavigate();

	const searchBreakfast = () => {
		navigate("/search", { state: { foodType: "Breakfast", date: dateString } });
	};

	const searchLunch = () => {
		navigate("/search", { state: { foodType: "Lunch", date: dateString } });
	};

	const searchDinner = () => {
		navigate("/search", { state: { foodType: "Dinner", date: dateString } });
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
					<div>
						<img
							src="images/calendar.svg"
							onClick={handleCalender}
							className="icon"
						></img>
						<Calendar onChange={onChange} value={date} className={calender} />
					</div>

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
