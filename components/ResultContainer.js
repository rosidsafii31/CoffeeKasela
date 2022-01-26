import Result from "./Result";

export default function ResultContainer({ data }) {
	const basicInfo = {
		weight: data.rajaongkir.query.weight,
		origin: {
			cityName: data.rajaongkir.origin_details.city_name,
			provinceName: data.rajaongkir.origin_details.province,
		},
		destination: {
			cityName: data.rajaongkir.destination_details.city_name,
			provinceName: data.rajaongkir.destination_details.province,
		},
	};

	return (
		<div>
			{data.rajaongkir.results[0].costs.map((cost) => (
				<Result
					result={cost}
					basicInfo={basicInfo}
					key={cost.description}
					expedition={data.rajaongkir.results[0].code}
				/>
			))}
		</div>
	);
}
