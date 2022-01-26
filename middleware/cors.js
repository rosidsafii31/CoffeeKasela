import Cors from "cors";

const cors = Cors({
	methods: ["GET", "POST","PUT","DELETE","PATCH"],
	origin: "*",
});

export default cors