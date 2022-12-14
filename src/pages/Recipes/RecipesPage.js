import { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

require("./Recipes.css");

const API_URL = process.env.REACT_APP_API_URL;

function RecipePage() {
	const [recipe, setRecipe] = useState("");

	const [filterOptions, setFilterOptions] = useState("hide");
	const [rotate, setRotate] = useState("");
	const [cuisine, setCuisine] = useState([]);
	const [diet, setDiet] = useState([]);
	const [intolerance, setIntolerance] = useState([]);
	const [loading, setLoading] = useState(false);
	const [img, setImg] = useState(true);
	const [errMessage, setErrMessage] = useState(null);

	const navigate = useNavigate();

	const handleRecipe = (e) => {
		setRecipe(e.target.value);
	};

	const showFilterOptions = () => {
		if (filterOptions === "hide") {
			setFilterOptions("show");
			setRotate("rotate");
		} else if (filterOptions === "show") {
			setFilterOptions("hide");
			setRotate("");
		}
	};

	const addCuisine = (e) => {
		if (!cuisine.includes(`${e.target.value}`)) {
			setCuisine([...cuisine, e.target.value]);
		} else {
			cuisine.splice(cuisine.indexOf(`${e.target.value}`), 1);

			setCuisine([...cuisine]);
		}
	};

	const addDiet = (e) => {
		if (!diet.includes(`${e.target.value}`)) {
			setDiet([...diet, e.target.value]);
		} else {
			diet.splice(diet.indexOf(`${e.target.value}`), 1);

			setDiet([...diet]);
		}
	};

	const addIntolerance = (e) => {
		if (!intolerance.includes(`${e.target.value}`)) {
			setIntolerance([...intolerance, e.target.value]);
		} else {
			intolerance.splice(intolerance.indexOf(`${e.target.value}`), 1);

			setIntolerance([...intolerance]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			recipe,
			cuisine,
			diet,
			intolerance,
		};

		if (recipe === "") {
			setErrMessage("Please enter a valid recipe");
		} else {
			setErrMessage(null);

			setLoading(true);

			setImg(false);

			axios
				.post(`${API_URL}/recipe`, body)
				.then((response) => {
					console.log(response);

					localStorage.setItem(
						"recipe list",
						JSON.stringify(response.data.recipeList)
					);

					setLoading(false);

					navigate(`/results/${recipe}`);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className={"recipe-page"}>
			<form className="recipe-search-container">
				<div className="filter-box">
					<div onClick={showFilterOptions} className="filter-btn">
						<p className="filter">Filter</p>
						<div className="plus-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</div>
					</div>
					<div className={"inner-box " + filterOptions}>
						<h2>Cuisine</h2>
						<div className="cuisine-box mb-helper">
							<div>
								<div className="recipe-input">
									<input
										type="checkbox"
										name="american"
										value="american"
										onClick={addCuisine}
									></input>
									<label>American</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="mexican"
										value="mexican"
										onClick={addCuisine}
									></input>
									<label>Mexican</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="spanish"
										value="spanish"
										onClick={addCuisine}
									></input>
									<label>Spanish</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="chinese"
										value="chinese"
										onClick={addCuisine}
									></input>
									<label>Chinese</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="japanese"
										value="japanese"
										onClick={addCuisine}
									></input>
									<label>Japanese</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="korean"
										value="korean"
										onClick={addCuisine}
									></input>
									<label>Korean</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="thai"
										value="thai"
										onClick={addCuisine}
									></input>
									<label>Thai</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="vietnamese"
										value="vietnamese"
										onClick={addCuisine}
									></input>
									<label>Vietnamese</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="indian"
										value="indian"
										onClick={addCuisine}
									></input>
									<label>Indian</label>
								</div>
							</div>
							<div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="french"
										value="french"
										onClick={addCuisine}
									></input>
									<label>French</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="italian"
										value="italian"
										onClick={addCuisine}
									></input>
									<label>Italian</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="jewish"
										value="jewish"
										onClick={addCuisine}
									></input>
									<label>Jewish</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="southern"
										value="southern"
										onClick={addCuisine}
									></input>
									<label>Southern</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="greek"
										value="greek"
										onClick={addCuisine}
									></input>
									<label>Greek</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="german"
										value="german"
										onClick={addCuisine}
									></input>
									<label>German</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="cajun"
										value="cajun"
										onClick={addCuisine}
									></input>
									<label>Cajun</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="caribbean"
										value="caribbean"
										onClick={addCuisine}
									></input>
									<label>Caribbean</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="german"
										value="german"
										onClick={addCuisine}
									></input>
									<label>German</label>
								</div>
							</div>
						</div>

						<div className="mb-helper">
							<h2>Diet</h2>
							<div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="pescetarian"
										value="pescetarian"
										onClick={addDiet}
									></input>
									<label>Pescetarian</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="vegan"
										value="vegan"
										onClick={addDiet}
									></input>
									<label>Vegan</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="paleo"
										value="paleo"
										onClick={addDiet}
									></input>
									<label>Paleo</label>
								</div>
								<div className="recipe-input ">
									<input
										type="checkbox"
										name="vegetarian"
										value="vegetarian"
										onClick={addDiet}
									></input>
									<label>Vegetarian</label>
								</div>
							</div>
						</div>

						<div>
							<h2>Intolerances</h2>
							<div className="intolerance-box">
								<div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="dairy"
											value="dairy"
											onClick={addIntolerance}
										></input>
										<label>Dairy</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="egg"
											value="egg"
											onClick={addIntolerance}
										></input>
										<label>Egg</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="gluten"
											value="gluten"
											onClick={addIntolerance}
										></input>
										<label>Gluten</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="peanut"
											value="peanut"
											onClick={addIntolerance}
										></input>
										<label>Peanut</label>
									</div>
								</div>
								<div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="seafood"
											value="seafood"
											onClick={addIntolerance}
										></input>
										<label>Seafood</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="shellfish"
											value="shellfish"
											onClick={addIntolerance}
										></input>
										<label>Shellfish</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="soy"
											value="soy"
											onClick={addIntolerance}
										></input>
										<label>Soy</label>
									</div>
									<div className="recipe-input ">
										<input
											type="checkbox"
											name="wheat"
											value="wheat"
											onClick={addIntolerance}
										></input>
										<label>Wheat</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<input type="text" name="recipe-search" onChange={handleRecipe}></input>
				<button type="submit" onClick={handleSubmit}>
					Search
				</button>
			</form>

			{errMessage && <p className="recipe-err-message">{errMessage}</p>}
			{loading && (
				<img
					src="images/loading.gif"
					className="loading-icon recipe-loading"
				></img>
			)}
			{img && <img src="images/hero2.jpeg" className="recipe-hero"></img>}
			{/* <img src="images/hero2.jpeg" className="recipe-hero"></img> */}
		</div>
	);
}

export default RecipePage;
