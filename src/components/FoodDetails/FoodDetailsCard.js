import { useState, useEffect } from "react";
import axios from "axios";

import "./FoodDetails.css";
import "../Edit.css";

const API_URL = "http://localhost:5005";

function FoodDetails(props) {
	console.log("YEAAA", props.index);

	const storedToken = localStorage.getItem("authToken");

	const [loading, setLoading] = useState(true);
	const [food, setFood] = useState(null);

	useEffect(() => {
		const index = props.index;
		const searchedFood = props.searchedFood;

		const body = {
			index,
			searchedFood,
		};

		axios
			.post(`${API_URL}/food/details`, body, {
				headers: { Authorization: `Bearer ${storedToken} ` },
			})
			.then((response) => {
				setFood(response.data.foodItem.food);
				setLoading(false);
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="box">
			{loading && <p>loading...</p>}

			{food && (
				<div>
					<p>{food.label}</p>
				</div>
			)}
		</div>
	);
}

export default FoodDetails;
