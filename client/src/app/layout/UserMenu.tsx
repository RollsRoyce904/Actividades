import { Add, Person, Password, Logout } from '@mui/icons-material';
import { useAccount } from '../../lib/hooks/useAccount';
import { useState } from 'react';
import { Link } from 'react-router';
import { Avatar, Box, Button, Divider, ListItemIcon, 
    ListItemText, Menu, MenuItem } from "@mui/material";

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorElUser);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <>
        <Button onClick={handleOpenUserMenu}
                color='inherit'
                size="large"
                sx={{ fontSize: '1.1rem' }}>

            <Box display='flex' alignItems='center' gap={2}>
                <Avatar alt={currentUser?.displayName} src={currentUser?.imageUrl} />
                {currentUser?.displayName}                
            </Box>
            </Button>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top',  horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}>
               <MenuItem component={Link} to='/crearActividad' onClick={handleClose}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText>Crear actividad</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to={`/perfiles/${currentUser?.id}`} onClick={handleClose}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>Mi perfil</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to={'/cambiar-contraseña'} onClick={handleClose}>
                    <ListItemIcon>
                        <Password />
                    </ListItemIcon>
                    <ListItemText>Cambiar contraseña</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logoutUser.mutate();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Cerrar sesión</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
