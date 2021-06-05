using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class IncidentsController : ControllerBase
    {
        private readonly DataDBContext data;
        private readonly AuthenticationDBContext auth;
        private UserManager<User> manager;
        public IncidentsController(UserManager<User> u, DataDBContext d, AuthenticationDBContext a)
        {
            data = d;
            auth = a;
            manager = u;
        }

        // GET: api/<IncidentsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //await data.Incidents.AddAsync(new Incident()
            //{
            //    Type = "Planned",
            //    Confirmed = true,
            //    Status = "Dispatched",
            //    AffectedCustomers = 5,
            //    Cause = "Weather",
            //    ATA = DateTime.Now,
            //    ETA = DateTime.Now,
            //    ETR = DateTime.Now,
            //    Material = "Metal",
            //    Subcause = "Lightning",
            //    ConstructionType = "AboveGround",
            //    Voltage = 220,
            //    ScheduledTime = DateTime.Now
            //});
            //await data.SaveChangesAsync();
            return Ok(new { list = await data.Incidents.ToListAsync() });
        }

        // GET api/<IncidentsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (await auth.Users.FirstOrDefaultAsync(x => x.Id == User.Claims.First(x => x.Type == "UserID").Value) != null)
            {
                Incident temp = await data.Incidents.FirstOrDefaultAsync(x => x.Id == id);
                if (temp == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(temp);
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        // POST api/<IncidentsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Incident value)
        {
            if (await auth.Users.FirstOrDefaultAsync(x => x.Id == User.Claims.First(x => x.Type == "UserID").Value) != null && User.Claims.First(x =>x.Type == "Role").Value != "Viewer")
            {
                await data.Incidents.AddAsync(value);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        // PUT api/<IncidentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<IncidentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
