import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActividades } from "../../../lib/hooks/useActividades";
import { useNavigate, useParams } from "react-router";

export default function FormularioActividad() {
    const { id } = useParams();
    const { updateActividad, createActividad, actividad, isLoadingActividad } = useActividades(id);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        if (actividad) {
            data.id = actividad.id;
            await updateActividad.mutateAsync(data as unknown as Actividad);
            navigate(`/actividades/${actividad.id}`);
        } else {
            createActividad.mutate(data as unknown as Actividad, {
                onSuccess: (id) => {
                    navigate(`/actividades/${id}`)
                }
            });
        }
    }

    if (isLoadingActividad) return <Typography variant="h5">Cargando...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{actividad ? 'Editar actividad' : 'Crear actividad'}</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField name="Titulo" label="Título" defaultValue={actividad?.titulo} />
                <TextField name="Descripcion" label="Descripción" variant="outlined" fullWidth multiline rows={3} defaultValue={actividad?.descripcion} />
                <TextField name="Categoria" label="Categoría" defaultValue={actividad?.categoria} />
                <TextField name="Date" label="Fecha" type="datetime-local" 
                defaultValue={actividad?.date ? new Date(actividad.date).toISOString().slice(0,16) : 
                    new Date().toISOString().split('T')[0] + 'T00:00'} />
                <TextField name="Ciudad" label="Ciudad" defaultValue={actividad?.ciudad} />
                <TextField name="Lugar" label="Lugar" defaultValue={actividad?.lugar} />
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button color='inherit' onClick={() => {}}>Cancelar</Button>
                    <Button
                        color='success'
                        variant="contained"
                        type="submit"
                        disabled={updateActividad.isPending || createActividad.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
