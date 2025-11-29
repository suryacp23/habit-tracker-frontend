import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import HabitForm from "../pages/forms/HabitForm";

Routes;
const AppRouter = () => {
	return (
		<div>
			<Routes>
				<Route element={<Login />} path="/login" />
				<Route path="/" element={<HabitForm /> } />
			</Routes>
		</div>
	);
};

export default AppRouter;
