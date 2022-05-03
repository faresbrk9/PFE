using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class openDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lastName = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(8)", nullable: false),
                    tel = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    fax = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    webSite = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    isAccepted = table.Column<bool>(type: "bit", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    raisonSociale = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    capitalSociale = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    siegeSociale = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    formeJuridique = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    matriculFiscal = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    RNE = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    secteurActivite = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    produits = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    nbreEmployes = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    tel = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    fax = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    webSite = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_UserId",
                table: "Companies",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
