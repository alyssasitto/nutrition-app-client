import { useContext, useEffect, useState } from "react";
import axios from "axios";

require("../Form.css");

const API_URL = process.env.REACT_APP_API_URL;

function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);
	const [errMessage, setErrMessage] = useState(null);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			name,
			email,
			password,
		};

		axios
			.post(`${API_URL}/signup`, body)
			.then(() => {
				setSuccessMessage(true);
				setErrMessage(null);
				setName("");
				setEmail("");
				setPassword("");
			})
			.catch((err) => {
				setSuccessMessage(false);
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className={"form-page signup-page"}>
			<img src="images/signup.png" className="hero"></img>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="mb-helper form-input">
					<label htmlFor="name">Name</label>

					<div className="input-container">
						<img src="images/user.png" className="input-icon"></img>
						<input type="text" name="name" onChange={handleName} value={name} />
					</div>
				</div>

				<div className="mb-helper form-input">
					<label htmlFor="email">Email</label>

					<div className="input-container">
						<img src="images/email.png" className="input-icon"></img>
						<input
							type="text"
							name="email"
							onChange={handleEmail}
							value={email}
						/>
					</div>
				</div>

				<div className="form-input">
					<label htmlFor="password" className="password-container">
						Password
					</label>
					<div className="input-container">
						<img src="images/lock.png" className="input-icon"></img>
						<input
							type="password"
							name="password"
							onChange={handlePassword}
							value={password}
						/>
					</div>
				</div>

				<div className="messages-container">
					{successMessage && (
						<p className="success-message">
							Account created please <a href="/login">login</a>
						</p>
					)}
					{errMessage && <p className="err-message">{errMessage}</p>}
				</div>

				<button type="submit" className="submit-btn">
					Signup
				</button>
			</form>

			<p className="question">
				Have an account already? <a href="/login">Login </a>
			</p>
		</div>
	);
}

export default SignupPage;
