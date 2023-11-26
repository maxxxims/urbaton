// Остальной код...

import React, { useState, useEffect } from 'react';
import '../../css/style_other/circle_style.css';
import { useNavigate } from 'react-router-dom';

const RotatingCircle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blurIntensity, setBlurIntensity] = useState(3); // начальная интенсивность блюра
  const navigate = useNavigate();

  useEffect(() => {
    const blurTimer = setInterval(() => {
      if (isLoading && blurIntensity > 0) {
        setBlurIntensity((prevIntensity) => prevIntensity - 1);
      }
    }, 1); // уменьшение блюра каждые 500 миллисекунд

    return () => clearInterval(blurTimer);
  }, [isLoading, blurIntensity]);

  useEffect(() => {
    if (isLoading) {
      // Добавление класса "blur" к body во время загрузки
      document.body.classList.add('blur');

    } else {
      document.body.classList.remove('blur');
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      navigate('/user-dashboard');
      setIsLoading(false);
      document.body.classList.remove('blur');
    }
  }, [isLoading, navigate]);

  return (
    <>
      {isLoading && (
        <>
          <div className="rotating-circle"></div>
          {/* Добавление класса "blur" к body во время загрузки */}
          <script>
            document.body.classList.add('blur');
          </script>
        </>
      )}
    </>
  );
};

export default RotatingCircle;

