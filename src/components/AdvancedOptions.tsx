import React from 'react'
import styled from 'styled-components'
import CheckboxField from './CheckboxField'
import InputField from './InputField'

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
			defaultValue={(state as any)[id] || 0}
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
        <Label htmlFor="quietZone">Quiet Zone</Label>
        <RangeContainer>
          <RangeInput
            type="range"
            id="quietZone"
            name="quietZone"
            min={0}
            max={100}
            step={1}
            value={state.quietZone}
            onChange={handleChange}
          />
          <RangeValue>{state.quietZone}px</RangeValue>
        </RangeContainer>
      </OptionContainer>
      <OptionContainer>
          <CheckboxField
            name="removeQrCodeBehindLogo"
            label="Remove QR Code Behind Logo"
            handleChange={handleChange}
          />
      </OptionContainer>
      <OptionContainer>
        <Label htmlFor="logoPadding">Logo Padding</Label>
        <RangeContainer>
          <RangeInput
            type="range"
            id="logoPadding"
            name="logoPadding"
            min={0}
            max={20}
            step={1}
            value={state.logoPadding || 0}
            onChange={handleChange}
          />
          <RangeValue>{state.logoPadding || 0}px</RangeValue>
        </RangeContainer>
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
      <OptionContainer>

      </OptionContainer>
      <div style={{ padding: '15px' }}>
						<p>eyeRadius</p>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div>
								<p style={{ fontSize: 14 }}>Top left eye</p>
								<p style={{ fontSize: 12 }}>Outer</p>
								{buildEyeRadiusInput('eyeradius_0_outer_0')}
								{buildEyeRadiusInput('eyeradius_0_outer_1')}
								{buildEyeRadiusInput('eyeradius_0_outer_2')}
								{buildEyeRadiusInput('eyeradius_0_outer_3')}
								<p style={{ fontSize: 12 }}>Inner</p>
								{buildEyeRadiusInput('eyeradius_0_inner_0')}
								{buildEyeRadiusInput('eyeradius_0_inner_1')}
								{buildEyeRadiusInput('eyeradius_0_inner_2')}
								{buildEyeRadiusInput('eyeradius_0_inner_3')}
							</div>
							<div>
								<p style={{ fontSize: 14 }}>Top right eye</p>
								<p style={{ fontSize: 12 }}>Outer</p>
								{buildEyeRadiusInput('eyeradius_1_outer_0')}
								{buildEyeRadiusInput('eyeradius_1_outer_1')}
								{buildEyeRadiusInput('eyeradius_1_outer_2')}
								{buildEyeRadiusInput('eyeradius_1_outer_3')}
								<p style={{ fontSize: 12 }}>Inner</p>
								{buildEyeRadiusInput('eyeradius_1_inner_0')}
								{buildEyeRadiusInput('eyeradius_1_inner_1')}
								{buildEyeRadiusInput('eyeradius_1_inner_2')}
								{buildEyeRadiusInput('eyeradius_1_inner_3')}
							</div>
							<div>
								<p style={{ fontSize: 14 }}>Bottom left eye</p>
								<p style={{ fontSize: 12 }}>Outer</p>
								{buildEyeRadiusInput('eyeradius_2_outer_0')}
								{buildEyeRadiusInput('eyeradius_2_outer_1')}
								{buildEyeRadiusInput('eyeradius_2_outer_2')}
								{buildEyeRadiusInput('eyeradius_2_outer_3')}
								<p style={{ fontSize: 12 }}>Inner</p>
								{buildEyeRadiusInput('eyeradius_2_inner_0')}
								{buildEyeRadiusInput('eyeradius_2_inner_1')}
								{buildEyeRadiusInput('eyeradius_2_inner_2')}
								{buildEyeRadiusInput('eyeradius_2_inner_3')}
							</div>
						</div>
					</div>
					<div style={{ padding: '15px' }}>
						<p>eyeColor</p>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div>
								<p style={{ fontSize: 14 }}>Top left eye</p>
								<p style={{ fontSize: 12 }}>Outer</p>
								<InputField
									name='eyecolor_0_outer'
									type='color'
									defaultValue={state.fgColor ?? '#000000'}
									handleChange={handleChange}
									hideLabel={true}
								/>
								<p style={{ fontSize: 12 }}>Inner</p>
								<InputField
									name='eyecolor_0_inner'
									type='color'
									defaultValue={state.fgColor ?? '#000000'}
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
									defaultValue={state.fgColor ?? '#000000'}
									handleChange={handleChange}
									hideLabel={true}
								/>
								<p style={{ fontSize: 12 }}>Inner</p>
								<InputField
									name='eyecolor_1_inner'
									type='color'
									defaultValue={state.fgColor ?? '#000000'}
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
									defaultValue={state.fgColor ?? '#000000'}
									handleChange={handleChange}
									hideLabel={true}
								/>
								<p style={{ fontSize: 12 }}>Inner</p>
								<InputField
									name='eyecolor_2_inner'
									type='color'
									defaultValue={state.fgColor ?? '#000000'}
									handleChange={handleChange}
									hideLabel={true}
								/>
							</div>
						</div>
					</div>
</div>
  )
}

export default AdvancedOptions

const OptionContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: medium;
`;



const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RangeInput = styled.input`
  flex-grow: 1;
  margin-right: 1rem;
`;

const RangeValue = styled.span`
  min-width: 2.5rem;
`;
