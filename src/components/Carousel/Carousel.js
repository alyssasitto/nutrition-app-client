import { useEffect, useState } from "react";

require("./Carousel.css");

function Carousel(props) {
	const { children } = props;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [length, setLength] = useState(children.length);

	const next = () => {
		if (currentIndex < length - 1) {
			setCurrentIndex((prevState) => prevState + 1);
		}
	};

	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevState) => prevState - 1);
		}
	};

	useEffect(() => {
		setLength(children.length);
	}, [children]);

	return (
		<div className="carousel-container">
			<div className="carousel-wrapper">
				<button onClick={prev} className="left-arrow">
					<img src="images/left.png" alt="left arrow icon"></img>
				</button>
				<div className="carousel-content-wrapper">
					<div
						className="carousel-content"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{children}
					</div>
					<button onClick={next} className="right-arrow">
						<img src="images/right.png" alt="right arrow icon"></img>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Carousel;
