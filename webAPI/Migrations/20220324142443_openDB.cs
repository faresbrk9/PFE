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
                    webSite = table.Column<string>(type: "nvarchar(255)", nullable: true)
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
                    raisonSociale = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    capitalSociale = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    siegeSociale = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    formeJuridique = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    matriculFiscal = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    RNE = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    secteurActivité = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    produits = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    nbreEmployes = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    tel = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    fax = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    webSite = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ownerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Users_ownerId",
                        column: x => x.ownerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ownerId",
                table: "Companies",
                column: "ownerId");
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
