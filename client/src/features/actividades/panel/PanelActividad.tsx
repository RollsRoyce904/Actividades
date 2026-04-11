import { Grid2 } from "@mui/material";
import ListaActividad from "./ListaActividad";
import DetallesActividad from "../detalles/DetallesActividad";
import FormularioActividad from "../form/FormularioActividad";

type Props = {
    actividades: Actividad[];
    selectActividad: (id: string) => void;
    cancelSelectActividad: () => void;
    selectedActividad: Actividad | undefined;
    openForm: (id?: string) => void;
    closeForm: () => void;
    editMode: boolean;
}

export default function PanelActividad({ actividades, selectActividad, cancelSelectActividad, 
  selectedActividad, openForm, closeForm, editMode }: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ListaActividad 
          actividades={actividades} 
          selectActividad={selectActividad} />
      </Grid2>
      <Grid2 size={5}>
        {selectedActividad && !editMode && 
        <DetallesActividad 
          actividad={selectedActividad} 
          cancelSelectActividad={cancelSelectActividad} 
          openForm={openForm} />}
        {editMode && 
        <FormularioActividad 
          actividad={selectedActividad} 
          closeForm={closeForm} />}
      </Grid2>
    </Grid2>
  )
}
