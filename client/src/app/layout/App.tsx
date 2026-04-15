import { useState } from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import PanelActividad from '../../features/actividades/panel/PanelActividad';
import { useActividades } from '../../lib/hooks/useActividades';


function App() {
  const [selectedActividad, setSelectedActividad] = useState<Actividad | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {actividades, isPending} = useActividades();

  const handleSeclectActividad = (id: string) => {
    setSelectedActividad(actividades?.find(a => a.id === id));
  }

  const handleCancelActividad = () => {
    setSelectedActividad(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSeclectActividad(id);
    else handleCancelActividad();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {!actividades || isPending ? (
            <Typography variant="h5" color="primary">Cargando actividades...</Typography>
          ) : (
            <PanelActividad actividades={actividades}
              selectActividad={handleSeclectActividad}
              cancelSelectActividad={handleCancelActividad}
              selectedActividad={selectedActividad}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
            />
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
