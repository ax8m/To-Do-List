import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Dialog
import Dialog from "@mui/material/Dialog";
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
import { useTodos } from "../context/todosContext";
import { useToast } from "../context/ToastContext";

export default function ToDo({ todo, showDelete, showUpdate }) {
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const {todos,dispatch} = useTodos()
  const {showHideToast} = useToast();

  // Event Handlers Functions

  // Check Event Handlers Function
  function handleCheckClick() {
    dispatch({
      type: "toggledCompleted",
      payload:todo,
    })
    showHideToast("تم التعديل بنجاح")
  }
  // Check Event Handlers Function

  // Check Event Handlers Function

  // Delete Event Handlers Function
  function handleDeleteClick() {
    showDelete(todo)
  }
  // ======= Delete Event Handlers Function ======

  // Update Event Handlers Function

  function handleUpdateClick() {
    showUpdate(todo)
  }
  // ====== Update Event Handlers Function ======

  //  ====== Event Handlers =====
  return (
    <>
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
