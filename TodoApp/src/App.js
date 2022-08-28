import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { useLocalStorage } from "./localStorage";

const STORAGE_KEY = "todolist";

// TODO ITEMS
function Todo({ todo, index, markTask, removeTask }) {
  return (
    <div className="todo">
      <span>{todo.title}</span>
      <div>
        <Button variant="warning" onClick={() => markTask(index)} style={{ display: todo.isDone ? "none" : "" }}>✓</Button>{' '}
        <Button variant="danger" onClick={() => removeTask(index)}>✕</Button>
      </div>
    </div>
  );
}

// FORM TO ADD TODO ITEMS
function FormTodo({ addTask }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value, false);
    setValue("");
  };


  return (
    <Form onSubmit={handleSubmit} className="d-grid gap-2"> 
      <Form.Group>
        <Form.Control type="text" required className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary" type="submit">+</Button>
    </Form>
  );
}

// CRUD APP
function App() {

  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  const addTask = (title, isDone) => {
    const newTodos = [{ title, isDone }, ...todos];
    setTodos(newTodos);
    console.log("New task added.")
    console.log(newTodos);
  };

  const markTask = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    newTodos.push(newTodos.splice(index, 1)[0]);
    console.log("Task marked as done.");
    setTodos(newTodos);
  };

  const removeTask = index => {
    const confirmRemove = window.confirm("Are you sure you want to delete this task?");
    if (confirmRemove) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      console.log("Task removed.");
      console.log(newTodos);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4"> My Todo List</h1>
        <FormTodo addTask={addTask} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body style={{ background: todo.isDone ? "#e9ecef" : "" }}>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTask={markTask}
                removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;