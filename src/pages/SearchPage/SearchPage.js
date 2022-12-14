import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./SearchPage.css";
import FoodDetails from "../../components/FoodDetails/FoodDetailsCard";

require("./SearchPage.css");

const API_URL = process.env.REACT_APP_API_URL;

function SearchPage() {
	const { user } = useContext(AuthContext);

	const [searchedFood, setSearchedFood] = useState("");
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [overlay, setOverlay] = useState("");
	const [foodDetailsCard, setFoodDetailsCard] = useState(false);
	const [foodContainer, setFoodContainer] = useState("");
	const [image, setImage] = useState(true);
	const [errMessage, setErrMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const [showMessage, setShowMessage] = useState("hide");

	const [food, setFood] = useState(null);

	const location = useLocation();

	const storedToken = localStorage.getItem("authToken");

	const handleSearch = (e) => {
		setSearchedFood(e.target.value);
	};

	const viewDetails = (name, calories, fat, protein, carbs) => {
		setOverlay("overlay");
		setFoodDetailsCard(true);

		const obj = {
			name,
			calories,
			fat,
			protein,
			carbs,
		};

		setFood(obj);
	};

	const exit = () => {
		setOverlay("");
		setFoodDetailsCard(false);
	};

	const addFood = (name, calories, fat, protein, carbs) => {
		const body = {
			id: user.id,
			date: location.state.date,
			foodType: location.state.foodType,
			food: {
				name: name,
				calories: calories,
				fat: fat,
				protein: protein,
				carbs: carbs,
			},
		};

		axios
			.post(`${API_URL}/add-food`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setSuccessMessage(response.data.message);
				setShowMessage("show-message");
				setTimeout(() => {
					setShowMessage("hide");
				}, 1000);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setFoodContainer("");

		if (searchedFood === "") {
			setErrMessage("please enter a valid search");
		} else {
			setErrMessage(null);
			setLoading(true);
			setImage(false);

			axios
				.get(`${API_URL}/search/${searchedFood}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					setFoodContainer("show-container");
					setFoodList(response.data.foodArray);
					setLoading(false);
				})
				.catch((err) => {
					setErrMessage(err.response.data.message);
				});
		}
	};

	return (
		<div className={"search-page"}>
			<div onClick={exit} className={overlay}></div>
			{foodDetailsCard && (
				<FoodDetails
					food={food}
					searchedFood={searchedFood}
					addFood={addFood}
					setOverlay={setOverlay}
					setFoodDetailsCard={setFoodDetailsCard}
				/>
			)}

			<div className="search-container">
				<form onSubmit={handleSubmit}>
					<div className="input-container">
						<input
							type="text"
							placeholder="Search"
							onChange={handleSearch}
							value={searchedFood}
						/>
						<img src="images/search.png" className="search"></img>
					</div>
					<button type="submit">Search</button>
				</form>

				{errMessage && <p>{errMessage}</p>}
			</div>

			{image && (
				<img
					src="images/nutrition.png"
					className="search-hero"
					alt="Illustration of man looking at nutrition label."
				></img>
			)}

			{loading && (
				<img
					src="images/loading.gif"
					className="loading-icon"
					alt="loading icon"
				></img>
			)}

			{successMessage && (
				<p className={"message success-message search-message " + showMessage}>
					{successMessage}
				</p>
			)}

			{foodList !== [] && (
				<div className={"sp-food-container " + foodContainer}>
					{foodList.map((element, index) => {
						return (
							<div key={index} className="food-row">
								<div className="food-row-title">
									<p className="food-name">{element.food.label}</p>
									<p>
										{Number(element.food.nutrients.ENERC_KCAL).toFixed()} KCAL
									</p>
								</div>
								<div className="food-row-btns">
									<button
										onClick={() =>
											addFood(
												element.food.label,
												element.food.nutrients.ENERC_KCAL,
												element.food.nutrients.FAT,
												element.food.nutrients.PROCNT,
												element.food.nutrients.CHOCDF
											)
										}
									>
										Add food
									</button>
									<button
										onClick={() => {
											viewDetails(
												element.food.label,

												element.food.nutrients.ENERC_KCAL,
												element.food.nutrients.FAT,
												element.food.nutrients.PROCNT,
												element.food.nutrients.CHOCDF
											);
										}}
									>
										Details
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default SearchPage;
