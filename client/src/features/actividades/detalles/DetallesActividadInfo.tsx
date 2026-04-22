import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props = {
    actividad: Actividad;
}

export default function DetallesActividadInfo({ actividad }: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    return (
        <Paper sx={{ mb: 2 }}>
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Info color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{actividad.descripcion}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{new Date(actividad.date).toUTCString()}</Typography>
                </Grid2>
            </Grid2>
            <Divider />

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Place color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11} display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        {actividad.lugar}, {actividad.ciudad}
                    </Typography>
                    <Button onClick={() => setMapOpen(!mapOpen)} sx={{ whiteSpace: 'nowrap', mx: 2 }}>
                        {mapOpen ? 'Ocultar mapa' : 'Mostrar mapa'}
                    </Button>
                </Grid2>
            </Grid2>
            {mapOpen && (
                <Box sx={{ height: 400, zIndex: 1000, display: 'block' }}>
                    <MapComponent position={[actividad.latitud, actividad.longitud]} venue={actividad.lugar} />
                </Box>
            )}
        </Paper>
    )

}
