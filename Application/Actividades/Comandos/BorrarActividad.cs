using System;
using MediatR;
using Persistence;

namespace Application.Actividades.Comandos;

public class BorrarActividad
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades
                .FindAsync([request.Id], cancellationToken)
                    ?? throw new Exception("Actividad no encontrada!");

            context.Remove(actividad);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
