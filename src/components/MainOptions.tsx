import React from 'react'
import styled from 'styled-components'
import TextArea from './TextArea'
import SelectField from './SelectField'
import ImageUploadField from './ImageUploadField'
import InputField from './InputField'
import CheckboxField from './CheckboxField'
import { tooltipDescriptions } from '../constants/tooltips'

interface MainOptionsProps {
    state: { [key: string]: any }
    handleChange: ({ target }: any) => void
}

const MainOptions: React.FC<MainOptionsProps> = ({ state, handleChange }) => {

    const isLogoMissing = (state.logoTab === 'file' && !state.logoImage) || (state.logoTab === 'url' && !state.logoUrl);

    return (
        <div>
            <OptionContainer
                title={tooltipDescriptions.value}>
                <TextArea
                    name='value'
                    label='URL'
                    handleChange={handleChange}
                    value={state.value}
                    placeholder='Enter URL'
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.size}>
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
                    custom={state.custom}
                    qrvalue={state.value}
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.logoImage}>
                <ImageUploadField
                    name={['logoImage', 'logoUrl']}
                    handleChange={handleChange}
                    maintainAspectRatio={state.maintainAspectRatio}
                    qrSize={state.size}
                    logoFile={state.logoFile}
                    custom={state.custom}
                    logoTab={state.logoTab}
                    logoImage={state.logoImage}
                    logoUrl={state.logoUrl}
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.maintainAspectRatio}>
                <CheckboxField
                    name="maintainAspectRatio"
                    label="Aspect Ratio"
                    handleChange={handleChange}
                    checked={state.maintainAspectRatio}
                    disabled={isLogoMissing}
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.logoWidth}>
                <InputField
                    type="range"
                    name="logoWidth"
                    label='Logo Width'
                    min={20}
                    max={Math.round(state.size / 15) * 5}
                    step={1}
                    value={state.logoWidth}
                    handleChange={handleChange}
                    disabled={isLogoMissing}
                    logoParams={{
                        maintainAspectRatio: state.maintainAspectRatio,
                        logoWidth: state.logoWidth,
                        logoHeight: state.logoHeight,
                        qrSize: state.size
                    }}
                    custom={state.custom}
                    qrvalue={state.value}
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.logoHeight}>
                <InputField
                    type="range"
                    name="logoHeight"
                    label='Logo Height'
                    min={20}
                    max={Math.round(state.size / 15) * 5}
                    step={1}
                    value={state.logoHeight}
                    handleChange={handleChange}
                    disabled={isLogoMissing}
                    logoParams={{
                        maintainAspectRatio: state.maintainAspectRatio,
                        logoWidth: state.logoWidth,
                        logoHeight: state.logoHeight,
                        qrSize: state.size
                    }}
                    custom={state.custom}
                    qrvalue={state.value}
                />
            </OptionContainer>
            <OptionContainer
                title={tooltipDescriptions.logoOpacity}>
                <InputField
                    type="range"
                    name="logoOpacity"
                    min={0}
                    max={1}
                    step={0.1}
                    value={state.logoOpacity}
                    handleChange={handleChange}
                    disabled={isLogoMissing}
                    qrvalue={state.value}
                />
            </OptionContainer>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginBottom: '20px', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.7rem' }}
                    title={tooltipDescriptions.fgColor}>
                    <InputField
                        name='fgColor'
                        label='Foreground Color'
                        type='color'
                        value={state.fgColor}
                        handleChange={handleChange}
                        qrvalue={state.value}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.7rem' }}
                    title={tooltipDescriptions.bgColor}>
                    <InputField
                        name='bgColor'
                        label='Background Color'
                        type='color'
                        value={state.bgColor}
                        handleChange={handleChange}
                        qrvalue={state.value}
                    />
                </div>
            </div>
            <OptionContainer
                title={tooltipDescriptions.qrStyle}>
                <SelectField
                    name='qrStyle'
                    options={['squares', 'dots']}
                    handleChange={handleChange}
                    value={state.qrStyle}
                    label="QR Style"
                    custom={state.custom}
                />
            </OptionContainer>
        </div>
    )
}

export default MainOptions

const OptionContainer = styled.div`
  margin-bottom: 1rem;
`;