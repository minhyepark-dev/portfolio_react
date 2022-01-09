function Collection() {
    const base = process.env.PUBLIC_URL;
    return (
        <main className="collection">
            <div className="inner">
                <div className="img-wrap">
                    <div className="img">
                        <img src={base + "/img/main.jpg"} alt="" />
                    </div>
                    <div className="img">
                        <img src={base + "/img/main2.jpg"} alt="" />
                        <img src={base + "/img/main3.jpg"} alt="" />
                        <img src={base + "/img/main4.jpg"} alt="" />
                        <img src={base + "/img/main5.jpg"} alt="" />
                    </div>
                    <div className="img">
                        <img src={base + "/img/main6.jpg"} alt="" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Collection;
