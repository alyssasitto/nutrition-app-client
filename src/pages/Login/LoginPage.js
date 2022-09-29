import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

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
		<div className={bg}>
			<p>login page</p>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						onChange={handleEmail}
						value={email}
					/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={handlePassword}
						value={password}
					/>
				</div>

				<button type="submit">Login</button>
			</form>

			{errMessage && <p>{errMessage}</p>}
		</div>
	);
}

export default LoginPage;
