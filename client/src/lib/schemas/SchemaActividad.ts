import {z} from 'zod';
import { requiredString } from '../util/util';

export const schemaActividad = z.object({
    titulo: requiredString('Título'),
    descripcion: requiredString('Descripción'),
    categoria: requiredString('Categoría'),
    date: z.coerce.date({error: 'Fecha es requerida'}),
    locacion: z.object({
        lugar: requiredString('Lugar'),
        ciudad: z.string(),
        latitud: z.coerce.number(),
        longitud: z.coerce.number()
    })
})

export type SchemaActividad = z.input<typeof schemaActividad>;