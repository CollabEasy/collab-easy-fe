import React, { useEffect } from 'react';

const Confetti = () => {
  useEffect(() => {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 50;
    const duration = 30 * 1000; // 30 seconds in milliseconds

    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Adjust duration as needed
      confetti.style.backgroundColor = rainbowColors[i % rainbowColors.length];
      confettiContainer.appendChild(confetti);
    }

    // Clear confetti after 30 seconds
    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, duration);
  }, []);

  return (
    <div id="confetti-container" style={{ top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <style>
        {`
          .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
              animation: fall 3s ease-in infinite;
          }

          @keyframes fall {
              0% {
                  transform: translateY(0);
              }
              100% {
                  transform: translateY(100vh);
              }
          }
        `}
      </style>
    </div>
  );
};

export default Confetti;
