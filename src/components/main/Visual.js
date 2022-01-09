function Visual() {
    const base = process.env.PUBLIC_URL;
    return (
        <main className="visual">
            <div className="inner">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, veritatis ea corrupti voluptatibus ad ut vitae suscipit
                    assumenda? Quaerat, incidunt.
                </p>
                <h2>Do's Collection</h2>
                <img src={base + "/img/main2.jpg"} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate natus pariatur aperiam!</p>
            </div>
        </main>
    );
}
export default Visual;
