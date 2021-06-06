﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.DTOs
{
    public class IncidentDTO
    {
        public IncidentDataDTO Incident { get; set; }
        public int Crew { get; set; }
        public DeviceDTO[] Devices { get; set; }
    }
}
