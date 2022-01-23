import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGallery } from "../../redux/actions";

function Collection() {
    const gallery = useSelector((state) => state);
    const dispatch = useDispatch();
    const galData = gallery.galleryReducer.gallery;

    const base = "https://www.flickr.com/services/rest/?";
    const method = "flickr.galleries.getPhotos";
    const api_key = "9e85f04dacb4a41b834ddd33463ef00e";
    const per_page = 6;
    const url2 = `${base}method=${method}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1&gallery_id=72157720230522725`;
    const fetchGallery = async () => {
        const response = await axios.get(url2).catch((err) => {
            console.error(err);
        });
        dispatch(setGallery(response.data.photos.photo));
    };
    useEffect(() => {
        fetchGallery();
    }, []);
    return (
        <main className="collection myScroll">
            <div className="inner">
                <div className="img-wrap">
                    {galData
                        .filter((_, index) => index === 0)
                        .map((item, index) => {
                            const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`;
                            return (
                                <div className="img" key={index}>
                                    <img src={imgSrc} />
                                </div>
                            );
                        })}
                    <div className="img">
                        {galData
                            .filter((_, index) => index > 0 && index <= 4)
                            .map((item, index) => {
                                const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`;
                                return (
                                    <div className="img-inner" key={index}>
                                        <img src={imgSrc} />
                                    </div>
                                );
                            })}
                    </div>
                    {galData
                        .filter((_, index) => index === 5)
                        .map((item, index) => {
                            const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`;
                            return (
                                <div className="img" key={index}>
                                    <img src={imgSrc} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </main>
    );
}

export default Collection;
