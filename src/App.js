import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import MySnackBar from "./components/MySnackBar";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { ToastProvider } from "./context/ToastContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Lemonada"],
    fontWeightLight: "300",
    fontSize: "2rem",
  },

  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتب",
    details: "كتاب الاف ليلة وليلة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "كتاب الف ليلة وليلة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "كتاب الف ليلة وليلة",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#191b1f",
            height: "100vh",
            direction: "rtl",
          }}
        >
          <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            <ToDoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
