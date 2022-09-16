import { useContext, useEffect, useState } from "react";
import Dimensions from "../../components/DimensionsForm/Dimensions";
import { NavbarContext } from "../../context/navbar.context";

function ProfilePage() {
	const { bg, setBg, setShow, setClicked } = useContext(NavbarContext);

	useEffect(() => {
		setShow("");
		setBg("");
		setClicked(false);
	}, []);

	return <div className={bg}>{<Dimensions />}</div>;
}

export default ProfilePage;
