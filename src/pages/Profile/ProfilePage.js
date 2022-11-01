import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";

import Calendar from "react-calendar";
import CustomFood from "../../components/CustomFood/CustomFood";
import { ErrorBoundary } from "react-error-boundary";

import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

import "./profile.css";

require("../../components/Calendar/Calendar.css");

const API_URL = "http://localhost:5005";

function ProfilePage() {
	const { user } = useContext(AuthContext);
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);
	const [loading, setLoading] = useState(true);
	const [loggedFoods, setLoggedFoods] = useState(null);
	const [calender, setCalender] = useState("hide");
	const [overlay, setOverLay] = useState("");
	const [customFoodForm, setCustomFoodForm] = useState(false);
	const [meal, setMeal] = useState("");
	const [calories, setCalories] = useState(0);
	const [totalCalories, setTotalCalories] = useState(0);
	const [loggedFoodsCopy, setLoggedFoodsCopy] = useState(loggedFoods);

	const [errMessage, setErrMessage] = useState(null);

	const [date, setDate] = useState(new Date(localStorage.date));

	const onChange = (date) => {
		setDate(date);
		localStorage.setItem("date", date);
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
				setLoggedFoodsCopy(response.data.logDay);

				setLoggedFoods(response.data.logDay);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
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
				let breakfastCals = 0;
				let lunchCals = 0;
				let dinnerCals = 0;

				if (response.data.logDay !== null) {
					let breakfast = response.data.logDay.breakfast;
					let lunch = response.data.logDay.lunch;
					let dinner = response.data.logDay.dinner;

					if (breakfast.length !== 0) {
						breakfast.map((el) => {
							breakfastCals += el.calories;
						});
					}

					if (lunch.length !== 0) {
						lunch.map((el) => {
							lunchCals += el.calories;
						});
					}

					if (dinner.length !== 0) {
						dinner.map((el) => {
							dinnerCals += el.calories;
						});
					}
				}

				setTotalCalories(breakfastCals + lunchCals + dinnerCals);

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
				}
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});

		setShow("");
		setBg("");
		setClicked(false);
	}, [date, loggedFoodsCopy]);

	return (
		<div className={bg + " profile-page"}>
			<div onClick={exit} className={overlay}></div>

			{errMessage && <p>{errMessage}</p>}

			{customFoodForm && (
				<CustomFood
					setCustomFoodForm={setCustomFoodForm}
					setOverLay={setOverLay}
					meal={meal}
					date={dateString}
					setLoggedFoodsCopy={setLoggedFoodsCopy}
				/>
			)}

			<h2 className="date">{dateString}</h2>

			<h2 className="calories">
				{calories} - {totalCalories.toFixed()} ={" "}
				{(calories - totalCalories).toFixed()}
			</h2>

			{loading && (
				<img
					src="images/loading.gif"
					className="loading-icon"
					alt="loading icon"
				></img>
			)}

			{!loading && (
				<div className="profile-container">
					<div className="calender-container">
						<img
							src="images/calendar.svg"
							onClick={handleCalender}
							className="calendar-icon"
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

					{calories === 0 && (
						<div className="profile-err">
							<p>
								Please go to the home page and finish filling out the rest of
								your profile
							</p>
							<a href="/home">Home</a>
						</div>
					)}

					{calories > 0 && (
						<div className="meals">
							<div className="profile-meal-container">
								<div className="meal-btn-container">
									<div className="meal-container">
										<img
											src="images/breakfast.jpeg"
											className="food-img"
											alt="Illustration of avocado and eggs on toast."
										></img>
										<h3>Add Breakfast</h3>
									</div>
									<button onClick={searchBreakfast}>
										<img src="images/add.png" className="add-icon"></img>
									</button>
								</div>
								<button
									onClick={addCustomFood}
									value="breakfast"
									className="custom-btn"
								>
									Custom
								</button>

								{loggedFoods && loggedFoods.breakfast.length !== 0 && (
									<div className="foods">
										{loggedFoods.breakfast.map((el, index) => {
											return (
												<div className="food-container">
													<p className="food-item">{el.name}</p>
													<button
														onClick={() =>
															deleteFood(el.name, "breakfast", index)
														}
														className="delete-btn"
													>
														delete
													</button>
												</div>
											);
										})}
									</div>
								)}
							</div>

							<div className="profile-meal-container">
								<div className="meal-btn-container">
									<div className="meal-container">
										<img
											src="images/lunch.jpeg"
											className="food-img"
											alt="Illustration of a salad."
										></img>
										<h3>Add Lunch</h3>
									</div>
									<button onClick={searchLunch}>
										<img src="images/add.png" className="add-icon"></img>
									</button>
								</div>
								<button
									onClick={addCustomFood}
									value="lunch"
									className="custom-btn"
								>
									Custom
								</button>

								{loggedFoods && loggedFoods.lunch.length !== 0 && (
									<div className="foods">
										{loggedFoods.lunch.map((el, index) => {
											console.log(el.name);
											return (
												<div className="food-container">
													<p>{el.name}</p>
													<button
														onClick={() => deleteFood(el.name, "lunch", index)}
														className="delete-btn"
													>
														delete
													</button>
												</div>
											);
										})}
									</div>
								)}
							</div>

							<div className="profile-meal-container">
								<div className="meal-btn-container">
									<div className="meal-container">
										<img
											src="images/dinner.jpeg"
											className="food-img"
											alt="Illustration of meat on skewers."
										></img>
										<h3>Add Dinner</h3>
									</div>

									<button onClick={searchDinner} className="add-btn">
										<img src="images/add.png" className="add-icon"></img>
									</button>
								</div>
								<button
									onClick={addCustomFood}
									value="dinner"
									className="custom-btn"
								>
									Custom
								</button>
								{loggedFoods && loggedFoods.dinner.length !== 0 && (
									<div className="foods">
										{loggedFoods.dinner.map((el, index) => {
											console.log(el.name);
											return (
												<div className="food-container">
													<p>{el.name}</p>
													<button
														onClick={() => deleteFood(el.name, "dinner", index)}
														className="delete-btn"
													>
														delete
													</button>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ProfilePage;
