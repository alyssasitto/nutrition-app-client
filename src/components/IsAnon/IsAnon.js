import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
	const { isLoggedIn } = useContext(AuthContext);

	if (isLoggedIn) {
		return <Navigate to="/profile" />;
	} else {
		return children;
	}
}

export default IsAnon;
