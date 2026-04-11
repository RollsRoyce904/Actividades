import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
    actividad: Actividad;
    cancelSelectActividad: () => void;
    openForm: (id: string) => void;
}
export default function DetallesActividad({ actividad, cancelSelectActividad, openForm }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
        <CardMedia component="img" src={`/images/categoryImages/${actividad.categoria}.jpg`} alt={actividad.titulo} />
        <CardContent>
            <Typography variant="h5">{actividad.titulo}</Typography>
            <Typography variant="subtitle1" fontWeight='light'>{actividad.date}</Typography>
            <Typography variant="body1">{actividad.descripcion}</Typography>
        </CardContent>
        <CardActions>
            <Button color="primary" onClick={() => openForm(actividad.id)}>Editar</Button>
            <Button onClick={cancelSelectActividad} color="inherit">Cancelar</Button>
        </CardActions>
    </Card>
  )
}
