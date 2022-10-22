import { useState, useContext, useEffect } from "react";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import Dimensions from "../../components/DimensionsForm/Dimensions";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

require("./UserHome.css");

const API_URL = "http://localhost:5005";

function UserHomePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	const { user } = useContext(AuthContext);
	const [dimensions, setDimensions] = useState(null);
	const [macros, setMacros] = useState(null);
	const [loading, setLoading] = useState(true);
	const [fat, setFat] = useState(null);
	const [carbs, setCarbs] = useState(null);
	const [protein, setProtein] = useState(null);
	const [calories, setCalories] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const date = new Date(localStorage.date).toDateString();

	useEffect(() => {
		axios
			.get(`${API_URL}/dimensions`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response);
				setLoading(false);
				setDimensions(response.data.dimensions);

				return axios.get(`${API_URL}/macros`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((response) => {
				console.log("MACROS RESPONSE", response);
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
					console.log("ewjfnijnfeowe", response);
					setFat(response.data.macros.fatGrams.toFixed());
					setCarbs(response.data.macros.carbGrams.toFixed());
					setProtein(response.data.macros.proteinGrams.toFixed());
					setCalories(response.data.macros.calories.toFixed());
				}
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
						<div>
							{macros && (
								<div className="progress-bars">
									<div>
										<p>calories</p>
										<progress
											max={macros.calories}
											value={calories}
											className="bar"
										></progress>
										<p>
											{macros.calories} / {calories && <span>{calories}</span>}
										</p>
									</div>
									<div>
										<p>fat</p>
										<progress
											max={macros.fat}
											value={fat}
											className="bar"
										></progress>
										<p>
											{macros.fat} / {fat && <span>{fat}</span>}
										</p>
									</div>
									<div>
										<p>protein</p>
										<progress
											max={macros.protein}
											value={protein}
											className="bar"
										></progress>
										<p>
											{macros.protein} / {protein && <span>{protein}</span>}
										</p>
									</div>
									<div>
										<p>carbs</p>
										<progress
											max={macros.carbohydrates}
											value={carbs}
											className="bar"
										></progress>
										<p>
											{macros.carbohydrates} / {carbs && <span>{carbs}</span>}
										</p>
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
