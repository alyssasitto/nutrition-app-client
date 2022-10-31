import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import axios from "axios";
// require("./Calendar.css");
import "react-calendar/dist/Calendar.css";

const API_URL = "http://localhost:5005";

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
