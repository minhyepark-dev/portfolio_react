/*
    1. 유튜브 서버로부터 데이터 요청을 해서 전달받은 데이터를 state에 옮겨담기
    2. 해당 state값을 활용해서 동적으로 가상돔 생성
    3. 각각의 가상돔 요소 클릭시 레이어팝업 동적으로 생성
    4. 해당 레이어팝업 안쪽에 데이터와 순서관련 state값을 활용해서 세부 컨텐츠 출력
*/

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
                            width="100%"
                            height="100%"
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
