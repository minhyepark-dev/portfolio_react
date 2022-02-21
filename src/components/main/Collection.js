import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Collection() {
    const [items, setItems] = useState([]);

    const base = "https://www.flickr.com/services/rest/?";
    const method = "flickr.galleries.getPhotos";
    const api_key = "9e85f04dacb4a41b834ddd33463ef00e";
    const per_page = 6;
    const url = `${base}method=${method}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1&extras=views,owner_name&gallery_id=72157720230522725`;
    const fetchGallery = async () => {
        await axios.get(url).then((json) => {
            const photo = json.data.photos.photo;
            console.log(photo);
            setItems(photo);
        });
    };
    useEffect(() => {
        fetchGallery();
    }, []);
    return (
        <main className="collection myScroll">
            <div className="inner">
                <div className="img-wrap">
                    {items
                        .filter((_, index) => index === 0)
                        .map((item, index) => {
                            const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`;
                            return (
                                <div className="img big" key={index}>
                                    <img src={imgSrc} />
                                    <div className="img-text">
                                        <h3>{item.title}</h3>
                                        <p>{item.ownername}</p>
                                        <p>
                                            <FontAwesomeIcon icon={faEye} className="icon-views" />
                                            {item.views}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="img">
                        {items
                            .filter((_, index) => index > 0 && index <= 4)
                            .map((item, index) => {
                                const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`;
                                return (
                                    <div className="img-inner" key={index}>
                                        <img src={imgSrc} />
                                        <div className="img-text">
                                            <h3>{item.title}</h3>
                                            <p>{item.ownername}</p>
                                            <p>
                                                <FontAwesomeIcon icon={faEye} className="icon-views" />
                                                {item.views}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    {items
                        .filter((_, index) => index === 5)
                        .map((item, index) => {
                            const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`;
                            return (
                                <div className="img big" key={index}>
                                    <img src={imgSrc} />
                                    <div className="img-text">
                                        <h3>{item.title}</h3>
                                        <p>{item.ownername}</p>
                                        <p>
                                            <FontAwesomeIcon icon={faEye} className="icon-views" />
                                            {item.views}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </main>
    );
}

export default Collection;
