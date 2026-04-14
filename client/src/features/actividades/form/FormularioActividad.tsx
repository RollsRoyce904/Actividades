import { Box, Button, Paper, TextField, Typography } from "@mui/material";


type Props = {
    actividad?: Actividad;
    closeForm: () => void;
    submitForm: (actividad: Actividad) => void;
}

export default function FormularioActividad({ actividad, closeForm, submitForm }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            id: actividad?.id || '',
            titulo: formData.get('Titulo') as string,
            descripcion: formData.get('Descripcion') as string,
            categoria: formData.get('Categoria') as string,
            date: formData.get('Date') as string,
            ciudad: formData.get('Ciudad') as string,
            lugar: formData.get('Lugar') as string,
        }
        submitForm(data as Actividad);
    }
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">{actividad ? 'Editar actividad' : 'Crear actividad'}</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField name="Titulo" label="Título" defaultValue={actividad?.titulo}/>
            <TextField name="Descripcion" label="Descripción" variant="outlined" fullWidth multiline rows={3} defaultValue={actividad?.descripcion}/>
            <TextField name="Categoria" label="Categoría" defaultValue={actividad?.categoria}/>
            <TextField name="Date" label="Fecha" type="datetime-local" defaultValue={actividad?.date}/>
            <TextField name="Ciudad" label="Ciudad" defaultValue={actividad?.ciudad}/>
            <TextField name="Lugar" label="Lugar" defaultValue={actividad?.lugar}/>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                <Button color='inherit' onClick={closeForm}>Cancelar</Button>
                <Button color='success' variant="contained" type="submit">Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}
