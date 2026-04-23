using System;
using Application.Actividades.DTO;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Consultas;

public class GetComments
{
    public class Query : IRequest<Resultado<List<CommentDto>>>
    {
        public required string ActividadId { get; set; }
    }
    
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Resultado<List<CommentDto>>>
    {
        public async Task<Resultado<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(x => x.Actividad.Id == request.ActividadId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Resultado<List<CommentDto>>.Exitoso(comments);
        }
    }
}
