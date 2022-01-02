import "./css/style.css";
import { Route } from "react-router-dom";

// import common component
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// import main component
import Visual from "./components/main/Visual";
import Info from "./components/main/Info";

// import sub component
import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Location from "./components/sub/Location";
import Youtube from "./components/sub/Youtube";
import Join from "./components/sub/Join";

function App() {
    return (
        <div className="App">
            <Header />
            <Route exact path="/">
                <Visual />
                <Info />
            </Route>
            <Route exact path="/department" component={Department}></Route>
            <Route exact path="/community" component={Community}></Route>
            <Route exact path="/gallery" component={Gallery}></Route>
            <Route exact path="/youtube" component={Youtube}></Route>
            <Route exact path="/location" component={Location}></Route>
            <Route exact path="/join" component={Join}></Route>
            <Footer />
        </div>
    );
}

export default App;
