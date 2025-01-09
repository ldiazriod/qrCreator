import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import calculateErrorCorrectionLevel from '../utils/calcErrorCorrectionLevel';
import TextArea from './TextArea';

interface IImageUploadFieldProps {
    name: [string, string];
    handleChange: ({ target }: any) => void;
    maintainAspectRatio: boolean;
    qrSize: number;
    custom: boolean;
    logoFile: FileList;
    logoTab: string;
    logoImage: string;
    logoUrl: string;
}

const ImageUploadField: React.FC<IImageUploadFieldProps> = ({ name, handleChange, maintainAspectRatio, qrSize, logoFile, custom, logoTab, logoImage, logoUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fileInputRef.current && logoFile) {
            const dataTransfer = new DataTransfer();
            Array.from(logoFile).forEach(file => {
                dataTransfer.items.add(file);
            });
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [logoFile, logoTab]);

    const handleImageUpload = (files: any) => {
        const file = files[0];
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            console.error('Only png and jpg/jpeg allowed.');
        } else {
            const target: any = {};
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = e => {
                const img = new Image();
                img.onload = () => {
                    const maxSize = qrSize / 3;
                    const aspectRatio = img.width / img.height;
                    let newWidth, newHeight;
                    if (maintainAspectRatio) {
                        if (img.width > img.height) {
                            newWidth = Math.min(img.width, maxSize);
                            newHeight = newWidth / aspectRatio;
                        } else {
                            newHeight = Math.min(img.height, maxSize);
                            newWidth = newHeight * aspectRatio;
                        }
                    } else {
                        newWidth = maxSize;
                        newHeight = maxSize;
                    }
                    target.name = name;
                    target.value = reader.result;
                    handleChange({ target: { name: 'logoImage', value: reader.result } });
                    handleChange({ target: { name: 'logoName', value: file.name } });
                    handleChange({ target: { name: 'logoWidth', value: Math.round(newWidth) } });
                    handleChange({ target: { name: 'logoHeight', value: Math.round(newHeight) } });
                    if (!custom) {
                        const ecLevel = calculateErrorCorrectionLevel(newWidth, newHeight, qrSize);
                        handleChange({ target: { name: 'ecLevel', value: ecLevel } });
                    }
                    // Store the File object in state
                    const fileList = new DataTransfer();
                    fileList.items.add(file);
                    handleChange({ target: { name: 'logoFile', value: fileList.files } });
                };
                img.src = reader.result as string;
            };
        }
    };

    const handleDeleteLogoFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
        if (!custom) {
            handleChange({ target: { name: 'ecLevel', value: 'M' } });
        }
        handleChange({ target: { name: 'logoName', value: '' } });
        handleChange({ target: { name: 'logoImage', value: '' } });
        handleChange({ target: { name: 'logoFile', value: null } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
            <Label>Logo Image</Label>
            <Tabs
                activeTab={logoTab}
                setActiveTab={tab => handleChange({ target: { name: 'logoTab', value: tab } })}
                tabs={[
                    { label: 'File', value: 'file' },
                    { label: 'URL', value: 'url' }
                ]}
            />
            {logoTab === 'file' && (
                <InputContainer>
                    <input
                        type='file'
                        accept='image/*'
                        name={name[0]}
                        ref={fileInputRef}
                        onChange={e => handleImageUpload(e.target.files)}
                    />
                    {logoFile &&
                        <DeleteButton onClick={handleDeleteLogoFile}>
                            <img src="/xicon.svg" alt="Delete" />
                        </DeleteButton>
                    }
                </InputContainer>
            )}
            {logoTab === 'url' && (
                <InputContainer>
                    <TextArea
                        name={name[1]}
                        handleChange={handleChange}
                        value={logoUrl}
                        placeholder='Enter Image URL'
                    />
                    {logoUrl &&
                        <DeleteButton onClick={() => handleChange({ target: { name: 'logoUrl', value: '' } })}
                        >
                            <img src="/xicon.svg" alt="Delete" />
                        </DeleteButton>
                    }
                </InputContainer>
            )}
        </div>
    );
};

export default ImageUploadField;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: medium;
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const DeleteButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem;
  //align-self: flex-end;
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