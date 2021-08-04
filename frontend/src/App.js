import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.js"
import Members from "./components/members"
import AddMember from "./components/add-member"
import Payments from "./components/payments"
import AddPayments from "./components/add-payment"
import Classes from "./components/classes"
import AddClasses from "./components/add-class"

function App() {
  return (
    <div id="main" className="App" >
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Gimnasio App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/socios"} className="nav-link">
              Socios
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/abonos"} className="nav-link">
              Abonos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/clases"} className="nav-link">
              Clases
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path={["/gimnasio"]} component={Home} />
          <Route path="/socios/:id/editar" render={(props) => (<AddMember {...props} />)}/>
          <Route exact path={["/socios/crear"]} component={AddMember} />
          <Route exact path={["/socios"]} component={Members} />
          <Route exact path={["/abonos/crear"]} render={(props) => (<AddPayments {...props} />)} />
          <Route exact path={["/abonos"]} component={Payments} />
          <Route path="/clases/:id/editar" render={(props) => (<AddClasses {...props} />)}/>
          <Route exact path={["/clases"]} component={Classes} />
          <Route exact path={["/clases/crear"]} render={(props) => (<AddClasses {...props} />)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
