using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options ) : IdentityDbContext<User>(options)
{
    public required DbSet<Actividad> Actividades { get; set; }

    public required DbSet<ActividadAttendee> ActividadAttendees { get; set; }

    override protected void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActividadAttendee>()
            .HasKey(x => new { x.UserId, x.ActividadId });

        builder.Entity<ActividadAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Actividades)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActividadAttendee>()
            .HasOne(x => x.Actividad)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.ActividadId);
    }
}
