import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";

Routes;
const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          element={<Login />}
          path="/login"
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
