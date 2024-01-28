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

// icons
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import ToDo from "./ToDo";

const todos = [
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
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "كتاب الف ليلة وليلة",
    isCompleted: false,
  },
];

export default function ToDoList() {
  const todosJsx = todos.map((t) => {
    return <ToDo key={t.id} title={t.title} details={t.details} />;
  });

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">مهامي</Typography>
          <Divider />

          {/* Filter button */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            // value={}
            exclusive
            // onChange={}
            aria-label="text alignment"
          >
            <ToggleButton value="right">غير المنجز</ToggleButton>
            <ToggleButton value="center">المنجز</ToggleButton>
            <ToggleButton value="left">الكل</ToggleButton>
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
                sx={{ width: "100%" }}
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
                style={{ width: "100%", height: "100%" }}
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
