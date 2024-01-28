import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";

// ICONS
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function ToDo({ title, details }) {
  return (
    <>
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
                {title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {details}
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
              <IconButton
                className="iconButton"
                sx={{
                  background: "white",
                  color: "#8bc34a",
                  border: "solid #8bc34a 3px",
                  //   marginLeft: 1.5,
                }}
              >
                <CheckIcon />
              </IconButton>

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

              <IconButton
                className="iconButton"
                sx={{
                  background: "white",
                  color: "#b23c17",
                  border: "solid #b23c17 3Px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
