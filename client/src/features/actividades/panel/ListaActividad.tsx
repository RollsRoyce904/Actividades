import { Box, Typography } from "@mui/material";
import TarjetaActividad from "./TarjetaActividad";
import { useActividades } from "../../../lib/hooks/useActividades";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { observer } from "mobx-react-lite";

export default observer(function ListaActividad() {
    const {actividadesGrupo, isLoading, fetchNextPage, hasNextPage} = useActividades();

     const { ref, inView } = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return <Typography>Cargando...</Typography>

  if(!actividadesGrupo  ) {
    return <Typography variant="h5" color="primary">No actividades encontradas...</Typography>;
  }
  return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <>
                {actividadesGrupo.pages.map((actividades, index) => (
                    <Box
                        key={index}
                        ref={index === actividadesGrupo.pages.length - 1 ? ref : null}
                        display='flex'
                        flexDirection='column'
                        gap={3}>
                        {actividades.items.map(actividad => (
                            <TarjetaActividad
                                key={actividad.id}
                                actividad={actividad}
                            />
                        ))}
                    </Box>
                ))}
            </>
        </Box>
  )
})