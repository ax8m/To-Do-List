import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

// OTHERS
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../context/todosContext";

// Components
import ToDo from "./ToDo";

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const uncompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = uncompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayTodosType(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }
  // Functions for adding a new task to the list
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2">مهامي</Typography>
          <Divider />

          {/* Filter button */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayTodosType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ==== Filter button ==== */}

          {/* to do */}
          {todosJsx}
          {/*===== to do =====*/}

          {/* INPUT + ADD BUTTON */}
          <Grid container style={{ marginTop: "15px" }} spacing={2}>
            <Grid
              xs={8}
              sx={{ background: "" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%", borderRadius: "20px" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length == 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/* ========== INPUT + ADD BUTTON =========*/}
        </CardContent>
      </Card>
    </Container>
  );
}
