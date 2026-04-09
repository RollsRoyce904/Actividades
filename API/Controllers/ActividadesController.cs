using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using MediatR;
using Application.Actividades.Consultas;
using Application.Actividades.Comandos;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadesController : BaseApiController
    {
        [EnableQuery]
        [HttpGet]
        public async Task<ActionResult<List<Actividad>>> GetActividades()
        {
            return await Mediator.Send(new ListarActividades.Query());
        }

        [EnableQuery]
        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> GetActividades(string id)
        {
            return await Mediator.Send(new DetallesActividades.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<string>> CrearActividades(Actividad actividad)
        {
            return await Mediator.Send(new CrearActividad.Command{Actividad = actividad});
        }

        [HttpPut]
        public async Task<ActionResult> EditarActividad(Actividad actividad)
        {
            await Mediator.Send(new EditarActividad.Command{Actividad = actividad});

            return  NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> BorrarActividad(string id)
        {
            await Mediator.Send(new BorrarActividad.Command{ Id = id});

            return Ok();
        }
    }
}
