using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webAPI.Models;
using Microsoft.EntityFrameworkCore;
using webAPI.DTO;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class privateMessageController : ControllerBase
    {
        private readonly DataContext _context;

        public privateMessageController(DataContext context)
        {
            _context = context;
        }

        // GET: api/privateMessage/unsecure
        [HttpGet("unsecure")]
        public async Task<IActionResult> GetUnsecure()
        {
            var messages = await _context.PrivateMessages.ToListAsync();
            return Ok(messages);
        }

        // GET: api/privateMessage/loadMessages
        [HttpPost("loadMessages")]
        public async Task<ActionResult<List<privateMessage>>> GetPrivateMessages(CorrespondenceDTO ids)
        {
            var loggedIn = await _context.PrivateMessages
            .Where(x => x.senderId == ids.loggedInId).ToListAsync();

            List<privateMessage> list = new List<privateMessage>();

            foreach (var message in loggedIn)
            {
                if (message.receiverId == ids.receiverId)
                {
                    list.Add(message);
                }
            }

            var receiver = await _context.PrivateMessages
            .Where(x => x.senderId == ids.receiverId).ToListAsync();

            foreach (var message in receiver)
            {
                if (message.receiverId == ids.loggedInId)
                {
                    list.Add(message);
                }
            }

            List<privateMessage> SortedList = list.OrderBy(o => o.Id).ToList();

            return Ok(SortedList);
        }

        // POST: api/Company
        [HttpPost("sendPrivateMessage")]
        public async Task<IActionResult> sendPrivateMessage(privateMessage message)
        {
            DateTime MyTime = DateTime.Now;

            DateTime MyTimeInWesternEurope = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(MyTime, "W. Europe Standard Time");

            var mes = new privateMessage();
            mes.content = message.content;
            mes.sendingDate = MyTime;
            mes.isRead = message.isRead;
            mes.senderId = message.senderId;
            mes.receiverId = message.receiverId;

            _context.PrivateMessages.Add(mes);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/privateMessage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var message = await _context.PrivateMessages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            else
            {
                _context.PrivateMessages.Remove(message);
                await _context.SaveChangesAsync();

                return Ok();
            }

        }
    }
}