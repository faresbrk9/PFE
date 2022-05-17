using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class publicMessageResponse
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string content { get; set; }

        [Required]
        public DateTime sendingDate { get; set; }

        [ForeignKey("senderId")]
        public int? UserId { get; set; }

        public User? User { get; set; }

        [ForeignKey("postedOn")]
        public int? publicMessageId { get; set; }

        public publicMessage? publicMessage { get; set; }
    }
}