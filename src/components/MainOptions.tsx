import React from 'react'
import styled from 'styled-components'
import TextArea from './TextArea'
import SelectField from './SelectField'
import ImageUploadField from './ImageUploadField'

interface MainOptionsProps {
    state: { [key: string]: any }
    handleChange: ({ target }: any) => void
    setState: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const MainOptions: React.FC<MainOptionsProps> = ({ state, handleChange, setState }) => {

    const handleDeleteLogo = () => {
        console.log('delete logo');
        setState(prevState => ({ ...prevState, logoImage: '' }));
    };

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
                <SelectField
                    name='ecLevel'
                    options={['L', 'M', 'Q', 'H']}
                    handleChange={handleChange}
                    defaultValue={'M'}
                />
            </OptionContainer>
            <OptionContainer>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <ImageUploadField name='logoImage' handleChange={handleChange} />
                    <DeleteButton onClick={handleDeleteLogo} style={{ height: "30px", width: "30px", alignSelf: "flex-end" }}>
                        <img src="/xicon.svg" alt="Delete"></img >
                    </DeleteButton>
                </div>
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

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    &:hover {
    background: rgba(0, 0, 0, 0.1); /* Add a background color on hover */
    }
    &:hover img {
        filter: brightness(0.8);
    }
    img {
        width: 20px;
        height: 20px;
    }
`;