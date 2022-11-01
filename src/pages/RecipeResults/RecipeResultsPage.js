import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavbarContext } from "../../context/navbar.context";

require("./RecipeResults.css");

const API_URL = process.env.REACT_APP_API_URL;

function RecipeResultsPage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	const initialState = localStorage.getItem("recipe list")
		? JSON.parse(localStorage.getItem("recipe list"))
		: [];
	const [recipeList, setRecipeList] = useState(initialState);
	const [errMessage, setErrMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showRecipes, setShowRecipes] = useState(true);

	const navigate = useNavigate();

	const viewRecipe = (id) => {
		setShowRecipes(false);
		setLoading(true);

		axios
			.get(`${API_URL}/details/${id}`)
			.then((response) => {
				localStorage.setItem(
					"single recipe",
					JSON.stringify(response.data.recipeInfo)
				);

				setLoading(false);

				navigate(`/details/${id}`);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	console.log(recipeList);
	return (
		<div className={"recipe-results " + bg}>
			{recipeList && recipeList.length === 0 && (
				<div className="no-results-container">
					<img src="images/no-results.png" className="no-results"></img>
					<p>
						Could not find any recipes. Please try to search for something else
						or adjust search filters.
					</p>
				</div>
			)}

			{loading && <img src="images/loading.gif" className="loading-icon"></img>}

			{showRecipes && (
				<div className="recipes">
					{recipeList &&
						recipeList.map((el, index) => {
							return (
								<div className="recipe">
									<h2>{el.title}</h2>
									<img src={el.image}></img>
									<button onClick={() => viewRecipe(el.id)}>View Recipe</button>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default RecipeResultsPage;
