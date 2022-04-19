using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? raisonSociale { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? capitalSociale { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? siegeSociale { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? formeJuridique { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? matriculFiscal { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? RNE { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? secteurActivité { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? produits { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? nbreEmployes { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? tel { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? email { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? fax { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? webSite { get; set; }

        public User owner { get; set; }

        public int? ownerId { get; set; }
    }
}