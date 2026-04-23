using System;
using Application.Actividades.DTO;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Comandos;

public class AddComment
{
    public class Command : IRequest<Resultado<CommentDto>>
    {
        public required string Body { get; set; }
        public required string ActividadId { get; set; }
    }

     public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Resultado<CommentDto>>
    {
        public async Task<Resultado<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Actividades
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActividadId, cancellationToken);
            
            if (activity == null) return Resultado<CommentDto>.Fallido("No se encontró la actividad", 400);

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                ActividadId = activity.Id,
                Body = request.Body
            };

            activity.Comments.Add(comment);

            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            return success 
                ? Resultado<CommentDto>.Exitoso(mapper.Map<CommentDto>(comment)) 
                : Resultado<CommentDto>.Fallido("Error al agregar el comentario", 400);
        }
    }
}
