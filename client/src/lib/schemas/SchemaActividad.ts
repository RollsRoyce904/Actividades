import {z} from 'zod';

const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`}).min(1, 
    {error: `${fieldName} is required`})

export const schemaActividad = z.object({
    titulo: requiredString('Título'),
    descripcion: requiredString('Descripción'),
    categoria: requiredString('Categoría'),
    date: z.coerce.date({error: 'Fecha es requerida'}),
    locacion: z.object({
        lugar: requiredString('Lugar'),
        ciudad: z.string().optional(),
        latitud: z.coerce.number(),
        longitud: z.coerce.number()
    })
})

export type SchemaActividad = z.input<typeof schemaActividad>;