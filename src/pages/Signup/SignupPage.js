import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../context/navbar.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
				console.log(response.data);
			})
			.catch((err) => {
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
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" onChange={handleName} value={name} />
				</div>

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

				<button type="submit">Signup</button>
			</form>

			{errMessage && <p>{errMessage}</p>}
		</div>
	);
}

export default SignupPage;
