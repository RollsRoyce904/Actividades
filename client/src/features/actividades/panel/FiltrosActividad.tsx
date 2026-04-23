import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

export default observer(function FiltrosActividad() {
    const { activityStore: { setFilter, setStartDate, filter, startDate } } = useStore()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                        <FilterList sx={{ mr: 1 }} />
                        Filtros
                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            <ListItemText primary='Todos eventos' />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isGoing'}
                            onClick={() => setFilter('isGoing')}
                        >
                            <ListItemText primary="Estoy participando" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isHost'}
                            onClick={() => setFilter('isHost')}
                        >
                            <ListItemText primary="Estoy organizando" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{ width: '100%', borderRadius: 3, p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }} />
                    Elijar una fecha
                </Typography>
                 <Calendar 
                    value={startDate}
                    onChange={date => setStartDate(date as Date)}
                />
            </Box>
        </Box>
    )
})
