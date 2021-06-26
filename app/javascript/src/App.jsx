import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/index";
import { initializeLogger } from "./common/logger";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import CreateTask from "./components/Tasks/CreateTask";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger()
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
      </Switch>
    </Router>
  );
};

export default App;