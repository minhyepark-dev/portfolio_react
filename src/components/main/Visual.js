import { useEffect, useRef } from "react";

function Visual() {
    const base = process.env.PUBLIC_URL;
    const main = useRef(null);
    const text = useRef(null);
    const mouseMove = (e) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const width = parseFloat(getComputedStyle(text.current).width);
        const height = parseFloat(getComputedStyle(text.current).height);
        const DegX = (width / 2 - mouseX) * 0.05;
        const DegY = (height / 2 - mouseY) * -0.05;
        text.current.style.transform = `rotateX(${DegX}deg) rotateY(${DegY}deg)`;
    };
    useEffect(() => {
        main.current.addEventListener("mousemove", mouseMove);
        return () => {
            main.current.removeEventListener("mousemove", mouseMove);
        };
    }, [mouseMove]);

    return (
        <main className="visual" ref={main}>
            <div className="inner">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, veritatis ea corrupti voluptatibus ad ut vitae suscipit
                    assumenda? Quaerat, incidunt.
                </p>
                <h2 className="cursor-text" ref={text}>
                    Do's Collection
                </h2>
                <img src={base + "/img/main2.jpg"} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate natus pariatur aperiam!</p>
            </div>
        </main>
    );
}
export default Visual;
