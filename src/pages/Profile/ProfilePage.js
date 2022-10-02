import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import { DimensionsContext } from "../../context/dimensions.context";

import "./profile.css";

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	// const { getDimensions, dimensions } = useContext(DimensionsContext);
	const [dimensions, setDimensions] = useState(false);
	const [loading, setLoading] = useState(true);
	// const [feet, setFeet] = useState("");
	// const [inches, setInches] = useState("");
	// const [age, setAge] = useState("");
	// const [weight, setWeight] = useState("");
	// const [gender, setGender] = useState("");
	// const [goal, setGoal] = useState("");
	// const [activityLevel, setActivityLevel] = useState("");

	const storedToken = localStorage.getItem("authToken");

	let body = {
		feet: "",
		inches: "",
		age: "",
		weight: "",
		gender: "",
		goal: "",
		activityLevel: "",
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				body.feet = response.data.dimensions.feet;
				body.inches = response.data.dimensions.inches;
				body.age = response.data.dimensions.age;
				body.weight = response.data.dimensions.weight;
				body.gender = response.data.dimensions.gender;
				body.activityLevel = response.data.dimensions.activityLevel;
				body.goal = response.data.dimensions.goal;

				setDimensions(true);
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
					{/* <p>{inches}</p> */}
					{/* <p>{age}</p>
					<p>{weight}</p>
					<p>{gender}</p>
					<p>{goal}</p>
					<p>{activityLevel}</p> */}
				</>
			)}
		</div>
	);
}

export default ProfilePage;
