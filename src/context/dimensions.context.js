import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DimensionsContext = createContext();
const API_URL = "http://localhost:5005";

function DimensionsProviderWrapper(props) {
	const [dimensions, setDimensions] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const storedToken = localStorage.getItem("authToken");

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setDimensions(response.data.dimensions);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const redirect = () => {
		if (dimensions === null) {
			navigate("/home");
		} else {
			navigate("/profile");
		}
	};

	return (
		<DimensionsContext.Provider value={{ dimensions, redirect }}>
			{props.children}
		</DimensionsContext.Provider>
	);
}

export { DimensionsContext, DimensionsProviderWrapper };
