function ActivityLevel(props) {
	const value = (e) => {
		props.setActivityLevel(e.target.value);
	};

	return (
		<div>
			<select onChange={value} className="custom-menu">
				<option disabled selected>
					Activity level
				</option>
				<option value="sedentary">Sedentary</option>
				<option value="lightly-active">Lightly active</option>
				<option value="active">Active</option>
				<option value="very-active">Very Active</option>
			</select>
		</div>
	);
}

export default ActivityLevel;
