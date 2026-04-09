import { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    axios.get<Axtividad[]>('https://localhost:5007/api/actividades')
      .then(response => setActividades(response.data))
  }, []);

  return (
   <>
    <Typography variant="h3">Actividades</Typography>
    <List>
      {actividades.map((actividad) => (
        <ListItem key={actividad.id}>
          <ListItemText>{actividad.titulo}</ListItemText>
        </ListItem>
      ))}
    </List>
   </>
  )
}

export default App
