import styles from "../css/Result.module.css";

export default function Result({ result, basicInfo, expedition }) {
	const price = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(result.cost[0].value);

	return (
		<div className={styles.result}>
			<div className={styles.courier}>
				<h1 className={styles.courier__name}>{expedition.toUpperCase()}</h1>
				<p className={styles.courier__stand_for}>Jalur Nugraha Ekakurir</p>
			</div>

			<div className={styles.service}>
				<h1 className={styles.service__name}>{result.service}</h1>
				<p className={styles.service__detail}>{result.description}</p>
			</div>

			<div className={styles.place}>
				<div className={styles.origin}>
					<p className={styles.origin__label}>Dari :</p>
					<p className={styles.origin__place}>
						{basicInfo.origin.cityName}, {basicInfo.origin.provinceName}
					</p>
				</div>

				<div className={styles.origin}>
					<p className={styles.origin__label}>ke :</p>
					<p className={styles.origin__place}>
						{basicInfo.destination.cityName},{" "}
						{basicInfo.destination.provinceName}
					</p>
				</div>

				<div className={styles.origin}>
					<p className={styles.origin__label}>Estimasi waktu :</p>
					<p className={styles.origin__place}>{result.cost[0].etd}</p>
				</div>

				<div className={styles.origin}>
					<p className={styles.origin__label}>Berat barang :</p>
					<p className={styles.origin__place}>{basicInfo.weight} gram</p>
				</div>
			</div>

			<h1 className={styles.price}>{price}</h1>
		</div>
	);
}
