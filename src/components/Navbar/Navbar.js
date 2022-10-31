import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";

require("./navbar.css");

function Navbar() {
	const { show, setShow, setBg, clicked, setClicked } =
		useContext(NavbarContext);

	const { isLoggedIn, logout } = useContext(AuthContext);

	const handleClick = () => {
		if (!clicked) {
			setClicked(true);
			setShow("show");
			setBg("dark");
		} else {
			setClicked(false);
			setShow("");
			setBg("");
		}
	};

	return (
		<div>
			<nav className="navbar">
				<img src="images/logo.png" className="logo"></img>
				<div onClick={handleClick} className="buttons">
					{!clicked && (
						<img
							src="images/hamburger.png"
							alt="Hamburger menu icon"
							className="icon"
						></img>
					)}

					{clicked && (
						<img
							src="images/close.png"
							alt="Close icon"
							className="close-icon icon"
						></img>
					)}
				</div>

				<div className={"nav " + show}>
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
		</div>
	);
}

export default Navbar;
