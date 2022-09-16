import { Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { NavbarContext } from "./context/navbar.context";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import ProfilePage from "./pages/Profile/ProfilePage";

import IsAnon from "./components/IsAnon/IsAnon";
import IsPrivate from "./components/IsPrivate/IsPrivate";

require("./app.css");

function App() {
	// if (show === "show") {
	// 	setBg("dark");
	// } else {
	// 	setBg("");
	// }

	return (
		<div className={"App "}>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={
						<IsAnon>
							<LoginPage />
						</IsAnon>
					}
				/>
				<Route
					path="/signup"
					element={
						<IsAnon>
							<SignupPage />
						</IsAnon>
					}
				/>
				<Route
					path="/profile"
					element={
						<IsPrivate>
							<ProfilePage />
						</IsPrivate>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
