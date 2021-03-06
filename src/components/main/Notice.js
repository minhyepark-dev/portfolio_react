import Anime from "../../class/anime.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCommunity } from "../../redux/actions.js";

function Notice() {
    const base = process.env.PUBLIC_URL;

    let box = useRef(null);
    const community = useSelector((state) => state);
    const notice = community.communityReducer.community;
    const dispatch = useDispatch();
    const fetchCommunity = async () => {
        const response = await axios.get(`${base}/dbs/community.json`).catch((err) => {
            console.error(err);
        });
        dispatch(setCommunity(response.data.data));
    };
    const init = () => {
        box.current.style.marginLeft = "-100%";
        box.current.prepend(box.current.lastElementChild);
    };
    useEffect(() => {
        init();
        fetchCommunity();
    }, []);
    return (
        <main className="notice myScroll">
            <div className="inner">
                <h2>The latest</h2>
                <div className="slider-wrap">
                    <div className="slider-btn">
                        <div
                            tabIndex={0}
                            className="prev"
                            onClick={() => {
                                btnPrev();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") btnPrev();
                            }}
                        >
                            <FontAwesomeIcon className="icon-arrow" icon={faChevronLeft} />
                        </div>
                        <div
                            tabIndex={0}
                            className="next"
                            onClick={() => {
                                btnNext();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") btnNext();
                            }}
                        >
                            <FontAwesomeIcon className="icon-arrow" icon={faChevronRight} />
                        </div>
                    </div>
                    <div className="slider">
                        <ul ref={box}>
                            {notice.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="slider-content">
                                            <h3>{item.title}</h3>
                                            <p>{item.answer}</p>
                                            <Link exact="true" to="/community">
                                                Read More
                                                <FontAwesomeIcon
                                                    className="icon-arrow"
                                                    icon={faArrowRight}
                                                    style={{
                                                        marginLeft: 10,
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
    function btnPrev() {
        new Anime(box.current, {
            prop: "margin-left",
            value: "0%",
            duration: 500,
            callback: () => {
                box.current.prepend(box.current.lastElementChild);
                box.current.style.marginLeft = "-100%";
            },
        });
    }
    function btnNext() {
        new Anime(box.current, {
            prop: "margin-left",
            value: "-200%",
            duration: 500,
            callback: () => {
                box.current.append(box.current.firstElementChild);
                box.current.style.marginLeft = "-100%";
            },
        });
    }
}

export default Notice;
