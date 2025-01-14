import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import Tabs from './components/Tabs';
import MainOptions from './components/MainOptions';
import AdvancedOptions from './components/AdvancedOptions';
import { defaultSettings } from './constants/settings';
import { tooltipDescriptions } from './constants/tooltips';

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState('main')
	const [state, setState] = useState<{ [key: string]: any }>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('qrPreferences');
			return saved ? JSON.parse(saved) : defaultSettings;
		}
		return {}
	});

	useEffect(() => {
		localStorage.setItem('qrPreferences', JSON.stringify(state))

	}, [state]);

	useEffect(() => {
		if (state.logoImage && state.logoName) {
			// Convert base64 back to File object
			fetch(state.logoImage)
				.then(res => res.blob())
				.then(blob => {
					const file = new File([blob], state.logoName, { type: blob.type });
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(file);
					setState(prevState => ({
						...prevState,
						logoFile: dataTransfer.files
					}));
				});
		}
	}, [state.logoImage, state.logoName]);

	const handleChange = ({ target }: any) => {
		setState(prevState => ({ ...prevState, [target.name]: target.value }))
	};

	const handleReset = () => {
		setState(defaultSettings);
	};

	const handleDownload = () => {
		console.log(state)
		html2canvas(document.querySelector('#react-qrcode-logo') as any)
			.then(function (canvas) {
				const link = document.createElement('a');
				link.download = 'react-qrcode-logo.png';
				link.href = canvas.toDataURL();
				link.click();
			});
	}

	const handleRotate = () => {
		handleChange({ target: { name: 'rotation', value: (state.rotation + 90) } });
		console.log(state.rotation)
	};

	return (
		<div className='app'>
			<h1 style={{ fontSize: "2rem", margin: "1rem" }}>QR Code Generator</h1>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				<div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: "0.7rem", flex: 1, marginBlock: '30px', paddingRight: '0.7rem' }}>
					<Card style={{ margin: '0.7rem', backgroundColor: '#F9FAFB' }}>
						<CardContent>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Tabs
									activeTab={activeTab}
									setActiveTab={setActiveTab}
									tabs={[
										{ label: 'Main Options', value: 'main' },
										{ label: 'Advanced Options', value: 'advanced' }
									]}
								/>
								<ResetButton onClick={handleReset}>Reset Settings</ResetButton>
							</div>
							{activeTab === 'main' && <MainOptions state={state} handleChange={handleChange} />}
							{activeTab === 'advanced' && <AdvancedOptions state={state} handleChange={handleChange} />}
						</CardContent>
					</Card>
				</div>
				<QRWrapper
					$totalSize={state.size + state.quietZone * 2}
				>
					<QRContainer $rotation={state.rotation}>
						<QRCode
							value={state.value}
							size={state.size}
							quietZone={state.quietZone}
							fgColor={state.fgColor}
							bgColor={state.bgColor}
							logoImage={state.logoTab === 'file' ? state.logoImage : state.logoUrl}
							logoWidth={state.logoWidth}
							logoHeight={state.logoHeight}
							logoOpacity={state.logoOpacity}
							qrStyle={state.qrStyle}
							removeQrCodeBehindLogo={state.removeQrCodeBehindLogo}
							ecLevel={state.ecLevel}
							enableCORS={false}
							logoPadding={state.logoPadding}
							logoPaddingStyle={state.logoPaddingStyle}
							eyeRadius={[{
								outer: [state.eyeradius_0_outer_0, state.eyeradius_0_outer_1, state.eyeradius_0_outer_2, state.eyeradius_0_outer_3],
								inner: [state.eyeradius_0_inner_0, state.eyeradius_0_inner_1, state.eyeradius_0_inner_2, state.eyeradius_0_inner_3],
							},
							{
								outer: [state.eyeradius_1_outer_0, state.eyeradius_1_outer_1, state.eyeradius_1_outer_2, state.eyeradius_1_outer_3],
								inner: [state.eyeradius_1_inner_0, state.eyeradius_1_inner_1, state.eyeradius_1_inner_2, state.eyeradius_1_inner_3],
							},
							{
								outer: [state.eyeradius_2_outer_0, state.eyeradius_2_outer_1, state.eyeradius_2_outer_2, state.eyeradius_2_outer_3],
								inner: [state.eyeradius_2_inner_0, state.eyeradius_2_inner_1, state.eyeradius_2_inner_2, state.eyeradius_2_inner_3],
							}]}
							eyeColor={[{
								outer: state.eyecolor_0_outer ?? state.fgColor ?? '#000000',
								inner: state.eyecolor_0_inner ?? state.fgColor ?? '#000000'
							},
							{
								outer: state.eyecolor_1_outer ?? state.fgColor ?? '#000000',
								inner: state.eyecolor_1_inner ?? state.fgColor ?? '#000000'
							},
							{
								outer: state.eyecolor_2_outer ?? state.fgColor ?? '#000000',
								inner: state.eyecolor_2_inner ?? state.fgColor ?? '#000000'
							}]}

						/>
					</QRContainer>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', flexDirection: 'row' }}>
						<RotateButton title={tooltipDescriptions.rotate} onClick={handleRotate}>↻</RotateButton>
						<DownloadButton
							type='button'
							onClick={handleDownload}
						>
							{'DOWNLOAD QR'}
						</DownloadButton>
					</div>
				</QRWrapper>
			</div>
		</div>
	);
}

export default App;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  width: 100%;
`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const QRWrapper = styled.div<{ $totalSize: number }>`
	position: sticky;
	top: 2rem;
	min-width: 400px;
  	max-width: 800px;
	width: 100%;
	height: calc(100% - 80px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 5px auto;
	> div {
		width: ${props => Math.min(Math.max(props.$totalSize, 400), 800)}px;
		height: auto; /* Change from fixed height to auto */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
`;

export const QRContainer = styled.div<{ $rotation: number }>`
	transform: rotate(${(props) => -props.$rotation}deg);
	transition: transform 0.3s ease-in-out;
	margin-bottom: 2rem;
`;

export const DownloadButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 1.125rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  width: 270px;
  height: 45px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const RotateButton = styled.button`
	width: 45px;
    height: 45px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.125rem;
    &:hover {
        background-color: #2563eb;
    }
`;

const ResetButton = styled.button`
  background-color: #fb923c;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 100%;

  &:hover {
    background-color: #f97316;
  }
`;

