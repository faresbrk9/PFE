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
    public class publicMessageController : ControllerBase
    {
        private readonly DataContext _context;

        public publicMessageController(DataContext context)
        {
            _context = context;
        }

        // GET: api/publicMessage
        [HttpGet]
        public async Task<ActionResult<List<publicMessage>>> Get()
        {
            return Ok(await _context.PublicMessages
            .Where(x => x.isPublished == true).ToListAsync());
        }

        // GET: api/publicMessage/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<List<publicMessage>>> GetMessagesBySender(int UserId)
        {
            var messages = await _context.PublicMessages.Where(x => x.UserId == UserId).ToListAsync();

            if (messages == null)
            {
                return Ok(NotFound());
            }

            return Ok(messages);
        }

        // POST: api/Company
        [HttpPost("sendMessage")]
        public async Task<IActionResult> sendMessage(publicMessage message)
        {
            DateTime MyTime = DateTime.Now;

            DateTime MyTimeInWesternEurope = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(MyTime, "W. Europe Standard Time");

            var mes = new publicMessage();
            mes.content = message.content;
            mes.publishedBy = message.publishedBy;
            mes.sendingDate = MyTime;
            mes.isPublished = message.isPublished;
            mes.UserId = message.UserId;

            _context.PublicMessages.Add(mes);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/publicMessage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicMessage(int id)
        {
            var message = await _context.PublicMessages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.PublicMessages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Post: api/user/acceptPublishment
        [HttpPost("acceptPublishmentt")]
        public async Task<IActionResult> AcceptPublishment(int id)
        {
            var message = await _context.PublicMessages.FindAsync(id);
            if (message == null)
            {
                return Ok(NotFound());
            }

            else
            {
                var messageAccepted = message;
                messageAccepted.isPublished = true;
                _context.Entry(message).CurrentValues.SetValues(messageAccepted);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

    }
}