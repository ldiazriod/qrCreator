import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface IImageUploadFieldProps {
    name: string;
    handleChange: ({ target }: any) => void;
}

const ImageUploadField: React.FC<IImageUploadFieldProps> = ({ name, handleChange }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (files: any) => {
        const file = files[0];
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            console.error('Only png and jpg/jpeg allowed.');
        } else {
            const target: any = {};
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = e => {
                target.name = name;
                target.value = reader.result;
                target.logoName = file.name;
                handleChange({ target });
                setFileName(file.name); // Update the state with the file name
            };
        }
    };

    const handleDeleteLogo = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
        setFileName(null); // Clear the file name state
        handleChange({ target: { name, value: '' } }); // Clear the state in the parent component
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
                <DeleteButton onClick={handleDeleteLogo}>
                    <img src="/xicon.svg" alt="Delete" />
                </DeleteButton>
            </InputContainer>
            {fileName && <FileName>{fileName}</FileName>} {/* Display the file name */}
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

const FileName = styled.span`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #555;
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