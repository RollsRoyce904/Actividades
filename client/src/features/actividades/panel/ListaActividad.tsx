import { Box } from "@mui/material";
import TarjetaActividad from "./TarjetaActividad";

type Props = {
    actividades: Actividad[];
    selectActividad: (id: string) => void;
    deleteActividad: (id: string) => void;
}

export default function ListaActividad({ actividades, selectActividad, deleteActividad }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {actividades.map((actividad) => (
            <TarjetaActividad key={actividad.id} actividad={actividad} selectActividad={selectActividad} deleteActividad={deleteActividad} />
        ))}
    </Box>
  )
}
