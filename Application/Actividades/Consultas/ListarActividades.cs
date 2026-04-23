using System;
using Application.Actividades.DTO;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Consultas;

public class ListarActividades
{
    public class Query : IRequest<Resultado<PagedList<ActividadDto, DateTime?>>> 
    {
        public required ActividadParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Resultado<PagedList<ActividadDto, DateTime?>>>
    {
        public async Task<Resultado<PagedList<ActividadDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Actividades
            .OrderBy(a => a.Date)
            .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
            .AsQueryable();

                
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedActividades = query.ProjectTo<ActividadDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });
            
            var actividades = await projectedActividades
            .Take(request.Params.PageSize + 1) // Fetch one extra item to determine if there's a next page
            .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (actividades.Count > request.Params.PageSize)
            {
                nextCursor = actividades.Last().Date; // Set next cursor to the date of the last item
                actividades.RemoveAt(actividades.Count - 1); // Remove the extra item
            }

            
            return Resultado<PagedList<ActividadDto, DateTime?>>.Exitoso(
                new PagedList<ActividadDto, DateTime?>
                {
                    Items = actividades,
                    NextCursor = nextCursor
                }
            );
        }
    }
}
