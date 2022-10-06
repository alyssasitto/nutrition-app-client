import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import { DimensionsContext } from "../../context/dimensions.context";

import EditName from "../../components/EditName/EditName";
import EditEmail from "../../components/EditEmail/EditEmail";
import EditPassword from "../../components/EditPassword/EditPassword";
import EditDimensions from "../../components/EditDimensions/EditDimensions";
import EditGoal from "../../components/EditGoal/EditGoal";
import EditActivityLevel from "../../components/EditActivityLevel/EditActivityLevel";

import axios from "axios";

require("./settings.css");

const API_URL = "http://localhost:5005";

function SettingsPage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	const { user, authenticateUser } = useContext(AuthContext);

	const { getDimensions } = useContext(DimensionsContext);

	const [loading, setLoading] = useState(true);

	const [overlay, setOverlay] = useState("");
	const [nameForm, setNameForm] = useState(false);
	const [emailForm, setEmailForm] = useState(false);
	const [passwordForm, setPasswordForm] = useState(false);
	const [dimensionsForm, setDimensionsForm] = useState(false);
	// const [goalForm, setGoalForm] = useState(false);
	// const [activityLevelForm, setActivityLevelForm] = useState(false);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);

	const [feet, setFeet] = useState(null);
	const [inches, setInches] = useState(null);
	const [age, setAge] = useState(null);
	const [weight, setWeight] = useState(null);
	const [gender, setGender] = useState(null);
	const [goal, setGoal] = useState(null);
	const [activityLevel, setActivityLevel] = useState(null);

	const [chosenActivityLevel, setChosenActivityLevel] = useState("");

	const [female, setFemale] = useState("female");
	const [male, setMale] = useState("male");

	const [femaleChecked, setCheckedFemale] = useState("");
	const [maleChecked, setMaleChecked] = useState("");

	const storedToken = localStorage.getItem("authToken");

	const editName = () => {
		setOverlay("overlay");
		setNameForm(true);
	};

	const editEmail = () => {
		setOverlay("overlay");
		setEmailForm(true);
	};

	const editPassword = () => {
		setOverlay("overlay");
		setPasswordForm(true);
	};

	const editDimensions = () => {
		setOverlay("overlay");
		setDimensionsForm(true);
	};

	const exit = () => {
		setOverlay("");
		setNameForm(false);
		setEmailForm(false);
		setPasswordForm(false);
		setDimensionsForm(false);
		// setGoalForm(false);
		// setActivityLevelForm(false);
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken} ` },
			})
			.then((response) => {
				setFeet(response.data.dimensions.feet);
				setInches(response.data.dimensions.inches);
				setAge(response.data.dimensions.age);
				setWeight(response.data.dimensions.weight);
				setGender(response.data.dimensions.gender);
				setGoal(response.data.dimensions.goal);
				setActivityLevel(response.data.dimensions.activityLevel);

				if (response.data.dimensions.gender === "male") {
					setMaleChecked("checked");
					setCheckedFemale("");
				}

				if (response.data.dimensions.gender === "female") {
					setCheckedFemale("checked");
					setMaleChecked("");
				}

				// getDimensions();

				console.log(inches, feet, age, weight, gender, goal, activityLevel);

				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, [gender]);

	return (
		<div className={bg}>
			<div onClick={exit} className={overlay}></div>
			{nameForm && (
				<EditName
					setOverlay={setOverlay}
					setNameForm={setNameForm}
					setName={setName}
				/>
			)}
			{emailForm && (
				<EditEmail
					setOverlay={setOverlay}
					setEmailForm={setEmailForm}
					setEmail={setEmail}
				/>
			)}
			{passwordForm && (
				<EditPassword
					setOverlay={setOverlay}
					setPasswordForm={setPasswordForm}
				/>
			)}
			{dimensionsForm && (
				<EditDimensions
					setOverlay={setOverlay}
					setDimensionsForm={setDimensionsForm}
					setFeet={setFeet}
					setInches={setInches}
					setAge={setAge}
					setWeight={setWeight}
					setGender={setGender}
					setGoal={setGoal}
					setActivityLevel={setActivityLevel}
				/>
			)}

			{loading && (
				<>
					<p>loading....</p>
				</>
			)}

			{!loading && (
				<div>
					<div className="account-info">
						<h2>Account Information</h2>
						<div className="container">
							<div>
								<label htmlFor="name">Name</label>
								<input type="text" name="name" value={name} disabled />
							</div>

							<button onClick={editName}>Edit</button>
						</div>

						<div className="container">
							<div>
								<label htmlFor="email">Email</label>
								<input type="email" name="email" value={email} disabled />
							</div>

							<button onClick={editEmail}>Edit</button>
						</div>

						<div className="container">
							<div>
								<label htmlFor="password">Password</label>
								<input type="password" name="password" disabled />
							</div>

							<button onClick={editPassword}>Edit</button>
						</div>
					</div>

					<div>
						<h2>Dimensions</h2>

						<div>
							<label htmlFor="feet">Feet</label>
							<input type="number" name="feet" value={feet} disabled />
						</div>

						<div>
							<label htmlFor="inches">Inches </label>
							<input type="number" name="inches" value={inches} disabled />
						</div>

						<div>
							<label htmlFor="age">Age</label>
							<input type="number" name="age" value={age} disabled />
						</div>

						<div>
							<label htmlFor="weight">Weight</label>
							<input type="number" value={weight} disabled />
						</div>

						<label>
							Male
							<input
								type="radio"
								name="male"
								value={male}
								checked={maleChecked}
								disabled
							/>
						</label>

						<label>
							Female
							<input
								type="radio"
								name="female"
								value={female}
								checked={femaleChecked}
								disabled
							/>
						</label>

						<div>
							<h2>Goal</h2>
							<select disabled>
								<option disabled selected>
									{goal}
								</option>
							</select>
						</div>

						<div>
							<h2>Activity Level</h2>
							<select disabled>
								<option disabled selected>
									{activityLevel}
								</option>
							</select>
						</div>

						<button onClick={editDimensions}>Edit</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SettingsPage;
