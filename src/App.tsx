import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import Tabs from './components/Tabs';
import MainOptions from './components/MainOptions';
import AdvancedOptions from './components/AdvancedOptions';


const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState('main')
	const [state, setState] = useState<{ [key: string]: any }>(
		{
			size: 300,
			ecLevel: 'M',
			quietZone: 20,
			bgColor: '#FFFFFF',
			fgColor: '#000000',
			logoImage: '',
			logoWidth: 50,
			logoHeight: 50,
			logoOpacity: 1,
			qrStyle: 'squares',
			maintainAspectRatio: true,
		});

	const handleChange = ({ target }: any) => {
		setState(prevState => ({ ...prevState, [target.name]: target.value }))
	}

	const handleDownload = () => {
		html2canvas(document.querySelector('#react-qrcode-logo') as any)
			.then(function (canvas) {
				const link = document.createElement('a');
				link.download = 'react-qrcode-logo.png';
				link.href = canvas.toDataURL();
				link.click();
			});
	}

	return (
		<div className='app'>
			<h1 style={{ fontSize: "2rem", margin: "1rem" }}>QR Code Generator</h1>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				<div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: "0.7rem", flex: 1, marginRight: '0px' }}>
					<Card style={{ margin: '0.7rem', backgroundColor: '#F9FAFB' }}>
						<CardContent>
							<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
							{activeTab === 'main' && <MainOptions state={state} handleChange={handleChange} />}
							{activeTab === 'advanced' && <AdvancedOptions state={state} handleChange={handleChange} />}
						</CardContent>
					</Card>
				</div>
				<div style={{
					position: 'sticky',
					top: '2rem',
					width: 550,
					height: 550,
					margin: '5px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: state.bgColor,
					alignSelf: 'flex-start'
				}}>
					<QRCode
						{...{
							...state,
							bgColor: "transparent",
							eyeRadius: [ // build eyeRadius manually
								{
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
								}
							],
							eyeColor: [ // build eyeColor manually
								{
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
								},
							]
						}}
					/>
					<StyledButton
						type='button'
						onClick={handleDownload}
					>
						DOWNLOAD QR
					</StyledButton>
				</div>
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

export const StyledButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 1.125rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  width: 300px;
  margin: 1rem auto;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: block;
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