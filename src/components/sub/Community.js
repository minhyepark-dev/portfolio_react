import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Community() {
    const base = process.env.PUBLIC_URL;

    let article = useRef(null);
    const btnTab = useRef(null);
    const boxTab = useRef(null);
    const [enable, setEnable] = useState(true);
    const [faq, setFaq] = useState([]);
    const [board, setBoard] = useState([]);

    const community = useSelector((state) => state);
    const notice = community.communityReducer.community;

    const handleTab = () => {
        const btns = btnTab.current.querySelectorAll("div");
        const boxes = boxTab.current.querySelectorAll("section > div");
        btns.forEach((el, index) => {
            el.addEventListener("click", (e) => {
                moveOn(e, index);
            });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter") moveOn(e, index);
            });
        });
        const moveOn = (e, index) => {
            let isOn = e.currentTarget.classList.contains("on");
            if (isOn) return;
            if (enable) {
                activation(btns, index);
                activation(boxes, index);
                setEnable(false);
            }
        };
    };

    const activation = (arr, index) => {
        for (let item of arr) item.classList.remove("on");
        arr[index].classList.add("on");
    };

    useEffect(() => {
        handleTab();
    }, []);
    return (
        <main id="main" className="community">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Community</h1>
                </div>
            </div>
            <div className="inner">
                <div className="news" ref={btnTab}>
                    <div tabIndex={0} className="box on" onClick={handleTab} onKeyDown={handleTab}>
                        <h2>Q&A</h2>
                    </div>
                    <div
                        tabIndex={0}
                        className="box"
                        onClick={() => {
                            handleTab();
                            btnFaq();
                        }}
                        onKeyDown={() => {
                            btnFaq();
                            handleTab();
                        }}
                    >
                        <h2>FAQ</h2>
                    </div>
                    <div
                        tabIndex={0}
                        className="box"
                        onClick={() => {
                            handleTab();
                            btnBoard();
                        }}
                        onKeyDown={() => {
                            btnBoard();
                            handleTab();
                        }}
                    >
                        <h2>Board</h2>
                    </div>
                </div>
                <section ref={boxTab}>
                    <div className="list on">
                        {notice.map((item, index) => {
                            return (
                                <article key={index} ref={article}>
                                    <div
                                        className="question"
                                        onClick={(e) => {
                                            if (e.currentTarget.nextSibling.classList.contains("on")) {
                                                e.currentTarget.nextSibling.classList.remove("on");
                                                e.currentTarget.querySelector(".down").classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.remove("on");
                                            } else {
                                                e.currentTarget.nextSibling.classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.add("on");
                                                e.currentTarget.querySelector(".down").classList.remove("on");
                                            }
                                        }}
                                    >
                                        <h1>{item.title}</h1>
                                        <div className="right">
                                            <span>{item.write}</span>
                                            <em>{item.date}</em>
                                            <FontAwesomeIcon className="icon-arrow down on" icon={faChevronDown} />
                                            <FontAwesomeIcon className="icon-arrow up" icon={faChevronUp} />
                                        </div>
                                    </div>
                                    <div className="answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    <div className="list">
                        {faq.map((item, index) => {
                            return (
                                <article key={index} ref={article}>
                                    <div
                                        className="question"
                                        onClick={(e) => {
                                            if (e.currentTarget.nextSibling.classList.contains("on")) {
                                                e.currentTarget.nextSibling.classList.remove("on");
                                                e.currentTarget.querySelector(".down").classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.remove("on");
                                            } else {
                                                e.currentTarget.nextSibling.classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.add("on");
                                                e.currentTarget.querySelector(".down").classList.remove("on");
                                            }
                                        }}
                                    >
                                        <h1>{item.title}</h1>
                                        <div className="right">
                                            <span>{item.write}</span>
                                            <FontAwesomeIcon className="icon-arrow down on" icon={faChevronDown} />
                                            <FontAwesomeIcon className="icon-arrow up" icon={faChevronUp} />
                                        </div>
                                    </div>
                                    <div className="answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    <div className="list">
                        {board.map((item, index) => {
                            return (
                                <article key={index} ref={article}>
                                    <div
                                        className="question"
                                        onClick={(e) => {
                                            if (e.currentTarget.nextSibling.classList.contains("on")) {
                                                e.currentTarget.nextSibling.classList.remove("on");
                                                e.currentTarget.querySelector(".down").classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.remove("on");
                                            } else {
                                                e.currentTarget.nextSibling.classList.add("on");
                                                e.currentTarget.querySelector(".up").classList.add("on");
                                                e.currentTarget.querySelector(".down").classList.remove("on");
                                            }
                                        }}
                                    >
                                        <h1>{item.title}</h1>
                                        <div className="right">
                                            <span>{item.write}</span>
                                            <em>{item.date}</em>
                                            <FontAwesomeIcon className="icon-arrow down on" icon={faChevronDown} />
                                            <FontAwesomeIcon className="icon-arrow up" icon={faChevronUp} />
                                        </div>
                                    </div>
                                    <div className="answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
    async function btnFaq() {
        await axios.get(`${base}/dbs/faq.json`).then((json) => {
            const response = json.data.data;
            setFaq(response);
        });
    }
    async function btnBoard() {
        await axios.get(`${base}/dbs/board.json`).then((json) => {
            const response = json.data.data;
            setBoard(response);
        });
    }
}

export default Community;
