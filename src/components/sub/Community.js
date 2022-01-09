import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Community() {
    const base = process.env.PUBLIC_URL;
    const [posts, setPosts] = useState([]);
    const [arrows, setArrows] = useState(false);
    let article = useRef(null);

    useEffect(() => {
        axios.get(`${base}/dbs/community.json`).then((json) => {
            console.log(json.data.data);
            setPosts(json.data.data);
        });
    }, []);
    return (
        <main className="community">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Community</h1>
                </div>
            </div>
            <div className="inner">
                <div className="news">
                    <div className="box on">
                        <h2>Q&A</h2>
                    </div>
                    <div className="box">
                        <h2>FAQ</h2>
                    </div>
                    <div className="box">
                        <h2>Board</h2>
                    </div>
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
                                        } else {
                                            e.currentTarget.nextSibling.classList.add("on");
                                        }
                                    }}
                                >
                                    <h1>{item.title}</h1>
                                    <div className="right">
                                        <span>{item.write}</span>
                                        <em>{item.date}</em>
                                        {arrows ? (
                                            <FontAwesomeIcon className="icon-arrow" icon={faChevronUp} />
                                        ) : (
                                            <FontAwesomeIcon className="icon-arrow" icon={faChevronDown} />
                                        )}
                                    </div>
                                </div>
                                <div className="answer">
                                    <p>{item.answer}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Community;
