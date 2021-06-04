using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.NtoNClasses;

namespace WebApp.Models
{
    public class WorkOrder
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public Incident Incident { get; set; }
        public Street Street { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid UserID { get; set; } //od id izvuci fullname i br telefona
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public bool Emergency { get; set; }
        public string Company { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<WorkPlan> WorkPlans { get; set; }
        public ICollection<WorkOrderDevice> Devices { get; set; }
        public ICollection<HistoricChange> History { get; set; }
    }
}
