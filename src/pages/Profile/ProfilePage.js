import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";
import { DimensionsContext } from "../../context/dimensions.context";

import SearchPage from "../SearchPage/SearchPage";
import Calendar from "react-calendar";
import CustomFood from "../../components/CustomFood/CustomFood";
import { ErrorBoundary } from "react-error-boundary";

import { useNavigate, useNavigation } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

import "./profile.css";

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { user } = useContext(AuthContext);
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const [food, setFood] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dropdown, setDropdown] = useState("hide");
	const [showDropdown, setShowDropdown] = useState(false);
	const [loggedFoods, setLoggedFoods] = useState(null);

	const [calender, setCalender] = useState("hide");
	const [overlay, setOverLay] = useState("");
	const [customFoodForm, setCustomFoodForm] = useState(false);
	const [meal, setMeal] = useState("");
	const [calories, setCalories] = useState(null);
	const [totalCalories, setTotalCalories] = useState(0);
	const [remainingCalories, setRemainingCalories] = useState(0);
	const [loggedFoodsCopy, setLoggedFoodsCopy] = useState(loggedFoods);

	// const [breakfastCals, setBreakfastCals] = useState(0);
	// const [lunchCals, setLunchCals] = useState(0);
	// const [dinnerCals, setDinnerCals] = useState(0);

	const [date, setDate] = useState(new Date(Date.now()));

	const onChange = (date) => {
		setDate(date);
	};

	const handleCalender = () => {
		if (calender === "hide") {
			setCalender("show");
		}

		if (calender === "show") {
			setCalender("hide");
		}
	};

	const exit = () => {
		setOverLay("");
		setCustomFoodForm(false);
	};

	const storedToken = localStorage.getItem("authToken");

	const dateString = date.toDateString();

	const navigate = useNavigate();

	const searchBreakfast = () => {
		navigate("/search", { state: { foodType: "breakfast", date: dateString } });
	};

	const searchLunch = () => {
		navigate("/search", { state: { foodType: "lunch", date: dateString } });
	};

	const searchDinner = () => {
		navigate("/search", { state: { foodType: "dinner", date: dateString } });
	};

	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role="alert">
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	const addCustomFood = (e) => {
		setCustomFoodForm(true);
		setOverLay("overlay");

		setMeal(e.target.value);
	};

	const deleteFood = (food, foodType, index) => {
		const body = {
			id: user.id,
			food: food,
			foodType: foodType,
			date: dateString,
			index: index,
		};

		axios
			.post(`${API_URL}/delete-food`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response);

				setLoggedFoodsCopy(response.data.logDay);

				setLoggedFoods(response.data.logDay);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const body = {
			id: user.id,
			date: dateString,
		};

		axios
			.post(`${API_URL}/day`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log("THIS IS THE RESPONSE", response);

				let breakfastCals = 0;
				let lunchCals = 0;
				let dinnerCals = 0;

				if (response.data.logDay !== null) {
					let breakfast = response.data.logDay.breakfast;
					let lunch = response.data.logDay.lunch;
					let dinner = response.data.logDay.dinner;

					if (breakfast.length !== 0) {
						breakfast.map((el, index) => {
							breakfastCals += el.calories;
						});
					}

					if (lunch.length !== 0) {
						lunch.map((el, index) => {
							lunchCals += el.calories;
						});
					}

					if (dinner.length !== 0) {
						dinner.map((el, index) => {
							dinnerCals += el.calories;
						});
					}
				}

				setTotalCalories(breakfastCals + lunchCals + dinnerCals);

				console.log(breakfastCals);

				setLoggedFoods(response.data.logDay);

				setLoading(false);

				return axios.get(`${API_URL}/macros`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
			})
			.then((response) => {
				if (response.data.macros.calories === null) {
					setCalories(0);
				} else {
					setCalories(response.data.macros.calories);
					setRemainingCalories(response.data.macros.calories);
				}
			})
			.catch((err) => {
				console.log(err);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, [date, loggedFoodsCopy]);

	console.log("REMAINING CALS", remainingCalories);

	console.log(loggedFoods);
	console.log("this is the date", date);

	return (
		<div className={bg}>
			<div onClick={exit} className={overlay}></div>

			{customFoodForm && (
				<CustomFood
					setCustomFoodForm={setCustomFoodForm}
					setOverLay={setOverLay}
					meal={meal}
					date={dateString}
					setLoggedFoodsCopy={setLoggedFoodsCopy}
				/>
			)}

			<h2>{dateString}</h2>

			<h3>these are the alotted calories {calories}</h3>
			<h3>these are the calories eaten {totalCalories}</h3>

			<h2>
				{calories} - {totalCalories} = {remainingCalories}
			</h2>

			{loading && <p>Loading...</p>}

			{!loading && (
				<>
					<div>
						<img
							src="images/calendar.svg"
							onClick={handleCalender}
							className="icon"
						></img>

						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => {
								<ProfilePage />;
							}}
						>
							<Calendar onChange={onChange} value={date} className={calender} />
						</ErrorBoundary>
					</div>

					<div className="meals">
						<div>
							<h2>Breakfast</h2>
							<button onClick={searchBreakfast}>add breakfast</button>
							<button onClick={addCustomFood} value="breakfast">
								Custom
							</button>

							{loggedFoods && loggedFoods.breakfast !== [] && (
								<>
									{loggedFoods.breakfast.map((el, index) => {
										return (
											<div className="food-container">
												<p>{el.name}</p>
												<button
													onClick={() =>
														deleteFood(el.name, "breakfast", index)
													}
												>
													delete
												</button>
											</div>
										);
									})}
								</>
							)}
						</div>

						<div>
							<h2>Lunch</h2>
							<button onClick={searchLunch}>add lunch</button>
							<button onClick={addCustomFood} value="lunch">
								Custom
							</button>

							{loggedFoods && loggedFoods.lunch !== [] && (
								<>
									{loggedFoods.lunch.map((el, index) => {
										console.log(el.name);
										return (
											<div className="food-container">
												<p>{el.name}</p>
												<button
													onClick={() => deleteFood(el.name, "lunch", index)}
												>
													delete
												</button>
											</div>
										);
									})}
								</>
							)}
						</div>

						<div>
							<h2>Dinner</h2>

							<button onClick={searchDinner}>add dinner</button>
							<button onClick={addCustomFood} value="dinner">
								Custom
							</button>
							{loggedFoods && loggedFoods.dinner !== [] && (
								<>
									{loggedFoods.dinner.map((el, index) => {
										console.log(el.name);
										return (
											<div className="food-container">
												<p>{el.name}</p>
												<button
													onClick={() => deleteFood(el.name, "dinner", index)}
												>
													delete
												</button>
											</div>
										);
									})}
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ProfilePage;
