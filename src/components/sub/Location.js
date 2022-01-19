import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faMapMarkerAlt, faEnvelope, faClock, faTrafficLight } from "@fortawesome/free-solid-svg-icons";

function Location() {
    const { kakao } = window;
    const container = useRef(null);
    const btnBranch = useRef(null);
    const [map, setMap] = useState(null);
    const [index, setIndex] = useState(0);
    const [toggle, setToggle] = useState(false);
    const info = [
        {
            title: "본점",
            latlng: new kakao.maps.LatLng(37.51276949548283, 127.05883923964538),
            imgSrc: process.env.PUBLIC_URL + "/img/pin.png",
            imgSize: new kakao.maps.Size(50, 50),
            imgPos: { offset: new kakao.maps.Point(25, 50) },
        },
        {
            title: "지점1",
            latlng: new kakao.maps.LatLng(37.50707728716868, 126.75635104990461),
            imgSrc: process.env.PUBLIC_URL + "/img/pin2.png",
            imgSize: new kakao.maps.Size(50, 50),
            imgPos: { offset: new kakao.maps.Point(25, 55) },
        },
        {
            title: "지점2",
            latlng: new kakao.maps.LatLng(35.15317690680852, 129.11898444686017),
            imgSrc: process.env.PUBLIC_URL + "/img/pin3.png",
            imgSize: new kakao.maps.Size(50, 50),
            imgPos: { offset: new kakao.maps.Point(25, 50) },
        },
    ];
    const [mapInfo, setMapInfo] = useState(info);
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
            image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos), // 마커 이미지
        });
        map.setCenter(mapInfo[index].latlng);

        map.setZoomable(true);
        map.setDraggable(true);

        for (const btn of btnBranch.current.children) btn.classList.remove("on");
        btnBranch.current.children[index].classList.add("on");

        const mapSet = () => map.setCenter(mapInfo[index].latlng);
        window.addEventListener("resize", mapSet);
        return () => {
            window.removeEventListener("resize", mapSet);
            container.current.innerHTML = "";
        };
    }, [index]);
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aut. <br /> Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
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
                    <div id="map" ref={container}>
                        <ul className="traffic">
                            {toggle ? (
                                <li
                                    onClick={() => {
                                        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                                        setToggle(!toggle);
                                    }}
                                >
                                    <FontAwesomeIcon className="traffic-icon" icon={faTrafficLight} />
                                    Off the traffic
                                </li>
                            ) : (
                                <li
                                    onClick={() => {
                                        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                                        setToggle(!toggle);
                                    }}
                                >
                                    <FontAwesomeIcon className="traffic-icon" icon={faTrafficLight} />
                                    On the traffic
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Location;
