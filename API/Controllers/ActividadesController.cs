using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadesController(AppDbContext context) : ODataController
    {
        [EnableQuery]
        [HttpGet]
        public async Task<ActionResult<List<Actividad>>> GetActividades()
        {
            var actividades = await context.Actividades.ToListAsync();
            return Ok(actividades);
        }

        [EnableQuery]
        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> GetActividades(string id)
        {
            var actividad = await context.Actividades.FindAsync(id);
            if (actividad == null)
            {
                return NotFound();
            }
            return Ok(actividad);
        }
    }
}
