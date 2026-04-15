import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useActividades } from "../../../lib/hooks/useActividades";

type Props = {
    selectedActividad: Actividad;
    cancelSelectActividad: () => void;
    openForm: (id: string) => void;
}
export default function DetallesActividad({ selectedActividad, cancelSelectActividad, openForm }: Props) {
    const { actividades } = useActividades();
    const actividad = actividades?.find(a => a.id === selectedActividad.id);

    if(!actividad) return <Typography variant="h5" color="error">Actividad no encontrada</Typography>

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
