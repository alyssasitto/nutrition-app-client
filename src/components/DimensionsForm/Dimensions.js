import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Goal from "../GoalMenu/Goal";
import ActivityLevel from "../ActivityLevelMenu/ActivityLevel";

require("./dimensions.css");

const API_URL = "http://localhost:5005";

function Dimensions(props) {
	const [feet, setFeet] = useState("");
	const [inches, setInches] = useState("");
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [gender, setGender] = useState("");
	const [goal, setGoal] = useState("");
	const [activityLevel, setActivityLevel] = useState("");
	const [redirect, setRedirect] = useState(false);

	const [errMessage, setErrMessage] = useState(null);

	const navigate = useNavigate();

	const handleFeet = (e) => {
		setFeet(e.target.value);
	};

	const handleInches = (e) => {
		setInches(e.target.value);
	};

	const handleAge = (e) => {
		setAge(e.target.value);
	};

	const handleWeight = (e) => {
		setWeight(e.target.value);
	};

	const handleGender = (e) => {
		setGender(e.target.value);
	};

	const handleSubmit = (e) => {
		const storedToken = localStorage.getItem("authToken");

		e.preventDefault();

		const body = {
			feet,
			inches,
			age,
			weight,
			gender,
			goal,
			activityLevel,
		};

		axios
			.post(`${API_URL}/dimensions`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				navigate("/profile");

				return axios.post(`${API_URL}/macros`, body, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((macros) => {
				console.log(macros);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	console.log(activityLevel, goal);

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="feet">Feet</label>
				<input type="number" name="feet" onChange={handleFeet} />
			</div>

			<div>
				<label htmlFor="inches">Inches</label>
				<input type="number" name="inches" onChange={handleInches} />
			</div>

			<div>
				<label>Age</label>
				<input type="number" name="age" onChange={handleAge} />
			</div>

			<div>
				<label htmlFor="weight">Weight</label>
				<input type="number" name="weight" onChange={handleWeight} />
			</div>

			<div>
				<label>Male</label>
				<input
					type="radio"
					name="gender"
					value="male"
					onChange={handleGender}
				/>
			</div>

			<div>
				<label>Female</label>
				<input
					type="radio"
					name="gender"
					value="female"
					onChange={handleGender}
				/>
			</div>

			<div className="menus">
				<Goal setGoal={setGoal} />

				<ActivityLevel setActivityLevel={setActivityLevel} />
			</div>

			{errMessage && <p>{errMessage}</p>}

			<button type="submit">Submit</button>
		</form>
	);
}

export default Dimensions;
