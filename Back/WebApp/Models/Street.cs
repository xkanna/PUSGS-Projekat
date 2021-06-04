using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Street
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public ICollection<Call> Calls { get; set; }
        public ICollection<Consumer> Consumers { get; set; }
        public ICollection<WorkOrder> WorkOrders { get; set; }
    }
}
