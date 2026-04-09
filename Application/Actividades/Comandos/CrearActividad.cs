using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actividades.Comandos;

public class CrearActividad
{
    public class Command : IRequest<string>
    {
        public required Actividad Actividad { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Actividades.Add(request.Actividad);

            await context.SaveChangesAsync(cancellationToken);

            return request.Actividad.Id;
        }
    }
}
