import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useActividades } from "../../../lib/hooks/useActividades";

export default function DetallesActividad() {
    const {id} = useParams();
    const {actividad, isLoadingActividad} = useActividades(id);

    if(isLoadingActividad) return <Typography variant="h5">Cargando...</Typography>
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
            <Button component={Link} to={`/editarActividad/${actividad.id}`} color="primary">Editar</Button>
            <Button component={Link} to="/actividades" color="inherit">Cancelar</Button>
        </CardActions>
    </Card>
  )
}
