import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { type LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { LockOpen } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import TextInput from "../../app/shared/components/TextInput";
import { useLocation, useNavigate } from "react-router";


export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
             onSuccess: async () => {
                navigate(location.state?.from || '/actividades');
        }
        });
    };

    return (
        <Paper component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                gapWidth: 'md',
                mx: 'auto',
                mt: 5,
                borderRadius: 3,
                width: '100%',
                maxWidth: 700
            }}>

            <Box
                display='flex'
                alignItems='center'
                justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize='large' />
                <Typography variant="h4" fontWeight='bold'>Iniciar Sesión</Typography>
            </Box>

            <TextInput label="Correo Electrónico" name="email" control={control} />
            <TextInput label="Contraseña" name="password" control={control} type="password" />
            <Button type="submit" variant="contained" color="primary" disabled={!isValid || isSubmitting}>
                Iniciar Sesión
            </Button>
            <Typography variant="body2" textAlign='center'>
                ¿No tienes una cuenta? <br /><Button onClick={() => navigate('/register')}>Regístrate</Button>
            </Typography>
        </Paper>
    )
}
