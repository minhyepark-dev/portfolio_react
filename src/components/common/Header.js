import { NavLink } from "react-router-dom";

function Header() {
    const active = {
        color: "#0d211a",
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
            </div>
        </header>
    );
}

export default Header;
