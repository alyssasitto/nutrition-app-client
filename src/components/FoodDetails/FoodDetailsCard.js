import { useState, useEffect } from "react";
import axios from "axios";

import "./FoodDetails.css";
import "../Edit.css";

const API_URL = "http://localhost:5005";

function FoodDetails(props) {
	const storedToken = localStorage.getItem("authToken");

	const [food, setFood] = useState(null);

	const exit = () => {
		props.setOverlay("");
		props.setFoodDetailsCard(false);
	};

	useEffect(() => {
		// const food = props.food;
		// const searchedFood = props.searchedFood;

		console.log(props);
	}, []);

	return (
		<div className="box food-details-card">
			<div onClick={exit} className="close-btn">
				<img src="images/close.png"></img>
			</div>
			<h1>{props.food.name}</h1>

			<p className="cals">{props.food.calories.toFixed()} KCAL</p>

			<div className="macro-types">
				<div className="macro">
					<h3>Carbs</h3>
					<img
						src="images/carbs.jpeg"
						className="bread-img"
						alt="Illustration of a loaf of bread."
					></img>
					{props.food.carbs >= 0 && <p>{props.food.carbs.toFixed()}g</p>}
					{props.food.carbs === undefined && <p>0g</p>}
				</div>
				<div className="macro">
					<h3>Protein</h3>
					<img
						src="images/protein.jpeg"
						className="steak-img"
						alt="Illustration of a raw steak."
					></img>
					{props.food.protein >= 0 && <p>{props.food.protein.toFixed()}g</p>}
					{props.food.protein === undefined && <p>0g</p>}
				</div>
				<div className="macro">
					<h3>Fat</h3>
					<img
						src="images/fat.jpeg"
						className="avocado-img"
						alt="Illustration of an avocado cut in half."
					></img>
					{props.food.fat >= 0 && <p>{props.food.fat.toFixed()}g</p>}
					{props.food.fat === undefined && <p>0g</p>}
				</div>
			</div>

			<button
				onClick={() => {
					props.addFood(
						props.food.name,
						props.food.calories,
						props.food.fat,
						props.food.protein,
						props.food.carbs
					);

					props.setOverlay("");
					props.setFoodDetailsCard(false);
				}}
			>
				Add food
			</button>
		</div>
	);
}

export default FoodDetails;
