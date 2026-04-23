using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Resultado<Photo>>
    {
        public required IFormFile File { get; set; } = null!;
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, IPhotoService photoService) 
    : IRequestHandler<Command, Resultado<Photo>>
    {
        public async Task<Resultado<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhotoAsync(request.File);

            if (uploadResult == null ) return Resultado<Photo>.Fallido("Error al subir la foto", 400);

            var user = await userAccessor.GetUserAsync();
            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id
            };

            user.ImageUrl ??= photo.Url;
            context.Photos.Add(photo);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Resultado<Photo>.Fallido("Error al guardar la foto", 400);

            return Resultado<Photo>.Exitoso(photo);

        }
    }
}
