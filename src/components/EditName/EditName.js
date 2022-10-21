import axios from "axios";
import { AuthContext } from "../../context/auth.context";

import { useState, useEffect, useContext, useReducer } from "react";

require("../Edit.css");

const API_URL = "http://localhost:5005";

function EditName(props) {
	const { user } = useContext(AuthContext);

	const [name, setName] = useState(user.name);
	const [errMessage, setErrMessage] = useState(null);

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
				props.setOverlay("");
				props.setNameForm(false);
				props.setName(response.data.name);
				user.name = name;
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box edit-name edit-form">
				<button className="close-btn">
					<img src="images/close.png"></img>
				</button>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={handleName}
					className="padding-helper mb-input"
				/>

				{errMessage && <p className="edit-err-message">{errMessage}</p>}

				<button type="submit" className="edit-btn padding-helper submit-edit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default EditName;
