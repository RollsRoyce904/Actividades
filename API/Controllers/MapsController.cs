using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MapsController(IConfiguration config, HttpClient httpClient) : BaseApiController
    {
        private readonly IConfiguration _config = config;
        private readonly HttpClient _httpClient = httpClient;

        [HttpGet("search")]
        public async Task<IActionResult> Search(string query)
        {
            var apiKey = _config["LocationIQ:ApiKey"];

            var url = $"https://api.locationiq.com/v1/autocomplete?key={apiKey}&limit=5&dedupe=1&q={query}";
            Console.WriteLine("hit map controller");
            var response = await _httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            return Content(content, "application/json");
        }
    }
}
