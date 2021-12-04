import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import './App.css';
import classNames from 'classnames';
import axios from 'axios';

const TextField = ({ className, ...props }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
	return <input type="number" className={classNames('py-3 px-5 rounded-md border border-gray-900', className)} {...props} />;
};

interface BMIData {
	bmi: number;
	category: string;
}

function App() {
	const [unitType, setUnitType] = useState<'english' | 'metric'>('english');
	const [feet, setFeet] = useState('');
	const [inches, setInches] = useState('');
	const [centimeters, setCentimeters] = useState('');
	const [pounds, setPounds] = useState('');
	const [kilograms, setKilograms] = useState('');
	const [loading, setLoading] = useState(false);
	const [bmiData, setBmiData] = useState<BMIData>({} as BMIData);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);

		axios
			.post(process.env.REACT_APP_API_URL + '/get-bmi', {
				unitType,
				feet,
				inches,
				centimeters,
				pounds,
				kilograms,
			})
			.then(({ data }) => {
				setBmiData(data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className=" py-10 min-h-screen flex justify-center items-center">
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<div className="flex justify-center text-xl gap-x-12 mb-10">
					<div
						className={classNames('cursor-pointer', { 'text-blue-500 underline': unitType === 'english' })}
						onClick={() => setUnitType('english')}
					>
						English
					</div>
					<div
						className={classNames('cursor-pointer', { 'text-blue-500 underline': unitType === 'metric' })}
						onClick={() => setUnitType('metric')}
					>
						Metric
					</div>
				</div>

				<div className="mb-4">
					<div>BMI: {bmiData.bmi}</div>
					<div>Category: {bmiData.category}</div>
				</div>

				<label htmlFor="" className="mb-2">
					Enter Height
				</label>
				<div className="flex gap-x-12">
					{unitType === 'english' && (
						<div className="flex gap-x-4">
							<TextField type="number" placeholder="Feet" className="w-40" value={feet} onChange={(e) => setFeet(e.target.value)} />
							<TextField type="number" placeholder="Inches" className="w-40" value={inches} onChange={(e) => setInches(e.target.value)} />
						</div>
					)}

					{unitType === 'metric' && (
						<TextField
							type="number"
							placeholder="Centimeters"
							className="w-40"
							value={centimeters}
							onChange={(e) => setCentimeters(e.target.value)}
						/>
					)}
				</div>

				<label htmlFor="" className="pt-6 mb-2">
					Enter Weight
				</label>
				<div className="flex gap-x-12">
					{unitType === 'english' && (
						<TextField type="number" placeholder="lbs" value={pounds} onChange={(e) => setPounds(e.target.value)} />
					)}

					{unitType === 'metric' && (
						<TextField type="number" placeholder="kg" value={kilograms} onChange={(e) => setKilograms(e.target.value)} />
					)}
				</div>

				<div className="mt-12 text-right">
					<button
						type="submit"
						className={classNames(
							'py-3 px-5 w-40 rounded-md border-0  text-white text-lg',
							{ 'bg-gray-400 cursor-not-allowed': loading },
							{ 'bg-blue-600': !loading }
						)}
						disabled={loading}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default App;
