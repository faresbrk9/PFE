using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class publicMessage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(2048)")]
        public string content { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string publishedBy { get; set; }

        public DateTime? sendingDate { get; set; }

        public bool isPublished { get; set; }

        [ForeignKey("senderId")]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}