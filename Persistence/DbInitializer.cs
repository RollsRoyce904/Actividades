using Domain;
using Microsoft.AspNetCore.Identity;


namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any()) 
        {
            var users = new List<User>
            {
                new() { DisplayName = "Bob", UserName = "bob@example.com", Email = "bob@example.com" },
                new() { DisplayName = "Jane", UserName = "jane@example.com", Email = "jane@example.com" },
                new() { DisplayName = "Joe", UserName = "joe@example.com", Email = "joe@example.com" }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Actividades.Any()) return;

        var actividades = new List<Actividad>
        {
            new() {
                Titulo = "Past Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Descripcion = "Activity 2 months ago",
                Categoria = "drinks",
                Ciudad = "London",
                Lugar = "The Lamb and Flag, 33, Rose Street, Seven Dials, Covent Garden, London, Greater London, England, WC2E 9EB, United Kingdom",
                Latitud = 51.51171665,
                Longitud = -0.1256611057818921,
            },
            new() {
                Titulo = "Past Activity 2",
                Date = DateTime.Now.AddMonths(-1),
                Descripcion = "Activity 1 month ago",
                Categoria = "culture",
                Ciudad = "Paris",
                Lugar = "Louvre Museum, Rue Saint-Honoré, Quartier du Palais Royal, 1st Arrondissement, Paris, Ile-de-France, Metropolitan France, 75001, France",
                Latitud = 48.8611473,
                Longitud = 2.33802768704666
            },
            new() {
                Titulo = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Descripcion = "Activity 1 month in future",
                Categoria = "culture",
                Ciudad = "London",
                Lugar = "Natural History Museum",
                Latitud = 51.496510900000004,
                Longitud = -0.17600190725447445
            },
            new() {
                Titulo = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Descripcion = "Activity 2 months in future",
                Categoria = "music",
                Ciudad = "London",
                Lugar = "The O2",
                Latitud = 51.502936649999995,
                Longitud = 0.0032029278126681844
            },
            new()
            {
                Titulo = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Descripcion = "Activity 3 months in future",
                Categoria = "drinks",
                Ciudad = "London",
                Lugar = "The Mayflower",
                Latitud = 51.501778,
                Longitud = -0.053577
            },
            new()
            {
                Titulo = "Future Activity 4",
                Date = DateTime.Now.AddMonths(4),
                Descripcion = "Activity 4 months in future",
                Categoria = "drinks",
                Ciudad = "London",
                Lugar = "The Blackfriar",
                Latitud = 51.512146650000005,
                Longitud = -0.10364680647106028
            },
            new()
            {
                Titulo = "Future Activity 5",
                Date = DateTime.Now.AddMonths(5),
                Descripcion = "Activity 5 months in future",
                Categoria = "culture",
                Ciudad = "London",
                Lugar = "Sherlock Holmes Museum, 221b, Baker Street, Marylebone, London, Greater London, England, NW1 6XE, United Kingdom",
                Latitud = 51.5237629,
                Longitud = -0.1584743
            },
            new()
            {
                Titulo = "Future Activity 6",
                Date = DateTime.Now.AddMonths(6),
                Descripcion = "Activity 6 months in future",
                Categoria = "music",
                Ciudad = "London",
                Lugar = "Roundhouse, Chalk Farm Road, Maitland Park, Chalk Farm, London Borough of Camden, London, Greater London, England, NW1 8EH, United Kingdom",
                Latitud = 51.5432505,
                Longitud = -0.15197608174931165
            },
            new()
            {
                Titulo = "Future Activity 7",
                Date = DateTime.Now.AddMonths(7),
                Descripcion = "Activity 2 months ago",
                Categoria = "travel",
                Ciudad = "London",
                Lugar = "River Thames, England, United Kingdom",
                Latitud = 51.5575525,
                Longitud = -0.781404
            },
            new()
            {
                Titulo = "Future Activity 8",
                Date = DateTime.Now.AddMonths(8),
                Descripcion = "Activity 8 months in future",
                Categoria = "film",
                Ciudad = "London",
                Lugar = "River Thames, England, United Kingdom",
                Latitud = 51.5575525,
                Longitud = -0.781404
            }
        };

        context.Actividades.AddRange(actividades);
        await context.SaveChangesAsync();
    }
}
