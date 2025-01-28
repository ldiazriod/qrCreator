import React from "react";
import { styled } from "styled-components";
import { eyeRadiusCustom, eyeRadiusSquare } from "../constants/settings";
type ISelectFieldProps = {
	name: string;
	options: string[];
	handleChange: (target: any) => void;
	defaultValue?: string;
	label?: string;
	value: string;
	custom: boolean;
	maxEyeRadius?: number;
}

const SelectField = ({ name, options, handleChange, label, value, custom, maxEyeRadius }: ISelectFieldProps) => {
	
	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {name, value} = event.target;
		handleChange(event);
		if (name === 'qrStyle' && !custom) {
			let eyeRadius = value === 'dots' ? eyeRadiusCustom(maxEyeRadius || 100) : eyeRadiusSquare;
			Object.keys(eyeRadius).forEach(key => {
				handleChange({ target: { name: key, value: eyeRadius[key as keyof typeof eyeRadius] } });
			});
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
			<label>{label}</label>
			<Select 
			name={name} 
			onChange={onChange} 
			value={value}
			>
				{options.map((option: string, index: number) => (
					<option key={index} value={option}>{option}</option>
				))}
			</Select>
		</div>
	);
}

export default SelectField

const Select = styled.select`
  margin-top: 0.3rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;