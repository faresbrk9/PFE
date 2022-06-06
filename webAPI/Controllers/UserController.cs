using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MailKit.Net.Smtp;
using MailKit;
using MailKit.Security;
using MimeKit;
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
                userInfo.isAccepted = user.isAccepted;
                userInfo.isBlocked = user.isBlocked;
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
            else
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
                userInfo.isAccepted = user.isAccepted;
                userInfo.isBlocked = user.isBlocked;
                userInfo.isAdmin = user.isAdmin;

                return Ok(userInfo);
            }
        }

        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            var userExist = await _context.Users.Where(x => x.email == user.email).FirstOrDefaultAsync();
            if (userExist == null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(NotFound());
            }
            else
            {
                return Ok(Unauthorized());
            }

        }

        // POST: api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserReqDTO loginReq)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                x => x.email == loginReq.email && x.password == loginReq.password);

            if (user == null || user.isAccepted == false)
            {
                return Ok(NotFound());
            }

            else if (user.isBlocked == true)
            {
                return Ok(Unauthorized());
            }

            else
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
                loginRes.isAccepted = user.isAccepted;
                loginRes.isBlocked = user.isBlocked;
                loginRes.isAdmin = user.isAdmin;
                loginRes.token = GenerateJWT(user);

                return Ok(loginRes);
            }
        }

        // POST: api/user/reload
        [HttpPost("reload")]
        public async Task<IActionResult> reload(ReloadUserInfoDTO data)
        {
            var user = await _context.Users.FindAsync(data.Id);
            if (user == null)
            {
                return NotFound();
            }
            else if ((user.isAccepted == false) || (user.isBlocked == true))
            {
                return Ok(Unauthorized());
            }
            else
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
                loginRes.isAccepted = user.isAccepted;
                loginRes.isBlocked = user.isBlocked;
                loginRes.isAdmin = user.isAdmin;
                loginRes.token = data.token;

                return Ok(loginRes);
            }
        }

        // Post: api/user/acceptInscription
        [HttpGet("acceptInscription/{id}")]
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

        // DELETE: api/User/5
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
                var receivePrivateMessages = await _context.PrivateMessages.Where(x => x.receiverId == user.Id).ToListAsync();
                foreach (var message in receivePrivateMessages)
                {
                    _context.PrivateMessages.Remove(message);
                    await _context.SaveChangesAsync();
                }

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

            var privateMessages = await _context.PrivateMessages
            .Where(e => e.senderId == user.Id).ToListAsync();
            var publicMessages = await _context.PublicMessages
            .Where(e => e.UserId == user.Id).ToListAsync();
            var publicMessagesResponses = await _context.PublicMessageResponses
            .Where(e => e.UserId == user.Id).ToListAsync();
            foreach (var msg in publicMessages)
            {
                var msgupdate = msg;
                msgupdate.publishedBy = userEdited.lastName + " " + userEdited.firstName;

                _context.Entry(msg).CurrentValues.SetValues(msgupdate);
                await _context.SaveChangesAsync();
            }
            foreach (var res in publicMessagesResponses)
            {
                var resUpdate = res;
                resUpdate.publishedBy = userEdited.lastName + " " + userEdited.firstName;

                _context.Entry(res).CurrentValues.SetValues(resUpdate);
                await _context.SaveChangesAsync();
            }
            foreach (var msg in privateMessages)
            {
                var msgupdate = msg;
                msgupdate.sentBy = userEdited.lastName + " " + userEdited.firstName;

                _context.Entry(msg).CurrentValues.SetValues(msgupdate);
                await _context.SaveChangesAsync();
            }

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

        // Post: api/user/blockUser
        [HttpGet("blockUser/{id}")]
        public async Task<IActionResult> blockUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            else
            {
                var userBlocked = user;
                userBlocked.isBlocked = true;
                _context.Entry(user).CurrentValues.SetValues(userBlocked);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

        // Post: api/user/unblockUser
        [HttpGet("unblockUser/{id}")]
        public async Task<IActionResult> unblockUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            else
            {
                var userUnblocked = user;
                userUnblocked.isBlocked = false;
                _context.Entry(user).CurrentValues.SetValues(userUnblocked);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }



        /*private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }*/

        //send Email
        private void sendEmail(string subject, string content, string receiver)
        {
            // create email message
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("faresbraiek7@gmail.com", "faresbraiek7@gmail.com"));
            email.To.Add(new MailboxAddress(receiver, receiver));
            email.Subject = subject;
            email.Body = new TextPart("Plain") { Text = content };

            using (var client = new SmtpClient())
            {
                // connect
                client.Timeout = 30000;
                client.Connect("faresbraiek7@gmail.com", 465, SecureSocketOptions.StartTls);
                // authenticate
                client.Authenticate("faresbraiek7@gmail.com", "fares.100");
                // send message
                client.Send(email);
                // disconnect
                client.Disconnect(true);
            }
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
