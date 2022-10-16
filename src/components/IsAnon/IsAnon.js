import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading)
		return <img src="images/loading.gif" className="loading-icon"></img>;

	if (isLoggedIn) {
		return <Navigate to="/home" />;
	} else {
		return children;
	}
}

export default IsAnon;
