import { useEffect, useRef, useState } from "react";

function Cookie() {
    const popup = useRef(null);
    const [isOn, setIsOn] = useState(false);
    const isCookie = document.cookie.includes("popup=done");

    const setCookie = (name, due) => {
        const today = new Date();
        const date = today.getDate();
        today.setDate(date + due);
        const duedate = today.toGMTString();
        document.cookie = `${name}; path=/; expires=${duedate}`;
    };

    useEffect(() => {
        if (isCookie) {
            setIsOn(true);
            console.log("쿠키 있음");
        } else {
            setIsOn(false);
            console.log("쿠키 없음");
        }
    }, []);

    return (
        <>
            {!isOn ? (
                <aside id="popup" ref={popup}>
                    <div className="content">
                        <h1>DOREMI</h1>
                        <p>
                            DOREMI는 리액트로 제작된 <br /> 포트폴리오 웹사이트 입니다.
                        </p>
                        <p>본사이트는 Chrome에 최적화 되어있습니다.</p>
                        <p>방문해주셔서 감사합니다.</p>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" name="ck" id="ck" />
                        <label htmlFor="ck">오늘 하루 그만 보기</label>
                    </div>
                    <button
                        className="close"
                        onClick={() => {
                            popup.current.style.display = "none";
                            let isChecked = popup.current.querySelector("#ck").checked;
                            if (isChecked) setCookie("popup=done", 1);
                        }}
                    >
                        Close
                    </button>
                </aside>
            ) : null}
        </>
    );
}

export default Cookie;
