using System;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actividades.Consultas;

public class DetallesActividades
{
    public class Query : IRequest<Resultado<Actividad>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Resultado<Actividad>>
    {
        public async Task<Resultado<Actividad>> Handle(Query request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades.FindAsync([request.Id], cancellationToken);

            if (actividad == null) return Resultado<Actividad>.Fallido("Actividad no encontrada!", 404);

            return Resultado<Actividad>.Exitoso(actividad);
        }
    }
}
