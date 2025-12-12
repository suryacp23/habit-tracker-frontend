import { createContext, useContext, useEffect, useState } from "react";
import { generateToken } from "../config/firebase.config";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	// Load token from localStorage (cleared only when user deletes site data)
	const [token, setToken] = useState(localStorage.getItem("fcm_token"));

	// Modal dismissed ONLY for this browser session
	const [modalDismissed, setModalDismissed] = useState(
		sessionStorage.getItem("notification_modal_dismissed") === "true"
	);

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const permission = Notification.permission;

		// Do not show modal again in this session
		if (modalDismissed) return;

		// Permission granted but token missing → silent token fetch
		if (permission === "granted" && !token) {
			generateToken().then((newToken) => {
				if (newToken) setToken(newToken);
			});
			return;
		}

		// Permission denied → ask user
		if (permission === "denied" && !token) {
			setShowModal(true);
			return;
		}

		// Permission default + no token → show modal
		if (permission === "default" && !token) {
			setShowModal(true);
			return;
		}
	}, [token, modalDismissed]);

	const requestNotificationAccess = async () => {
		const permission = await Notification.requestPermission();

		if (permission !== "granted") {
			setShowModal(false);
			setModalDismissed(true);
			sessionStorage.setItem("notification_modal_dismissed", "true");
			return;
		}

		// fetch token
		const newToken = await generateToken();
		if (newToken) {
			setToken(newToken);
			setShowModal(false);
		}
	};

	const dismissModal = () => {
		setShowModal(false);
		setModalDismissed(true);

		// Store only for current browser session
		sessionStorage.setItem("notification_modal_dismissed", "true");
	};

	return (
		<NotificationContext.Provider value={{ showModal, requestNotificationAccess, dismissModal }}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
