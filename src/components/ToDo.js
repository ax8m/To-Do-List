import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";

// Dialog
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ICONS
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext";

export default function ToDo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers Functions

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleClose() {
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
  }

  //  ====== Event Handlers =====
  return (
    <>
      {/* DELETE Dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        onClose={handleClose}
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
          <Button onClick={handleClose}>إلغاء </Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE MOADAL === */}

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
              <Typography variant="h4" sx={{ textAlign: "right" }}>
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

              <IconButton
                className="iconButton"
                sx={{
                  background: "white",
                  color: "#1796aa",
                  border: "solid #1796aa 3Px",
                }}
              >
                <EditIcon />
              </IconButton>

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
