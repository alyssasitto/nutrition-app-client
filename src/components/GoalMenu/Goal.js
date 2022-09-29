require("./Goal.css");

function Goal(props) {
	const value = (e) => {
		props.setGoal(e.target.value);
	};

	return (
		<div className="menu-container">
			<select onChange={value} className="custom-menu">
				<option disabled>Goal</option>
				<option value="lose-0.5lb">Lose 0.5lb</option>
				<option value="lose-1lb">Lose 1lb</option>
				<option value="lose-2lb">Lose 2lb</option>
				<option value="maintain">Maintain</option>
				<option value="gain-0.5lb">Gain 0.5lb</option>
				<option value="gain-1lb">Gain 1lb</option>
				<option value="gain-2lb">Gain 2lb</option>
			</select>
		</div>
	);
}

export default Goal;
