using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webAPI.Models;
using webAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class publicMessageResponseController : ControllerBase
    {
        private readonly DataContext _context;

        public publicMessageResponseController(DataContext context)
        {
            _context = context;
        }

        // GET: api/publicMessageResponses/publishedResponses
        [HttpGet("publishedResponses")]
        public async Task<ActionResult<List<publicMessageResponse>>> GetPublished()
        {
            return Ok(await _context.PublicMessageResponses.ToListAsync());
        }

        // GET: api/publicMessageResponses/5
        [HttpGet("{MessageId}")]
        public async Task<ActionResult<List<publicMessageResponse>>> GetMessagesByMessageId(int MessageId)
        {
            var responses = await _context.PublicMessageResponses.Where(x => x.publicMessageId == MessageId).ToListAsync();

            if (responses == null)
            {
                return Ok(NotFound());
            }

            return Ok(responses);
        }

        // POST: api/publicMessageResponses/sendResponse
        [HttpPost("sendResponse")]
        public async Task<IActionResult> sendResponse(publicMessageResponse response)
        {
            DateTime MyTime = DateTime.Now;

            DateTime MyTimeInWesternEurope = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(MyTime, "W. Europe Standard Time");

            var res = new publicMessageResponse();
            res.content = response.content;
            res.publishedBy = response.publishedBy;
            res.sendingDate = MyTime;
            res.UserId = response.UserId;
            res.publicMessageId = response.publicMessageId;

            _context.PublicMessageResponses.Add(res);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/publicMessageResponse/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResponse(int id)
        {
            var response = await _context.PublicMessageResponses.FindAsync(id);
            if (response == null)
            {
                return NotFound();
            }

            else
            {
                _context.PublicMessageResponses.Remove(response);
                await _context.SaveChangesAsync();

                return Ok();
            }

        }

        // GET: api/publicMessageResponses/notifications
        [HttpGet("notifications/{UserId}")]
        public async Task<ActionResult<List<publicMessageResponse>>> GetNotifications(int UserId)
        {
            var messages = await _context.PublicMessages.Where(x => x.UserId == UserId).ToListAsync();
            List<publicMessageResponse> list = new List<publicMessageResponse>();
            foreach (var message in messages)
            {
                var responses = await _context.PublicMessageResponses.Where(x => x.publicMessageId == message.Id).ToListAsync();
                foreach (var response in responses)
                {
                    if (response.isRead == false)
                    {
                        list.Add(response);
                    }
                }
            }

            var notificationsCount = new notificationsCountDTO();
            notificationsCount.count = list.Count;

            return Ok(notificationsCount);
        }

        // GET: api/publicMessageResponses/unreadResponsesCount
        [HttpGet("unreadResponsesCount/{MessageId}")]
        public async Task<ActionResult<List<publicMessageResponse>>> GetUnreadResponsesCountByMessage(int MessageId)
        {
            var responses = await _context.PublicMessageResponses.Where(x => x.publicMessageId == MessageId).ToListAsync();
            List<publicMessageResponse> list = new List<publicMessageResponse>();
            foreach (var response in responses)
            {
                if (response.isRead == false)
                {
                    list.Add(response);
                }
            }

            var responsesCount = new notificationsCountDTO();
            responsesCount.count = list.Count;

            return Ok(responsesCount);
        }

        // Get: api/publicMessageResponses/turnRead
        [HttpGet("turnRead/{id}")]
        public async Task<IActionResult> TurnRead(int id)
        {
            var response = await _context.PublicMessageResponses.FindAsync(id);
            if (response == null)
            {
                return NotFound();
            }

            else
            {
                var responseRead = response;
                responseRead.isRead = true;
                _context.Entry(response).CurrentValues.SetValues(responseRead);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

    }
}