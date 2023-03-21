import { useState } from 'react';

const isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (!localStorage.getItem('lightMode')) {
  localStorage.setItem('lightMode', isLightMode ? 'light' : 'dark');
}

const LightMode = () => {
  const [isLight, setIsLight] = useState(localStorage.getItem('lightMode') === 'light');

  const handleToggle = () => {
    const newMode = isLight ? 'dark' : 'light';
    localStorage.setItem('lightMode', newMode);
    setIsLight(!isLight);
    console.log(isLight);
  };

  return (
    <div className={isLight ? 'light-mode' : 'dark-mode'}>
      <button onClick={handleToggle}>Toggle mode</button>
      {/* Rest of your app */}
    </div>
  );
};

export default LightMode;
