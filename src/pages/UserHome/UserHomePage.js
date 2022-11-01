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
	const [macros, setMacros] = useState(null);
	const [loading, setLoading] = useState(true);
	const [fat, setFat] = useState(null);
	const [carbs, setCarbs] = useState(null);
	const [protein, setProtein] = useState(null);
	const [calories, setCalories] = useState(null);
	const [errMessage, setErrMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const date = new Date(localStorage.date).toDateString();

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setLoading(false);
				setDimensions(response.data.dimensions);

				return axios.get(`${API_URL}/macros`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((response) => {
				setMacros(response.data.macros);

				return axios.get(`${API_URL}/logged-macros/${date}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((response) => {
				if (response.data.macros === 0) {
					setFat(0);
					setCarbs(0);
					setProtein(0);
					setCalories(0);
				} else {
					setFat(response.data.macros.fatGrams.toFixed());
					setCarbs(response.data.macros.carbGrams.toFixed());
					setProtein(response.data.macros.proteinGrams.toFixed());
					setCalories(response.data.macros.calories.toFixed());
				}
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={bg + " user-home-page"}>
			{errMessage && <p>{errMessage}</p>}

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
						<div className="progress-container">
							{macros && (
								<div className="progress-bars">
									<div className="inner-container">
										<div className="progress-bar">
											<h2>Calories</h2>

											<div>
												<progress
													max={macros.calories}
													value={calories}
													className="bar"
												></progress>
											</div>

											<p>
												{macros.calories} /{" "}
												{calories && (
													<span className="total-logged">{calories}</span>
												)}
											</p>
										</div>
										<div className="progress-bar">
											<h2>Fat</h2>
											<div>
												<progress
													max={macros.fat}
													value={fat}
													className="bar"
												></progress>
											</div>
											<p>
												{macros.fat}g /{" "}
												{fat && <span className="total-logged">{fat}g</span>}
											</p>
										</div>
									</div>
									<div className="inner-container">
										<div className="progress-bar">
											<h2>Protein</h2>
											<div>
												<progress
													max={macros.protein}
													value={protein}
													className="bar"
												></progress>
											</div>
											<p>
												{macros.protein}g /{" "}
												{protein && (
													<span className="total-logged">{protein}g</span>
												)}
											</p>
										</div>
										<div className="progress-bar">
											<h2>Carbs</h2>
											<div>
												<progress
													max={macros.carbohydrates}
													value={carbs}
													className="bar"
												></progress>
											</div>
											<p>
												{macros.carbohydrates}g /{" "}
												{carbs && (
													<span className="total-logged">{carbs}g</span>
												)}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default UserHomePage;
