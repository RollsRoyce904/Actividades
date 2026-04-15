using Application.Actividades.Comandos;
using Application.Actividades.DTO;
using FluentValidation;

namespace Application.Actividades.Validadores;

public class EditarActividadValidador : BaseActividadValidador<EditarActividad.Command, EditarActividadDTO>
{
    public EditarActividadValidador() : base(x => x.ActividadDto)
    {
        RuleFor(x => x.ActividadDto.Id).NotEmpty().WithMessage("El Id de la actividad es requerido!");
    }
}
