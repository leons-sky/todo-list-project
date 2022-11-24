export default function request(path, options) {
	options.method = options.method ?? "GET";
	options.credentials = "include";
	options.mode = "cors";
	options.headers = options.headers ?? {};
	options.headers["Content-Type"] = "application/json";

	return fetch("http://localhost:4000/" + path, options);
}
