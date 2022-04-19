namespace webAPI.DTO
{
    public class UserResDTO
    {
        public int Id { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string email { get; set; }
        public string CIN { get; set; }
        public string? tel { get; set; }
        public string? address { get; set; }
        public string? fax { get; set; }
        public string? webSite { get; set; }
        public string token { get; set; }
    }
}