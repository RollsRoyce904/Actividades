import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    actividad: Actividad;
    selectActividad: (id: string) => void;
    deleteActividad: (id: string) => void;
}
export default function TarjetaActividad({ actividad, selectActividad, deleteActividad }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{actividad.titulo}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{actividad.date}</Typography>
        <Typography variant="body2">{actividad.descripcion}</Typography>
        <Typography variant="subtitle1">{actividad.ciudad} / {actividad.lugar}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Chip label={actividad.categoria} variant="outlined" />        
        <Box display='flex' gap={3}>
          <Button size="medium" variant="contained" onClick={() => selectActividad(actividad.id)}>Ver más</Button>
          <Button size="medium" color="error" variant="contained" onClick={() => deleteActividad(actividad.id)}>Eliminar</Button>
        </Box>
      </CardActions>
    </Card>
  )
}
