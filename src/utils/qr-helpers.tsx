import calculateErrorCorrectionLevel from "./calcErrorCorrectionLevel";

export const calcMaxEyeRadius = (size: number, ecLevel: string, value: string): number => {
    let ecLevelNum = 1;
    switch (ecLevel) {
        case 'L':
            ecLevelNum = 0;
            break;
        case 'M':
            ecLevelNum = 1;
            break;
        case 'Q':
            ecLevelNum = 2;
            break;
        case 'H':
            ecLevelNum = 3;
            break;
    }
    // Calcular el número de módulos
    const numModules = 21 + 4 * ecLevelNum + Math.ceil(value.length / 25);
    // Tamaño de cada módulo
    const moduleSize = size / numModules;
    // Calcular el radio máximo del ojo (7 módulos de diámetro)
    return Math.round((7 * moduleSize) / 2);
}

export const calcRadius = (oldMaxEyeRadius: number, newMaxEyeRadius: number, oldRadius: number): number => {
    return oldMaxEyeRadius === 0 ? 0 : (newMaxEyeRadius / oldMaxEyeRadius) * oldRadius;
}

export const updateLogoSize = (value: number, logoWidth: number, logoHeight: number, qrSize: number, handleChange: any) => {
    const width = (value * (logoWidth / qrSize));
    const height = (value * (logoHeight / qrSize));
    handleChange({ target: { name: 'logoWidth', value: width } });
    handleChange({ target: { name: 'logoHeight', value: height } });
};

/*export const updateErrorCorrectionLevel = (width: number, height: number, value: number, custom: boolean, handleChange: any) => {
    const newEcLevel = calculateErrorCorrectionLevel(width, height, value);
    if (!custom) {
        handleChange({ target: { name: 'ecLevel', value: newEcLevel } });
    }
    return newEcLevel;
};*/

export const updateEyeRadius = (maxEyeRadius: number, newMaxRadius: number, eyeRadius: { [key: string]: number }, handleChange: any) => {
    const updatedEyeRadius = Object.keys(eyeRadius).reduce((acc, key) => {
        acc[`eyeRadius.${key}`] = calcRadius(maxEyeRadius, newMaxRadius, eyeRadius[key as keyof typeof eyeRadius]);
        return acc;
    }, {} as { [key: string]: number });

    Object.keys(updatedEyeRadius).forEach(key => {
        handleChange({ target: { name: key, value: updatedEyeRadius[key] } });
    });
};