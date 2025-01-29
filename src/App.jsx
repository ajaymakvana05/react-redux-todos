import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const todos = useSelector((state) => state.todos || []);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (todo.trim()) {
      dispatch({ type: "ADD_TODO", payload: todo });
      setTodo("");
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: "REMOVE_TODO", payload: index });
  };

  const startEditing = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  // Update Todo
  const updateTodo = () => {
    if (editText.trim()) {
      dispatch({ type: "UPDATE_TODO", payload: { index: editIndex, updatedText: editText } });
      setEditIndex(null); // Exit edit mode
      setEditText("");
    }
  };


  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      padding: "20px",
      maxWidth: "600px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "20px",
    },
    inputContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      width: "100%",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonRemove: {
      marginLeft: "10px",
      backgroundColor: "#FF0000",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      width: "100%",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #ccc",
    },
    noTodos: {
      textAlign: "center",
      fontSize: "16px",
      color: "#999",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>React Redux To-Do App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={todo}
          placeholder="Enter a To-Do"
          onChange={(e) => setTodo(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.length > 0 ? (
          todos.map((task, index) => (
            <li key={index} style={styles.listItem}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ fontSize: "18px", padding: "5px", marginRight: "10px", borderRadius: "20px", border: "1px solid black", paddingLeft: "15px", boxShadow: "5px 6px 10px 5px" }}
                  />
                  <button onClick={updateTodo} style={{ marginRight: "10px" }}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "18px", flexGrow: 1 }}>{task}</span>
                  <button onClick={() => startEditing(index, task)} style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}>Edit</button>
                  <button onClick={() => removeTodo(index)} style={{ backgroundColor: "red", color: "white" }}>Remove</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p style={styles.noTodos}>No todos available.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
