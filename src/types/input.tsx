export interface LogoUpdateParams {
    qrSize: number
    maintainAspectRatio: boolean
    logoWidth: number
    logoHeight: number
}

export interface EyeRadiusUpdateParams {
    ecLevel: string
    qrvalue: string
    maxEyeRadius: number
    eyeRadius: Record<string, number>
    qrSize: number
}