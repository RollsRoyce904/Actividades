using System.Diagnostics;
using Application.Actividades.DTO;
using Application.Profiles.DTOs;
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
        CreateMap<Actividad, ActividadDto>()
        .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User!.DisplayName))
        .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User!.Id));
        CreateMap<ActividadAttendee, UserProfile>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User!.Id))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User!.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User!.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User!.ImageUrl));
    }
}
