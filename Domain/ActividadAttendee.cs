using System;

namespace Domain;

public class ActividadAttendee
{
    public string? UserId { get; set; }
    public User? User { get; set; } = null!;
    public string? ActividadId { get; set; }
    public Actividad? Actividad { get; set; } = null!;
    public bool IsHost { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}
