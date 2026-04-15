import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <Paper sx={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 6 }}>
        <SearchOff sx={{ fontSize: 100, mb: 2 }} color="primary" />
        <Typography variant="h3" gutterBottom color="textSecondary">
            Oops! Página no encontrada.
        </Typography>
        <Button fullWidth variant="contained" color="primary" component={Link} to="/Actividades" sx={{ mt: 3 }}>
            Volver al inicio
        </Button>
    </Paper>
  )
}
