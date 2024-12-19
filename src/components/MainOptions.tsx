import React from 'react'
import styled from 'styled-components'
import TextArea from './TextArea'
import SelectField from './SelectField'
import ImageUploadField from './ImageUploadField'
import InputField from './InputField'
import CheckboxField from './CheckboxField'

interface MainOptionsProps {
    state: { [key: string]: any }
    handleChange: ({ target }: any) => void
}

const MainOptions: React.FC<MainOptionsProps> = ({ state, handleChange }) => {

    return (
        <div>
            <OptionContainer>
                <TextArea
                    name='value'
                    label='QR Code Content (value)'
                    handleChange={handleChange}
                    value={state.value}
                />
            </OptionContainer>
            <OptionContainer>
                <InputField
                    type="range"
                    name="size"
                    label="Size"
                    min={100}
                    max={500}
                    step={5}
                    value={state.size}
                    handleChange={handleChange}
                    logoParams={{
                        maintainAspectRatio: state.maintainAspectRatio,
                        logoWidth: state.logoWidth,
                        logoHeight: state.logoHeight,
                        qrSize: state.size
                    }}
                />
            </OptionContainer>
            <OptionContainer>
                <ImageUploadField
                    name='logoImage'
                    handleChange={handleChange}
                    maintainAspectRatio={state.maintainAspectRatio}
                    qrSize={state.size}
                    logoFile={state.logoFile}
                />
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
                <InputField
                    type="range"
                    name="logoWidth"
                    label='Logo Width'
                    min={20}
                    max={Math.round(state.size / 15) * 5}
                    step={1}
                    value={state.logoWidth}
                    handleChange={handleChange}
                    disabled={!state.logoImage}
                    logoParams={{
                        maintainAspectRatio: state.maintainAspectRatio,
                        logoWidth: state.logoWidth,
                        logoHeight: state.logoHeight,
                        qrSize: state.size
                    }}
                />
            </OptionContainer>
            <OptionContainer>
                <InputField
                    type="range"
                    name="logoHeight"
                    label='Logo Height'
                    min={20}
                    max={Math.round(state.size / 15) * 5}
                    step={1}
                    value={state.logoHeight}
                    handleChange={handleChange}
                    disabled={!state.logoImage}
                    logoParams={{
                        maintainAspectRatio: state.maintainAspectRatio,
                        logoWidth: state.logoWidth,
                        logoHeight: state.logoHeight,
                        qrSize: state.size
                    }}
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