import styles from "../css/Form.module.css";

export default function Selectprovince({
	statusPlace,
	provinces,
	setTheProvince,
}) {
	return (
		<div style={{ position: "relative" }} className={styles.input_form}>
			<label htmlFor="from-province" className={styles.input_form__label}>
				{statusPlace === "origin" ? "Dari provinsi mana" : "Ke provinsi mana"}
			</label>

			<select
				required
				id="from-province"
				className={styles.input_form__input}
				style={{ appearance: "none", paddingRight: "60px" }}
				onChange={(event) => setTheProvince(parseInt(event.target.value))}
			>
				<option value="" hidden selected>
					Pilih provinsi
				</option>

				{provinces.map((province) => (
					<option key={province.province_id} value={province.province_id}>
						{province.province}
					</option>
				))}
			</select>

			<svg
				width="34px"
				height="34px"
				viewBox="0 0 20 20"
				fill="currentColor"
				className={styles.select_icon}
				xmlns="http://www.w3.org/2000/svg"
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
