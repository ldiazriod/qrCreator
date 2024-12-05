import React from "react";
type ISelectFieldProps = {
	name: string;
	options: string[];
	handleChange: (target: any) => void;
	defaultValue?: string;
}

const SelectField = ({ name, options, handleChange, defaultValue }: ISelectFieldProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
			<label>{name}</label>
			<select name={name} onChange={handleChange} defaultValue={defaultValue}>
				{options.map((option: string, index: number) => (
					<option key={index} value={option}>{option}</option>
				))}
			</select>
		</div>
	);
}

export default SelectField