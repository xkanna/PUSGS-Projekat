﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.DTOs
{
    public class EditProfileDTO
    {
        public UserDTO body { get; set; }
        public string currentPassword { get; set; }
    }
}
