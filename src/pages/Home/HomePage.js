import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../context/navbar.context";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

require("./home.css");

function HomePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return (
		<div className={"home-page " + bg}>
			<header>
				<img src="images/hero.png" alt="Hero image"></img>
				<div>
					<h1>Healthy Living</h1>
					<p>
						A healthy lifestyle is what everyone wants but it can be difficult
						to achieve. We can help you get there. Whether it be helping to log
						and keep track of all your daily macros or finding delicious recipes
						that are both nutritious and satisfying, Healthy Living has
						everything you need.
					</p>
				</div>
			</header>

			<Swiper
				slidesPerView={4}
				centeredSlides={true}
				spaceBetween={30}
				grabCursor={true}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
				<SwiperSlide>Slide 6</SwiperSlide>
				<SwiperSlide>Slide 7</SwiperSlide>
				<SwiperSlide>Slide 8</SwiperSlide>
				<SwiperSlide>Slide 9</SwiperSlide>
			</Swiper>

			<section className="direction-helper">
				<img src="images/phone.jpeg"></img>

				<div>
					<h2 className="heading">
						Do you struggle to calculate what kind of nutrients you need each
						day?
					</h2>
					<p>
						No problem! We're here to help. Our free service allows you to log
						your daily food intake and calculate your macro needs to lose, gain,
						or maintain your weight. Sign up for free today and get started!
					</p>

					<Link to="/signup" className="link">
						Signup
					</Link>
				</div>
			</section>

			<section>
				<img src="images/recipe.jpeg"></img>
				<div>
					<h2 className="heading">Looking for some delicious recipes?</h2>
					<p>
						We've got you covered! Check out our plethora of recipes that are
						not only healthy but satisfying as well.
					</p>
					<Link to="/recipes" className="link">
						Recipes
					</Link>
				</div>
			</section>
		</div>
	);
}

export default HomePage;
