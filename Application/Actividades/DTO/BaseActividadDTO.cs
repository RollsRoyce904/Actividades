namespace Application.Actividades.DTO;

public class BaseActividadDTO
{
    public string Titulo { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;

    //locacion
    public string Ciudad { get; set; } = string.Empty;
    public string Lugar { get; set; } = string.Empty;
    public double Latitud { get; set; }
    public double Longitud { get; set; }
}
