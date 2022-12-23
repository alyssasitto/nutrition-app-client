import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

require("../Form.css");

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
	const { storeToken, authenticateUser, user } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState(null);

	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const redirect = () => {
		const storedToken = localStorage.getItem("authToken");

		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				if (response.data.dimensions === null) {
					navigate("/home");
				} else {
					navigate("/profile");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			email,
			password,
		};

		axios
			.post(`${API_URL}/login`, body)
			.then((response) => {
				storeToken(response.data.accessToken);
				authenticateUser();

				redirect();
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className={"form-page"}>
			<div className="style-box"></div>

			<img src="images/login.png" className="hero"></img>

			<h1>Login</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="mb-helper form-input">
					<label htmlFor="email" className="form-label">
						Email
					</label>

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
					<label htmlFor="password" className="form-label">
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

				<div className="message-container">
					{errMessage && <p className="err-message">{errMessage}</p>}
				</div>

				<button type="submit" className="submit-btn">
					Login
				</button>
			</form>
			<p className="question">
				Don't have an account yet? <a href="/signup">Signup</a>
			</p>
		</div>
	);
}

export default LoginPage;
