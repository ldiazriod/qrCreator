import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Label } from "../styles/styledComponents";
import { calcMaxEyeRadius, calculateErrorCorrectionLevel, updateEyeRadius, updateLogoSize } from "../utils/qr-helpers";
import { EyeRadiusUpdateParams, LogoUpdateParams } from "../types/input";

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
	custom?: boolean;
	logoParams?: LogoUpdateParams
	eyeRadiusParams?: EyeRadiusUpdateParams
};

const InputField: React.FC<IInputFieldProps> = ({
	name,
	type,
	handleChange,
	min,
	max,
	step,
	hideLabel,
	value,
	label,
	disabled,
	custom,
	logoParams,
	eyeRadiusParams
}) => {
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
			const { name, value } = e.target;

			if (name === 'size') {
				//Handle size change
				updateLogoSize(Number(value), logoWidth, logoHeight, qrSize, handleChange);
				if (eyeRadiusParams) {
					const { maxEyeRadius, eyeRadius, ecLevel, qrvalue } = eyeRadiusParams;
					const newMaxRadius = calcMaxEyeRadius(Number(value), ecLevel, qrvalue);
					updateEyeRadius(maxEyeRadius, newMaxRadius, eyeRadius, handleChange);
					handleChange({ target: { name: 'maxEyeRadius', value: newMaxRadius } });
				}
			} else if (name === 'logoWidth' && maintainAspectRatio) {	//Handle logo width change
				handleChange({ target: { name: 'logoHeight', value: Math.round(Number(value) / (logoWidth / logoHeight)) } });
			} else if (name === 'logoHeight' && maintainAspectRatio) {	//Handle logo height change
				handleChange({ target: { name: 'logoWidth', value: Math.round(Number(value) * (logoWidth / logoHeight)) } });
			}
			
			if (!custom && (name === 'logoWidth' || name === 'logoHeight')) {	//Update error correction level based on logo size
				handleChange({ target: { name: 'ecLevel', value: calculateErrorCorrectionLevel(Number(value), logoHeight, qrSize) } });
			}
		}
	};

	return (
		<>
			{!hideLabel && type !== 'color' && <Label style={{ marginRight: '0.3rem' }}>{label || name}</Label>}
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