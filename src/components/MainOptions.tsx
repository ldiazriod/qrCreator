import React from 'react'
import styled from 'styled-components'
import TextArea from './TextArea'
import SelectField from './SelectField'
import ImageUploadField from './ImageUploadField'
import InputField from './InputField'
import { Label } from '../styles/styledComponents'
import CheckboxField from './CheckboxField'

interface MainOptionsProps {
    state: { [key: string]: any }
    handleChange: ({ target }: any) => void
    setState: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const MainOptions: React.FC<MainOptionsProps> = ({ state, handleChange, setState }) => {

    return (
        <div>
            <OptionContainer>
                <TextArea
                    name='value'
                    label='QR Code Content (value)'
                    handleChange={handleChange}
                />
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
                <ImageUploadField name='logoImage' handleChange={handleChange} maintainAspectRatio={state.maintainAspectRatio} qrSize={state.size} />
            </OptionContainer>
            <OptionContainer>
				<CheckboxField
					name="maintainAspectRatio"
					label="Aspect Ratio"
					handleChange={handleChange}
                    checked={state.maintainAspectRatio}
                    disabled={!state.logoImage}
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
                        disabled={!state.logoImage}
                    />
                    <RangeValue>{state.logoWidth}px</RangeValue>
                </RangeContainer>
            </OptionContainer>
            <OptionContainer>
                <InputField
                    type="range"
                    name="logoHeight"
                    min={20}
                    max={200}
                    step={5}
                    value={state.logoHeight}
                    handleChange={handleChange}
                    disabled={!state.logoImage}
                />

            </OptionContainer>
            <OptionContainer>
                <InputField
                    type="range"
                    name="logoOpacity"
                    min={0}
                    max={1}
                    step={0.1}
                    value={state.logoOpacity}
                    handleChange={handleChange}
                    disabled={!state.logoImage}

                />
            </OptionContainer>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px', justifyContent: 'space-around' }}>
                <InputField
                    name='fgColor'
                    label='Foreground Color'
                    type='color'
                    value={state.fgColor}
                    handleChange={handleChange}
                />
                <InputField
                    name='bgColor'
                    label='Background Color'
                    type='color'
                    value={state.bgColor}
                    handleChange={handleChange}
                />
            </div>
            <OptionContainer>
                <SelectField
                    name='qrStyle'
                    options={['squares', 'dots']}
                    handleChange={handleChange}
                    defaultValue={'state.qrStyle'}
                    label="QR Style"
                />
            </OptionContainer>
        </div>
    )
}

export default MainOptions

const OptionContainer = styled.div`
  margin-bottom: 1rem;
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