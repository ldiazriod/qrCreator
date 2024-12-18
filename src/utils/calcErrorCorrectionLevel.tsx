const calculateErrorCorrectionLevel = (logoWidth: number, logoHeight: number, qrSize: number): 'L' | 'M' | 'Q' | 'H' => {
    if (!logoWidth || !logoHeight) return 'M';
  
    // Calculate the logo area percentage
    const logoArea = logoWidth * logoHeight;
    const qrArea = qrSize * qrSize;
    const logoPercentage = (logoArea / qrArea) * 100;
    console.log(logoPercentage);
    // Determine error correction level based on logo size
    if (logoPercentage > 15) {
      return 'H';  // 30% error correction for large logos
    } else if (logoPercentage > 10) {
      return 'Q';  // 25% error correction for medium logos
    } else {
      return 'M';  // 15% error correction for smaller logos
    }
  };

  export default calculateErrorCorrectionLevel;