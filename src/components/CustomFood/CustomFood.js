import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

require("./CustomFood.css");

const API_URL = process.env.REACT_APP_API_URL;

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
				props.setOverLay("");
				props.setCustomFoodForm(false);
				props.setLoggedFoodsCopy(response.data.logDay);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	const exit = () => {
		props.setOverLay("");
		props.setCustomFoodForm(false);
	};

	return (
		<div className="edit-page">
			<form onSubmit={handleSubmit} className="box custom-food">
				<div onClick={exit} className="close-btn">
					<img src="images/close.png" className="exit icon"></img>
				</div>
				<div className="mr-helper">
					<div className="input-container">
						<div className="custom-input">
							<label>Name:</label>
							<input type="text" name="name" onChange={handleName} />
						</div>
						<div className="custom-input">
							<label>Calories:</label>
							<input type="number" name="calories" onChange={handleCalories} />
						</div>
						<div className="custom-input">
							<label>Fat:</label>
							<input type="number" name="fat" onChange={handleFat} />
						</div>

						<div className="custom-input">
							<label>Protein:</label>
							<input type="number" name="protein" onChange={handleProtein} />
						</div>
						<div className="custom-input mb-helper">
							<label>Carbs:</label>
							<input type="number" name="carbs" onChange={handleCarbs} />
						</div>
					</div>

					{errMessage && <p className="message err-message">{errMessage}</p>}

					<button type="submit">Add food</button>
				</div>
			</form>
		</div>
	);
}

export default CustomFood;
