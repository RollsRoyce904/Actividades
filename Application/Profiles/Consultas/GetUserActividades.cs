using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Consultas;

public class GetUserActividades
{
    public class Query : IRequest<Resultado<List<UserActividadDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Resultado<List<UserActividadDto>>>
    {
        public async Task<Resultado<List<UserActividadDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.ActividadAttendees
                .Where(u => u.User.Id == request.UserId)
                .OrderBy(a => a.Actividad.Date)
                .Select(x => x.Actividad)
                .AsQueryable();

            var today = DateTime.UtcNow;

            query = request.Filter switch
            {
                "past" => query.Where(a => a.Date <= today && a.Attendees.Any(x => x.UserId == request.UserId)),
                "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                _ => query.Where(a => a.Date >= today && a.Attendees.Any(x => x.UserId == request.UserId))
            };

            var projectedActivities = query
                .ProjectTo<UserActividadDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Resultado<List<UserActividadDto>>.Exitoso(activities);
        }
    }

}
