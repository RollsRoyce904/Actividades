import { Observer } from 'mobx-react-lite';
import { useStore } from '../../lib/hooks/useStore';
import Box from '@mui/material/Box/Box';
import { Button, List, ListItem } from '@mui/material';

export default function Counter() {
    const { counterStore } = useStore();
  return (
    <Observer>
      {() => (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
            <h1>Counter: {counterStore.count}</h1>
            <Button onClick={() => counterStore.increment()}>Increment</Button>
            <Button onClick={() => counterStore.decrement()}>Decrement</Button>
          </Box>
          <Box sx={{ fontSize: '1.5rem', marginTop: 4 }}>
            <h2>Events:</h2>
            <List>
              {counterStore.events.map((event, index) => (
                <ListItem key={index}>{event}</ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Observer>
  )
}
