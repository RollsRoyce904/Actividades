using System;

namespace Domain;

public class Actividad
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Titulo { get; set; }
    public DateTime Date { get; set; }
    public required string Descripcion { get; set; }
    public required string Categoria { get; set; }
    public bool IsCancelado { get; set; }

    //locacion
    public required string Ciudad { get; set; }
    public required string Lugar { get; set; }
    public double Latitud { get; set; }
    public double Longitud { get; set; }
}
