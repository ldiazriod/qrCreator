import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Label } from "../styles/styledComponents";

type IInputFieldProps = {
	name: string;
	type: 'color' | 'range' | 'text';
	min?: number;
	max?: number;
	step?: number;
	handleChange: (target: any) => void;
	hideLabel?: boolean;
	value?: string | number;
	label?: string;
}

const InputField: React.FC<IInputFieldProps> = ({ name, type, handleChange, min, max, step, hideLabel, value, label }) => {
	const [inputValue, setInputValue] = useState<string | number | undefined>(value);

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
		<>
			{!hideLabel && <Label style={{ marginRight: '0.3rem'}}>{label || name}</Label>}
			<RangeContainer>
				<RangeInput
					type={type}
					id={name}
					name={name}
					onChange={onChange}
					min={min}
					max={max}
					step={step || 1}
					value={inputValue !== undefined ? inputValue : undefined}
				/>
				{type === "range" &&
					<span style={{ minWidth: "2.5rem" }}>{inputValue}px</span>
				}
			</RangeContainer>
		</>
	);
};

export default InputField;


const RangeContainer = styled.div`
	display: flex;
	align-items: center;
`;

const RangeInput = styled.input`
	flex-grow: 1;
	margin-right: 1rem;
`;