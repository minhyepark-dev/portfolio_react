import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faTrafficLight,
} from '@fortawesome/free-solid-svg-icons';

const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;

function loadKakaoMap() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => resolve();
  });
}

async function Location() {
  await loadKakaoMap();
  const { kakao } = window;
  const container = useRef(null);
  const btnBranch = useRef(null);
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const info = [
    {
      title: '본점',
      latlng: new kakao.maps.LatLng(37.51276949548283, 127.05883923964538),
      imgSrc: process.env.PUBLIC_URL + '/img/pin.png',
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(25, 50) },
    },
    {
      title: '지점1',
      latlng: new kakao.maps.LatLng(37.57975318699628, 126.97709192859216),
      imgSrc: process.env.PUBLIC_URL + '/img/pin2.png',
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(25, 55) },
    },
    {
      title: '지점2',
      latlng: new kakao.maps.LatLng(35.15317690680852, 129.11898444686017),
      imgSrc: process.env.PUBLIC_URL + '/img/pin3.png',
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(25, 50) },
    },
  ];
  const [mapInfo, setMapInfo] = useState(info);
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
  useEffect(() => {
    const options = {
      center: mapInfo[index].latlng,
      level: 3,
    };
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(
        mapInfo[index].imgSrc,
        mapInfo[index].imgSize,
        mapInfo[index].imgPos
      ), // 마커 이미지
    });
    map.setCenter(mapInfo[index].latlng);

    map.setZoomable(true);
    map.setDraggable(true);

    for (const btn of btnBranch.current.children) btn.classList.remove('on');
    btnBranch.current.children[index].classList.add('on');

    const mapSet = () => map.setCenter(mapInfo[index].latlng);
    window.addEventListener('resize', mapSet);
    return () => {
      window.removeEventListener('resize', mapSet);
      container.current.innerHTML = '';
    };
  }, [index]);
  return (
    <main id="main" className="location">
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
              tabIndex={0}
              onClick={() => {
                setIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIndex(0);
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
              tabIndex={0}
              onClick={() => {
                setIndex(1);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIndex(1);
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
              tabIndex={0}
              onClick={() => {
                setIndex(2);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIndex(2);
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
                tabIndex={0}
                id="btnRoadmap"
                className="selected_btn"
                onClick={() => {
                  setMapType('roadmap');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setMapType('roadmap');
                }}
              >
                Map
              </span>
              <span
                tabIndex={0}
                id="btnSkyview"
                className="btn"
                onClick={() => {
                  setMapType('skyview');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setMapType('skyview');
                }}
              >
                Sky View
              </span>
            </div>
            <ul className="traffic">
              {toggle ? (
                <li
                  tabIndex={0}
                  onClick={() => {
                    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    setToggle(!toggle);
                  }}
                  onKeyDown={(e) => {
                    {
                      if (e.key === 'Enter') {
                        map.removeOverlayMapTypeId(
                          kakao.maps.MapTypeId.TRAFFIC
                        );
                        setToggle(!toggle);
                      }
                    }
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
                  tabIndex={0}
                  onClick={() => {
                    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    setToggle(!toggle);
                  }}
                  onKeyDown={(e) => {
                    {
                      if (e.key === 'Enter') {
                        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                        setToggle(!toggle);
                      }
                    }
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
