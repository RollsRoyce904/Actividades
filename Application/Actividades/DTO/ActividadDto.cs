using System;
using Application.Profiles.DTOs;

namespace Application.Actividades.DTO;

public class ActividadDto
{
    public required string Id { get; set; }
    public required string Titulo { get; set; }
    public DateTime Date { get; set; }
    public required string Descripcion { get; set; }
    public required string Categoria { get; set; }
    public bool IsCancelado { get; set; }
    public required string HostDisplayName { get; set; } 
    public required string HostId { get; set; }

    //locacion
    public required string Ciudad { get; set; }
    public required string Lugar { get; set; }
    public double Latitud { get; set; }
    public double Longitud { get; set; }

    //nav prop
    public ICollection<UserProfile> Attendees { get; set; } = [];
}
