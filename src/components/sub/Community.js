import axios from "axios";
import { useEffect, useState } from "react";

function Community() {
    const base = process.env.PUBLIC_URL;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${base}/dbs/community.json`).then((json) => {
            console.log(json.data.data);
            setPosts(json.data.data);
        });
    }, []);
    return (
        <main className="community">
            <div className="inner">
                <h1>Community</h1>
                {posts.map((item, index) => {
                    return (
                        <article key={index}>
                            <h1>{item.title}</h1>
                            <div className="right">
                                <span>{item.write}</span>
                                <em>{item.date}</em>
                            </div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}

export default Community;
