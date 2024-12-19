import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import calculateErrorCorrectionLevel from '../utils/calcErrorCorrectionLevel';

interface IImageUploadFieldProps {
    name: string;
    handleChange: ({ target }: any) => void;
    maintainAspectRatio: boolean;
    qrSize: number;
    logoFile: FileList;
}

const ImageUploadField: React.FC<IImageUploadFieldProps> = ({ name, handleChange, maintainAspectRatio, qrSize, logoFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fileInputRef.current && logoFile) {
            const dataTransfer = new DataTransfer();
            Array.from(logoFile).forEach(file => {
                dataTransfer.items.add(file);
            });
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [logoFile]);

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
                    handleChange({ target: { name: 'enableCORS', value: true } });
                    handleChange({ target: { name: 'logoWidth', value: Math.round(newWidth) } });
                    handleChange({ target: { name: 'logoHeight', value: Math.round(newHeight) } });
                    const ecLevel = calculateErrorCorrectionLevel(newWidth, newHeight, qrSize);
                    handleChange({ target: { name: 'ecLevel', value: ecLevel } });
                    // Store the File object in state
                    const fileList = new DataTransfer();
                    fileList.items.add(file);
                    handleChange({ target: { name: 'logoFile', value: fileList.files } });
                };
                img.src = reader.result as string;
            };
        }
    };

    const handleDeleteLogo = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
        handleChange({ target: { name: 'logoName', value: '' } });
        handleChange({ target: { name: 'logoImage', value: '' } });
        handleChange({ target: { name: 'logoFile', value: null } });
        handleChange({ target: { name: 'enableCORS', value: false } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
            <Label>Logo Image</Label>
            <InputContainer>
                <input
                    type='file'
                    accept='image/*'
                    name={name}
                    ref={fileInputRef}
                    onChange={e => handleImageUpload(e.target.files)}
                />
                {logoFile &&
                    <DeleteButton onClick={handleDeleteLogo}>
                        <img src="/xicon.svg" alt="Delete" />
                    </DeleteButton>
                }
            </InputContainer>
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  align-self: flex-end;
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