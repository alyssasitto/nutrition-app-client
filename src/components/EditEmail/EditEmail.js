import { useState, useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditEmail(props) {
	const { user } = useContext(AuthContext);

	const [email, setEmail] = useState(user.email);
	const [errMessage, setErrMessage] = useState(null);

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
				console.log(response);
				props.setOverlay("");
				props.setEmailForm(false);
				props.setEmail(response.data.email);
				user.email = email;
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-email edit-form">
				<button className="close-btn">
					<img src="images/close.png"></img>
				</button>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={handleEmail}
					className="padding-helper"
				/>
				{errMessage && <p>{errMessage}</p>}
				<button type="submit" className="edit-btn">
					Submit
				</button>
			</form>
		</div>
	);
}

export default EditEmail;
