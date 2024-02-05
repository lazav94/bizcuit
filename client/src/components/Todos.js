import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IoAddCircle } from "react-icons/io5";
import axios from "axios";

import TodoItem from "./TodoItem";
import { host } from "../utils/environment";
import ErrorMessage from "./ErrorMessage";

const Todos = () => {
  const accessToken = localStorage.getItem("access_token");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // TODO add loader
    // TODO cache todos and pull from cache
    // Fetch TODOs from server
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(`${host}/todo`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTodos(data);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || error.message);
        navigate("/");
      }
    };

    fetchTodos();
  }, []);

  const toggleComplete = (id) => {
    const updateTodoApi = async () => {
      try {
        const todo = todos.find((t) => t.id === id);

        await axios.put(
          `${host}/todo/${id}`,
          {
            isCompleted: !todo.isCompleted,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setTodos((prev) =>
          [...prev].map((item) => {
            if (item.id !== id) {
              return item;
            }
            return { ...item, isCompleted: !item.isCompleted };
          })
        );
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };
    updateTodoApi();
  };

  // TODO update description
  const updateTodo = () => {};

  const deleteTodo = (id) => {
    const deleteTodoApi = async () => {
      try {
        await axios.delete(`${host}/todo/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTodos((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };
    deleteTodoApi();
  };

  const todosList = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      toggleComplete={toggleComplete}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  ));

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const createTodo = () => {
    const createNewTodo = async () => {
      try {
        if (!newTodo) {
          return;
        }
        const { data } = await axios.post(
          `${host}/todo/`,
          {
            description: newTodo,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // We can set optimistically
        setTodos((prev) => [...prev, data]);
      } catch (error) {
        setErrorMessage();
      }
    };

    createNewTodo();
    // Reset input
    setNewTodo("");
  };

  return (
    <section className="todo-container">
      <ErrorMessage message={errorMessage} />
      <section className="todo-new-item-container">
        <input
          type="text"
          onChange={handleChange}
          value={newTodo}
          name="newTodo"
          placeholder="Enter new task"
        />
        <button onClick={createTodo} className="button-create">
          <IoAddCircle className="todo-icon-add" size={40} />
        </button>
      </section>
      {todosList?.length > 0 && <ul className="todo-list">{todosList}</ul>}
    </section>
  );
};

export default Todos;
