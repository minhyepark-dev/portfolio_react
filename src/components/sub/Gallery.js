import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const base = process.env.PUBLIC_URL;
const body = document.querySelector("body");

const masonryOptions = {
    fitWidth: false,
    gutter: 0,
    itemSelector: ".item",
};

function Gallery() {
    const [items, setItems] = useState([]);

    let [isPop, setIsPop] = useState(false);
    let [index, setIndex] = useState(0);
    let [loading, setLoading] = useState(true);
    let [enableClick, setEnableClick] = useState(true);

    let list = useRef(null);
    let input = useRef(null);

    const gallery = useSelector((state) => state);
    const galData = gallery.galleryReducer.gallery;
    console.log(galData);

    useEffect(() => {
        getFlickr({ type: "interest", count: 50 });
    }, []);

    return (
        <main className="gallery">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Gallery</h1>
                </div>
            </div>
            <div className="inner">
                <section>
                    <div className="search-box">
                        <input
                            type="text"
                            onKeyPress={(e) => {
                                const tags = input.current.value;
                                if (e.code !== "Enter" || tags === "") return;
                                if (enableClick) {
                                    setEnableClick(false);
                                    list.current.classList.remove("on");
                                    input.current.value = "";
                                    getFlickr({ type: "search", tags: tags, count: 50 });
                                }
                            }}
                            ref={input}
                            placeholder="Enter some words"
                        />
                        <button
                            onClick={() => {
                                if (enableClick) {
                                    const tags = input.current.value;
                                    if (tags === "") return;
                                    setEnableClick(false);
                                    list.current.classList.remove("on");
                                    input.current.value = "";
                                    getFlickr({ type: "search", tags: tags, count: 50 });
                                }
                            }}
                        >
                            <FontAwesomeIcon className="icon-search" icon={faSearch} />
                        </button>
                    </div>
                    {loading ? <img className="loading" src={base + "/img/loading.png"} alt="loading" /> : null}
                    <div className="list" ref={list}>
                        <Masonry
                            className={"frame"}
                            elementType={"div"}
                            disableImagesLoaded={false}
                            updateOnEachImageLoad={false}
                            options={masonryOptions}
                        >
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
                                            <div className="txt">
                                                <h2>{item.title}</h2>
                                                <p>{item.owner}</p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </Masonry>
                    </div>
                </section>
            </div>
            {isPop ? <Pop /> : null}
        </main>
    );
    async function getFlickr(opt) {
        setLoading(true);

        let url = "";

        const base = "https://www.flickr.com/services/rest/?";
        const method1 = "flickr.interestingness.getList";
        const method2 = "flickr.photos.search";
        const api_key = "9e85f04dacb4a41b834ddd33463ef00e";
        const per_page = opt.count;

        if (opt.type === "interest") {
            url = `${base}method=${method1}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1`;
        } else if (opt.type === "search") {
            url = `${base}method=${method2}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        } else {
            console.error("api요청 타입을 interest, search 중에서 지정하세요.");
        }
        await axios.get(url).then((json) => {
            const photo = json.data.photos.photo;
            setItems(photo);
        });
        setTimeout(() => {
            list.current.classList.add("on");
            setLoading(false);
            setTimeout(() => {
                setEnableClick(true);
            }, 1000);
        }, 1000);
    }

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
