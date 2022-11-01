import Calendar from "react-calendar";
import { useState } from "react";

import "react-calendar/dist/Calendar.css";

function CalendarComponent() {
	const [date, setDate] = useState(new Date());
	const [calendar, setCalender] = useState("hide");

	const onChange = (date) => {
		setDate(date);
	};

	const handleCalender = () => {
		if (calendar === "hide") {
			setCalender("show");
		}

		if (calendar === "show") {
			setCalender("hide");
		}
	};

	return (
		<div>
			<img
				src="images/calendar.svg"
				onClick={handleCalender}
				className="icon"
			></img>
			<Calendar
				onChange={onChange}
				value={date}
				className={calendar + " calendar"}
			/>
		</div>
	);
}

export default CalendarComponent;
