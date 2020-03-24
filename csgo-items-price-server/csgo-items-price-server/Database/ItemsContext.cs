using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csgo_items_price_server.Database
{
    public class ItemsContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-DDRTRS2\\NUYONUSQL;Database = CSGOItemsPrice; Trusted_Connection = True");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { }
    }
}
