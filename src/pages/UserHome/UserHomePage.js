import { useState, useContext, useEffect } from "react";
import { NavbarContext } from "../../context/navbar.context";
import Dimensions from "../../components/DimensionsForm/Dimensions";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

const API_URL = "http://localhost:5005";

function UserHomePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	const [dimensions, setDimensions] = useState(null);
	const [loading, setLoading] = useState(true);

	const storedToken = localStorage.getItem("authToken");

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setLoading(false);
				setDimensions(response.data.dimensions);
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
			{loading && (
				<>
					<p>loading....</p>
				</>
			)}

			{!loading && (
				<>
					{!dimensions && (
						<>
							<Carousel>
								<p>welcome</p>
								<Dimensions setDimensions={setDimensions} />
							</Carousel>
						</>
					)}

					{dimensions && (
						<>
							<p>yaya</p>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default UserHomePage;
