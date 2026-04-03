import React from "react";

export const CompassRose = ({ className = "" }) => (
  <svg 
    className={`animate-spin-slow ${className}`}
    width="800" height="800" viewBox="0 0 100 100" 
    style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }}
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke="#1B2A4A" strokeWidth="1" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#1B2A4A" strokeWidth="0.5" strokeDasharray="2,2" />
    <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="#C8960C" opacity="0.8"/>
    <path d="M50 5 L50 95 M5 50 L95 50" stroke="#1B2A4A" strokeWidth="0.5"/>
  </svg>
);

export const WaveDivider = () => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '30px', opacity: 0.4 }}>
    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#E8E0D4"></path>
  </svg>
);
