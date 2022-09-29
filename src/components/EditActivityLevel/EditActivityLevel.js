import { useState, useEffect } from "react";
import axios from "axios";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditActivityLevel(props) {
	const [activityLevel, setActivityLevel] = useState("");
	const [errMessage, setErrMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const handleActivityLevel = (e) => {
		setActivityLevel(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { activityLevel };

		axios
			.post(`${API_URL}/edit/activity-level`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => {
				props.setActivityLevel(activityLevel);
				props.setActivityLevelForm(false);
				props.setOverlay("");
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box">
				<select onChange={handleActivityLevel}>
					<option disabled>Activity level</option>
					<option value="not-active">Not active</option>
					<option value="lightly-active">Lightly active</option>
					<option value="active">Active</option>
					<option value="very-active">Very Active</option>
				</select>

				<button type="submit">Change</button>

				{errMessage && <p>{errMessage}</p>}
			</form>
		</div>
	);
}

export default EditActivityLevel;
