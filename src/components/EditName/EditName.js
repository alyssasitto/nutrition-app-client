import axios from "axios";
import { AuthContext } from "../../context/auth.context";

import { useState, useEffect, useContext, useReducer } from "react";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditName(props) {
	const { user } = useContext(AuthContext);

	const [name, setName] = useState(user.name);
	const [errMessage, setErrMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { name };

		axios
			.post(`${API_URL}/edit/name`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				props.setName(response.data.name);
				user.name = name;
				setSuccessMessage(response.data.message);
				setErrMessage(null);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	const exit = () => {
		props.setOverlay("");
		props.setNameForm(false);
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-name edit-form">
				<div onClick={exit} className="close-btn">
					<img src="images/close.png"></img>
				</div>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={handleName}
					className="padding-helper mb-input"
				/>

				{errMessage && <p className="message edit-err-message">{errMessage}</p>}
				{successMessage && (
					<p className="message success-message">{successMessage}</p>
				)}

				<button type="submit" className="edit-btn padding-helper submit-edit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default EditName;
