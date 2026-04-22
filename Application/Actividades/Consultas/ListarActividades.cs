using System;
using Application.Actividades.DTO;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Actividades.Consultas;

public class ListarActividades
{
    public class Query : IRequest<List<ActividadDto>> {}

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ActividadDto>>
    {
        public async Task<List<ActividadDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Actividades
                .ProjectTo<ActividadDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
