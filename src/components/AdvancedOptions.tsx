import React from 'react'
import styled from 'styled-components'
import CheckboxField from './CheckboxField'
import InputField from './InputField'
import { Label } from '../styles/styledComponents'
import { Card, CardContent } from '../App'
import { tooltipDescriptions } from '../constants/tooltips'
import { eyeRadiusCustom, eyeRadiusSquare } from '../constants/settings'
import { calcMaxEyeRadius } from '../utils/calcEyeRadius'

interface AdvancedOptionsProps {
	state: { [key: string]: any }
	handleChange: ({ target }: any) => void
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ state, handleChange }) => {

	const isLogoMissing = (state.logoTab === 'file' && !state.logoImage) || (state.logoTab === 'url' && !state.logoUrl);

	const buildEyeRadiusInput = (id: string) => {
		const maxRadius = calcMaxEyeRadius(state.size, state.ecLevel, state.value);



		return <InputField
			name={`eyeRadius.${id}`}
			type='range'
			handleChange={handleChange}
			min={0}
			max={maxRadius}
			hideLabel
			value={state.eyeRadius[id] || 0}
			custom={state.custom}
			qrvalue={state.value}
		/>
	};

	const handleEyeButtonClick = () => {
		const maxRadius = calcMaxEyeRadius(state.size, state.ecLevel, state.value);
		let eyeRadius = state.eyeRadiusStyle === 'square' ? eyeRadiusCustom(maxRadius) : eyeRadiusSquare;
		Object.keys(eyeRadius).forEach(key => {
			handleChange({ target: { name: key, value: eyeRadius[key as keyof typeof eyeRadius] } });
		});
		handleChange({ target: { name: 'eyeRadiusStyle', value: state.eyeRadiusStyle === 'square' ? 'circle' : 'square' } });
	}

	return (
		<div>
			<OptionContainer
				title={tooltipDescriptions.custom}>
				<CheckboxField
					name="custom"
					label="Customize Settings (Disable auto-adjust)"
					handleChange={handleChange}
					checked={state.custom}
				/>
			</OptionContainer>
			<OptionContainer
				title={tooltipDescriptions.ecLevel}>
				<Label htmlFor="ecLevel">Error Correction Level</Label>
				<Select
					id="ecLevel"
					name="ecLevel"
					value={state.ecLevel}
					onChange={handleChange}
				>
					<option value="L">L</option>
					<option value="M">M</option>
					<option value="Q">Q</option>
					<option value="H">H</option>
				</Select>
			</OptionContainer>
			<OptionContainer
				title={tooltipDescriptions.quietZone}>
				<InputField
					name='quietZone'
					label='Quiet Zone'
					type='range'
					min={0}
					max={100}
					step={1}
					value={state.quietZone}
					handleChange={handleChange}
					qrvalue={state.value}
				/>
			</OptionContainer>
			<OptionContainer
				title={tooltipDescriptions.removeQrCodeBehindLogo}>
				<CheckboxField
					name="removeQrCodeBehindLogo"
					label="Remove QR Code Behind Logo"
					handleChange={handleChange}
					checked={state.removeQrCodeBehindLogo}
					disabled={isLogoMissing}

				/>
			</OptionContainer>
			<OptionContainer
				title={tooltipDescriptions.logoPadding}>
				<InputField
					name='logoPadding'
					label='Logo Padding'
					type='range'
					min={0}
					max={30}
					step={1}
					value={state.logoPadding || 0}
					handleChange={handleChange}
					disabled={isLogoMissing}
					qrvalue={state.value}
				/>
			</OptionContainer>
			<OptionContainer
				title={tooltipDescriptions.logoPaddingStyle}>
				<Label htmlFor="logoPaddingStyle">Logo Padding Style</Label>
				<Select
					id="logoPaddingStyle"
					name="logoPaddingStyle"
					value={state.logoPaddingStyle}
					onChange={handleChange}
					disabled={isLogoMissing}
				>
					<option value="square">Square</option>
					<option value="circle">Circle</option>
				</Select>
			</OptionContainer>
			<Card>
				<CardContent style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flexWrap: 'wrap', maxWidth: '100%' }}>
					<div
						title={tooltipDescriptions.eyeRadius}>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<h3 style={{ fontWeight: 'bold' }}>Eye Radius</h3>
							<div
								style={{ display: 'flex', flexDirection: 'row', gap: '0.3rem', alignItems: 'center' }}
								title={state.eyeRadiusStyle === 'square' ? tooltipDescriptions.eyesCircleButton : tooltipDescriptions.eyesSquareButton}
							>
								<label>Eye shape: </label>
								<CircleSquareButton
									onClick={handleEyeButtonClick}
								>
									{state.eyeRadiusStyle === 'square' ? 'Circle' : 'Square'}
								</CircleSquareButton>
							</div>
						</div>
						<div style={{ fontSize: 15, fontWeight: 'bold', marginTop: '0.7rem', marginBottom: '0.5rem' }}>Top left eye</div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<OuterEyeRadiusContainer>
								<div style={{ fontSize: 12 }}>Outer</div>
								{buildEyeRadiusInput('eyeradius_0_outer_0')}
								{buildEyeRadiusInput('eyeradius_0_outer_1')}
								{buildEyeRadiusInput('eyeradius_0_outer_2')}
								{buildEyeRadiusInput('eyeradius_0_outer_3')}
							</OuterEyeRadiusContainer>
							<div>
								<div style={{ fontSize: 12 }}>Inner</div>
								{buildEyeRadiusInput('eyeradius_0_inner_0')}
								{buildEyeRadiusInput('eyeradius_0_inner_1')}
								{buildEyeRadiusInput('eyeradius_0_inner_2')}
								{buildEyeRadiusInput('eyeradius_0_inner_3')}
							</div>
						</div>
						<div style={{ fontSize: 15, fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>Top right eye</div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<OuterEyeRadiusContainer>
								<div style={{ fontSize: 12 }}>Outer</div>
								{buildEyeRadiusInput('eyeradius_1_outer_0')}
								{buildEyeRadiusInput('eyeradius_1_outer_1')}
								{buildEyeRadiusInput('eyeradius_1_outer_2')}
								{buildEyeRadiusInput('eyeradius_1_outer_3')}
							</OuterEyeRadiusContainer>
							<div>
								<div style={{ fontSize: 12 }}>Inner</div>
								{buildEyeRadiusInput('eyeradius_1_inner_0')}
								{buildEyeRadiusInput('eyeradius_1_inner_1')}
								{buildEyeRadiusInput('eyeradius_1_inner_2')}
								{buildEyeRadiusInput('eyeradius_1_inner_3')}
							</div>
						</div>
						<div style={{ fontSize: 15, fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>Bottom left eye</div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<OuterEyeRadiusContainer>
								<div style={{ fontSize: 12 }}>Outer</div>
								{buildEyeRadiusInput('eyeradius_2_outer_0')}
								{buildEyeRadiusInput('eyeradius_2_outer_1')}
								{buildEyeRadiusInput('eyeradius_2_outer_2')}
								{buildEyeRadiusInput('eyeradius_2_outer_3')}
							</OuterEyeRadiusContainer>
							<div>
								<div style={{ fontSize: 12 }}>Inner</div>
								{buildEyeRadiusInput('eyeradius_2_inner_0')}
								{buildEyeRadiusInput('eyeradius_2_inner_1')}
								{buildEyeRadiusInput('eyeradius_2_inner_2')}
								{buildEyeRadiusInput('eyeradius_2_inner_3')}
							</div>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}
						title={tooltipDescriptions.eyeColor}>
						<h3 style={{ fontWeight: 'bold' }}>Eye Color</h3>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
							<div style={{ gap: '0.7rem' }}>
								<EyeNameDiv>Top left eye</EyeNameDiv>
								<div style={{ fontSize: 12 }}>Outer</div>
								<InputField
									name='eyecolor_0_outer'
									type='color'
									value={state.eyecolor_0_outer ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
								<div style={{ fontSize: 12, marginTop: '0.7rem' }}>Inner</div>
								<InputField
									name='eyecolor_0_inner'
									type='color'
									value={state.eyecolor_0_inner ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
							</div>
							<div style={{ gap: '0.7rem' }}>
								<EyeNameDiv>Top right eye</EyeNameDiv>
								<div style={{ fontSize: 12 }}>Outer</div>
								<InputField
									name='eyecolor_1_outer'
									type='color'
									value={state.eyecolor_1_outer ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
								<div style={{ fontSize: 12, marginTop: '0.7rem' }}>Inner</div>
								<InputField
									name='eyecolor_1_inner'
									type='color'
									value={state.eyecolor_1_inner ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
							</div>
							<div style={{ gap: '0.7rem' }}>
								<EyeNameDiv>Bottom left eye</EyeNameDiv>
								<div style={{ fontSize: 12 }}>Outer</div>
								<InputField
									name='eyecolor_2_outer'
									type='color'
									value={state.eyecolor_2_outer ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
								<div style={{ fontSize: 12, marginTop: '0.7rem' }}>Inner</div>
								<InputField
									name='eyecolor_2_inner'
									type='color'
									value={state.eyecolor_2_inner ?? state.fgColor}
									handleChange={handleChange}
									hideLabel={true}
									qrvalue={state.value}
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default AdvancedOptions

const OptionContainer = styled.div`
  margin-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;

const CircleSquareButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  //height: 100%;
  align-self: center;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const OuterEyeRadiusContainer = styled.div`
	margin-right: 1rem;

	@media (max-width: 1330px) {
		margin-right: 0;
  	}
`;

const EyeNameDiv = styled.div`
	font-size: 15px;
	font-weight: bold;
	margin-top: 0.7rem;
	margin-bottom: 0.5rem;

	@media (max-width: 1330px) {
		font-size: 12.5px;
  	}

`;