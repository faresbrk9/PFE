using System;
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
                    lastName = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(8)", nullable: false),
                    tel = table.Column<string>(type: "nvarchar(8)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    fax = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    webSite = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    isAccepted = table.Column<bool>(type: "bit", nullable: false),
                    isBlocked = table.Column<bool>(type: "bit", nullable: false),
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
                    raisonSociale = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    capitalSociale = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    siegeSociale = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    formeJuridique = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    matriculFiscal = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    RNE = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    secteurActivite = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    produits = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    nbreEmployes = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    tel = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    fax = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    webSite = table.Column<string>(type: "nvarchar(256)", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "PrivateMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(type: "nvarchar(2048)", nullable: false),
                    sendingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    isRead = table.Column<bool>(type: "bit", nullable: false),
                    senderId = table.Column<int>(type: "int", nullable: false),
                    receiverId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_Users_receiverId",
                        column: x => x.receiverId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PrivateMessages_Users_senderId",
                        column: x => x.senderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PublicMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(type: "nvarchar(2048)", nullable: false),
                    publishedBy = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    sendingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    unreadResponsesCount = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublicMessages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PublicMessageResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(type: "nvarchar(2048)", nullable: false),
                    publishedBy = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    sendingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    isRead = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    publicMessageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicMessageResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublicMessageResponses_PublicMessages_publicMessageId",
                        column: x => x.publicMessageId,
                        principalTable: "PublicMessages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PublicMessageResponses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_UserId",
                table: "Companies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_receiverId",
                table: "PrivateMessages",
                column: "receiverId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_senderId",
                table: "PrivateMessages",
                column: "senderId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicMessageResponses_publicMessageId",
                table: "PublicMessageResponses",
                column: "publicMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicMessageResponses_UserId",
                table: "PublicMessageResponses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicMessages_UserId",
                table: "PublicMessages",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "PrivateMessages");

            migrationBuilder.DropTable(
                name: "PublicMessageResponses");

            migrationBuilder.DropTable(
                name: "PublicMessages");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
