﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webAPI.Models;

#nullable disable

namespace webAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("webAPI.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("RNE")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("capitalSociale")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("fax")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("formeJuridique")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("matriculFiscal")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("nbreEmployes")
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("ownerId")
                        .HasColumnType("int");

                    b.Property<string>("produits")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("raisonSociale")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("secteurActivité")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("siegeSociale")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("tel")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("webSite")
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ownerId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("webAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CIN")
                        .IsRequired()
                        .HasColumnType("nvarchar(8)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("fax")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("tel")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("webSite")
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("webAPI.Models.Company", b =>
                {
                    b.HasOne("webAPI.Models.User", "owner")
                        .WithMany()
                        .HasForeignKey("ownerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("owner");
                });
#pragma warning restore 612, 618
        }
    }
}
