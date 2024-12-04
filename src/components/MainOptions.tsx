import React from 'react'
import styled from 'styled-components'
import TextArea from './TextArea'

interface MainOptionsProps {
    state: { [key: string]: any }
    handleChange: ({ target }: any) => void
}

const MainOptions: React.FC<MainOptionsProps> = ({ state, handleChange }) => {
    return (
        <div>
            <OptionContainer>
                <Label htmlFor="value">QR Code Content (value)</Label>
                <TextArea
                    name='value'
                    handleChange={handleChange}
                />
                {/*<Input
            id="value"
            name="value"
            value={state.value}
            onChange={handleChange}
          />*/}
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="size">Size</Label>
                <RangeContainer>
                    <RangeInput
                        type="range"
                        id="size"
                        name="size"
                        min={100}
                        max={500}
                        step={10}
                        value={state.size}
                        onChange={handleChange}
                    />
                    <RangeValue>{state.size}px</RangeValue>
                </RangeContainer>
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="logoImage">Logo Image URL</Label>
                <Input
                    id="logoImage"
                    name="logoImage"
                    value={state.logoImage}
                    onChange={handleChange}
                />
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="logoWidth">Logo Width</Label>
                <RangeContainer>
                    <RangeInput
                        type="range"
                        id="logoWidth"
                        name="logoWidth"
                        min={20}
                        max={200}
                        step={5}
                        value={state.logoWidth}
                        onChange={handleChange}
                    />
                    <RangeValue>{state.logoWidth}px</RangeValue>
                </RangeContainer>
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="logoHeight">Logo Height</Label>
                <RangeContainer>
                    <RangeInput
                        type="range"
                        id="logoHeight"
                        name="logoHeight"
                        min={20}
                        max={200}
                        step={5}
                        value={state.logoHeight}
                        onChange={handleChange}
                    />
                    <RangeValue>{state.logoHeight}px</RangeValue>
                </RangeContainer>
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="logoOpacity">Logo Opacity</Label>
                <RangeContainer>
                    <RangeInput
                        type="range"
                        id="logoOpacity"
                        name="logoOpacity"
                        min={0}
                        max={1}
                        step={0.1}
                        value={state.logoOpacity}
                        onChange={handleChange}
                    />
                    <RangeValue>{state.logoOpacity}</RangeValue>
                </RangeContainer>
            </OptionContainer>
            <OptionContainer>
                <Label htmlFor="qrStyle">QR Style</Label>
                <Select
                    id="qrStyle"
                    name="qrStyle"
                    value={state.qrStyle}
                    onChange={handleChange}
                >
                    <option value="squares">Squares</option>
                    <option value="dots">Dots</option>
                </Select>
            </OptionContainer>
        </div>
    )
}

export default MainOptions

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