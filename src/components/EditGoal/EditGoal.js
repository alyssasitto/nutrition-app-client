import { useState } from "react";
import axios from "axios";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditGoal(props) {
	const [goal, setGoal] = useState("");
	const [errMessage, setErrMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const handleGoal = (e) => {
		setGoal(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { goal };

		axios
			.post(`${API_URL}/edit/goal`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				props.setGoal(goal);
				props.setOverlay("");
				props.setGoalForm(false);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box">
				<select onChange={handleGoal} className="custom-menu">
					<option disabled selected>
						Goal
					</option>
					<option value="lose-0.5lb">Lose 0.5lb</option>
					<option value="lose-1lb">Lose 1lb</option>
					<option value="lose-2lb">Lose 2lb</option>
					<option value="maintain">Maintain</option>
					<option value="gain-0.5lb">Gain 0.5lb</option>
					<option value="gain-1lb">Gain 1lb</option>
					<option value="gain-2lb">Gain 2lb</option>
				</select>

				{errMessage && <p>{errMessage}</p>}

				<button type="submit">Change</button>
			</form>
		</div>
	);
}

export default EditGoal;
