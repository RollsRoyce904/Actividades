using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;

namespace Application.Profiles.Consultas;

public class GetProfile
{
    public class Query : IRequest<Resultado<UserProfile>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Resultado<UserProfile>>
    {
        public async Task<Resultado<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users
                .ProjectTo<UserProfile>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

            return profile == null
                ? Resultado<UserProfile>.Fallido("No se encontró el perfil", 404)
                : Resultado<UserProfile>.Exitoso(profile);
        }
    }

}
