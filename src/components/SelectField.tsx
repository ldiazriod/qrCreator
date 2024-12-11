import React from "react";
import { styled } from "styled-components";
type ISelectFieldProps = {
	name: string;
	options: string[];
	handleChange: (target: any) => void;
	defaultValue?: string;
	label?: string;
}

const SelectField = ({ name, options, handleChange, defaultValue, label }: ISelectFieldProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
			<label>{label}</label>
			<Select name={name} onChange={handleChange} defaultValue={defaultValue}>
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