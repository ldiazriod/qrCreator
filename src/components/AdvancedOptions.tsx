import React from 'react'
import styled from 'styled-components'
import CheckboxField from './CheckboxField'
import InputField from './InputField'
import { Label } from '../styles/styledComponents'
import { Card, CardContent } from '../App'

interface AdvancedOptionsProps {
	state: { [key: string]: any }
	handleChange: ({ target }: any) => void
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ state, handleChange }) => {

	const buildEyeRadiusInput = (id: string) => {
		return <InputField
			name={id}
			type='range'
			handleChange={handleChange}
			min={0}
			max={50}
			hideLabel
			value={(state as any)[id] || 0}
		/>
	};

	return (
		<div>
			<OptionContainer>
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
			<OptionContainer>
				<CheckboxField
					name="enableCORS"
					label="Enable CORS"
					handleChange={handleChange}
				/>
			</OptionContainer>
			<OptionContainer>
				<InputField
					name='quietZone'
					label='Quiet Zone'
					type='range'
					min={0}
					max={100}
					step={1}
					value={state.quietZone}
					handleChange={handleChange}
				/>
			</OptionContainer>
			<OptionContainer>
				<CheckboxField
					name="removeQrCodeBehindLogo"
					label="Remove QR Code Behind Logo"
					handleChange={handleChange}
				/>
			</OptionContainer>
			<OptionContainer>
				<InputField
					name='logoPadding'
					label='Logo Padding'
					type='range'
					min={0}
					max={20}
					step={1}
					value={state.logoPadding || 0}
					handleChange={handleChange}
				/>
			</OptionContainer>
			<OptionContainer>
				<Label htmlFor="logoPaddingStyle">Logo Padding Style</Label>
				<Select
					id="logoPaddingStyle"
					name="logoPaddingStyle"
					value={state.logoPaddingStyle}
					onChange={handleChange}
				>
					<option value="square">Square</option>
					<option value="circle">Circle</option>
				</Select>
			</OptionContainer>
			<Card>
				<CardContent>
					<h3 style={{ fontWeight: 'bold' }}>Eye Radius</h3>
					<h6 style={{ fontSize: 15, fontWeight: 'bold', marginTop: '0.7rem', marginBottom: '0.5rem' }}>Top left eye</h6>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div>
							<div style={{ fontSize: 12 }}>Outer</div>
							{buildEyeRadiusInput('eyeradius_0_outer_0')}
							{buildEyeRadiusInput('eyeradius_0_outer_1')}
							{buildEyeRadiusInput('eyeradius_0_outer_2')}
							{buildEyeRadiusInput('eyeradius_0_outer_3')}
						</div>
						<div>
							<div style={{ fontSize: 12 }}>Inner</div>
							{buildEyeRadiusInput('eyeradius_0_inner_0')}
							{buildEyeRadiusInput('eyeradius_0_inner_1')}
							{buildEyeRadiusInput('eyeradius_0_inner_2')}
							{buildEyeRadiusInput('eyeradius_0_inner_3')}
						</div>
					</div>
					<div style={{ fontSize: 15, fontWeight:'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>Top right eye</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div>
							<div style={{ fontSize: 12 }}>Outer</div>
							{buildEyeRadiusInput('eyeradius_1_outer_0')}
							{buildEyeRadiusInput('eyeradius_1_outer_1')}
							{buildEyeRadiusInput('eyeradius_1_outer_2')}
							{buildEyeRadiusInput('eyeradius_1_outer_3')}
						</div>
						<div>
							<div style={{ fontSize: 12 }}>Inner</div>
							{buildEyeRadiusInput('eyeradius_1_inner_0')}
							{buildEyeRadiusInput('eyeradius_1_inner_1')}
							{buildEyeRadiusInput('eyeradius_1_inner_2')}
							{buildEyeRadiusInput('eyeradius_1_inner_3')}
						</div>
					</div>
					<div style={{ fontSize: 15, fontWeight:'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>Bottom left eye</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div>
							<div style={{ fontSize: 12 }}>Outer</div>
							{buildEyeRadiusInput('eyeradius_2_outer_0')}
							{buildEyeRadiusInput('eyeradius_2_outer_1')}
							{buildEyeRadiusInput('eyeradius_2_outer_2')}
							{buildEyeRadiusInput('eyeradius_2_outer_3')}
						</div>
						<div>
							<div style={{ fontSize: 12 }}>Inner</div>
							{buildEyeRadiusInput('eyeradius_2_inner_0')}
							{buildEyeRadiusInput('eyeradius_2_inner_1')}
							{buildEyeRadiusInput('eyeradius_2_inner_2')}
							{buildEyeRadiusInput('eyeradius_2_inner_3')}
						</div>
					</div>
				</CardContent>
			</Card>
			<Card style={{marginTop: '0.7rem'}}>
				<CardContent>
					<div>Eye Color</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div>
							<p style={{ fontSize: 14 }}>Top left eye</p>
							<p style={{ fontSize: 12 }}>Outer</p>
							<InputField
								name='eyecolor_0_outer'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
							<p style={{ fontSize: 12 }}>Inner</p>
							<InputField
								name='eyecolor_0_inner'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
						</div>
						<div>
							<p style={{ fontSize: 14 }}>Top right eye</p>
							<p style={{ fontSize: 12 }}>Outer</p>
							<InputField
								name='eyecolor_1_outer'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
							<p style={{ fontSize: 12 }}>Inner</p>
							<InputField
								name='eyecolor_1_inner'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
						</div>
						<div>
							<p style={{ fontSize: 14 }}>Bottom left eye</p>
							<p style={{ fontSize: 12 }}>Outer</p>
							<InputField
								name='eyecolor_2_outer'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
							<p style={{ fontSize: 12 }}>Inner</p>
							<InputField
								name='eyecolor_2_inner'
								type='color'
								value={state.fgColor ?? '#000000'}
								handleChange={handleChange}
								hideLabel={true}
							/>
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
