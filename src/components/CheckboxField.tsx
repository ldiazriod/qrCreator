import React from "react";

type ICheckboxFieldProps = {
	name: string;
	handleChange: (target: any) => void;
}

const CheckboxField = ({ name, handleChange }: ICheckboxFieldProps) => {
	const handleCheckboxToggle = (e: any) => {
		const target = {
			name,
			value: e.target.checked
		}
		handleChange({ target });
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', alignItems: 'center', paddingTop: '6px', paddingBottom: '6px' }}>
			<input
				type='checkbox'
				name={name}
				onChange={handleCheckboxToggle}
			/>
			<label htmlFor={name}>{name}</label>
		</div>
	);
}

export default CheckboxField