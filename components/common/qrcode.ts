import QRCode from 'qrcode';

export const generateQRCode = async (url: string,
    backgroundColor: string = '#ffffff', 
    foregroundColor: string = '#000000'
): Promise<string> => {
  try {
    return await QRCode.toDataURL(url, {
        color: {
          dark: foregroundColor, 
          light: backgroundColor,
        },
      });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};
