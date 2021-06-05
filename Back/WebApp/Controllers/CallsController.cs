using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.DTOs;
using WebApp.Models;
using WebApp.Models.NtoNClasses;
using WebApp.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallsController : ControllerBase
    {
        private readonly DataDBContext data;
        private readonly AuthenticationDBContext auth;
        private UserManager<User> _userManager;
        private ApplicationSettings _appSettings;

        public CallsController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings, DataDBContext d, AuthenticationDBContext a)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            data = d;
            auth = a;
        }

        // GET: api/<CallsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CallsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ICollection<Call> GetCallsForIncidentId(int id)
        {
            Incident temp = data.Incidents.FirstOrDefault(x => x.Id == id);
            return temp.Calls;
        }

        // POST api/<CallsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CallDTO body)
        {
            Call temp = new Call();
            if(User.Identity.IsAuthenticated)
            {
                temp.UserID = User.Claims.First(x => x.Type == "UserID").Value;
            }
            else
            {
                temp.UserID = "-1";
            }
            temp.Street = data.Streets.FirstOrDefault(x => x.Name == body.Street);
            temp.Reason = body.Reason;
            temp.Hazard = body.Hazard;
            temp.Comment = body.Comment;
            data.Calls.Add(temp);

            foreach(Incident inc in data.Incidents)
            {
                if (inc.Devices != null)
                {
                    foreach (IncidentDevice d in inc.Devices)
                    {
                        if (d.Device.Street == temp.Street)
                        {
                            inc.Calls.Add(temp);
                            break;
                        }
                    }
                }
            }

            await data.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<CallsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CallsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
