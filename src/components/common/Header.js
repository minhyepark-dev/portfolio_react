import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
    const body = document.querySelector("body");
    const active = {
        color: "#0d211a",
    };
    const nav = useRef(null);
    const btn = useRef(null);
    const gnbClick = (e) => {
        //btnCall에 on이 있으면 제거, 없으면 추가
        btn.current.classList.toggle("on");
        body.classList.toggle("on");
        //menuMo에 on이 있으면 제거, 없으면 추가
        nav.current.classList.toggle("on");
    };
    const handleClick = () => {
        btn.current.classList.remove("on");
        body.classList.remove("on");
        nav.current.classList.remove("on");
    };
    return (
        <header>
            <div className="inner">
                <h1>
                    <NavLink exact to="/">
                        Doremi
                    </NavLink>
                </h1>
                <ul id="gnb">
                    <li>
                        <NavLink activeStyle={active} exact to="/department">
                            Department
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={active} exact to="/community">
                            Community
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={active} exact to="/gallery">
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={active} exact to="/youtube">
                            Youtube
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={active} exact to="/location">
                            Location
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={active} exact to="/join">
                            Join
                        </NavLink>
                    </li>
                </ul>
                <div className="btnCall" onClick={gnbClick} ref={btn}>
                    <span>메뉴호출</span>
                </div>
                <nav className="menu-mobile" ref={nav}>
                    <h1>
                        <NavLink exact to="/" onClick={handleClick}>
                            Doremi
                        </NavLink>
                        <span>WE ARE YOUR ENERGY</span>
                    </h1>
                    <ul id="gnb-mobile">
                        <li>
                            <NavLink activeStyle={active} exact to="/department" onClick={handleClick}>
                                Department
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={active} exact to="/community" onClick={handleClick}>
                                Community
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={active} exact to="/gallery" onClick={handleClick}>
                                Gallery
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={active} exact to="/youtube" onClick={handleClick}>
                                Youtube
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={active} exact to="/location" onClick={handleClick}>
                                Location
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={active} exact to="/join" onClick={handleClick}>
                                Join
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
