import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

// const API_URL = "http://localhost:5005";

function Details() {
	const { user } = useContext(AuthContext);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div>
			<form>
				<label>
					Name
					<input type="text" name="name" value={name} />
				</label>

				<label>
					Email
					<input type="email" name="email" value={email} />
				</label>

				<div>
					<p>Change Password</p>
					<label>
						Password
						<input type="password" name="password" value={password} />
					</label>
				</div>
			</form>
		</div>
	);
}

export default Details;
