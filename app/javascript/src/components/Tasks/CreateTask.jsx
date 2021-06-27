import React, { useState, useEffect } from "react";
import Container from "components/Container";
import TaskForm from "./Form/TaskForm";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import Logger from "js-logger";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await tasksApi.create({ task: { title, user_id: userId } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
    //   Logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      console.log("response = ", response)
      setUsers(response.data.users);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    //   console.log("response = ", response)
    } catch (error) {
    //   Logger.error(error);
      console.log(error)
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        setUserId={setUserId}
        assignedUser={users[0]}
        loading={loading}
        handleSubmit={handleSubmit}
        users={users}
      />
    </Container>
  );
};

export default CreateTask;