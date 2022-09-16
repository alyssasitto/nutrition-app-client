import { createContext, useState } from "react";

const NavbarContext = createContext();

function NavbarProviderWrapper(props) {
	const [show, setShow] = useState("");
	const [bg, setBg] = useState("");
	const [clicked, setClicked] = useState(false);
	return (
		<NavbarContext.Provider
			value={{ show, setShow, bg, setBg, clicked, setClicked }}
		>
			{props.children}
		</NavbarContext.Provider>
	);
}

export { NavbarContext, NavbarProviderWrapper };
