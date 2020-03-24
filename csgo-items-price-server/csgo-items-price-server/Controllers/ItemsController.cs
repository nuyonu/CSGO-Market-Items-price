using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using csgo_items_price_server.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace csgo_items_price_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private static readonly HttpClient client = new HttpClient();
        public ItemsController(ILogger<ItemsController> logger)
        {
            _logger = logger;
        }
        [HttpGet("from_steam/{name}")]
        public async Task<string> GetAllAsync(string name)
        {
            return await GetItemsAsync(name);
        }
        [HttpGet]
        public async Task<IEnumerable<ItemGet>> GetAllItemsFromDBAsync()
        {
            var context = new ItemsContext();
            List<ItemGet> result = new List<ItemGet>();
            foreach(Item item in context.Items)
            {
                string URL = "https://steamcommunity.com/market/priceoverview/?country=DE&currency=1&appid=730&market_hash_name=" + item.Name;
                SteamCallResponse response = DownloadAndDeserializeJsonData<SteamCallResponse>(URL);
                result.Add(ItemGet.Create(item.Name, item.Image, item.Exterior, response.Lowest_price, response.Median_price));
            }
            return result;
        }
        [HttpPost]
        public async Task<ActionResult> PutItems(List<ItemPost> items)
        {
            using var context = new ItemsContext();
            foreach(var item in items)
            {
                await context.Items.AddAsync(Item.Create(item.Name, item.Image, item.Exterior, item.Price));
            }
            context.SaveChanges();
            return Ok();
        }

        private async Task<string> GetItemsAsync(string query)
        {
            string URL = "https://steamcommunity.com/market/search/render/?appid=730&norender=1&count=5&query=" + query;
            try
            {
                HttpResponseMessage response = await client.GetAsync(URL);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return "{success: false}";
            }
        }
        private static T DownloadAndDeserializeJsonData<T>(string url) where T : new()
        {
            using (var webClient = new WebClient())
            {
                var jsonData = string.Empty;
                try
                {
                    jsonData = webClient.DownloadString(url);
                }
                catch (Exception) { }

                return string.IsNullOrEmpty(jsonData)
                           ? new T() : JsonConvert.DeserializeObject<T>(jsonData);
            }
        }
    }
    internal class SteamCallResponse
    {
        public string Success { get; set; }
        public string Lowest_price { get; set; }
        public string Volume { get; set; }
        public string Median_price { get; set; }
    }
}