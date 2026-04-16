import { Box, Button, Paper, Typography } from "@mui/material";
import { useActividades } from "../../../lib/hooks/useActividades";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { type SchemaActividad, schemaActividad } from "../../../lib/schemas/SchemaActividad";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function FormularioActividad() {
    const { control, reset, handleSubmit } = useForm<SchemaActividad>({
        mode: 'onTouched',
        resolver: zodResolver(schemaActividad)
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActividad, createActividad, actividad, isLoadingActividad } = useActividades(id);

    useEffect(() => {
        if (actividad) {
            reset({
                ...actividad,
                locacion: {
                    lugar: actividad.lugar,
                    ciudad: actividad.ciudad,
                    latitud: actividad.latitud,
                    longitud: actividad.longitud
                }
            });
        }
    }, [actividad, reset]);


    const onSubmit = async (data: SchemaActividad) => {
        const { locacion, ...rest } = data;
        const flattenedData = { ...rest, ...locacion };

        try {
            if (actividad) {
                updateActividad.mutate({ ...actividad, ...flattenedData } as Actividad, {
                    onSuccess: () => navigate(`/actividades/${actividad.id}`)
                });
            } else {
                createActividad.mutate(flattenedData as Actividad, {
                    onSuccess: (id) => {
                        navigate(`/actividades/${id}`);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingActividad) return <Typography variant="h5">Cargando...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{actividad ? 'Editar actividad' : 'Crear actividad'}</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>                
                <TextInput                    
                    label="Título" 
                    name="titulo"
                    control={control}/>
                
                <TextInput 
                    control={control} 
                    name="descripcion"
                    label="Descripción"                   
                    multiline 
                    rows={3}/>

                <Box display='flex' gap={3}>
                    <SelectInput control={control} 
                        label="Categoría" 
                        items={categoryOptions} 
                        name="categoria" />

                    <DateTimeInput 
                    label="Fecha" 
                    name="date"
                    control={control}/>
                </Box>

                <LocationInput 
                    label="Locacion" 
                    name="locacion"
                    control={control}/>
                
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button color='inherit' onClick={() => {navigate(-1)}}>Cancelar</Button>
                    <Button
                        color='success'
                        variant="contained"
                        type="submit"
                        disabled={updateActividad.isPending || createActividad.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
