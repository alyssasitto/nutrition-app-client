import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useEffect } from "react";

require("./navbar.css");

function Navbar(props) {
	const [showNavbar, setShowNavbar] = useState("");
	const [bg, setBg] = useState("");

	const { isLoggedIn, logout } = useContext(AuthContext);

	const location = useLocation();

	const toggleBtns = () => {
		if (showNavbar === "") {
			setShowNavbar("show");
			setBg("dark");
			props.setCloseNavbar("");
		} else {
			setShowNavbar("");
			setBg("");
		}
	};

	useEffect(() => {
		setBg("");
		setShowNavbar("");
	}, [location.pathname]);

	return (
		<nav className={"navbar " + bg}>
			<img src="images/logo.png" className="logo"></img>
			<div onClick={() => toggleBtns()} className="buttons">
				{showNavbar === "" && (
					<img
						src="images/hamburger.png"
						alt="Hamburger menu icon"
						className="icon"
					></img>
				)}

				{showNavbar === "show" && (
					<img
						src="images/close.png"
						alt="Close icon"
						className="close-icon icon"
					></img>
				)}
			</div>

			<div className={"nav " + showNavbar + " " + props.closeNavbar}>
				<ul>
					{isLoggedIn && (
						<>
							<li>
								<Link to="/home" className="list-item">
									Home
								</Link>
							</li>

							<li>
								<Link to="/profile" className="list-item">
									Profile
								</Link>
							</li>

							<li>
								<Link to="/settings" className="list-item">
									Settings
								</Link>
							</li>

							<li>
								<button onClick={logout} className="list-item logout-btn">
									Logout
								</button>
							</li>
						</>
					)}

					{!isLoggedIn && (
						<>
							<li>
								<Link to="/" className="list-item">
									Home
								</Link>
							</li>
							<li>
								<Link to="/recipes" className="list-item">
									Recipes
								</Link>
							</li>
							<li>
								<Link to="/login" className="list-item">
									Login
								</Link>
							</li>
							<li>
								<Link to="/signup" className="list-item">
									Signup
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
