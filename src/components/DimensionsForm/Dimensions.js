import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Goal from "../GoalMenu/Goal";
import ActivityLevel from "../ActivityLevelMenu/ActivityLevel";

require("./dimensions.css");

const API_URL = process.env.REACT_APP_API_URL;

function Dimensions(props) {
	const [feet, setFeet] = useState("");
	const [inches, setInches] = useState("");
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [gender, setGender] = useState("");
	const [goal, setGoal] = useState("");
	const [activityLevel, setActivityLevel] = useState("");

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
			.then((macros) => {})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	console.log(activityLevel, goal);

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="dimensions-form signup-dimensions-form home-form"
			>
				<div className="height">
					<label className="label">Height:</label>
					<div className="input-containers">
						<div className="height-container feet-container">
							<label htmlFor="feet" className="sub-label">
								Feet
							</label>
							<input
								type="number"
								name="feet"
								onChange={handleFeet}
								className="small-input"
							/>
						</div>

						<div className="height-container">
							<label htmlFor="inches" className="sub-label">
								Inches
							</label>
							<input
								type="number"
								name="inches"
								onChange={handleInches}
								className="small-input"
							/>
						</div>
					</div>
				</div>

				<div className="fb-helper">
					<label className="label">Age:</label>
					<input type="number" name="age" onChange={handleAge} />
				</div>

				<div className="fb-helper">
					<label htmlFor="weight" className="label">
						Weight:
					</label>
					<input type="number" name="weight" onChange={handleWeight} />
				</div>

				<div className="gender-contain">
					<label htmlFor="gender" className="label">
						Gender:
					</label>
					<div className="genders">
						<div className="gender">
							<input
								type="radio"
								name="gender"
								value="male"
								onChange={handleGender}
							/>
							<label htmlFor="gender" className="gender-label">
								Male
							</label>
						</div>

						<div className="gender">
							<input
								type="radio"
								name="gender"
								value="female"
								onChange={handleGender}
							/>
							<label htmlFor="gender" className="gender-label">
								Female
							</label>
						</div>
					</div>
				</div>

				<div className="menus">
					<Goal setGoal={setGoal} />

					<ActivityLevel setActivityLevel={setActivityLevel} />
				</div>

				{errMessage && (
					<p className="err-message dimensions-err">{errMessage}</p>
				)}

				<button type="submit" className="edit-btn">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Dimensions;
