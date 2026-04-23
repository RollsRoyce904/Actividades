import { type SyntheticEvent, useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { useProfile } from "../../lib/hooks/useProfile.ts";

export default function ActividadesPerfil() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActividades, setFilter, loadingUserActividades } = useProfile(id);

    useEffect(() => {
        setFilter('future')
    }, [setFilter])

    const tabs = [
        { menuItem: 'Future Events', key: 'future' },
        { menuItem: 'Past Events', key: 'past' },
        { menuItem: 'Hosting', key: 'hosting' }
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                    >
                        {tabs.map((tab, index) => (
                            <Tab label={tab.menuItem} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            {(!userActividades || userActividades.length === 0)
                && !loadingUserActividades ? (
                <Typography mt={2}>
                    No activities to show
                </Typography>
            ) : null}
            <Grid2
                container
                spacing={2}
                sx={{ marginTop: 2, height: 400, overflow: 'auto' }}
            >
                {userActividades && userActividades.map((actividad: Actividad) => (
                    <Grid2 size={2} key={actividad.id}>
                        <Link to={`/actividades/${actividad.id}`} style={{ textDecoration: 'none' }}>
                            <Card elevation={4}>
                                <CardMedia
                                    component="img" height="100"
                                    image={`/images/categoryImages/${actividad.categoria}.jpg`}
                                    alt={actividad.titulo} sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" textAlign="center" mb={1}>
                                        {actividad.titulo}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        display='flex'
                                        flexDirection='column'
                                    >
                                         <span>
	                                        {format(actividad.date, 'do LLL yyyy')}
	                                       </span>
                                        <span>{format(actividad.date, 'h:mm a')}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}
