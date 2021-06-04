using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreetsController : ControllerBase
    {
        private readonly DataDBContext data;
        private readonly AuthenticationDBContext auth;
        private UserManager<User> manager;
        public StreetsController(UserManager<User> u, DataDBContext d, AuthenticationDBContext a)
        {
            data = d;
            auth = a;
            manager = u;
        }
        // GET: api/<StreetsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Street>>> Get()
        {
            data.Streets.Add(new Street { Name = "Miki Maus", Priority = 5 });
            await data.SaveChangesAsync();
            string h = SecurePasswordHasher.GetStringSha256Hash("leska");
            User temp = new User("Leska", h, "Matic Aleksa", new DateTime(1999, 2, 20), "Admin", 0, 0, "aleksa.matic408@gmail.com");
            auth.Users.Add(temp);
            await auth.SaveChangesAsync();
            Console.WriteLine(h);
            return await data.Streets.ToListAsync();
        }

        // GET api/<StreetsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<StreetsController>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public void Post([FromBody] string value)
        {
            if (User.Claims.First(x => x.Type == "Role").Value != "Admin")
            {

            }
        }

        // PUT api/<StreetsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StreetsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
