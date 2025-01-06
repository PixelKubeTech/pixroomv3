'use client';

import { useEffect, useState } from 'react';
import { generateQRCode } from '@/components/common/qrcode';

const QRCodeComponent = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    // Determine the base URL
    const url =
      typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.host}`
        : '';
    setBaseUrl(url);

    if (url) {
      // Generate the QR code
      generateQRCode(url)
        .then((qr) => setQRCode(qr))
        .catch((error) => console.error('Failed to generate QR code:', error));
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      {qrCode ? (
        <img src={qrCode} alt="" className="mt-4" height={75} width={75} />
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default QRCodeComponent;
