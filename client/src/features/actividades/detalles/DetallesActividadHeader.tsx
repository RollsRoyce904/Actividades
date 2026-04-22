import { Card, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router";
import { useActividades } from "../../../lib/hooks/useActividades";
import StyledButton from "../../../app/shared/components/StyledButton";

type Props = {
    actividad: Actividad;
}

export default function DetallesActividadHeader({ actividad }: Props) {
    const { updateAsistir } = useActividades(actividad.id);

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {actividad.isCancelado && (
                <Chip
                    sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000 }}
                    color="error"
                    label="Cancelada"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${actividad.categoria}.jpg`}
                alt={`${actividad.categoria} image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{actividad.titulo}</Typography>
                    <Typography variant="subtitle1">{actividad.date.toString()}</Typography>
                    <Typography variant="subtitle2">
                        Hosted by <Link to={`/profiles/${actividad.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>{actividad.hostDisplayName}</Link>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {actividad.isHost ? (
                        <>
                            <StyledButton
                                variant='contained'
                                color={actividad.isCancelado ? 'success' : 'error'}
                                onClick={() => {updateAsistir.mutate(actividad.id)}}
                                disabled={updateAsistir.isPending}
                            >
                                {actividad.isCancelado ? 'Re-activar Actividad' : 'Cancelar Actividad'}
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/editarActividad/${actividad.id}`}
                                disabled={actividad.isCancelado}
                            >
                                Gestionar Evento
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={actividad.isGoing ? 'primary' : 'info'}
                            onClick={() => updateAsistir.mutate(actividad.id)}
                            disabled={updateAsistir.isPending || actividad.isCancelado}
                        >
                            {actividad.isGoing ? 'Cancelar Asistencia' : 'Unirse a la Actividad'}
                        </StyledButton>
                    )}
                </Box>
            </Box>
        </Card>
    )

}
