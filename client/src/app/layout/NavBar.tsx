import Group from "@mui/icons-material/Group";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, Button } from "@mui/material";
// import { NavLink } from "react-router";
// import MenuItemLink from "../shared/components/MenuItemLink";
// import { Observer } from "mobx-react-lite";
// import { useStore } from "../../lib/hooks/useStore";
// import { useAccount } from "../../lib/hooks/useAccount";
// import UserMenu from "./UserMenu";

type Props = {
  openForm: (id?: string) => void;
}

export default function NavBar({ openForm }: Props) {


    // const { uiStore } = useStore();
    // const { currentUser } = useAccount();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <MenuItem component="a" href="/" sx={{ color: 'white', display: 'flex', gap: 2 }}>
                            <Group sx={{ mr: 1 }} />
                            <Typography variant="h4" component="div" sx={{ display: 'inline' }}>
                                Mis-tividades
                            </Typography>
                          </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MenuItem component="a" href="/activities" 
                            sx={{ color: 'white', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Actividades
                          </MenuItem>
                          <MenuItem component="a" href="/sobre" 
                            sx={{ color: 'white', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Sobre
                          </MenuItem>
                          <MenuItem component="a" href="/contacto" 
                            sx={{ color: 'white', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Contacto
                          </MenuItem>
                        </Box>
                        <Button variant="contained" size="large" color="warning" onClick={() => openForm()} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                          Crear Actividad
                        </Button>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    )
}