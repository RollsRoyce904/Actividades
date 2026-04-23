import { Person } from "@mui/icons-material";
import { Card, Typography, Chip, CardMedia, CardContent, Box, Divider } from "@mui/material";
import { Link } from "react-router";

type Props = {
    profile: Profile;
}

export default function TarjetaPerfil({ profile }: Props) {
    const following = false;
    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
            <Card elevation={4}
                sx={{
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 300,
                    textDecoration: 'none',
                    gap: 2,
                    p: 4
                }}>
                <CardMedia
                    component={'img'}
                    src={profile?.imageUrl || '/images/user.png'}
                    alt={profile.displayName + ' image'}
                    sx={{ width: '100%', zIndex: 50 }} />
                <CardContent>
                    <Box display="flex" flexDirection='column' gap={1}>
                        <Typography variant="h5">{profile.displayName}</Typography>
                         {profile.bio &&
                            <Typography
                                variant="body2"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {profile?.bio}
                            </Typography>}
                        {following && 
                        <Chip size="small" label='Siguiendo' color='secondary' variant="outlined" />}
                    </Box>
                </CardContent>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Person />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>20 seguidores</Typography>
                </Box>
            </Card>
        </Link>
    )
}

