using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Application.Actividades.Consultas;
using Application.Actividades.Comandos;
using Application.Actividades.DTO;

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
            return HandleResultado(await Mediator.Send(new DetallesActividades.Query{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CrearActividades(CrearActividadDTO actividadDto)
        {
            return HandleResultado(await Mediator.Send(new CrearActividad.Command{ActividadDto = actividadDto}));
        }

        [HttpPut]
        public async Task<ActionResult> EditarActividad(EditarActividadDTO actividadDto)
        {
            return HandleResultado(await Mediator.Send(new EditarActividad.Command{ActividadDto = actividadDto}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> BorrarActividad(string id)
        {
            return HandleResultado(await Mediator.Send(new BorrarActividad.Command{ Id = id}));
        }
    }
}
