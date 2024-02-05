import { FiTrash } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const TodoItem = (props) => {
  const { todo, toggleComplete, updateTodo, deleteTodo } = props;
  const { id, description, isCompleted } = todo;

  return (
    <li className="todo-item">
      <p className="todo-description"> {description}</p>
      <section className="todo-icons">
        {isCompleted === true ? (
          <ImCheckboxChecked
            className="todo-icon"
            onClick={() => toggleComplete(id)}
          />
        ) : (
          <ImCheckboxUnchecked
            className="todo-icon"
            onClick={() => toggleComplete(id)}
          />
        )}
        <FaPen className="todo-icon" onClick={() => updateTodo(id)} />
        <FiTrash className="todo-icon" onClick={() => deleteTodo(id)} />
      </section>
    </li>
  );
};

export default TodoItem;
