const calcMaxEyeRadius = (size: number, ecLevel: string, value: string): number => {
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

export default calcMaxEyeRadius;