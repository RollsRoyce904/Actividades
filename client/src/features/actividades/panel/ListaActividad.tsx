import { Box, Typography } from "@mui/material";
import TarjetaActividad from "./TarjetaActividad";
import { useActividades } from "../../../lib/hooks/useActividades";

export default function ListaActividad() {
    const {actividades, isLoading} = useActividades();
  if(!actividades || isLoading  ) {
    return <Typography variant="h5" color="primary">Cargando actividades...</Typography>;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {actividades.map((actividad) => (
            <TarjetaActividad key={actividad.id} actividad={actividad} />
        ))}
    </Box>
  )
}
