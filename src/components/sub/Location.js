import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faTrafficLight,
} from '@fortawesome/free-solid-svg-icons';

function Location() {
  const { kakao } = window;
  const container = useRef(null);
  const btnBranch = useRef(null);
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // const info = [
  //   {
  //     title: '본점',
  //     latlng: new kakao.maps.LatLng(37.51276949548283, 127.05883923964538),
  //     imgSrc: process.env.PUBLIC_URL + '/img/pin.png',
  //     imgSize: new kakao.maps.Size(50, 50),
  //     imgPos: { offset: new kakao.maps.Point(25, 50) },
  //   },
  //   {
  //     title: '지점1',
  //     latlng: new kakao.maps.LatLng(37.57975318699628, 126.97709192859216),
  //     imgSrc: process.env.PUBLIC_URL + '/img/pin2.png',
  //     imgSize: new kakao.maps.Size(50, 50),
  //     imgPos: { offset: new kakao.maps.Point(25, 55) },
  //   },
  //   {
  //     title: '지점2',
  //     latlng: new kakao.maps.LatLng(35.15317690680852, 129.11898444686017),
  //     imgSrc: process.env.PUBLIC_URL + '/img/pin3.png',
  //     imgSize: new kakao.maps.Size(50, 50),
  //     imgPos: { offset: new kakao.maps.Point(25, 50) },
  //   },
  // ];

  const info = [
    {
      title: '본점',
      latlng: { lat: 37.51276949548283, lng: 127.05883923964538 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin.png',
      imgSize: { width: 50, height: 50 },
      imgPos: { offsetX: 25, offsetY: 50 },
    },
    {
      title: '지점1',
      latlng: { lat: 37.57975318699628, lng: 126.97709192859216 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin2.png',
      imgSize: { width: 50, height: 50 },
      imgPos: { offsetX: 25, offsetY: 55 },
    },
    {
      title: '지점2',
      latlng: { lat: 35.15317690680852, lng: 129.11898444686017 },
      imgSrc: process.env.PUBLIC_URL + '/img/pin3.png',
      imgSize: { width: 50, height: 50 },
      imgPos: { offsetX: 25, offsetY: 50 },
    },
  ];

  // ✅ Kakao 지도 스크립트 동적 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // const [mapInfo, setMapInfo] = useState(info);
  // ✅ 스크립트 로드 후 지도 생성
  useEffect(() => {
    if (!isScriptLoaded || !window.kakao) return;

    window.kakao.maps.load(() => {
      const kakao = window.kakao;
      const options = {
        center: new kakao.maps.LatLng(
          info[index].latlng.lat,
          info[index].latlng.lng
        ),
        level: 3,
      };
      const newMap = new kakao.maps.Map(container.current, options);
      setMap(newMap);

      new kakao.maps.Marker({
        map: newMap,
        position: new kakao.maps.LatLng(
          info[index].latlng.lat,
          info[index].latlng.lng
        ),
        title: info[index].title,
        image: new kakao.maps.MarkerImage(
          info[index].imgSrc,
          new kakao.maps.Size(
            info[index].imgSize.width,
            info[index].imgSize.height
          ),
          {
            offset: new kakao.maps.Point(
              info[index].imgPos.offsetX,
              info[index].imgPos.offsetY
            ),
          }
        ),
      });

      newMap.setCenter(
        new kakao.maps.LatLng(info[index].latlng.lat, info[index].latlng.lng)
      );

      // 버튼 스타일 변경
      if (btnBranch.current) {
        for (const btn of btnBranch.current.children)
          btn.classList.remove('on');
        btnBranch.current.children[index].classList.add('on');
      }

      // 창 크기 조정 시 지도 중심 변경
      const mapSet = () =>
        newMap.setCenter(
          new kakao.maps.LatLng(info[index].latlng.lat, info[index].latlng.lng)
        );
      window.addEventListener('resize', mapSet);

      return () => {
        window.removeEventListener('resize', mapSet);
        container.current.innerHTML = '';
      };
    });
  }, [isScriptLoaded, index]);

  function setMapType(maptype) {
    var roadmapControl = document.getElementById('btnRoadmap');
    var skyviewControl = document.getElementById('btnSkyview');
    if (maptype === 'roadmap') {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      roadmapControl.className = 'selected_btn';
      skyviewControl.className = 'btn';
    } else {
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      skyviewControl.className = 'selected_btn';
      roadmapControl.className = 'btn';
    }
  }
  // useEffect(() => {
  //   const options = {
  //     center: mapInfo[index].latlng,
  //     level: 3,
  //   };
  //   const map = new kakao.maps.Map(container.current, options);
  //   setMap(map);
  //   new kakao.maps.Marker({
  //     map: map,
  //     position: mapInfo[index].latlng,
  //     title: mapInfo[index].title,
  //     image: new kakao.maps.MarkerImage(
  //       mapInfo[index].imgSrc,
  //       mapInfo[index].imgSize,
  //       mapInfo[index].imgPos
  //     ), // 마커 이미지
  //   });
  //   map.setCenter(mapInfo[index].latlng);

  //   map.setZoomable(true);
  //   map.setDraggable(true);

  //   for (const btn of btnBranch.current.children) btn.classList.remove('on');
  //   btnBranch.current.children[index].classList.add('on');

  //   const mapSet = () => map.setCenter(mapInfo[index].latlng);
  //   window.addEventListener('resize', mapSet);
  //   return () => {
  //     window.removeEventListener('resize', mapSet);
  //     container.current.innerHTML = '';
  //   };
  // }, [index]);
  return (
    <main className="location">
      <div className="sub-visual">
        <div className="inner">
          <h1>Location</h1>
        </div>
      </div>
      <div className="inner">
        <div className="contact">
          <h2>Our Contact</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aut.{' '}
            <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <div className="contact_box">
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
              <p>Address</p>
              <p>
                12 Van Dyke St. Brooklyn. <br /> NY 11231
              </p>
            </div>
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faPhoneAlt} />
              <p>Phone</p>
              <p>
                1(800)123-4567 <br /> 1(800)123-7897
              </p>
            </div>
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <p>Mail</p>
              <p>
                hello@doremi.com <br /> service@doremi.com
              </p>
            </div>
            <div className="box">
              <FontAwesomeIcon className="icon" icon={faClock} />
              <p>Hours</p>
              <p>
                Monday - Friday <br /> 09:00am - 18:00pm
              </p>
            </div>
          </div>
        </div>
        <div className="map-wrap">
          <ul className="branch" ref={btnBranch}>
            <li
              onClick={() => {
                setIndex(0);
              }}
            >
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
              <div className="map-text">
                <p>headquarter</p>
                <p>
                  Lorem ipsum dolor sit. <br />
                  Lorem, ipsum dolor.
                </p>
              </div>
            </li>
            <li
              onClick={() => {
                setIndex(1);
              }}
            >
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
              <div className="map-text">
                <p>Branch 1</p>
                <p>
                  Lorem ipsum dolor sit. <br />
                  Lorem, ipsum dolor.
                </p>
              </div>
            </li>
            <li
              onClick={() => {
                setIndex(2);
              }}
            >
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
              <div className="map-text">
                <p>Branch 2</p>
                <p>
                  Lorem ipsum dolor sit. <br />
                  Lorem, ipsum dolor.
                </p>
              </div>
            </li>
          </ul>
          <div className="map-inner">
            <div className="custom_typecontrol radius_border">
              <span
                id="btnRoadmap"
                className="selected_btn"
                onClick={() => {
                  setMapType('roadmap');
                }}
              >
                Map
              </span>
              <span
                id="btnSkyview"
                className="btn"
                onClick={() => {
                  setMapType('skyview');
                }}
              >
                Sky View
              </span>
            </div>
            <ul className="traffic">
              {toggle ? (
                <li
                  onClick={() => {
                    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    setToggle(!toggle);
                  }}
                >
                  <FontAwesomeIcon
                    className="traffic-icon"
                    icon={faTrafficLight}
                  />
                  Off the traffic
                </li>
              ) : (
                <li
                  onClick={() => {
                    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    setToggle(!toggle);
                  }}
                >
                  <FontAwesomeIcon
                    className="traffic-icon"
                    icon={faTrafficLight}
                  />
                  On the traffic
                </li>
              )}
            </ul>
            <div id="map" ref={container}></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Location;
