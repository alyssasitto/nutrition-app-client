import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SearchPage() {
	const [searchedFood, setSearchedFood] = useState("");
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);

	const location = useLocation();

	const navigate = useNavigate();

	const storedToken = localStorage.getItem("authToken");

	const handleSearch = (e) => {
		setSearchedFood(e.target.value);
	};

	const viewDetails = () => {
		navigate("/food-details", { state: { food: searchedFood } });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		axios
			.get(`${API_URL}/food/${searchedFood}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setFoodList(response.data.foodArray);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="search" onChange={handleSearch} />
				<button type="submit">Search</button>
			</form>

			{loading && <p>loading...</p>}

			{foodList !== [] &&
				foodList.map((element, index) => {
					return (
						<div key={index}>
							<p>{element.food.label}</p>
							<p>{Number(element.food.nutrients.ENERC_KCAL).toFixed()}</p>
							<button>Add food</button>
							<button onClick={() => viewDetails()}>Details</button>
						</div>
					);
				})}
		</div>
	);
}

export default SearchPage;
