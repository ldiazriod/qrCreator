import React from 'react'
import styled from 'styled-components'

interface AdvancedOptionsProps {
  state: { [key: string]: any }
  handleChange: ({ target }: any) => void
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ state, handleChange }) => {
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
        <Label>
          <Checkbox
            type="checkbox"
            name="enableCORS"
            checked={state.enableCORS}
            onChange={handleChange}
          />
          Enable CORS
        </Label>
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
        <Label htmlFor="bgColor">Background Color</Label>
        <Input
          type="color"
          id="bgColor"
          name="bgColor"
          value={state.bgColor}
          onChange={handleChange}
        />
      </OptionContainer>
      <OptionContainer>
        <Label htmlFor="fgColor">Foreground Color</Label>
        <Input
          type="color"
          id="fgColor"
          name="fgColor"
          value={state.fgColor}
          onChange={handleChange}
        />
      </OptionContainer>
      <OptionContainer>
        <Label>
          <Checkbox
            type="checkbox"
            name="removeQrCodeBehindLogo"
            checked={state.removeQrCodeBehindLogo}
            onChange={handleChange}
          />
          Remove QR Code Behind Logo
        </Label>
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
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
