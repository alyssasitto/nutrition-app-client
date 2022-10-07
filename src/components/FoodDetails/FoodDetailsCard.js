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

		// const body = {
		// 	index,
		// 	searchedFood,
		// };

		// axios
		// 	.post(`${API_URL}/food/details`, body, {
		// 		headers: { Authorization: `Bearer ${storedToken} ` },
		// 	})
		// 	.then((response) => {
		// 		setFood(response.data.foodItem.food);
		// 		setLoading(false);
		// 		console.log(response);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, []);

	return (
		<div className="box">
			<p>{props.food.name}</p>
		</div>
	);
}

export default FoodDetails;
