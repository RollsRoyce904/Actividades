import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
    actividad?: Actividad;
    closeForm: () => void;
}

export default function FormularioActividad({ actividad, closeForm }: Props) {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">{actividad ? 'Editar actividad' : 'Crear actividad'}</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField label="Título" value={actividad?.titulo}/>
            <TextField label="Descripción" variant="outlined" fullWidth multiline rows={3} />
            <TextField label="Categoría" />
            <TextField label="Fecha" type="datetime-local" />
            <TextField label="Ciudad" />
            <TextField label="Lugar" />
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                <Button color='inherit' onClick={closeForm}>Cancelar</Button>
                <Button color='success' variant="contained">Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}
