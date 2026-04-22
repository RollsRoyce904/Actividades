using System;
using Application.Actividades.DTO;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Consultas;

public class DetallesActividades
{
    public class Query : IRequest<Resultado<ActividadDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Resultado<ActividadDto>>
    {
        public async Task<Resultado<ActividadDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades
            .ProjectTo<ActividadDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (actividad == null) return Resultado<ActividadDto>.Fallido("Actividad no encontrada!", 404);

            return Resultado<ActividadDto>.Exitoso(actividad);
        }
    }
}
