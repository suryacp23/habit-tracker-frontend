import { useEffect } from "react";
import { generateToken } from "./config/firebase.config";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
	return (
		<div className="bg-background select-none min-h-screen">
			<AuthProvider>
				<NotificationProvider>
					<AppRouter />
				</NotificationProvider>
			</AuthProvider>
		</div>
	);
};

export default App;
