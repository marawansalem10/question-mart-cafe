/**
 * Question Mart & Cafe - QRCodeDisplay Component
 * Displays customer's loyalty QR code
 */

import React from 'react';
import { useTheme } from '../../context';

interface QRCodeDisplayProps {
  qrCode: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  const { language } = useTheme();

  const content = {
    en: {
      title: 'Your Loyalty QR Code',
      subtitle: 'Show this code at the cafe to earn points',
    },
    ar: {
      title: 'رمز الولاء الخاص بك',
      subtitle: 'أظهر هذا الرمز في المقهى لكسب النقاط',
    },
  };

  const t = content[language];

  return (
    <div className="qr-code-display">
      <div className="qr-code-display__header">
        <h3 className="qr-code-display__title">{t.title}</h3>
        <p className="qr-code-display__subtitle">{t.subtitle}</p>
      </div>
      <div className="qr-code-display__code">
        <div className="qr-code-display__placeholder">
          <span className="qr-code-display__text">{qrCode}</span>
        </div>
      </div>
    </div>
  );
};
