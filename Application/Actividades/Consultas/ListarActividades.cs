using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Consultas;

public class ListarActividades
{
    public class Query : IRequest<List<Actividad>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Actividad>>
    {
        public async Task<List<Actividad>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Actividades.ToListAsync(cancellationToken);
        }
    }
}
