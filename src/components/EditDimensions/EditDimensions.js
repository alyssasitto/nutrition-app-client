import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DimensionsContext } from "../../context/dimensions.context";
import { AuthContext } from "../../context/auth.context";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditDimensions(props) {
	const [dimensions, setDimensions] = useState(null);
	const [loading, setLoading] = useState(true);
	const storedToken = localStorage.getItem("authToken");

	const { getDimensions } = useContext(AuthContext);

	const [feet, setFeet] = useState("");
	const [inches, setInches] = useState("");
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [gender, setGender] = useState("");
	const [goal, setGoal] = useState("");
	const [activityLevel, setActivityLevel] = useState("");
	const [male, setMale] = useState("male");
	const [female, setFemale] = useState("female");
	const [maleChecked, setMaleChecked] = useState(false);
	const [femaleChecked, setFemaleChecked] = useState(false);

	const [isSelected, setIsSelected] = useState("");

	const [errMessage, setErrMessage] = useState(null);

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

	const handleGoal = (e) => {
		setGoal(e.target.value);
	};

	const handleActivityLevel = (e) => {
		setActivityLevel(e.target.value);
	};

	const checkValue = () => {
		console.log("clicked");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { feet, inches, age, weight, gender, activityLevel, goal };

		axios
			.post(`${API_URL}/edit/dimensions`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				props.setOverlay("");
				props.setDimensionsForm(false);
				props.setFeet(feet);
				props.setInches(inches);
				props.setAge(age);
				props.setWeight(weight);
				props.setGender(gender);
				props.setGoal(goal);
				props.setActivityLevel(activityLevel);

				// getDimensions();

				return axios.post(`${API_URL}/edit/macros`, body, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
				// setErrMessage(err.response.data.message);
			});
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setDimensions(response.data.dimensions);
				setLoading(false);

				setDimensions(response.data.dimensions);
				setFeet(response.data.dimensions.feet);
				setInches(response.data.dimensions.inches);
				setAge(response.data.dimensions.age);
				setWeight(response.data.dimensions.weight);
				setGender(response.data.dimensions.gender);
				setGoal(response.data.dimensions.goal);
				setActivityLevel(response.data.dimensions.activityLevel);

				if (response.data.dimensions.gender === "male") {
					setMaleChecked(true);
					setFemaleChecked(false);
				}

				if (response.data.dimensions.gender === "female") {
					setFemaleChecked(true);
					setMaleChecked(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="edit-page">
			{loading && <p>Loading...</p>}

			{!loading && (
				<form onSubmit={handleSubmit} className="box">
					<div>
						<label htmlFor="feet">Feet</label>
						<input
							type="number"
							name="feet"
							value={feet}
							onChange={handleFeet}
						/>
					</div>

					<div>
						<label htmlFor="inches">Inches</label>
						<input
							type="number"
							name="inches"
							value={inches}
							onChange={handleInches}
						/>
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input type="number" name="age" value={age} onChange={handleAge} />
					</div>

					<div>
						<label htmlFor="weight">Weight</label>
						<input
							type="number"
							name="weight"
							value={weight}
							onChange={handleWeight}
						/>
					</div>

					<div>
						<label>Gender</label>
						<div className="genders">
							<div className="gender-container">
								<input
									type="radio"
									name="gender"
									value={male}
									defaultChecked={maleChecked}
									onChange={handleGender}
								/>
								<label htmlFor="gender">Male</label>
							</div>

							<div className="gender-container">
								<input
									type="radio"
									name="gender"
									value={female}
									defaultChecked={femaleChecked}
									onChange={handleGender}
								/>
								<label htmlFor="gender">Female</label>
							</div>
						</div>
					</div>

					<div>
						<select onChange={handleGoal}>
							<option value={goal} disabled selected>
								Goal
							</option>
							<option value="lose 0.5lb">Lose 0.5lb</option>
							<option value="lose 1lb">Lose 1lb</option>
							<option value="lose 2lb">Lose 2lb</option>
							<option value="maintain">Maintain</option>
							<option value="gain 0.5lb">Gain 0.5lb</option>
							<option value="gain 1lb">Gain 1lb</option>
							<option value="gain 2lb">Gain 2lb</option>
						</select>
					</div>

					<div>
						<select onChange={handleActivityLevel}>
							<option value={activityLevel} disabled selected>
								Activity level
							</option>
							<option value="sedentary">Sedentary</option>
							<option value="lightly active">Lightly active</option>
							<option value="active">Active</option>
							<option value="very active">Very Active</option>
						</select>
					</div>

					{errMessage && <p>{errMessage}</p>}

					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
}

export default EditDimensions;
