using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class openDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "secteurActivité",
                table: "Companies",
                newName: "secteurActivite");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "secteurActivite",
                table: "Companies",
                newName: "secteurActivité");
        }
    }
}
