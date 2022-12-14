import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import SettingsPage from "./pages/Settings/SettingsPage";
import UserHomePage from "./pages/UserHome/UserHomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import RecipePage from "./pages/Recipes/RecipesPage";
import SingleRecipePage from "./pages/SingleRecipe/SingleRecipePage";
import RecipeResultsPage from "./pages/RecipeResults/RecipeResultsPage";

import IsAnon from "./components/IsAnon/IsAnon";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import { useState } from "react";
import { useEffect } from "react";

require("./App.css");

function App() {
	const location = useLocation();

	const [closeNavbar, setCloseNavbar] = useState("");

	useEffect(() => {
		setCloseNavbar("close");
	}, [location.pathname]);

	return (
		<div className={"App "}>
			<Navbar closeNavbar={closeNavbar} setCloseNavbar={setCloseNavbar} />
			<Routes>
				<Route
					path="/"
					element={
						<IsAnon>
							<HomePage />
						</IsAnon>
					}
				/>
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

				<Route
					path="/settings"
					element={
						<IsPrivate>
							<SettingsPage />
						</IsPrivate>
					}
				/>

				<Route
					path="/home"
					element={
						<IsPrivate>
							<UserHomePage />
						</IsPrivate>
					}
				/>

				<Route
					path="/search"
					element={
						<IsPrivate>
							<SearchPage />
						</IsPrivate>
					}
				/>

				<Route
					path="/recipes"
					element={
						<IsAnon>
							<RecipePage />
						</IsAnon>
					}
				/>

				<Route
					path="/details/:id"
					element={
						<IsAnon>
							<SingleRecipePage />
						</IsAnon>
					}
				/>

				<Route
					path="/results/:recipe"
					element={
						<IsAnon>
							<RecipeResultsPage />
						</IsAnon>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
