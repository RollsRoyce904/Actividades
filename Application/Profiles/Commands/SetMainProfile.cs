using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainProfile
{
     public class Command : IRequest<Resultado<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            
            var photo = user.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

            if (photo == null) return Resultado<Unit>.Fallido("No se encontró la foto", 400);

            user.ImageUrl = photo.Url;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result 
                ? Resultado<Unit>.Exitoso(Unit.Value) 
                : Resultado<Unit>.Fallido("Error al establecer la foto principal", 500);
        }
    }

}
