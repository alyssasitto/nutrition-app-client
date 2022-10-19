require("../DimensionsForm/dimensions.css");

function ActivityLevel(props) {
	const value = (e) => {
		props.setActivityLevel(e.target.value);
	};

	return (
		<div className="select-container">
			<label className="label">Activity Level:</label>
			<select onChange={value} className="custom-menu">
				<option disabled selected>
					Activity level
				</option>
				<option value="sedentary">Sedentary</option>
				<option value="lightly active">Lightly active</option>
				<option value="active">Active</option>
				<option value="very active">Very Active</option>
			</select>
		</div>
	);
}

export default ActivityLevel;
