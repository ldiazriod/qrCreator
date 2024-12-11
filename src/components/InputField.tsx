import React, { useState, useEffect } from "react";

type IInputFieldProps = {
	name: string;
	type: 'color' | 'range' | 'text';
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: string | number;
	handleChange: (target: any) => void;
	hideLabel?: boolean;
	value?: string | number;
	label?: string;
}

const InputField: React.FC<IInputFieldProps> = ({ name, type, handleChange, min, max, step, defaultValue, hideLabel, value, label }) => {
	const [inputValue, setInputValue] = useState<string | number | undefined>(defaultValue);

	useEffect(() => {
		if (value !== undefined) {
			setInputValue(value);
		}
	}, [value]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleChange(e);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', alignItems: "center", gap: "0.3rem", flexGrow: "1", marginRight: "1rem" }}>
			{!hideLabel && <label>{label || name}</label>}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<input
					type={type}
					id={name}
					name={name}
					onChange={onChange}
					min={min}
					max={max}
					step={step || 1}
					defaultValue={0}
					value={inputValue}
				/>
				{type === "range" &&
					<span style={{ minWidth: "2.5rem" }}>{inputValue}px</span>
				}
			</div>
		</div>
	);
};

export default InputField;