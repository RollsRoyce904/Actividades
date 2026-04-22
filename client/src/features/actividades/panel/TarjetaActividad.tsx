import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import AvatartPopOver from "../../../app/shared/components/AvatarPopOver";

type Props = {
  actividad: Actividad;
}
export default function TarjetaActividad({ actividad }: Props) {
  const isHost = actividad.isHost;
  const isGoing = actividad.isGoing;
  const label = isHost ? 'Eres anfitrión' : 'Eres participando';
  const isCancelled = actividad.isCancelado;
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>

      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <CardHeader avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={actividad.titulo}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20
          }}
          subheader={
            <>
              Hosted by{' '}<Link to={`/profiles/${actividad.hostId}`}>{actividad.hostDisplayName}</Link>
            </>
          }
        />

        <Box display='flex' flexDirection='column' gap={2} sx={{ mr: 2 }}>
          {(isHost || isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
          {isCancelled && <Chip label='Cancelada' color='error' sx={{ borderRadius: 2 }} />}
        </Box>

      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display='flex' alignItems='center' px={2} mb={2}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography variant="body2">{new Date(actividad.date).toUTCString()}</Typography>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{actividad.lugar}</Typography>
        </Box>
        <Divider />
        <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          {actividad.attendees.map(att => (
            <AvatartPopOver key={att.id} profile={att} />
          ))}
        </Box>
      </CardContent>

      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">
          {actividad.descripcion}
        </Typography>

        <Button
          sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
          size="medium"
          variant="contained"
          component={Link}
          to={`/actividades/${actividad.id}`}>Ver más</Button>

      </CardContent>
    </Card>
  )
}
