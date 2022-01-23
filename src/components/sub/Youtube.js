import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

import axios from "axios";
import { useEffect, useState } from "react";
function Youtube() {
    let [data, setData] = useState([]);
    let [isPop, setIsPop] = useState(false);
    let [index, setIndex] = useState(0);
    const key = "AIzaSyCEH01dII9F6sGxDEU4lWx-wmMec8Miz00";
    const playListId = "PLjIdINgJblV8_OS4xrnhXw4qCZPIW2Lno";
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;
    useEffect(() => {
        axios.get(url).then((json) => {
            setData(json.data.items);
        });
    }, []);
    return (
        <main className="youtube">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Youtube</h1>
                </div>
            </div>
            <div className="inner">
                <section className="frame">
                    {data.map((item, index) => {
                        let tit = item.snippet.title;
                        let tit_len = tit.length;
                        let desc = item.snippet.description;
                        let desc_len = tit.length;
                        return (
                            <article key={index}>
                                <div className="inner">
                                    <div
                                        className="pic"
                                        onClick={() => {
                                            setIsPop(true);
                                            setIndex(index);
                                        }}
                                    >
                                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                                        <FontAwesomeIcon className="icon-play" icon={faPlayCircle} />
                                    </div>
                                    <div className="txt">
                                        <h2>{tit_len > 36 ? (tit = tit.substr(0, 36) + "...") : tit}</h2>
                                        <p>{desc_len > 50 ? (desc = desc.substr(0, 100) + "...") : desc}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
                {isPop ? <Pop /> : null}
            </div>
        </main>
    );
    function Pop() {
        return (
            <aside className="pop">
                <div className="inner">
                    <figure>
                        <iframe
                            src={"https://www.youtube.com/embed/" + data[index].snippet.resourceId.videoId}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </figure>
                    <span
                        onClick={() => {
                            setIsPop(false);
                        }}
                    >
                        Close
                    </span>
                </div>
            </aside>
        );
    }
}

export default Youtube;
