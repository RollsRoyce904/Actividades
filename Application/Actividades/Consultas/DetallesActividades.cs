using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actividades.Consultas;

public class DetallesActividades
{
    public class Query : IRequest<Actividad>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Actividad>
    {
        public async Task<Actividad> Handle(Query request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades.FindAsync([request.Id], cancellationToken);

            if (actividad == null) throw new Exception("Actividad no encontrada!");

            return actividad;
        }
    }
}
