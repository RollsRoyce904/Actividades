namespace Application.Core;

public class Resultado<T>
{
    public bool EsExitoso { get; private set; }
    public T? Valor { get; private set; }
    public string? Error { get; private set; }
    public int Code { get; private set; }

    public static Resultado<T> Exitoso(T valor)
    {
        return new Resultado<T> { EsExitoso = true, Valor = valor };
    }

    public static Resultado<T> Fallido(string error, int code)
    {
        return new Resultado<T> { EsExitoso = false, Error = error, Code = code };
    }
}