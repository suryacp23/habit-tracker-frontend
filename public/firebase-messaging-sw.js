importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
	apiKey: "AIzaSyBubz33RCOfsF5ZX8q84OBZ3g3tFeM36R4",
	authDomain: "algo-projects-15fff.firebaseapp.com",
	projectId: "algo-projects-15fff",
	storageBucket: "algo-projects-15fff.firebasestorage.app",
	messagingSenderId: "331238432994",
	appId: "1:331238432994:web:9c2c6d599a0167c27bfebb",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log("Background message received", payload);

	const title = payload.notification.title;
	const options = {
		body: payload.notification.body,
		icon: "/newLogo.png", // optional
	};

	self.registration.showNotification(title, options);
});
