import { Label } from "../styles/styledComponents";
type ITextAreaProps = {
	name: string;
    rows?: number;
    cols?: number;
	role?: string;
	defaultValue?: string | number;
	handleChange: (target: any) => void;
	hideLabel?: boolean;
	label?: string;
	value?: string | number;
	placeholder: string;
};

const TextArea = ({ name, handleChange, role, rows, cols, defaultValue, hideLabel, value, label, placeholder }: ITextAreaProps) => {

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', whiteSpace:'pre-line', width: '100%' }}>
			{!hideLabel && <Label>{label}</Label>}
			<textarea
				style={{ padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.3rem', border: '1px solid #ccc' }}
				id={name}
				name={name}
				onChange={handleChange}
                rows={rows}
                cols={cols}
                role={role}
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default TextArea