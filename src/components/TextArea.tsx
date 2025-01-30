import { Label } from "../styles/styledComponents";
import { EyeRadiusUpdateParams } from "../types/input";
import { calcMaxEyeRadius, updateEyeRadius } from "../utils/qr-helpers";
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
	eyeRadiusParams?: EyeRadiusUpdateParams;
};

const TextArea = ({ name, handleChange, role, rows, cols, defaultValue, hideLabel, value, label, placeholder, eyeRadiusParams }: ITextAreaProps) => {

	//ToDo - add eyeRadius automatization.

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		handleChange(event);
		if (name === 'value' && eyeRadiusParams) {
			//Update eyeRadius based on QR value modification
			const { maxEyeRadius, eyeRadius, ecLevel, qrSize } = eyeRadiusParams;
			const newMaxRadius = calcMaxEyeRadius(qrSize, ecLevel, value);
			updateEyeRadius(maxEyeRadius, newMaxRadius, eyeRadius, handleChange);
			handleChange({ target: { name: 'maxEyeRadius', value: newMaxRadius } });
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', whiteSpace: 'pre-line', width: '100%' }}>
			{!hideLabel && <Label>{label}</Label>}
			<textarea
				style={{ padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.3rem', border: '1px solid #ccc' }}
				id={name}
				name={name}
				onChange={onChange}
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