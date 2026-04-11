import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import PanelActividad from '../../features/actividades/panel/PanelActividad';

function App() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [selectedActividad, setSelectedActividad] = useState<Actividad | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Actividad[]>('https://localhost:5007/api/actividades')
      .then(response => setActividades(response.data))
  }, []);

  const handleSeclectActividad = (id: string) => {
    setSelectedActividad(actividades.find(a => a.id === id));
  }

  const handleCancelActividad = () => {
    setSelectedActividad(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSeclectActividad(id);
    else handleCancelActividad();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
   <>
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <PanelActividad actividades={actividades} 
      selectActividad={handleSeclectActividad}
      cancelSelectActividad={handleCancelActividad} 
      selectedActividad={selectedActividad}
      editMode={editMode}
      openForm={handleOpenForm}
      closeForm={handleFormClose}
      />
    </Container>  
    </Box> 
   </>
  )
}

export default App
