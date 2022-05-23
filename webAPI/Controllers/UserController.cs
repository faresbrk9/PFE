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
        [HttpGet("unsecure")]
        public async Task<IActionResult> GetUnsecure()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // GET: api/Crud
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _context.Users.ToListAsync();
            List<UserPublicInfoDTO> list = new List<UserPublicInfoDTO>();
            foreach (var user in users)
            {
                var userInfo = new UserPublicInfoDTO();
                userInfo.Id = user.Id;
                userInfo.lastName = user.lastName;
                userInfo.firstName = user.firstName;
                userInfo.email = user.email;
                userInfo.CIN = user.CIN;
                userInfo.tel = user.tel;
                userInfo.address = user.address;
                userInfo.fax = user.fax;
                userInfo.webSite = user.webSite;
                userInfo.isAdmin = user.isAdmin;
                list.Add(userInfo);

            }


            return Ok(list);
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
        public async Task<ActionResult<User>> AddUser(User user)
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

        // Post: api/user/acceptInscription
        [HttpPost("acceptInscription")]
        public async Task<IActionResult> AcceptInscription(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            else
            {
                var userAccepted = user;
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

        [HttpPost("editUser")]
        public async Task<IActionResult> editUser(User user)
        {
            var use = await _context.Users.FindAsync(user.Id);
            var userEdited = use;

            userEdited.lastName = user.lastName;
            userEdited.firstName = user.firstName;
            userEdited.email = user.email;
            userEdited.CIN = user.CIN;
            userEdited.tel = user.tel;
            userEdited.address = user.address;
            userEdited.fax = user.fax;
            userEdited.webSite = user.webSite;

            _context.Entry(use).CurrentValues.SetValues(userEdited);
            await _context.SaveChangesAsync();

            var userLog = await _context.Users.FindAsync(user.Id);
            var loginRes = new UserResDTO();
            loginRes.Id = userLog.Id;
            loginRes.lastName = userLog.lastName;
            loginRes.firstName = userLog.firstName;
            loginRes.email = userLog.email;
            loginRes.CIN = userLog.CIN;
            loginRes.tel = userLog.tel;
            loginRes.address = userLog.address;
            loginRes.fax = userLog.fax;
            loginRes.webSite = userLog.webSite;
            loginRes.isAdmin = userLog.isAdmin;
            loginRes.token = GenerateJWT(userLog);

            return Ok(loginRes);
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