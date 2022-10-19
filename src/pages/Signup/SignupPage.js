import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../context/navbar.context";
import axios from "axios";

require("../Form.css");

const API_URL = "http://localhost:5005";

function SignupPage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

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
			.then((response) => {
				setSuccessMessage(true);
				setErrMessage(null);
				setName("");
				setEmail("");
				setPassword("");
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
				setSuccessMessage(false);
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
			<img src="images/signup.jpeg" className="hero"></img>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="mb-helper">
					<label htmlFor="name">Name</label>

					<div className="input-container">
						<img src="images/user.png" className="input-icon"></img>
						<input type="text" name="name" onChange={handleName} value={name} />
					</div>
				</div>

				<div className="mb-helper">
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

				<div>
					<label htmlFor="password">Password</label>
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

				{successMessage && (
					<p className="success-message">
						Account created please <a href="/login">login</a>
					</p>
				)}
				{errMessage && (
					<div className="message-container">
						{errMessage.map((item) => {
							return <p className="err-message">{item}</p>;
						})}
					</div>
				)}

				<button type="submit" className="submit-btn">
					Signup
				</button>
			</form>

			<p>
				Have an account already? <a href="/login">Login </a>
			</p>
		</div>
	);
}

export default SignupPage;
