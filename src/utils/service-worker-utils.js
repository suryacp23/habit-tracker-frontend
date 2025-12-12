export function getDeviceType() {
	const ua = navigator.userAgent.toLowerCase();

	if (/android|iphone|ipad|ipod|mobile/.test(ua)) {
		return "mobile";
	}
	return "desktop";
}
