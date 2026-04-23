using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ODataController
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("Servicio IMediatr no disponible!");

        protected ActionResult HandleResultado<T>(Resultado<T> resultado)
        {
            if (resultado.EsExitoso && resultado.Valor != null) return Ok(resultado.Valor); 

            if (!resultado.EsExitoso && resultado.Code == 404) return NotFound(resultado.Error);

            return BadRequest(resultado.Error);       
        }
    }
}
