import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";

import "./profile.css";

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	const [loading, setLoading] = useState(true);
	const [dimensions, setDimensions] = useState(null);
	const { user } = useContext(AuthContext);

	const storedToken = localStorage.getItem("authToken");

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setLoading(false);
				setDimensions(response.data.dimensions);

				console.log(dimensions);
			})
			.catch((err) => {
				console.log(err);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={bg}>
			{loading && <p>Loading...</p>}

			{!loading && <p>profile</p>}
		</div>
	);
}

export default ProfilePage;
