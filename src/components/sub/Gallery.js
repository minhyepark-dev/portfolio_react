import axios from "axios";
import { useEffect, useState } from "react";
const body = document.querySelector("body");

function Gallery() {
    const base = "https://www.flickr.com/services/rest/?";
    const method1 = "flickr.interestingness.getList";
    const api_key = "9e85f04dacb4a41b834ddd33463ef00e";
    const per_page = 20;
    const url = `${base}method=${method1}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1`;

    const [items, setItems] = useState([]);
    let [isPop, setIsPop] = useState(false);
    let [index, setIndex] = useState(0);

    useEffect(() => {
        axios.get(url).then((json) => {
            console.log(json.data.photos.photo);
            setItems(json.data.photos.photo);
        });
    }, []);

    return (
        <main className="gallery">
            <div className="inner">
                <h1>Gallery</h1>
                <section>
                    {items.map((item, index) => {
                        const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
                        return (
                            <article key={index} className="item">
                                <div className="inner">
                                    <div
                                        className="pic"
                                        onClick={() => {
                                            setIndex(index);
                                            setIsPop(true);
                                        }}
                                    >
                                        <img src={imgSrc} />
                                    </div>
                                    <h2>{item.title}</h2>
                                    <p>{item.owner}</p>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
            {isPop ? <Pop /> : null}
        </main>
    );
    function Pop() {
        const imgSrc = `https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`;
        useEffect(() => {
            body.style.overflow = "hidden";
            return () => {
                body.style.overflow = "auto";
            };
        }, []);
        return (
            <aside className="pop">
                <p>{items[index].title}</p>
                <img src={imgSrc} />
                <span
                    onClick={() => {
                        setIsPop(false);
                    }}
                >
                    Close
                </span>
            </aside>
        );
    }
}

export default Gallery;
