import { Grid2 } from "@mui/material";
import ListaActividad from "./ListaActividad";
import FiltrosActividad from "./FiltrosActividad";

export default function PanelActividad() {

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ListaActividad  />
      </Grid2>
      <Grid2 size={4}>
        <FiltrosActividad />
      </Grid2>
    </Grid2>
  )
}
