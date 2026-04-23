using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            
            var photo = user.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

            if (photo == null) return Resultado<Unit>.Fallido("No se encontró la foto", 400);

            if (photo.Url == user.ImageUrl) return Resultado<Unit>.Fallido("No se puede borrar la foto principal", 400);

            await photoService.DeletePhoto(photo.PublicId);

            context.Photos.Remove(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result 
                ? Resultado<Unit>.Exitoso(Unit.Value) 
                : Resultado<Unit>.Fallido("Error al eliminar la foto", 500);
        }
    }

}
