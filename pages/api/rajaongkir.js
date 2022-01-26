import cors from "../../middleware/cors";
import runMiddleware from "../../middleware/runMiddleware";

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === "POST") {
		const response = await fetch("https://api.rajaongkir.com/starter/cost", {
			method: "POST",
			headers: {
				key: '8d6fc0332644e2a43214a569d567a936',
				"Content-Type": "application/json",
			},
			body: req.body,
		});

		const result = await response.json();
		res.status(200).json(result);
	}
}