import { createStore } from "redux";



const loadfromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos")
  if (savedTodos) {
    return savedTodos ? JSON.parse(savedTodos) : [];
  }
}

const initialState = {
  todos: loadfromLocalStorage(),
};

// Reducer function
const todoReducer = (state = initialState, action) => {
  let updatedTodos;
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload),
      };

    case "UPDATE_TODO":
      updatedTodos = state.todos.map((todo, index) =>
        index === action.payload.index ? action.payload.updatedText : todo
      );
      // localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };


    default:
      return state;
  }
};


const store = createStore(todoReducer);

export default store;
