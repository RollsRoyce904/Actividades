using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public required string TargetUserId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await userAccessor.GetUserAsync();
            var target = await context.Users.FindAsync([request.TargetUserId],
                cancellationToken);

            if (target == null)
                return Resultado<Unit>.Fallido("Usuario no encontrado", 400);

            var following = await context.UserFollowings
                .FindAsync([observer.Id, target.Id], cancellationToken);

            if (following == null)
                context.UserFollowings.Add(new UserFollowing { ObserverId = observer.Id, TargetId = target.Id });
            else
                context.UserFollowings.Remove(following);

            return await context.SaveChangesAsync(cancellationToken) > 0 
            ? Resultado<Unit>.Exitoso(Unit.Value) 
            : Resultado<Unit>.Fallido("Error al seguir/dejar de seguir usuario", 400);
        }
    }
}
