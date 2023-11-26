import React, { useEffect } from 'react';
//import MapComponent from './map/mapContents'; // Путь к вашему компоненту с картой

const ChooseParking = () => {
  useEffect(() => {
    // Создаем элемент скрипта
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aa7fe5cddf62321d2db1e61e8a2095ef157299aaca3fe9b3f231755c2c29a9d96&amp;width=617&amp;height=364&amp;lang=ru_RU&amp;scroll=true';

    // Добавляем скрипт в заголовок
    document.head.appendChild(script);

    // Очищаем скрипт при размонтировании компонента
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Пустой массив зависимостей гарантирует, что useEffect будет вызван только один раз

  return (
    <div>
      <h1>Выбор парковочных мест</h1>
      <div id="mymap" style={{ width: '300px', height: '200px' }}></div>
    </div>
  );
};

export default ChooseParking;
