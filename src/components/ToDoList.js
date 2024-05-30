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

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";

// OTHERS
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect, useReducer } from "react";
import { useTodos, useTodosDispatch } from "../context/todosContext";
import { useToast } from "../context/ToastContext";
import todosReducer from "../reducers/todosReducer";
// Components
import ToDo from "./ToDo";

export default function ToDoList(todo) {

  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const {showHideToast} = useToast();
  
  const [dialogTodo, setDialogTodo] = useState({
    title: todo.title,
    details: todo.details,
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
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


  useEffect(() => {
    dispatch({
      type: "get",
    })
  }, []);

  // ====== HANDLERS
  function changeDisplayTodosType(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }
  // Functions for adding a new task to the list
  function handleAddClick() {
    dispatch({
      type:"added",
      payload:{
        newTitle:titleInput,
      },
    });
    setTitleInput("");
    showHideToast("تـم إضافة مهمة جديدة بنجاح")
  }

    // ====== DELETE Event Handlers Function ======
  function openDeleteDialog(todo){
    setDialogTodo(todo)
    setShowDeleteDialog(true)
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({
      type:"deleted",
      payload:dialogTodo,
    });
    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح")
  }
  // ====== DELETE Event Handlers Function ======

  // Update Event Handlers Function

  function openUpdateDialog(todo){
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    dispatch({
      type:"updated",
      payload:dialogTodo,
    })
    setShowUpdateDialog(false);
    showHideToast("تم التحديث بنجاح")
  }
  // ====== Update Event Handlers Function ======

  const todosJsx = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} showDelete={openDeleteDialog} showUpdate={openUpdateDialog}/>;
  });

  return (
    <>
        {/* DELETE Dialog */}
        <Dialog
          sx={{ direction: "rtl" }}
          onClose={handleDeleteDialogClose}
          open={showDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            هل أنت متأكد من حذف هذه المهمة؟
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              لا يمكنك التراجع عن الحذف بعد إتمامه
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>إلغاء </Button>
            <Button autoFocus onClick={handleDeleteConfirm}>
              تأكيد
            </Button>
          </DialogActions>
        </Dialog>
        {/* === DELETE MOADAL === */}

        {/* Update Dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label=" التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء </Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Update dialog === */}

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
    </>
  );
}
