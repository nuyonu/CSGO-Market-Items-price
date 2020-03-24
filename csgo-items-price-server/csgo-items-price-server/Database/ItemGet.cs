using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csgo_items_price_server.Database
{
    public class ItemGet
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Exterior { get; set; }
        public string LowestPrice { get; set; }
        public string MedianPrice { get; set; }

        public static ItemGet Create(string name, string image, string exterior, string lowestPrice, string medianPrice)
        {
            return new ItemGet()
            {
                Name = name,
                Image = image,
                Exterior = exterior,
                LowestPrice = lowestPrice,
                MedianPrice = medianPrice
            };
        }
    }
}
