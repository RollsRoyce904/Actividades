using Application.Actividades.DTO;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Actividad, Actividad>();
        CreateMap<CrearActividadDTO, Actividad>();
        CreateMap<EditarActividadDTO, Actividad>();
    }
}
