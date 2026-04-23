using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options ) : IdentityDbContext<User>(options)
{
    public required DbSet<Actividad> Actividades { get; set; }

    public required DbSet<ActividadAttendee> ActividadAttendees { get; set; }

    public required DbSet<Photo> Photos { get; set; }

    public required DbSet<Comment> Comments { get; set; }

    public required DbSet<UserFollowing> UserFollowings { get; set; }

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

        builder.Entity<UserFollowing>(b =>
        {
            b.HasKey(k => new { k.ObserverId, k.TargetId });

            b.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);
            b.HasOne(t => t.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(t => t.TargetId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(), // Convert to UTC before saving
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc) // Read as UTC
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
