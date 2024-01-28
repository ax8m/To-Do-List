import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Lemonada"],
    fontWeightLight: "300",
    fontSize: "2rem",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
        <ToDoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
