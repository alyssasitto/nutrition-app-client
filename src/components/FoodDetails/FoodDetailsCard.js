import { useState, useEffect } from "react";
import axios from "axios";

import "./FoodDetails.css";
import "../Edit.css";

const API_URL = "http://localhost:5005";

function FoodDetails(props) {
	const storedToken = localStorage.getItem("authToken");

	const [food, setFood] = useState(null);

	useEffect(() => {
		// const food = props.food;
		// const searchedFood = props.searchedFood;

		console.log(props);
	}, []);

	console.log(props.food.fat.toFixed());

	return (
		<div className="box food-details-card">
			<p>{props.food.name}</p>
			<p>{props.food.calories}</p>
			<p>{props.food.fat.toFixed()}</p>
			<p>{props.food.protein.toFixed()}</p>
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
