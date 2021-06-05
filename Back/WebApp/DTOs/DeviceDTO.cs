using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.DTOs
{
    public class DeviceDTO
    {
        public string Type { get; set; }
        public string Name { get; set; } // PRE1 kao prekidac 1, mozda mora da se negde pamti static broj svakog tipa, ili da se cuva u bazi u posebnoj tabelici
        public string Street { get; set; }
    }
}
