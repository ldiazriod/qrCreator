import React from "react";
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
}

const TextArea = ({ name, handleChange, role, rows, cols, defaultValue, hideLabel, value, label }: ITextAreaProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', whiteSpace:'pre-line' }}>
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
			/>
		</div>
	);
}

export default TextArea