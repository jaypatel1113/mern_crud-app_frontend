import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import Edit from "./components/Edit";
import Details from "./components/Details";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
    return (
        <>
            <div className="mainmain">
                <ToastContainer
                    theme="dark"
                    position="bottom-right"
                    style={{ fontSize: "14px" }}
                />
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/edit/:id" component={Edit} />
                    <Route exact path="/view/:id" component={Details} />
                </Switch>
            </div>
        </>
    );
};

export default App;
