import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

require("./CustomFood.css");

const API_URL = "http://localhost:5005";

function CustomFood(props) {
	const { user } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [calories, setCalories] = useState("");
	const [fat, setFat] = useState("");
	const [protein, setProtein] = useState("");
	const [carbs, setCarbs] = useState("");

	const [errMessage, setErrMessage] = useState(null);

	const storedToken = localStorage.getItem("authToken");

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleCalories = (e) => {
		setCalories(e.target.value);
	};

	const handleFat = (e) => {
		setFat(e.target.value);
	};

	const handleProtein = (e) => {
		setProtein(e.target.value);
	};

	const handleCarbs = (e) => {
		setCarbs(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			id: user.id,
			date: props.date,
			meal: props.meal,
			name,
			calories,
			fat,
			protein,
			carbs,
		};

		axios
			.post(`${API_URL}/add-custom-food`, body, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response.data);

				props.setOverLay("");
				props.setCustomFoodForm(false);
				props.setLoggedFoodsCopy(response.data.logDay);
			})
			.catch((err) => {
				console.log(err);
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box custom-food">
				<div className="mr-helper">
					<div className="name-container">
						<label>Name</label>
						<input type="text" name="name" onChange={handleName} />
					</div>

					<div className="input-container">
						<div>
							<div>
								<label>Calories</label>
								<input
									type="number"
									name="calories"
									onChange={handleCalories}
									className="input"
								/>
							</div>
							<div>
								<label>Fat</label>
								<input
									type="number"
									name="fat"
									onChange={handleFat}
									className="input"
								/>
							</div>
						</div>

						<div>
							<div>
								<label>Protein</label>
								<input
									type="number"
									name="protein"
									onChange={handleProtein}
									className="input"
								/>
							</div>
							<div>
								<label>Carbs</label>
								<input
									type="number"
									name="carbs"
									onChange={handleCarbs}
									className="input"
								/>
							</div>
						</div>
					</div>

					{errMessage && <p>{errMessage}</p>}

					<button type="submit">Add food</button>
				</div>
			</form>
		</div>
	);
}

export default CustomFood;
