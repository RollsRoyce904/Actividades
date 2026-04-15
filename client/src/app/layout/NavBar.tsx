import Group from "@mui/icons-material/Group";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { Observer } from "mobx-react-lite";
// import { NavLink } from "react-router";
// import MenuItemLink from "../shared/components/MenuItemLink";
// import { Observer } from "mobx-react-lite";
 import { useStore } from "../../lib/hooks/useStore";
// import { useAccount } from "../../lib/hooks/useAccount";
// import UserMenu from "./UserMenu";


export default function NavBar() {


    const { uiStore } = useStore();
    // const { currentUser } = useAccount();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', position: 'relative' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <MenuItem component={NavLink} to="/" sx={{ color: 'white', display: 'flex', gap: 2 }}>
                            <Group sx={{ mr: 1 }} />
                            <Typography variant="h4" component="div" sx={{ display: 'inline' }}>
                                Mis-tividades
                            </Typography>
                          </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MenuItemLink to="/actividades">
                            Actividades
                          </MenuItemLink>
                          <MenuItemLink to="/crearActividad">
                            Crear Actividad
                          </MenuItemLink>   
                          <MenuItemLink to="/counter">
                            Counter
                          </MenuItemLink>                   
                        </Box>
                      <MenuItem>
                      UserMenu
                      </MenuItem>
                    </Toolbar>
                </Container>
              <Observer>
                { () => uiStore.isLoading ?
                <LinearProgress color="warning" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 }} /> : null }
              </Observer>
            </AppBar>
        </Box>
    )
}