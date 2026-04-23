using System;
using Application.Core;

namespace Application.Actividades.Consultas;

public class ActividadParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
}
