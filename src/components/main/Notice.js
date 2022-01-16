import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Notice() {
    return (
        <main className="notice">
            <div className="inner">
                <h2>The latest</h2>
                <div className="slider">
                    <div className="slider-btn">
                        <div className="prev">
                            <FontAwesomeIcon className="icon-arrow" icon={faChevronLeft} />
                        </div>
                        <div className="next">
                            <FontAwesomeIcon className="icon-arrow" icon={faChevronRight} />
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div className="slider-content">
                                <h3>Lorem ipsum dolor sit amet.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nulla culpa. Excepturi eius, quibusdam
                                    delectus quod accusantium voluptates! Aliquid, rem.
                                </p>
                                <Link to="/">
                                    Read More
                                    <FontAwesomeIcon
                                        className="icon-arrow"
                                        icon={faArrowRight}
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="slider-content">
                                <h3>Lorem ipsum dolor sit amet.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nulla culpa. Excepturi eius, quibusdam
                                    delectus quod accusantium voluptates! Aliquid, rem.
                                </p>
                                <Link to="/">
                                    Read More
                                    <FontAwesomeIcon
                                        className="icon-arrow"
                                        icon={faArrowRight}
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="slider-content">
                                <h3>Lorem ipsum dolor sit amet.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nulla culpa. Excepturi eius, quibusdam
                                    delectus quod accusantium voluptates! Aliquid, rem.
                                </p>
                                <Link to="/">
                                    Read More
                                    <FontAwesomeIcon
                                        className="icon-arrow"
                                        icon={faArrowRight}
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="slider-content">
                                <h3>Lorem ipsum dolor sit amet.</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nulla culpa. Excepturi eius, quibusdam
                                    delectus quod accusantium voluptates! Aliquid, rem.
                                </p>
                                <Link to="/">
                                    Read More
                                    <FontAwesomeIcon
                                        className="icon-arrow"
                                        icon={faArrowRight}
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default Notice;
