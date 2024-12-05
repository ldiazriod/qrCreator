import { styled } from "styled-components";

type IImageUploadFieldProps = {
    name: string;
    handleChange: (target: any) => void;
}

const ImageUploadField = ({ name, handleChange }: IImageUploadFieldProps) => {
    const retrievePathFile = (files: any) => {
        const file = files[0];
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            console.error('Only png and jpg/jpeg allowed.')
        } else {
            const target: any = {};
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = e => {
                target.name = name;
                target.value = reader.result;
                target.logoName = file.name;
                handleChange({ target });
            };
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
            <Label>Logo Image</Label>
            <input
                type='file'
                accept='image/*'
                name={name}
                onChange={e => retrievePathFile(e.target.files)} />
        </div>
    );
}

export default ImageUploadField

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: medium;
`;