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

        private bool UserExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }


        // POST: api/Company
        [HttpPost]
        public async Task<ActionResult<Company>> addCompany(Company company)
        {
            var com = new Company();
            com.raisonSociale = company.raisonSociale;
            com.capitalSociale = company.capitalSociale;
            com.siegeSociale = company.siegeSociale;
            com.formeJuridique = company.formeJuridique;
            com.matriculFiscal = company.matriculFiscal;
            com.RNE = company.RNE;
            com.secteurActivite = company.secteurActivite;
            com.produits = company.produits;
            com.nbreEmployes = company.nbreEmployes;
            com.tel = company.tel;
            com.email = company.email;
            com.fax = company.fax;
            com.webSite = company.webSite;
            com.UserId  = company.UserId;
            
            _context.Companies.Add(com);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }
    }
}