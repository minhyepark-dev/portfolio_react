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
  const container = useRef(null); // 지도 컨테이너
  const btnBranch = useRef(null); // 버튼들
  const [map, setMap] = useState(null); // 지도 상태
  const [index, setIndex] = useState(0); // 현재 선택된 지점 인덱스
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로드 상태
  const [mapInfo, setMapInfo] = useState([]); // 지도에 표시할 지점 정보

  useEffect(() => {
    async function initializeMap() {
      try {
        await loadKakaoMap(); // KakaoMap 로드 대기
        if (window.kakao && window.kakao.maps) {
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
          setMapLoaded(true); // 로드 완료 후 mapLoaded true로 설정
        } else {
          throw new Error('Kakao Maps API is not loaded properly.');
        }
      } catch (error) {
        console.error('Failed to load Kakao Maps API:', error);
      }
    }

    initializeMap();
  }, []); // 한 번만 실행되도록 빈 배열 전달

  useEffect(() => {
    if (!mapLoaded || !container.current || mapInfo.length === 0) return;

    // 지도 옵션 설정
    const options = {
      center: mapInfo[index].latlng, // 선택된 지점의 좌표로 초기화
      level: 3, // 지도 확대 레벨
    };

    // 지도 인스턴스 생성
    const newMap = new window.kakao.maps.Map(container.current, options);
    setMap(newMap);

    // 마커 생성
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

    // 지도 설정
    newMap.setCenter(mapInfo[index].latlng);
    newMap.setZoomable(true);
    newMap.setDraggable(true);

    // 버튼 활성화 상태 변경
    for (const btn of btnBranch.current.children) btn.classList.remove('on');
    btnBranch.current.children[index].classList.add('on');

    // 윈도우 크기 변경 시 지도 중앙 재설정
    const mapSet = () => newMap.setCenter(mapInfo[index].latlng);
    window.addEventListener('resize', mapSet);

    return () => {
      window.removeEventListener('resize', mapSet);
      container.current.innerHTML = ''; // 컴포넌트 언마운트 시 맵 리셋
    };
  }, [index, mapLoaded, mapInfo]); // `index`와 `mapInfo` 변경 시 실행

  return (
    <main id="main" className="location">
      <div className="map-wrap">
        <div id="map" ref={container}></div>
      </div>
    </main>
  );
}

export default Location;
