import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Label } from "../styles/styledComponents";
import calculateErrorCorrectionLevel from "../utils/calcErrorCorrectionLevel";

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
	disabled?: boolean;
	logoParams?: {
		qrSize: number;
		maintainAspectRatio: boolean;
		logoWidth: number;
		logoHeight: number;
	}
	custom?: boolean;
};

const InputField: React.FC<IInputFieldProps> = ({ name, type, handleChange, min, max, step, hideLabel, value, label, disabled, logoParams, custom }) => {
	const [inputValue, setInputValue] = useState<string | number | undefined>(value);

	useEffect(() => {
		if (value !== undefined) {
			setInputValue(value);
		}
	}, [value]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		handleChange(e);
		if (logoParams) {
			const { maintainAspectRatio, logoWidth, logoHeight, qrSize } = logoParams;
			if (e.target.name === 'size') {
				const width = (Number(value) * (logoWidth / qrSize));
				const height = (Number(value) * (logoHeight / qrSize));
				handleChange({ target: { name: 'logoWidth', value: width } });
				handleChange({ target: { name: 'logoHeight', value: height } });
				if (!custom) {
					handleChange({ target: { name: 'ecLevel', value: calculateErrorCorrectionLevel(width, height, Number(value)) } });
				}

			} else if (e.target.name === 'logoWidth' && maintainAspectRatio) {
				handleChange({ target: { name: 'logoHeight', value: Math.round(Number(value) / (logoWidth / logoHeight)) } });
				if (!custom) {
					handleChange({ target: { name: 'ecLevel', value: calculateErrorCorrectionLevel(Number(value), logoHeight, qrSize) } });
				}
			} else if (e.target.name === 'logoHeight' && maintainAspectRatio) {
				calculateErrorCorrectionLevel(logoWidth, Number(value), qrSize);
				handleChange({ target: { name: 'logoWidth', value: Math.round(Number(value) * (logoWidth / logoHeight)) } });
				if (!custom) {
					handleChange({ target: { name: 'ecLevel', value: calculateErrorCorrectionLevel(logoWidth, Number(value), qrSize) } });
				}

			}
		}
	};

	return (
		<>
			{!hideLabel && type	!== 'color' && <Label style={{ marginRight: '0.3rem' }}>{label || name}</Label>}
			{!hideLabel && type === 'color' && <ColorLabel style={{ marginRight: '0.3rem' }}>{label || name}</ColorLabel>}
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
					disabled={disabled}
				/>
				{type === "range" &&
					<span style={{ minWidth: "2.5rem" }}>{Math.round(Number(inputValue))}px</span>
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

	&[type="color"] {
    width: 75px;
    height: 35px;
    padding: 2px;
	}

	@media (max-width: 1330px) {
		margin-right: 0.1rem;
  	}
`;

const ColorLabel = styled.label`
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	font-weight: medium;
`;