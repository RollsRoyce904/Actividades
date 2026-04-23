using Application.Actividades.Comandos;
using Application.Actividades.Consultas;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);
        await Clients.Group(command.ActividadId).SendAsync("ReceiveComment", comment.Valor);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var actividadId = httpContext?.Request.Query["actividadId"];

        if (string.IsNullOrEmpty(actividadId)) throw new HubException("No actividad con este id");

        await Groups.AddToGroupAsync(Context.ConnectionId, actividadId!);

        var result = await mediator.Send(new GetComments.Query { ActividadId = actividadId! });

        await Clients.Caller.SendAsync("LoadComments", result.Valor);
    }

}
