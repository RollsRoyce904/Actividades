import { Grid2 } from "@mui/material";
import ListaActividad from "./ListaActividad";

export default function PanelActividad() {

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ListaActividad  />
      </Grid2>
      <Grid2 size={5}>
        actividad filters here
      </Grid2>
    </Grid2>
  )
}
