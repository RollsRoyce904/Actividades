import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 6,
        alignContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
      }}
        >
          <Box sx={{ color: 'white', display: 'flex',  alignContent: 'center', alignItems: 'center', gap: 3 }}>
            <Group sx={{ height: 110, width: 110 }} />
            <Typography variant="h1">
              Mis-tividades
            </Typography>
            </Box>
            <Typography variant="h2">
              Bienvenido a Mis-tividades
              {/* Bienvenido a Mis-tividades, tu plataforma para gestionar actividades de manera eficiente y divertida. Aquí podrás crear, organizar y compartir tus actividades favoritas con amigos y familiares. ¡Empieza a explorar y disfruta de una experiencia única en la gestión de tus actividades! */}
            </Typography>
            <Button
              component={Link}
              to="/actividades"
              variant="contained"
              size="large"
              sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}
            >
              ¡Ver Actividades!
            </Button>
            </Paper>
  )
}
