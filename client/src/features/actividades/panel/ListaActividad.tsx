import { Box } from "@mui/material";
import TarjetaActividad from "./TarjetaActividad";

type Props = {
    actividades: Actividad[];
    selectActividad: (id: string) => void;
}

export default function ListaActividad({ actividades, selectActividad }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {actividades.map((actividad) => (
            <TarjetaActividad key={actividad.id} actividad={actividad} selectActividad={selectActividad}/>
        ))}
    </Box>
  )
}
