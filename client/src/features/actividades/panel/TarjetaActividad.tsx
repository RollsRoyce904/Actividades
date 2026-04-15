import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router";
import { useActividades } from "../../../lib/hooks/useActividades";

type Props = {
  actividad: Actividad;
}
export default function TarjetaActividad({ actividad }: Props) {
  const { deleteActividad } = useActividades();
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
          <Button
            size="medium" 
            variant="contained" 
            component={Link} 
            to={`/actividades/${actividad.id}`}>Ver más</Button>
          <Button
            size="medium"
            color="error"
            variant="contained"
            disabled={deleteActividad.isPending}
            onClick={() => deleteActividad.mutate(actividad.id)}>Eliminar</Button>
        </Box>
      </CardActions>
    </Card>
  )
}
