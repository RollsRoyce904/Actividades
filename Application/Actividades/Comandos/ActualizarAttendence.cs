using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actividades.Comandos;

public class ActualizarAttendence
{
    public class Command : IRequest<Resultado<Unit>>
    {
        public required string Id { get; set; }
        public bool IsGoing { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Resultado<Unit>>
    {
        public async Task<Resultado<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = await context.Actividades
                .Include(a => a.Attendees)
                .ThenInclude(u => u.User)
                .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
            
            if (actividad == null) return Resultado<Unit>.Fallido("No se encontró la actividad!", 404);

            var user = await userAccessor.GetUserAsync();

            var attendence = actividad.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isHost = actividad.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            if (attendence != null)
            {
                if (isHost) actividad.IsCancelado = !actividad.IsCancelado;
                else actividad.Attendees.Remove(attendence);
            }
            else
            {
                actividad.Attendees.Add(new ActividadAttendee
                {
                    UserId = user.Id,
                    ActividadId = actividad.Id,
                    IsHost = false
                });
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result 
            ? Resultado<Unit>.Exitoso(Unit.Value) 
            : Resultado<Unit>.Fallido("Error al actualizar la asistencia", 400);
        }
    }
}
