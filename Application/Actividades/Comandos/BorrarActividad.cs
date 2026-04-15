using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Actividades.Comandos;

public class BorrarActividad
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades
                .FindAsync([request.Id], cancellationToken);

            if (actividad == null) return Resultado<Unit>.Fallido("Actividad no encontrada!", 404);

            context.Remove(actividad);

            var resultado = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!resultado) return Resultado<Unit>.Fallido("Error al eliminar la actividad!", 500);

            return Resultado<Unit>.Exitoso(Unit.Value);
        }
    }
}
