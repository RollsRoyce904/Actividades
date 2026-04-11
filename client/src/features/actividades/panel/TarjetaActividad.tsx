import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    actividad: Actividad;
    selectActividad: (id: string) => void;
}
export default function TarjetaActividad({ actividad, selectActividad }: Props) {
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
        <Button size="medium" variant="contained" onClick={() => selectActividad(actividad.id)}>Ver más</Button>
      </CardActions>
    </Card>
  )
}
