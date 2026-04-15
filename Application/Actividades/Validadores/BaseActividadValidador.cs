using Application.Actividades.DTO;
using FluentValidation;

namespace Application.Actividades.Validadores;

public class BaseActividadValidador<T, TDTO> : AbstractValidator<T> 
    where TDTO : BaseActividadDTO
{
    public BaseActividadValidador(Func<T, TDTO> selector)
    {
         RuleFor(x => selector(x).Titulo)
        .NotEmpty().WithMessage("El título es requerido.")
        .MaximumLength(100).WithMessage("El título no puede tener más de 100 caracteres.");

        RuleFor(x => selector(x).Date)
        .NotEmpty().WithMessage("La fecha es requerida.")
        .GreaterThan(DateTime.UtcNow).WithMessage("La fecha debe ser en el futuro.");

        RuleFor(x => selector(x).Descripcion)
        .NotEmpty().WithMessage("La descripción es requerida.");

        RuleFor(x => selector(x).Categoria)
        .NotEmpty().WithMessage("La categoría es requerida.");

        RuleFor(x => selector(x).Ciudad)
        .NotEmpty().WithMessage("La ciudad es requerida.");

        RuleFor(x => selector(x).Lugar)
        .NotEmpty().WithMessage("El lugar es requerido.");

        RuleFor(x => selector(x).Latitud)
        .NotEmpty().WithMessage("La latitud es requerida.")
        .InclusiveBetween(-90, 90).WithMessage("La latitud debe estar entre -90 y 90.");

        RuleFor(x => selector(x).Longitud)
        .NotEmpty().WithMessage("La longitud es requerida.")
        .InclusiveBetween(-180, 180).WithMessage("La longitud debe estar entre -180 y 180.");
    }
}
