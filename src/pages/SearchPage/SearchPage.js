import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { NavbarContext } from "../../context/navbar.context";
import "./SearchPage.css";
import FoodDetails from "../../components/FoodDetails/FoodDetailsCard";

const API_URL = "http://localhost:5005";

function SearchPage() {
	const { user } = useContext(AuthContext);
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const [searchedFood, setSearchedFood] = useState("");
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [overlay, setOverlay] = useState("");
	const [foodDetailsCard, setFoodDetailsCard] = useState(false);

	const [food, setFood] = useState(null);

	const location = useLocation();

	const navigate = useNavigate();

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
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
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

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	console.log(location.state.foodType);
	console.log(location.state.date);

	return (
		<div className={bg}>
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
					);
				})}
		</div>
	);
}

export default SearchPage;
