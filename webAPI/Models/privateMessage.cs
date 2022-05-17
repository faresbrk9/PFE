using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class privateMessage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string content { get; set; }

        [Required]
        public DateTime sendingDate { get; set; }

        [ForeignKey("senderId")]
        public int? senderId { get; set; }

        public User? sender { get; set; }

        [ForeignKey("receiverId")]
        public int? receiverId { get; set; }

        public User? receiver { get; set; }
    }
}