﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DTOs;
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
        public IActionResult Get()
        {
            //if (data.Streets.Count() == 1)
            //{
            //    data.Streets.Add(new Street() { Name = "Bulevar Oslobodjenja", Priority = 8 });
            //    data.Streets.Add(new Street() { Name = "Maksima Gorkog", Priority = 6 });
            //    data.Streets.Add(new Street() { Name = "Presernova", Priority = 2 });
            //    data.Streets.Add(new Street() { Name = "Jevrejska", Priority = 6 });
            //    data.Streets.Add(new Street() { Name = "Heroja Pinkija", Priority = 6 });
            //    await data.SaveChangesAsync();
            //}
            List<StreetDTO> temp = new List<StreetDTO>();
            foreach(Street s in data.Streets)
            {
                temp.Add(new StreetDTO() { Id = s.Id, Name = s.Name, Priority = s.Priority });
            }
            return Ok(new { retval = temp });
        }

        // GET api/<StreetsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        [Route("GetPriorityForDevices")]
        
        public IActionResult GetPriorityForDevices(DeviceDTO [] body)
        {
            List<string> temp = new List<string>();
            foreach(DeviceDTO d in body)
            {
                if (!temp.Contains(d.Street))
                {
                    temp.Add(d.Street);
                }
            }
            int max = 0;
            foreach(Street s in data.Streets)
            {
                if (temp.Contains(s.Name))
                {
                    if(s.Priority > max)
                    {
                        max = s.Priority;
                    }
                }
            }
            return Ok(new { max });
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
