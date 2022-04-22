using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string lastName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string firstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string password { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(8)")]
        public string CIN { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? tel { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? address { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? fax { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? webSite { get; set; }
    }
}