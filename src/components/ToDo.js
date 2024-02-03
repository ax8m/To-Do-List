import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";

// Dialog
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

// ICONS
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext";

export default function ToDo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers Functions

  // Check Event Handlers Function
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // Check Event Handlers Function

  // Check Event Handlers Function

  // Delete Event Handlers Function

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      // if (t.id == todo.id) {
      //   return false;
      // } else {
      //   return true;
      // }

      return t.id != todo.id;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // ======= Delete Event Handlers Function ======

  // Update Event Handlers Function

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // ====== Update Event Handlers Function ======

  //  ====== Event Handlers =====
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
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
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
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
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
      {/* === Update MOADAL === */}

      {/* Card */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          marginTop: "15px",
          //   marginBottom: "15px",
          background: "#283593",
          color: "white",
          borderRadius: "20px",
        }}
        style={{}}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h4"
                sx={{ textAlign: "right" }}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={4}
              sx={{}}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Ckeck Icon Button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                sx={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid #8bc34a 3px",
                  //   marginLeft: 1.5,
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* Ckeck Icon Button */}

              {/* Edit Buttons */}
              <IconButton
                className="iconButton"
                sx={{
                  background: "white",
                  color: "#1796aa",
                  border: "solid #1796aa 3Px",
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon />
              </IconButton>
              {/* Edit Buttons */}

              {/* Delete Icon */}
              <IconButton
                className="iconButton"
                sx={{
                  background: "white",
                  color: "#b23c17",
                  border: "solid #b23c17 3Px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* === Delete Icon === */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* === Card === */}
    </>
  );
}
