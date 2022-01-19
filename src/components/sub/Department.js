import axios from "axios";
import { useEffect, useState } from "react";

function Department() {
    const base = process.env.PUBLIC_URL;
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`${base}/dbs/department.json`).then((json) => {
            setList(json.data.data);
        });
    }, []);
    return (
        <main className="department">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Department</h1>
                </div>
            </div>
            <div className="inner">
                <div className="ceo">
                    <div className="pic">
                        <img src={base + "/img/ceo.jpg"} />
                    </div>
                    <div className="text">
                        <h2>We are Doremi</h2>
                        <strong>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum fugit tempore magnam in natus beatae!"</strong>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus amet ducimus ratione tempore sint aperiam asperiores
                            officiis libero dolorum! Obcaecati quibusdam veritatis vitae sapiente. Asperiores nulla earum molestiae enim voluptatibus.
                            Praesentium, distinctio iste vero rem doloribus blanditiis amet alias consectetur.
                        </p>
                        <strong>"Lorem ipsum dolor sit amet."</strong>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi accusamus dicta, veritatis iste animi eligendi qui enim
                            nisi. Dignissimos facilis provident minus, similique adipisicing elit dolor sit.
                        </p>
                        <svg className="signature" width="170" height="70" viewBox="0 0 581 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                id="Vector"
                                d="M532.133,52.648c17.834,17.833,19.334,12.333,8,20
	c-29.496,19.952-124.5-81.5-101-58s38.334,24.667,26.334,34c-38.326,29.81-175-50.333-193.834-18.33
	c-27.652,46.989,134,127.5,140.5,134s20.455,8.703,12.334,16.824c-10.131,10.131-80.539-32.27-69.166-15.49
	c6.441,9.504,10.188,38.666,1.332,49.334c-20.473,24.666-80.008-44.486-64.334-28.168c3.336,3.471,17.5,36.166,3.334,52.832
	c-19.006,22.359-59.852-18.232-56.422-12.674c6.588,10.674,16.668,37.166,9,42.5c-24.572,17.095-58.922-49.085-67.666-44.668
	c-8.296,4.191,1.397,27.858,3.838,32.76s31.25,60.75,16,60.5c-73.294-1.201-106.75-22.75-138.75-54.75
	c-32-32-46.625-72.375-38.25-80.75s48.863,20.725,83,72.75c52,79.25,29,114.083,29,114.083"
                                stroke="black"
                                strokeWidth="5"
                                strokeMiterlimit="10"
                            />
                        </svg>
                    </div>
                </div>
                <div className="member">
                    <div className="member-top">
                        <strong>
                            The <br />
                            Doremi's
                        </strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem voluptatibus magnam culpa voluptas soluta, accusamus at
                            vel illum corporis accusantium.
                        </p>
                    </div>
                    {list.map((item, index) => {
                        return (
                            <div className="member-list" key={index}>
                                <div className="inner">
                                    <div className="pic">
                                        <img src={`${base}` + item.img} alt="" />
                                    </div>
                                    <div className="text">
                                        <h3>{item.name}</h3>
                                        <span>{item.position}</span>
                                        <span>{item.email}</span>
                                        <p>{item.introduce}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Department;
