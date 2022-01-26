import { useState } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ResultContainer from "../components/ResultContainer";

import Navbaruser from '../components/navbaruser'
import Headeruser from '../components/headeruser'
import Modal from '../components/Modal'
import Notify from '../components/Notify'

import cities from "../data/cities";
import provinces from "../data/provinces";
import expeditions from "../data/expeditions";

import appStyles from "../css/App.module.css";
import formStyles from "../css/Form.module.css";
import SelectCity from "../components/SelectCity";
import headerStyles from "../css/Header.module.css";
import Selectprovince from "../components/SelectProvince";

export default function App() {
	const [origin, setOrigin] = useState("");
	const [toProvince, setToProvince] = useState("");
	const [destination, setDestination] = useState("");
	const [fromProvince, setFromProvince] = useState("");

	const [weight, setWeight] = useState(0);
	const [courier, setCourier] = useState("");

	const [data, setData] = useState("");
	const [submitStatus, setSubmitStatus] = useState(false);

	function submit(event) {
		event.preventDefault();
		setSubmitStatus(true);

		setTimeout(() => {
			window.scrollTo(0, 1240);
		});

		fetch("http://localhost:3000/api/rajaongkir", {
			method: "POST",
			body: JSON.stringify({ origin, destination, weight, courier }),
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setSubmitStatus(false);
			});
	}

	return (
		<div className="relative min-h-screen md:flex">  {/* mobile menu bar */}
		<Modal/>
		<Notify/>
		<Headeruser/>
		{/* sidebar */}
		<Navbaruser/>
		{/* content */}
	<div className="flex-1  text-xl font-bold">
		<div className={appStyles.container}>
			<div className={headerStyles.header}>
				<h1 className={headerStyles.header__title}>Cek Ongkir</h1>
				<p className={headerStyles.header__desc}>POS - JNE - TIKI</p>
			</div>

			<form
				onSubmit={submit}
				spellCheck="false"
				autoComplete="off"
				className={formStyles.form}
			>
				<Selectprovince
					provinces={provinces}
					statusPlace={"origin"}
					setTheProvince={setFromProvince}
				/>

				<SelectCity
					cities={cities}
					statusPlace={"origin"}
					setTheCity={setOrigin}
					province={fromProvince}
				/>

				<p className={formStyles.break}>. . .</p>

				<Selectprovince
					provinces={provinces}
					statusPlace={"destination"}
					setTheProvince={setToProvince}
				/>

				<SelectCity
					cities={cities}
					province={toProvince}
					setTheCity={setDestination}
					statusPlace={"destination"}
				/>

				<p className={formStyles.break}>. . .</p>

				<div className={formStyles.input_form}>
					<label htmlFor="weight" className={formStyles.input_form__label}>
						Berat barang (gram)
					</label>

					<input
						min="1"
						required
						id="weight"
						type="number"
						placeholder="berat barang"
						className={formStyles.input_form__input}
						onChange={(event) => setWeight(parseInt(event.target.value))}
					/>
				</div>

				<div style={{ position: "relative" }} className={formStyles.input_form}>
					<label htmlFor="expedition" className={formStyles.input_form__label}>
						Pilih Ekspedisi
					</label>

					<select
						required
						id="expedition"
						className={formStyles.input_form__input}
						style={{ appearance: "none", paddingRight: "60px" }}
						onChange={(event) => setCourier(event.target.value)}
					>
						<option hidden>Pilih Ekspedisi</option>
						{expeditions.map((expedition) => (
							<option key={expedition.value} value={expedition.value}>
								{expedition.name}
							</option>
						))}
					</select>

					<svg
						width="34px"
						height="34px"
						fill="currentColor"
						viewBox="0 0 20 20"
						className={formStyles.select_icon}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						/>
					</svg>
				</div>

				<button
					type="submit"
					className={formStyles.button_form}
					disabled={
						origin !== "" &&
						destination !== "" &&
						weight !== 0 &&
						courier !== ""
							? false
							: true
					}
				>
					Tampilkan hasil
				</button>
			</form>

			{submitStatus === false && data !== "" && <ResultContainer data={data} />}

			{submitStatus === true &&
				expeditions.map((expedition) => (
					<LoadingSkeleton key={expedition.value} />
				))}
		</div>
		</div>
		</div>
	);
}
