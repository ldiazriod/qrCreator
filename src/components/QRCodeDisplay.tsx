import { QRCode } from "react-qrcode-logo"
import styled from "styled-components"
import { useState } from "react"
import html2canvas from "html2canvas"

interface QRCodeDisplayProps {
  profileState: any
  onRotate: () => void
}

export function QRCodeDisplay({ profileState, onRotate }: QRCodeDisplayProps) {
  const [fileFormat, setFileFormat] = useState("png")

  const handleDownload = () => {
    html2canvas(document.querySelector("#react-qrcode-logo") as any).then((canvas) => {
      const link = document.createElement("a")
      link.download = `react-qrcode-logo.${fileFormat}`
      link.href = fileFormat === "jpeg" ? canvas.toDataURL("image/jpeg", 0.9) : canvas.toDataURL("image/png")
      link.click()
    })
  }

  return (
    <QRWrapper $totalSize={Number(profileState.size) + Number(profileState.quietZone) * 2}>
      <div className="qr-content">
        <QRContainer $rotation={profileState.rotation || 0}>
          <div>
            <QRCode
              value={profileState.value}
              size={profileState.size}
              quietZone={profileState.quietZone}
              fgColor={profileState.fgColor}
              bgColor={profileState.bgColor}
              logoImage={profileState.logoTab === "file" ? profileState.logoImage : profileState.logoUrl}
              logoWidth={profileState.logoWidth}
              logoHeight={profileState.logoHeight}
              logoOpacity={profileState.logoOpacity}
              qrStyle={profileState.qrStyle}
              removeQrCodeBehindLogo={profileState.removeQrCodeBehindLogo}
              ecLevel={profileState.ecLevel}
              enableCORS={false}
              logoPadding={profileState.logoPadding}
              logoPaddingStyle={profileState.logoPaddingStyle}
              eyeRadius={[
                {
                  outer: [
                    profileState.eyeRadius.eyeradius_0_outer_0,
                    profileState.eyeRadius.eyeradius_0_outer_1,
                    profileState.eyeRadius.eyeradius_0_outer_2,
                    profileState.eyeRadius.eyeradius_0_outer_3,
                  ],
                  inner: [
                    profileState.eyeRadius.eyeradius_0_inner_0,
                    profileState.eyeRadius.eyeradius_0_inner_1,
                    profileState.eyeRadius.eyeradius_0_inner_2,
                    profileState.eyeRadius.eyeradius_0_inner_3,
                  ],
                },
                {
                  outer: [
                    profileState.eyeRadius.eyeradius_1_outer_0,
                    profileState.eyeRadius.eyeradius_1_outer_1,
                    profileState.eyeRadius.eyeradius_1_outer_2,
                    profileState.eyeRadius.eyeradius_1_outer_3,
                  ],
                  inner: [
                    profileState.eyeRadius.eyeradius_1_inner_0,
                    profileState.eyeRadius.eyeradius_1_inner_1,
                    profileState.eyeRadius.eyeradius_1_inner_2,
                    profileState.eyeRadius.eyeradius_1_inner_3,
                  ],
                },
                {
                  outer: [
                    profileState.eyeRadius.eyeradius_2_outer_0,
                    profileState.eyeRadius.eyeradius_2_outer_1,
                    profileState.eyeRadius.eyeradius_2_outer_2,
                    profileState.eyeRadius.eyeradius_2_outer_3,
                  ],
                  inner: [
                    profileState.eyeRadius.eyeradius_2_inner_0,
                    profileState.eyeRadius.eyeradius_2_inner_1,
                    profileState.eyeRadius.eyeradius_2_inner_2,
                    profileState.eyeRadius.eyeradius_2_inner_3,
                  ],
                },
              ]}
              eyeColor={[
                {
                  outer: profileState.eyecolor_0_outer ?? profileState.fgColor ?? "#000000",
                  inner: profileState.eyecolor_0_inner ?? profileState.fgColor ?? "#000000",
                },
                {
                  outer: profileState.eyecolor_1_outer ?? profileState.fgColor ?? "#000000",
                  inner: profileState.eyecolor_1_inner ?? profileState.fgColor ?? "#000000",
                },
                {
                  outer: profileState.eyecolor_2_outer ?? profileState.fgColor ?? "#000000",
                  inner: profileState.eyecolor_2_inner ?? profileState.fgColor ?? "#000000",
                },
              ]}
            />
          </div>
        </QRContainer>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
          <RotateButton onClick={onRotate}>↻</RotateButton>
          <DownloadButtonGroup>
            <DownloadButton type="button" onClick={handleDownload}>
              DOWNLOAD QR
            </DownloadButton>
            <FormatSelect value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
              <option value="png">.png</option>
              <option value="jpeg">.jpeg</option>
            </FormatSelect>
          </DownloadButtonGroup>
        </div>
      </div>
    </QRWrapper>
  )
}

const QRWrapper = styled.div<{ $totalSize: number }>`
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
    width: ${(props) => Math.min(Math.max(props.$totalSize, 400), 800)}px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const QRContainer = styled.div<{ $rotation: number }>`
  position: relative;
  width: fit-content;
  height: fit-content;
  
  > div {
    transform: rotate(${(props) => -props.$rotation}deg);
    transition: transform 0.3s ease-in-out;
  }
  margin-bottom: 2rem;
`

const DownloadButtonGroup = styled.div`
  display: flex;
  align-items: stretch;
  height: 48px;
`

const DownloadButton = styled.button`
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
`

const FormatSelect = styled.select`
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
  padding: 0 0.5rem;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  outline: none;
  appearance: none;
  min-width: 70px;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }

  option {
    background-color: white;
    color: black;
  }
`

const RotateButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.125rem;
  &:hover {
    background-color: #2563eb;
  }
`

