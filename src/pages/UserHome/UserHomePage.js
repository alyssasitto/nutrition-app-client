import { useState, useContext, useEffect } from "react";
import { NavbarContext } from "../../context/navbar.context";
import Dimensions from "../../components/DimensionsForm/Dimensions";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

require("./UserHome.css");

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
					<img
						src="images/loading.gif"
						className="loading-icon"
						alt="loading icon"
					></img>
				</>
			)}

			{!loading && (
				<div>
					{!dimensions && (
						<div>
							<Carousel className="carousel">
								<div className="carousel-items">
									<h1>Welcome</h1>
									<img
										src="images/home-hero.jpeg"
										className="user-home-hero"
										alt="Illustration of three people putting fruit into a bowl."
									></img>
								</div>
								<Dimensions setDimensions={setDimensions} />
							</Carousel>
						</div>
					)}

					{dimensions && (
						<>
							<p>yaya</p>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default UserHomePage;
