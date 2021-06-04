﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.NtoNClasses;

namespace WebApp.Models
{
    public class WorkPlan
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public WorkOrder WorkOrder { get; set; }
        //public Street Street { get; set; } ulica se izvalaci iz work ordera
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid UserID { get; set; } //od id izvuci fullname i br telefona
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public string Company { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<WorkPlanDevice> Devices { get; set; }
        public ICollection<SafetyDoc> SafetyDocs { get; set; }
        public Crew Crew { get; set; }
        public ICollection<Instruction> Instructions { get; set; }
        public ICollection<HistoricChange> History { get; set; }
    }
}
