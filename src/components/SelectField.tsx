import React from "react";
type ISelectFieldProps = {
	name: string;
	options: string[];
	handleChange: (target: any) => void;
}

const SelectField = ({ name, options, handleChange }: ISelectFieldProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
			<label>{name}</label>
			<select name={name} onChange={handleChange}>
				{options.map((option: string, index: number) => (
					<option key={index} value={option}>{option}</option>
				))}
			</select>
		</div>
	);
}

export default SelectField