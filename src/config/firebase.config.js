import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { sendDeviceToken } from "../api/notification-api";
import { getDeviceType } from "../utils/service-worker-utils";

const firebaseConfig = {
	apiKey: "AIzaSyBubz33RCOfsF5ZX8q84OBZ3g3tFeM36R4",
	authDomain: "algo-projects-15fff.firebaseapp.com",
	projectId: "algo-projects-15fff",
	storageBucket: "algo-projects-15fff.firebasestorage.app",
	messagingSenderId: "331238432994",
	appId: "1:331238432994:web:9c2c6d599a0167c27bfebb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const generateToken = async () => {
	console.log("Requesting notification permission...");

	const permission = await Notification.requestPermission();
	if (permission !== "granted") {
		console.log("Permission not granted");
		return null;
	}

	// Get FCM device token
	const token = await getToken(messaging, {
		vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
	});

	if (!token) return null;

	const savedToken = localStorage.getItem("fcm_token");

	if (savedToken === token) {
		console.log("Token unchanged. Not sending to backend.");
		return token;
	}

	const deviceType = getDeviceType();
	await sendDeviceToken(token, deviceType);

	localStorage.setItem("fcm_token", token);

	console.log("Device Token:", token);
	return token;
};
