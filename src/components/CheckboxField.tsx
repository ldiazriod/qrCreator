import React from "react";

type ICheckboxFieldProps = {
	name: string;
	handleChange: (target: any) => void;
	label?: string;
}

const CheckboxField = ({ name, handleChange, label }: ICheckboxFieldProps) => {
	const handleCheckboxToggle = (e: any) => {
		const target = {
			name,
			value: e.target.checked
		}
		handleChange({ target });
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', alignItems: 'center', paddingTop: '6px', paddingBottom: '6px' }}>
			<input style={{ marginRight: '0.5rem'}}

				type='checkbox'
				name={name}
				onChange={handleCheckboxToggle}
			/>
			<label htmlFor={name}>{label}</label>
		</div>
	);
}

export default CheckboxField