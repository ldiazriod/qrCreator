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
        value: 'https://v0.dev',
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
			<h1 style={{ fontSize: "2rem", margin: "1rem"}}>QR Code Generator</h1>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				<div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: "0.7rem" }}>
					<Card style={{ margin: '0.7rem' }}>
						<CardContent>
							<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
							{activeTab === 'main' && <MainOptions state={state} handleChange={handleChange} setState={setState} />}
							{activeTab === 'advanced' && <AdvancedOptions state={state} handleChange={handleChange} />}
						</CardContent>
					</Card>
				</div>
				<div style={{
					width: 550,
					height: 550,
					marginLeft: '20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					border: '1px solid #d4fafc',
					borderRadius: '50px',
					backgroundColor: state.bgColor
				}}>
					<QRCode
						logoOnLoad={() => console.log('logo loaded')}
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
				</div>
			</div>
			<button type='button'  onClick={handleDownload}
				style={{ margin: '20px' }}>Download QR Code</button>

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
`;

export const CardContent = styled.div`
  padding: 1rem;
`;