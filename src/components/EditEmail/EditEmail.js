import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditEmail(props) {
	const { user } = useContext(AuthContext);

	const [email, setEmail] = useState(user.email);
	const [errMessage, setErrMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { email };

		axios
			.post(`${API_URL}/edit/email`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				props.setEmail(response.data.email);
				user.email = email;
				setSuccessMessage(response.data.message);
				setErrMessage(null);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	const exit = () => {
		props.setOverlay("");
		props.setEmailForm(false);
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-email edit-form">
				<div onClick={exit} className="close-btn">
					<img src="images/close.png"></img>
				</div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={handleEmail}
					className="padding-helper mb-input"
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

export default EditEmail;
