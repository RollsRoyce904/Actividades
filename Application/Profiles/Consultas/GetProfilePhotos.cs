using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Consultas;

public class GetProfilePhotos
{
    public class Query : IRequest<Resultado<List<Photo>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Resultado<List<Photo>>>
    {
        public async Task<Resultado<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
                .Where(x => x.Id == request.UserId)
                .SelectMany(x => x.Photos)
                .ToListAsync(cancellationToken);

            return Resultado<List<Photo>>.Exitoso(photos);
        }
    }
}
