using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actividades.Comandos;

public class EditarActividad
{
    public class Command : IRequest
    {
        public required Actividad Actividad { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades.FindAsync([request.Actividad.Id], cancellationToken)
                ?? throw new Exception("Actividad no encontrada!");

            mapper.Map(request.Actividad, actividad);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
