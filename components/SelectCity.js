import styles from "../css/Form.module.css";

export default function SelectCity({
	cities,
	province,
	setTheCity,
	statusPlace,
}) {
	return (
		<div style={{ position: "relative" }} className={styles.input_form}>
			<label
				htmlFor="from-city"
				className={styles.input_form__label}
				style={{ color: province === "" ? "#9a9a9a" : "#473a3a" }}
			>
				{statusPlace === "origin"
					? "Dari kota/kabupaten mana"
					: "Ke kota/kabupaten mana"}
			</label>

			<select
				required
				id="from-city"
				className={styles.input_form__input}
				disabled={province === "" ? true : false}
				style={{ appearance: "none", paddingRight: "60px" }}
				onChange={(event) => setTheCity(parseInt(event.target.value))}
			>
				<option value="" hidden selected>
					Pilih kota/kabupaten
				</option>

				{province === ""
					? ""
					: cities[province - 1].map((city) => (
							<option key={city.city_id} value={city.city_id}>
								{city.city_name}
							</option>
					  ))}
			</select>

			<svg
				width="34px"
				height="34px"
				viewBox="0 0 20 20"
				className={styles.select_icon}
				xmlns="http://www.w3.org/2000/svg"
				fill={province === "" ? "#9a9a9a" : "currentColor"}
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				/>
			</svg>
		</div>
	);
}
