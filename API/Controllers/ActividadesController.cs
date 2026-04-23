using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Application.Actividades.Consultas;
using Application.Actividades.Comandos;
using Application.Actividades.DTO;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    public class ActividadesController : BaseApiController
    {
        [EnableQuery]
        [HttpGet]
        public async Task<ActionResult<PagedList<ActividadDto, DateTime?>>> GetActivities([FromQuery]ActividadParams activityParams)
        {
            return HandleResultado(await Mediator.Send(new ListarActividades.Query(){ Params = activityParams }));
        }

        [EnableQuery]
        [HttpGet("{id}")]
        public async Task<ActionResult<ActividadDto>> GetActividadDetalle(string id)
        {
            return HandleResultado(await Mediator.Send(new DetallesActividades.Query{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CrearActividades(CrearActividadDTO actividadDto)
        {
            return HandleResultado(await Mediator.Send(new CrearActividad.Command{ActividadDto = actividadDto}));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> EditarActividad(string id, EditarActividadDTO actividadDto)
        {
            actividadDto.Id = id;
            return HandleResultado(await Mediator.Send(new EditarActividad.Command{ActividadDto = actividadDto}));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> BorrarActividad(string id)
        {
            return HandleResultado(await Mediator.Send(new BorrarActividad.Command{ Id = id}));
        }

        [HttpPost("{id}/asistir")]
        public async Task<ActionResult> AsistirActividad(string id)
        {
            return HandleResultado(await Mediator.Send(new ActualizarAttendence.Command{ Id = id }));
        }
    }
}
