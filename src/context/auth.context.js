import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_URL = "http://localhost:5005";

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	const authenticateUser = () => {
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			axios
				.get(`${API_URL}/verify`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					console.log("THIS IS THE RESPONSE", response);
					const user = response.data;
					setIsLoggedIn(true);
					setUser(user);
				})
				.catch((err) => {
					console.log(err);
					setIsLoggedIn(false);
					setUser(null);
				});
		} else {
			setIsLoggedIn(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	const logout = () => {
		removeToken();
		authenticateUser();
		navigate("/");
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, user, storeToken, authenticateUser, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProviderWrapper };
