import { AuthContext } from "../../context/auth.context";

import { useState, useEffect, useContext, useReducer } from "react";

import axios from "axios";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditPassword(props) {
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [errMessage, setErrMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [requirements, setRequirements] = useState("");

	const storedToken = localStorage.getItem("authToken");

	const handleNewPassword = (e) => {
		setNewPassword(e.target.value);
	};

	const handleConfirmNewPassword = (e) => {
		setConfirmNewPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { newPassword, confirmNewPassword };

		axios
			.post(`${API_URL}/edit/password`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setSuccessMessage(response.data.message);
				setErrMessage(null);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	const exit = () => {
		props.setOverlay("");
		props.setPasswordForm(false);
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-password edit-form">
				<div onClick={exit} className="close-btn">
					<img src="images/close.png"></img>
				</div>

				<label htmlFor="new-password" className="password-container">
					New password
				</label>
				<input
					type="password"
					name="new-password"
					value={newPassword}
					onChange={handleNewPassword}
					className="mb-helper padding-helper"
				/>
				<label htmlFor="confirm-password">Confirm new password</label>
				<input
					type="password"
					name="confirm-password"
					value={confirmNewPassword}
					onChange={handleConfirmNewPassword}
					className="mb-input padding-helper"
				/>

				{errMessage && <p className="message edit-err-message">{errMessage}</p>}
				{successMessage && (
					<p className="message success-message">{successMessage}</p>
				)}

				<button type="submit" className="edit-btn submit-edit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default EditPassword;
