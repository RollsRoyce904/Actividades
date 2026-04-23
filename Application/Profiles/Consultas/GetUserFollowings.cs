using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Profiles.Consultas;

public class GetUserFollowings
{
    public class Query : IRequest<Resultado<List<UserProfile>>>
    {
        public required string UserId { get; set; }
        public string Predicate { get; set; } = "followers";
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Resultado<List<UserProfile>>>
    {
        public async Task<Resultado<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfile>();

            switch (request.Predicate)
            {
                case "followers":
                    profiles = await context.UserFollowings.Where(x => x.Target.Id == request.UserId)
                        .Select(x => x.Observer)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
                case "followings":
                    profiles = await context.UserFollowings.Where(x => x.Observer.Id == request.UserId)
                        .Select(x => x.Target)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
            }

            return Resultado<List<UserProfile>>.Exitoso(profiles);
        }
    }
}
