import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DimensionsContext = createContext();
const API_URL = "http://localhost:5005";

function DimensionsProviderWrapper(props) {
	const [dimensions, setDimensions] = useState({});
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const storedToken = localStorage.getItem("authToken");

	const getDimensions = () => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setDimensions(response.data.dimensions);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getDimensions();
	}, []);

	const redirect = () => {
		if (dimensions === null) {
			navigate("/home");
		} else {
			navigate("/profile");
		}
	};

	return (
		<DimensionsContext.Provider value={{ getDimensions, redirect, dimensions }}>
			{props.children}
		</DimensionsContext.Provider>
	);
}

export { DimensionsContext, DimensionsProviderWrapper };
