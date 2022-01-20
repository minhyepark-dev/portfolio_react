import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Community() {
    const base = process.env.PUBLIC_URL;
    const [posts, setPosts] = useState([]);
    let article = useRef(null);
    const btnTab = useRef(null);
    const boxTab = useRef(null);
    const [enable, setEnable] = useState(true);

    const handleTab = () => {
        const btns = btnTab.current.querySelectorAll("div");
        const boxes = boxTab.current.querySelectorAll("section > div");
        btns.forEach((el, index) => {
            el.addEventListener("click", (e) => {
                let isOn = e.currentTarget.classList.contains("on");
                if (isOn) return;
                if (enable) {
                    activation(btns, index);
                    activation(boxes, index);
                    setEnable(false);
                }
            });
        });
    };

    const activation = (arr, index) => {
        for (let item of arr) item.classList.remove("on");
        arr[index].classList.add("on");
    };

    useEffect(() => {
        axios.get(`${base}/dbs/community.json`).then((json) => {
            setPosts(json.data.data);
        });
        handleTab();
    }, []);
    return (
        <main className="community">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Community</h1>
                </div>
            </div>
            <div className="inner">
                <div className="news" ref={btnTab}>
                    <div className="box on" onClick={handleTab}>
                        <h2>Q&A</h2>
                    </div>
                    <div className="box" onClick={handleTab}>
                        <h2>FAQ</h2>
                    </div>
                    <div className="box" onClick={handleTab}>
                        <h2>Board</h2>
                    </div>
                </div>
                <section ref={boxTab}>
                    <div className="list on">
                        {posts.map((item, index) => {
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
                                        <h1>{item.title + "1"}</h1>
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
                        {posts.map((item, index) => {
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
                                        <h1>{item.title + "2"}</h1>
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
                        {posts.map((item, index) => {
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
                                        <h1>{item.title + "3"}</h1>
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
}

export default Community;
