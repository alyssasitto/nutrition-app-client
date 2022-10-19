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
			})
			.catch((err) => {
				console.log(err);
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-password">
				<label htmlFor="new-password">New password</label>
				<input
					type="password"
					name="new-password"
					value={newPassword}
					onChange={handleNewPassword}
				/>
				<label htmlFor="confirm-password">Confirm new password</label>
				<input
					type="password"
					name="confirm-password"
					value={confirmNewPassword}
					onChange={handleConfirmNewPassword}
				/>

				{errMessage &&
					errMessage.map((item) => {
						return <p className="message">{item}</p>;
					})}
				{successMessage && <p>{successMessage}</p>}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default EditPassword;
