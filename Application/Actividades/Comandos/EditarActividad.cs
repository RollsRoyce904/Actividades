using Application.Actividades.DTO;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Actividades.Comandos;

public class EditarActividad
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public required EditarActividadDTO ActividadDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades.FindAsync([request.ActividadDto.Id], cancellationToken);

            if (actividad == null) return Resultado<Unit>.Fallido("Actividad no encontrada!", 404);

            mapper.Map(request.ActividadDto, actividad);

            var resultado = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!resultado) return Resultado<Unit>.Fallido("Error al actualizar la actividad!", 500);

            return Resultado<Unit>.Exitoso(Unit.Value);
        }
    }
}
