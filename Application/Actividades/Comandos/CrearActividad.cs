using System;
using Domain;
using MediatR;
using Persistence;
using Application.Actividades.DTO;
using AutoMapper;
using FluentValidation;
using Application.Core;

namespace Application.Actividades.Comandos;

public class CrearActividad
{
    public class Command : IRequest<Resultado<string>>
    {
        public required CrearActividadDTO ActividadDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Resultado<string>>
    {
        public async Task<Resultado<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var actividad = mapper.Map<Actividad>(request.ActividadDto);
            context.Actividades.Add(actividad);

            var resultado = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!resultado) return Resultado<string>.Fallido("Error al crear la actividad!", 500);

            return Resultado<string>.Exitoso(actividad.Id);
        }
    }
}
