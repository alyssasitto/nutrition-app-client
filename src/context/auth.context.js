import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_URL = "http://localhost:5005";

function AuthProviderWrapper(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
		localStorage.setItem("date", new Date(Date.now()));
	};

	const authenticateUser = () => {
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			axios
				.get(`${API_URL}/verify`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const user = response.data;
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
				})
				.catch((err) => {
					setIsLoggedIn(false);
					setIsLoading(false);
					setUser(null);
				});
		} else {
			setIsLoggedIn(false);
			setIsLoading(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	const logout = () => {
		removeToken();
		authenticateUser();
		navigate("/login");
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				storeToken,
				authenticateUser,
				logout,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProviderWrapper };
