import { useState, useEffect, useContext } from "react";

require("./SingleRecipe.css");

function SingleRecipePage() {
	const initialState = localStorage.getItem("single recipe")
		? JSON.parse(localStorage.getItem("single recipe"))
		: [];
	const [recipe, setRecipe] = useState(initialState);

	return (
		<div>
			{recipe && recipe.length === 0 && (
				<div>
					<img
						src="images/404.png"
						alt="404 error illustration"
						className="err-image"
					></img>
				</div>
			)}

			{recipe && Object.keys(recipe).length > 0 && (
				<div className="single-recipe">
					<img src={recipe.image}></img>
					<h1>{recipe.title}</h1>
					<div>
						<div className="mb-helper ingredients">
							<h2>Ingredients</h2>
							{recipe.extendedIngredients &&
								recipe.extendedIngredients.map((el, index) => {
									return (
										<p className="ingredient">
											<span>
												{el.measures.us.amount} {el.measures.us.unitLong}
											</span>{" "}
											{el.name}
										</p>
									);
								})}
						</div>

						<div className="directions">
							<h2>Directions</h2>
							{recipe.analyzedInstructions[0] &&
								recipe.analyzedInstructions[0].steps.map((el, index) => {
									return (
										<p className="instruction">
											<span className="instrution-num">{index + 1}.</span>{" "}
											{el.step}
										</p>
									);
								})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SingleRecipePage;
