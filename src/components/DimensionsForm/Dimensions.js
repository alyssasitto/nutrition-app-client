import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Dimensions() {
	const [inches, setInches] = useState("");
	const [feet, setFeet] = useState("");
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [gender, setGender] = useState("");

	const handleInches = (e) => {
		setInches(e.target.value);
	};

	const handleFeet = (e) => {
		setFeet(e.target.value);
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
		e.preventDefault();

		const storedToken = localStorage.getItem("authToken");

		const body = {
			inches,
			feet,
			age,
			weight,
			gender,
		};

		axios
			.post(`${API_URL}/dimensions`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Height</label>
				<label>
					Inches
					<input type="number" name="inches" onChange={handleInches} />
				</label>

				<label>
					Feet
					<input type="number" name="feet" onChange={handleFeet} />
				</label>
			</div>

			<label>
				Age
				<input type="number" name="age" onChange={handleAge} />
			</label>

			<label>
				Weight
				<input type="number" name="weight" onChange={handleWeight} />
			</label>

			<div>
				<label>Gender</label>
				<label>
					Male
					<input
						type="radio"
						name="gender"
						onChange={handleGender}
						value="male"
					/>
				</label>

				<label>
					Female
					<input
						type="radio"
						name="gender"
						onChange={handleGender}
						value="female"
					/>
				</label>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
}

export default Dimensions;
