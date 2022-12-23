import { Link } from "react-router-dom";

require("./home.css");

function HomePage() {
	return (
		<div className={"home-page"}>
			<header>
				<img src="images/hero.png" alt="Hero image"></img>
				<div>
					<h1>Healthy Living</h1>
					<p>
						A healthy lifestyle is what everyone wants but it can be difficult
						to achieve. We can help you get there. Whether it be helping to log
						and keep track of all your daily macros or finding delicious recipes
						that are both nutritious and satisfying, Healthy Living has
						everything you need.
					</p>
				</div>
			</header>

			<section className="direction-helper">
				<img src="images/phone.jpeg"></img>

				<div>
					<h2 className="heading">
						Do you struggle to calculate what kind of nutrients you need each
						day?
					</h2>
					<p>
						No problem! We're here to help. Our free service allows you to log
						your daily food intake and calculate your macro needs to lose, gain,
						or maintain your weight. Sign up for free today and get started!
					</p>

					<Link to="/signup" className="link">
						Signup
					</Link>
				</div>
			</section>

			<section>
				<img src="images/recipe.jpeg"></img>
				<div>
					<h2 className="heading">Looking for some delicious recipes?</h2>
					<p>
						We've got you covered! Check out our plethora of recipes that are
						not only healthy but satisfying as well.
					</p>
					<Link to="/recipes" className="link">
						Recipes
					</Link>
				</div>
			</section>
		</div>
	);
}

export default HomePage;
