using Application.Actividades.Comandos;
using Application.Actividades.DTO;
using FluentValidation;

namespace Application.Actividades.Validadores;

public class CrearActividadValidador 
    : BaseActividadValidador<CrearActividad.Command, CrearActividadDTO>
{
    public CrearActividadValidador() : base(x => x.ActividadDto)
    {
       
    }
}
