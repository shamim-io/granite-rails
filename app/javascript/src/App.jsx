import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/index";
import { initializeLogger } from "./common/logger";
import CreateTask from "./components/Tasks/CreateTask";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import ShowTask from "components/Tasks/ShowTask";
import EditTask from "components/Tasks/EditTask";
import Signup from "components/Authentication/Signup";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger()
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/:slug/edit" component={EditTask} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:slug/show" component={ShowTask} />
      </Switch>
    </Router>
  );
};

export default App;