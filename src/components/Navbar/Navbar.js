import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { NavbarContext } from "../../context/navbar.context";
import { AuthContext } from "../../context/auth.context";

require("./navbar.css");

function Navbar() {
	const { show, setShow, bg, setBg, clicked, setClicked } =
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
			<nav>
				<p>logo</p>
				<div onClick={handleClick} className="buttons">
					{!clicked && (
						<img
							src="images/hamburger.png"
							alt="Hamburger menu icon"
							className="icon"
						></img>
					)}

					{clicked && (
						<img src="images/close.png" alt="Close icon" className="icon"></img>
					)}
				</div>
				<ul className={"nav " + show}>
					{isLoggedIn && (
						<>
							<li>
								<Link to="/" className="list-item">
									Home
								</Link>
							</li>

							<li>
								<Link to="/profile" className="list-item">
									Profile
								</Link>
							</li>

							<li>
								<button onClick={logout}>Logout</button>
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
			</nav>
		</div>
	);
}

export default Navbar;
