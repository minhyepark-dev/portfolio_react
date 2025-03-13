import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faTrafficLight,
} from '@fortawesome/free-solid-svg-icons';

const loadKakaoMap = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    if (!kakaoMapKey) {
      console.error('카카오 맵 API 키가 설정되지 않았습니다.');
      reject('카카오 맵 API 키 없음');
      return;
    }
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

function Location() {
  const container = useRef(null);
  const btnBranch = useRef(null);
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapInfo = [
    {
      title: '본점',
      latlng: { lat: 37.51276949548283, lng: 127.05883923964538 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin.png',
    },
    {
      title: '지점1',
      latlng: { lat: 37.57975318699628, lng: 126.97709192859216 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin2.png',
    },
    {
      title: '지점2',
      latlng: { lat: 35.15317690680852, lng: 129.11898444686017 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin3.png',
    },
  ];

  useEffect(() => {
    loadKakaoMap()
      .then(() => setMapLoaded(true))
      .catch((error) => console.error('카카오 맵 로드 실패:', error));
  }, []);

  useEffect(() => {
    if (!mapLoaded || !container.current || !window.kakao) return;

    const { kakao } = window;
    const options = {
      center: new kakao.maps.LatLng(
        mapInfo[index].latlng.lat,
        mapInfo[index].latlng.lng
      ),
      level: 3,
    };
    const newMap = new kakao.maps.Map(container.current, options);
    setMap(newMap);

    new kakao.maps.Marker({
      map: newMap,
      position: new kakao.maps.LatLng(
        mapInfo[index].latlng.lat,
        mapInfo[index].latlng.lng
      ),
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(
        mapInfo[index].imgSrc,
        new kakao.maps.Size(50, 50)
      ),
    });

    window.addEventListener('resize', () => newMap.setCenter(options.center));
    return () => {
      window.removeEventListener('resize', () =>
        newMap.setCenter(options.center)
      );
    };
  }, [index, mapLoaded]);

  const setMapType = (maptype) => {
    if (!map) return;
    map.setMapTypeId(
      maptype === 'roadmap'
        ? window.kakao.maps.MapTypeId.ROADMAP
        : window.kakao.maps.MapTypeId.HYBRID
    );
  };

  return (
    <main className="location">
      <div className="inner">
        <div className="map-wrap">
          <ul className="branch" ref={btnBranch}>
            {mapInfo.map((branch, i) => (
              <li
                key={branch.title}
                tabIndex={0}
                className={index === i ? 'on' : ''}
                onClick={() => setIndex(i)}
              >
                <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
                <div className="map-text">
                  <p>{branch.title}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="map-inner">
            <div className="custom_typecontrol">
              <span
                tabIndex={0}
                id="btnRoadmap"
                className="btn"
                onClick={() => setMapType('roadmap')}
              >
                Map
              </span>
              <span
                tabIndex={0}
                id="btnSkyview"
                className="btn"
                onClick={() => setMapType('skyview')}
              >
                Sky View
              </span>
            </div>
            <ul className="traffic">
              <li
                tabIndex={0}
                onClick={() => {
                  if (!map) return;
                  toggle
                    ? map.removeOverlayMapTypeId(
                        window.kakao.maps.MapTypeId.TRAFFIC
                      )
                    : map.addOverlayMapTypeId(
                        window.kakao.maps.MapTypeId.TRAFFIC
                      );
                  setToggle(!toggle);
                }}
              >
                <FontAwesomeIcon
                  className="traffic-icon"
                  icon={faTrafficLight}
                />
                {toggle ? 'Off the traffic' : 'On the traffic'}
              </li>
            </ul>
            <div id="map" ref={container}></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Location;
