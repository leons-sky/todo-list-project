export default function request(path, options) {
	options = options ?? {};
	options.method = options.method ?? "GET";
	options.credentials = "include";
	options.mode = "cors";
	options.body = options.body ? JSON.stringify(options.body) : undefined;
	options.headers = options.headers ?? {};
	options.headers["Content-Type"] = "application/json";

	return fetch("http://140.238.90.143:4650" + path, options);
}
