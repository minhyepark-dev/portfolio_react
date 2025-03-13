import { useEffect, useRef, useState } from 'react';

const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;

function loadKakaoMap() {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(); // 이미 로드된 경우 바로 resolve
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          resolve(); // 정상적으로 로드되면 resolve
        } else {
          reject(new Error('Kakao Maps API failed to load'));
        }
      };
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    }
  });
}

function Location() {
  const container = useRef(null);
  const btnBranch = useRef(null);
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInfo, setMapInfo] = useState([]);

  useEffect(() => {
    async function initializeMap() {
      try {
        await loadKakaoMap(); // KakaoMap 로드 대기
        setMapLoaded(true);

        // 지도 정보 설정
        setMapInfo([
          {
            title: '본점',
            latlng: new window.kakao.maps.LatLng(
              37.51276949548283,
              127.05883923964538
            ),
            imgSrc: process.env.PUBLIC_URL + '/img/pin.png',
            imgSize: new window.kakao.maps.Size(50, 50),
            imgPos: { offset: new window.kakao.maps.Point(25, 50) },
          },
          {
            title: '지점1',
            latlng: new window.kakao.maps.LatLng(
              37.57975318699628,
              126.97709192859216
            ),
            imgSrc: process.env.PUBLIC_URL + '/img/pin2.png',
            imgSize: new window.kakao.maps.Size(50, 50),
            imgPos: { offset: new window.kakao.maps.Point(25, 55) },
          },
          {
            title: '지점2',
            latlng: new window.kakao.maps.LatLng(
              35.15317690680852,
              129.11898444686017
            ),
            imgSrc: process.env.PUBLIC_URL + '/img/pin3.png',
            imgSize: new window.kakao.maps.Size(50, 50),
            imgPos: { offset: new window.kakao.maps.Point(25, 50) },
          },
        ]);
      } catch (error) {
        console.error('Failed to load Kakao Maps API:', error);
      }
    }

    initializeMap();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !container.current || mapInfo.length === 0) return;

    const options = {
      center: mapInfo[index].latlng,
      level: 3,
    };
    const newMap = new window.kakao.maps.Map(container.current, options);
    setMap(newMap);

    new window.kakao.maps.Marker({
      map: newMap,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new window.kakao.maps.MarkerImage(
        mapInfo[index].imgSrc,
        mapInfo[index].imgSize,
        mapInfo[index].imgPos
      ),
    });

    newMap.setCenter(mapInfo[index].latlng);
    newMap.setZoomable(true);
    newMap.setDraggable(true);

    for (const btn of btnBranch.current.children) btn.classList.remove('on');
    btnBranch.current.children[index].classList.add('on');

    const mapSet = () => newMap.setCenter(mapInfo[index].latlng);
    window.addEventListener('resize', mapSet);
    return () => {
      window.removeEventListener('resize', mapSet);
      container.current.innerHTML = '';
    };
  }, [index, mapLoaded, mapInfo]);

  return (
    <main id="main" className="location">
      <div className="map-wrap">
        <div id="map" ref={container}></div>
      </div>
    </main>
  );
}

export default Location;
