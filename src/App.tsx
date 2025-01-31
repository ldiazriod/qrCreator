import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tabs from './components/Tabs';
import MainOptions from './components/MainOptions';
import AdvancedOptions from './components/AdvancedOptions';
import { defaultSettings } from './constants/settings';
import { QRCodeDisplay } from './components/QRCodeDisplay';

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState('main');
	const [profile, setProfile] = useState('profile1');
	const [state, setState] = useState<{ [key: string]: any }>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('qrPreferences');
			const parsed = saved ? JSON.parse(saved) : {};
			return {
				profile1: parsed.profile1 || defaultSettings,
				profile2: parsed.profile2 || defaultSettings,
				profile3: parsed.profile3 || defaultSettings
			};
		}
		return {
			profile1: defaultSettings,
			profile2: defaultSettings,
			profile3: defaultSettings
		};
	});

	useEffect(() => {
		const { logoImage, logoName } = state[profile];
		if (logoImage && logoName) {
			fetch(logoImage)
				.then(res => res.blob())
				.then(blob => {
					const file = new File([blob], logoName, { type: blob.type });
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(file);
					setState(prevState => ({
						...prevState,
						[profile]: {
							...prevState[profile],
							logoFile: dataTransfer.files
						}
					}));
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	const handleChange = ({ target }: any) => {
		const { name, value } = target
		const keys = name.split(".")
		if (keys.length === 2 && keys[0] === "eyeRadius") {
			setState((prevState) => {
				const newState = {
					...prevState,
					[profile]: {
						...prevState[profile],
						eyeRadius: {
							...prevState[profile].eyeRadius,
							[keys[1]]: value,
						},
					},
				}
				localStorage.setItem("qrPreferences", JSON.stringify(newState))
				return newState
			})
		} else {
			setState((prevState) => {
				const newState = {
					...prevState,
					[profile]: {
						...prevState[profile],
						[name]: value,
					},
				}
				localStorage.setItem("qrPreferences", JSON.stringify(newState))
				return newState
			})
		}
	}

	const handleReset = () => {
		setState((prevState) => {
			const newState = {
				...prevState,
				[profile]: defaultSettings,
			}
			localStorage.setItem("qrPreferences", JSON.stringify(newState))
			return newState
		})
	}

	const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setProfile(event.target.value);
	};

	const handleRotate = () => {
		handleChange({
		  target: {
			name: "rotation",
			value: ((state[profile].rotation || 0) + 90) % 360,
		  },
		})
	}

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
							<div style={{ marginTop: '1rem' }}>
								<label htmlFor="profileSelect">Select Profile: </label>
								<ProfileSelect id="profileSelect" value={profile} onChange={handleProfileChange}>
									<option value="profile1">Profile 1</option>
									<option value="profile2">Profile 2</option>
									<option value="profile3">Profile 3</option>
								</ProfileSelect>
							</div>
							{activeTab === 'main' && <MainOptions key={profile} state={state[profile]} handleChange={handleChange} />}
							{activeTab === 'advanced' && <AdvancedOptions key={profile} state={state[profile]} handleChange={handleChange} />}
						</CardContent>
					</Card>
				</div>
				<QRCodeDisplay profileState={state[profile]} onRotate={handleRotate}/>
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
	top: 1rem;
	min-width: 400px;
  	max-width: 800px;
	width: 100%;
	height: calc(100% - 80px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
	
	.qr-content {
		width: ${props => Math.min(Math.max(props.$totalSize, 400), 800)}px;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const QRContainer = styled.div<{ $rotation: number }>`
	position: relative;
	width: fit-content;
	height: fit-content;
	
	> div {
		transform: rotate(${(props) => -props.$rotation}deg);
		transition: transform 0.3s ease-in-out;
	}
	margin-bottom: 2rem;
`;

export const DownloadButtonGroup = styled.div`
  display: flex;
  align-items: stretch;
  height: 48px;
`;

export const DownloadButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 1.125rem;
  padding: 0 2rem;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
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

const ProfileSelect = styled.select`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.25rem;
`;

