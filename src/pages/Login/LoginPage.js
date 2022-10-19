import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

require("../Form.css");

const API_URL = "http://localhost:5005";

function LoginPage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
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
				console.log(err);
				setErrMessage(err.response.data.message);
			});
	};

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={bg + " form-page"}>
			<img src="images/login.jpeg" className="hero"></img>
			<h1>Login</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="mb-helper">
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

				<div>
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

			<p>
				Don't have an account yet? <a href="/signup">Signup</a>
			</p>
		</div>
	);
}

export default LoginPage;
