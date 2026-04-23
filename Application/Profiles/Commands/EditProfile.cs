using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public string DisplayName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, 
	        CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            user.DisplayName = request.DisplayName;
            user.Bio = request.Bio;

            context.Entry(user).State = EntityState.Modified;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Resultado<Unit>.Exitoso(Unit.Value)
                : Resultado<Unit>.Fallido("Error al actualizar el perfil", 400);
        }
    }
}
