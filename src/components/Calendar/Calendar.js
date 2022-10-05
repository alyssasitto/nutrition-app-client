import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
require("./Calendar.css");

const API_URL = "http://localhost:5005";

function CalendarComponent() {
	const [date, setDate] = useState(new Date());
	const [calender, setCalender] = useState("hide");

	const onChange = (date) => {
		setDate(date);
	};

	const handleCalender = () => {
		if (calender === "hide") {
			setCalender("show");
		}

		if (calender === "show") {
			setCalender("hide");
		}
	};

	const dateString = date.toDateString();

	console.log(dateString);

	console.log(date);
	return (
		<div>
			<img
				src="images/calendar.svg"
				onClick={handleCalender}
				className="icon"
			></img>
			<Calendar onChange={onChange} value={date} className={calender} />
		</div>
	);
}

export default CalendarComponent;
