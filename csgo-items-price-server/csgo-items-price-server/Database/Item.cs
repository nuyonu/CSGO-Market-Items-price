using System;

namespace csgo_items_price_server.Database
{
    public class Item
    {
        private Item() { }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Exterior { get; set; }
        public string Price { get; set; }
        
        public static Item Create(string name, string image, string exterior, string price)
        {
            return new Item()
            {
                Name = name,
                Image = image,
                Exterior = exterior,
                Price = price
            };
        }
    }
}