using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace webAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class companyController : ControllerBase
    {
        private readonly DataContext _context;

        public companyController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<List<Company>>> Get()
        {
            return Ok(await _context.Companies.ToListAsync());
        }

        // GET: api/Company/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<List<Company>>> GetCompanyByOwner(int UserId)
        {
            var company = await _context.Companies.Where(x => x.UserId == UserId).ToListAsync();

            if (company == null)
            {
                return Ok(Unauthorized());
            }

            return Ok(company);
        }

        // PUT: api/Company/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Company
        [HttpPost("addCompany")]
        public async Task<IActionResult> addCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Company
        [HttpPost("editCompany")]
        public async Task<IActionResult> editCompany(Company company)
        {
            var com = await _context.Companies.FindAsync(company.Id);
            var companyEdited = com;

            companyEdited.raisonSociale = company.raisonSociale;
            companyEdited.capitalSociale = company.capitalSociale;
            companyEdited.siegeSociale = company.siegeSociale;
            companyEdited.formeJuridique = company.formeJuridique;
            companyEdited.matriculFiscal = company.matriculFiscal;
            companyEdited.RNE = company.RNE;
            companyEdited.secteurActivite = company.secteurActivite;
            companyEdited.produits = company.produits;
            companyEdited.nbreEmployes = company.nbreEmployes;
            companyEdited.tel = company.tel;
            companyEdited.email = company.email;
            companyEdited.fax = company.fax;
            companyEdited.webSite = company.webSite;

            _context.Entry(com).CurrentValues.SetValues(companyEdited);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool UserExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}