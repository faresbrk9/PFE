using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webAPI.Models;
using webAPI.DTO;

namespace webAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private readonly DataContext _context;

        public userController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Crud
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // GET: api/Crud/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> addUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // POST: api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserReqDTO loginReq)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                x => x.email == loginReq.email && x.password == loginReq.password);

            if (user == null)
            {
                return Ok(Unauthorized());
            }

            else if (user.isAccepted == true)
            {
                var loginRes = new UserResDTO();
                loginRes.Id = user.Id;
                loginRes.lastName = user.lastName;
                loginRes.firstName = user.firstName;
                loginRes.email = user.email;
                loginRes.CIN = user.CIN;
                loginRes.tel = user.tel;
                loginRes.address = user.address;
                loginRes.fax = user.fax;
                loginRes.webSite = user.webSite;
                loginRes.isAdmin = user.isAdmin;
                loginRes.token = GenerateJWT(user);

                return Ok(loginRes);
            }

            else
            {
                return Ok(Unauthorized());
            }
        }

        // POST: api/user/acceptInscription
        [HttpPost("acceptInscription")]
        public async Task<IActionResult> Login(int id)
        {
            var user = await _context.Users.FindAsync(id);
            var userAccepted = user;
            if (user == null)
            {
                return NotFound();
            }

            else
            {
                userAccepted.isAccepted = true;
                _context.Entry(user).CurrentValues.SetValues(userAccepted);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

        // DELETE: api/Crud/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            else
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok();
            }
            
        }



        

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        //Jwt Generator
        private string GenerateJWT(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(
                    "id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}