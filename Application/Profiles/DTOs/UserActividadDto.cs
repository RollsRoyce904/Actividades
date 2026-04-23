using System;

namespace Application.Profiles.DTOs;

public class UserActividadDto
{
    public required string Id { get; set; }
    public required string Titulo { get; set; }
    public required string Categoria { get; set; }
    public DateTime Fecha { get; set; }
}
