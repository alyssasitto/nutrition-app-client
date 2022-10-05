import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../context/navbar.context";

require("./home.css");

function HomePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={bg}>
			<header>
				<h1>Healthy Living</h1>
				<img src="images/hero.jpeg" alt="Hero image"></img>
				<p>
					A healthy life is what everyone deserves but it can be difficult to
					achieve. We can help you get there. Whether it be helping to log and
					keep track of all your daily macros or finding delicious recipes that
					are both nutritious and satisfying, Healthy Living has everything you
					need.
				</p>
			</header>

			<section>
				<h2 className="heading">
					Do you struggle to calculate what kind of nutrients you need each day?
				</h2>
				<img src="images/phone.jpeg"></img>
				<p>
					No problem! We're here to help. Our free service allows you to log
					your daily food intake and calculate your macro needs to lose, gain,
					or maintain your weight. Sign up for free today and get started!
				</p>
				<Link to="/signup" className="link">
					Signup
				</Link>
			</section>

			<section>
				<h2 className="heading">Looking for some delicious recipes?</h2>
				<img src="images/recipe.jpeg"></img>
				<p>
					We've got you covered! Check out our plethora of recipes that are not
					only healthy but satisfying as well.
				</p>
				<Link to="/recipes" className="link">
					Recipes
				</Link>
			</section>
		</div>
	);
}

export default HomePage;
