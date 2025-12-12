import axios from "axios";

export const sendDeviceToken = async (token, deviceType) => {
	try {
		await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/users/device-token`,
			{
				deviceToken: token,
				deviceType: deviceType,
			},
			{ headers: { "Content-Type": "application/json" }, withCredentials: true }
		);
		console.log("Device token sent to backend:", token);
	} catch (err) {
		console.error("Error sending token to backend:", err);
	}
};
