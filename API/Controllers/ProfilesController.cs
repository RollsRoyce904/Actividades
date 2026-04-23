using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Profiles.Commands;
using Application.Profiles.Consultas;

namespace API.Controllers
{
    [ApiController]
    public class ProfilesController : BaseApiController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult> AddPhoto(IFormFile file)
        {
            return HandleResultado(await Mediator.Send(new AddPhoto.Command { File = file }));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult> GetPhotosForUser(string userId)
        {
            return HandleResultado(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult> DeletePhoto(string photoId)
        {
            return HandleResultado(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            return HandleResultado(await Mediator.Send(new SetMainProfile.Command { PhotoId = photoId }));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> GetProfile(string userId)
        {
            return HandleResultado(await Mediator.Send(new GetProfile.Query { UserId = userId }));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile(EditProfile.Command command)
        {
            return HandleResultado(await Mediator.Send(command));
        }

        [HttpGet("{userId}/actividades")]
        public async Task<ActionResult> GetActividadesForUser(string userId, string filter)
        {
            return HandleResultado(await Mediator.Send(new GetUserActividades.Query { UserId = userId, Filter = filter }));
        }

        [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult> GetFollowListForUser(string userId, string predicate)
        {
            return HandleResultado(await Mediator.Send(new GetUserFollowings.Query { UserId = userId, Predicate = predicate }));
        }

        [HttpPost("{userId}/follow")]
        public async Task<IActionResult> Follow(string userId)
        {
            return HandleResultado(await Mediator.Send(new FollowToggle.Command{ TargetUserId = userId }));
        }
    }
}
