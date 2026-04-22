import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActividades } from "../../../lib/hooks/useActividades";
import DetallesActividadChat from "./DetallesActividadChat";
import DetallesActividadHeader from "./DetallesActividadHeader";
import DetallesActividadInfo from "./DetallesActividadInfo";
import DetallesActividadSidebar from "./DetallesActividadSidebar";

export default function DetallesActividad() {
    const {id} = useParams();
    const {actividad, isLoadingActividad} = useActividades(id);

    if(isLoadingActividad) return <Typography variant="h5">Cargando...</Typography>
    if(!actividad) return <Typography variant="h5" color="error">Actividad no encontrada</Typography>

  return (
    <Grid2 container spacing={3}>
        <Grid2 size={8}>
            <DetallesActividadHeader actividad={actividad} />
            <DetallesActividadInfo actividad={actividad} />
            <DetallesActividadChat />
        </Grid2>
        <Grid2 size={4}>
            <DetallesActividadSidebar actividad={actividad}/>            
        </Grid2>
    </Grid2>
  )
}
