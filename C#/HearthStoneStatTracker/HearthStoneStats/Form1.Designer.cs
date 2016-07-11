using System.Drawing;
using System.IO;
using System;
using System.Windows.Forms;
namespace HearthStoneStats
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.MainPanel = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.TotalwoArena = new System.Windows.Forms.Label();
            this.ToToTotalLabel = new System.Windows.Forms.Label();
            this.ToToTotal = new System.Windows.Forms.Label();
            this.OutSideLabel = new System.Windows.Forms.Label();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.PlayTab = new System.Windows.Forms.TabPage();
            this.PrWa = new System.Windows.Forms.Label();
            this.MaWa = new System.Windows.Forms.Label();
            this.WkWa = new System.Windows.Forms.Label();
            this.DrWa = new System.Windows.Forms.Label();
            this.HuWa = new System.Windows.Forms.Label();
            this.PaWa = new System.Windows.Forms.Label();
            this.PrSh = new System.Windows.Forms.Label();
            this.MaSh = new System.Windows.Forms.Label();
            this.WkSh = new System.Windows.Forms.Label();
            this.DrSh = new System.Windows.Forms.Label();
            this.HuSh = new System.Windows.Forms.Label();
            this.PaSh = new System.Windows.Forms.Label();
            this.RoWa = new System.Windows.Forms.Label();
            this.RoSh = new System.Windows.Forms.Label();
            this.PrRo = new System.Windows.Forms.Label();
            this.MaRo = new System.Windows.Forms.Label();
            this.WkRo = new System.Windows.Forms.Label();
            this.DrRo = new System.Windows.Forms.Label();
            this.HuRo = new System.Windows.Forms.Label();
            this.PaRo = new System.Windows.Forms.Label();
            this.ShWa = new System.Windows.Forms.Label();
            this.RoRo = new System.Windows.Forms.Label();
            this.PrPa = new System.Windows.Forms.Label();
            this.MaPa = new System.Windows.Forms.Label();
            this.WkPa = new System.Windows.Forms.Label();
            this.DrPa = new System.Windows.Forms.Label();
            this.HuPa = new System.Windows.Forms.Label();
            this.PaPa = new System.Windows.Forms.Label();
            this.ShSh = new System.Windows.Forms.Label();
            this.RoPa = new System.Windows.Forms.Label();
            this.PrHu = new System.Windows.Forms.Label();
            this.MaHu = new System.Windows.Forms.Label();
            this.WkHu = new System.Windows.Forms.Label();
            this.DrHu = new System.Windows.Forms.Label();
            this.HuHu = new System.Windows.Forms.Label();
            this.PaHu = new System.Windows.Forms.Label();
            this.ShRo = new System.Windows.Forms.Label();
            this.RoHu = new System.Windows.Forms.Label();
            this.PrDr = new System.Windows.Forms.Label();
            this.MaDr = new System.Windows.Forms.Label();
            this.WkDr = new System.Windows.Forms.Label();
            this.DrDr = new System.Windows.Forms.Label();
            this.HuDr = new System.Windows.Forms.Label();
            this.PaDr = new System.Windows.Forms.Label();
            this.ShPa = new System.Windows.Forms.Label();
            this.PrWk = new System.Windows.Forms.Label();
            this.MaWk = new System.Windows.Forms.Label();
            this.WkWk = new System.Windows.Forms.Label();
            this.DrWk = new System.Windows.Forms.Label();
            this.HuWk = new System.Windows.Forms.Label();
            this.PrMa = new System.Windows.Forms.Label();
            this.MaMa = new System.Windows.Forms.Label();
            this.RoDr = new System.Windows.Forms.Label();
            this.WkMa = new System.Windows.Forms.Label();
            this.PaWk = new System.Windows.Forms.Label();
            this.DrMa = new System.Windows.Forms.Label();
            this.ShHu = new System.Windows.Forms.Label();
            this.HuMa = new System.Windows.Forms.Label();
            this.PrPr = new System.Windows.Forms.Label();
            this.MaPr = new System.Windows.Forms.Label();
            this.RoWk = new System.Windows.Forms.Label();
            this.WkPr = new System.Windows.Forms.Label();
            this.PaMa = new System.Windows.Forms.Label();
            this.DrPr = new System.Windows.Forms.Label();
            this.ShDr = new System.Windows.Forms.Label();
            this.HuPr = new System.Windows.Forms.Label();
            this.RoMa = new System.Windows.Forms.Label();
            this.PaPr = new System.Windows.Forms.Label();
            this.ShWk = new System.Windows.Forms.Label();
            this.RoPr = new System.Windows.Forms.Label();
            this.ShMa = new System.Windows.Forms.Label();
            this.ShPr = new System.Windows.Forms.Label();
            this.ToTo = new System.Windows.Forms.Label();
            this.PrTo = new System.Windows.Forms.Label();
            this.MaTo = new System.Windows.Forms.Label();
            this.PaTo = new System.Windows.Forms.Label();
            this.WkTo = new System.Windows.Forms.Label();
            this.RoTo = new System.Windows.Forms.Label();
            this.DrTo = new System.Windows.Forms.Label();
            this.ShTo = new System.Windows.Forms.Label();
            this.WaWa = new System.Windows.Forms.Label();
            this.WaSh = new System.Windows.Forms.Label();
            this.WaRo = new System.Windows.Forms.Label();
            this.WaPa = new System.Windows.Forms.Label();
            this.WaHu = new System.Windows.Forms.Label();
            this.WaDr = new System.Windows.Forms.Label();
            this.WaWk = new System.Windows.Forms.Label();
            this.WaMa = new System.Windows.Forms.Label();
            this.HuTo = new System.Windows.Forms.Label();
            this.WaPr = new System.Windows.Forms.Label();
            this.WaTo = new System.Windows.Forms.Label();
            this.TotalLabel1 = new System.Windows.Forms.Label();
            this.DruidLabel1 = new System.Windows.Forms.Label();
            this.WarlockLabel1 = new System.Windows.Forms.Label();
            this.MageLabel1 = new System.Windows.Forms.Label();
            this.PriestLabel1 = new System.Windows.Forms.Label();
            this.HunterLabel1 = new System.Windows.Forms.Label();
            this.PaladinLabel1 = new System.Windows.Forms.Label();
            this.RogueLabel1 = new System.Windows.Forms.Label();
            this.ShamanLabel1 = new System.Windows.Forms.Label();
            this.WarriorLabel2 = new System.Windows.Forms.Label();
            this.WarriorLabel1 = new System.Windows.Forms.Label();
            this.TotalLabel2 = new System.Windows.Forms.Label();
            this.PriestLabel2 = new System.Windows.Forms.Label();
            this.MageLabel2 = new System.Windows.Forms.Label();
            this.HunterLabel2 = new System.Windows.Forms.Label();
            this.WarlockLabel2 = new System.Windows.Forms.Label();
            this.PaladinLabel2 = new System.Windows.Forms.Label();
            this.DruidLabel2 = new System.Windows.Forms.Label();
            this.RogueLabel2 = new System.Windows.Forms.Label();
            this.ShamanLabel2 = new System.Windows.Forms.Label();
            this.RankedTab = new System.Windows.Forms.TabPage();
            this.PrWa3 = new System.Windows.Forms.Label();
            this.MaWa3 = new System.Windows.Forms.Label();
            this.WkWa3 = new System.Windows.Forms.Label();
            this.DrWa3 = new System.Windows.Forms.Label();
            this.HuWa3 = new System.Windows.Forms.Label();
            this.PaWa3 = new System.Windows.Forms.Label();
            this.PrSh3 = new System.Windows.Forms.Label();
            this.MaSh3 = new System.Windows.Forms.Label();
            this.WkSh3 = new System.Windows.Forms.Label();
            this.DrSh3 = new System.Windows.Forms.Label();
            this.HuSh3 = new System.Windows.Forms.Label();
            this.PaSh3 = new System.Windows.Forms.Label();
            this.RoWa3 = new System.Windows.Forms.Label();
            this.RoSh3 = new System.Windows.Forms.Label();
            this.PrRo3 = new System.Windows.Forms.Label();
            this.MaRo3 = new System.Windows.Forms.Label();
            this.WkRo3 = new System.Windows.Forms.Label();
            this.DrRo3 = new System.Windows.Forms.Label();
            this.HuRo3 = new System.Windows.Forms.Label();
            this.PaRo3 = new System.Windows.Forms.Label();
            this.ShWa3 = new System.Windows.Forms.Label();
            this.RoRo3 = new System.Windows.Forms.Label();
            this.PrPa3 = new System.Windows.Forms.Label();
            this.MaPa3 = new System.Windows.Forms.Label();
            this.WkPa3 = new System.Windows.Forms.Label();
            this.DrPa3 = new System.Windows.Forms.Label();
            this.HuPa3 = new System.Windows.Forms.Label();
            this.PaPa3 = new System.Windows.Forms.Label();
            this.ShSh3 = new System.Windows.Forms.Label();
            this.RoPa3 = new System.Windows.Forms.Label();
            this.PrHu3 = new System.Windows.Forms.Label();
            this.MaHu3 = new System.Windows.Forms.Label();
            this.WkHu3 = new System.Windows.Forms.Label();
            this.DrHu3 = new System.Windows.Forms.Label();
            this.HuHu3 = new System.Windows.Forms.Label();
            this.PaHu3 = new System.Windows.Forms.Label();
            this.ShRo3 = new System.Windows.Forms.Label();
            this.RoHu3 = new System.Windows.Forms.Label();
            this.PrDr3 = new System.Windows.Forms.Label();
            this.MaDr3 = new System.Windows.Forms.Label();
            this.WkDr3 = new System.Windows.Forms.Label();
            this.DrDr3 = new System.Windows.Forms.Label();
            this.HuDr3 = new System.Windows.Forms.Label();
            this.PaDr3 = new System.Windows.Forms.Label();
            this.ShPa3 = new System.Windows.Forms.Label();
            this.PrWk3 = new System.Windows.Forms.Label();
            this.MaWk3 = new System.Windows.Forms.Label();
            this.WkWk3 = new System.Windows.Forms.Label();
            this.DrWk3 = new System.Windows.Forms.Label();
            this.HuWk3 = new System.Windows.Forms.Label();
            this.PrMa3 = new System.Windows.Forms.Label();
            this.MaMa3 = new System.Windows.Forms.Label();
            this.RoDr3 = new System.Windows.Forms.Label();
            this.WkMa3 = new System.Windows.Forms.Label();
            this.PaWk3 = new System.Windows.Forms.Label();
            this.DrMa3 = new System.Windows.Forms.Label();
            this.ShHu3 = new System.Windows.Forms.Label();
            this.HuMa3 = new System.Windows.Forms.Label();
            this.PrPr3 = new System.Windows.Forms.Label();
            this.MaPr3 = new System.Windows.Forms.Label();
            this.RoWk3 = new System.Windows.Forms.Label();
            this.WkPr3 = new System.Windows.Forms.Label();
            this.PaMa3 = new System.Windows.Forms.Label();
            this.DrPr3 = new System.Windows.Forms.Label();
            this.ShDr3 = new System.Windows.Forms.Label();
            this.HuPr3 = new System.Windows.Forms.Label();
            this.RoMa3 = new System.Windows.Forms.Label();
            this.PaPr3 = new System.Windows.Forms.Label();
            this.ShWk3 = new System.Windows.Forms.Label();
            this.RoPr3 = new System.Windows.Forms.Label();
            this.ShMa3 = new System.Windows.Forms.Label();
            this.ShPr3 = new System.Windows.Forms.Label();
            this.ToTo3 = new System.Windows.Forms.Label();
            this.PrTo3 = new System.Windows.Forms.Label();
            this.MaTo3 = new System.Windows.Forms.Label();
            this.PaTo3 = new System.Windows.Forms.Label();
            this.WkTo3 = new System.Windows.Forms.Label();
            this.RoTo3 = new System.Windows.Forms.Label();
            this.DrTo3 = new System.Windows.Forms.Label();
            this.ShTo3 = new System.Windows.Forms.Label();
            this.WaWa3 = new System.Windows.Forms.Label();
            this.WaSh3 = new System.Windows.Forms.Label();
            this.WaRo3 = new System.Windows.Forms.Label();
            this.WaPa3 = new System.Windows.Forms.Label();
            this.WaHu3 = new System.Windows.Forms.Label();
            this.WaDr3 = new System.Windows.Forms.Label();
            this.WaWk3 = new System.Windows.Forms.Label();
            this.WaMa3 = new System.Windows.Forms.Label();
            this.HuTo3 = new System.Windows.Forms.Label();
            this.WaPr3 = new System.Windows.Forms.Label();
            this.WaTo3 = new System.Windows.Forms.Label();
            this.TotalLabel5 = new System.Windows.Forms.Label();
            this.DruidLabel5 = new System.Windows.Forms.Label();
            this.WarlockLabel5 = new System.Windows.Forms.Label();
            this.MageLabel5 = new System.Windows.Forms.Label();
            this.PriestLabel5 = new System.Windows.Forms.Label();
            this.HunterLabel5 = new System.Windows.Forms.Label();
            this.PaladinLabel5 = new System.Windows.Forms.Label();
            this.RogueLabel5 = new System.Windows.Forms.Label();
            this.ShamanLabel5 = new System.Windows.Forms.Label();
            this.WarriorLabel5 = new System.Windows.Forms.Label();
            this.WarriorLabel6 = new System.Windows.Forms.Label();
            this.HunterLabel6 = new System.Windows.Forms.Label();
            this.TotalLabel6 = new System.Windows.Forms.Label();
            this.PriestLabel6 = new System.Windows.Forms.Label();
            this.MageLabel6 = new System.Windows.Forms.Label();
            this.WarlockLabel6 = new System.Windows.Forms.Label();
            this.PaladinLabel6 = new System.Windows.Forms.Label();
            this.DruidLabel6 = new System.Windows.Forms.Label();
            this.RogueLabel6 = new System.Windows.Forms.Label();
            this.ShamanLabel6 = new System.Windows.Forms.Label();
            this.ArenaTab = new System.Windows.Forms.TabPage();
            this.PrWa2 = new System.Windows.Forms.Label();
            this.MaWa2 = new System.Windows.Forms.Label();
            this.WkWa2 = new System.Windows.Forms.Label();
            this.DrWa2 = new System.Windows.Forms.Label();
            this.HuWa2 = new System.Windows.Forms.Label();
            this.PaWa2 = new System.Windows.Forms.Label();
            this.PrSh2 = new System.Windows.Forms.Label();
            this.MaSh2 = new System.Windows.Forms.Label();
            this.WkSh2 = new System.Windows.Forms.Label();
            this.DrSh2 = new System.Windows.Forms.Label();
            this.HuSh2 = new System.Windows.Forms.Label();
            this.PaSh2 = new System.Windows.Forms.Label();
            this.RoWa2 = new System.Windows.Forms.Label();
            this.RoSh2 = new System.Windows.Forms.Label();
            this.PrRo2 = new System.Windows.Forms.Label();
            this.MaRo2 = new System.Windows.Forms.Label();
            this.WkRo2 = new System.Windows.Forms.Label();
            this.DrRo2 = new System.Windows.Forms.Label();
            this.HuRo2 = new System.Windows.Forms.Label();
            this.PaRo2 = new System.Windows.Forms.Label();
            this.ShWa2 = new System.Windows.Forms.Label();
            this.RoRo2 = new System.Windows.Forms.Label();
            this.PrPa2 = new System.Windows.Forms.Label();
            this.MaPa2 = new System.Windows.Forms.Label();
            this.WkPa2 = new System.Windows.Forms.Label();
            this.DrPa2 = new System.Windows.Forms.Label();
            this.HuPa2 = new System.Windows.Forms.Label();
            this.PaPa2 = new System.Windows.Forms.Label();
            this.ShSh2 = new System.Windows.Forms.Label();
            this.RoPa2 = new System.Windows.Forms.Label();
            this.PrHu2 = new System.Windows.Forms.Label();
            this.MaHu2 = new System.Windows.Forms.Label();
            this.WkHu2 = new System.Windows.Forms.Label();
            this.DrHu2 = new System.Windows.Forms.Label();
            this.HuHu2 = new System.Windows.Forms.Label();
            this.PaHu2 = new System.Windows.Forms.Label();
            this.ShRo2 = new System.Windows.Forms.Label();
            this.RoHu2 = new System.Windows.Forms.Label();
            this.PrDr2 = new System.Windows.Forms.Label();
            this.MaDr2 = new System.Windows.Forms.Label();
            this.WkDr2 = new System.Windows.Forms.Label();
            this.DrDr2 = new System.Windows.Forms.Label();
            this.HuDr2 = new System.Windows.Forms.Label();
            this.PaDr2 = new System.Windows.Forms.Label();
            this.ShPa2 = new System.Windows.Forms.Label();
            this.PrWk2 = new System.Windows.Forms.Label();
            this.MaWk2 = new System.Windows.Forms.Label();
            this.WkWk2 = new System.Windows.Forms.Label();
            this.DrWk2 = new System.Windows.Forms.Label();
            this.HuWk2 = new System.Windows.Forms.Label();
            this.PrMa2 = new System.Windows.Forms.Label();
            this.MaMa2 = new System.Windows.Forms.Label();
            this.RoDr2 = new System.Windows.Forms.Label();
            this.WkMa2 = new System.Windows.Forms.Label();
            this.PaWk2 = new System.Windows.Forms.Label();
            this.DrMa2 = new System.Windows.Forms.Label();
            this.ShHu2 = new System.Windows.Forms.Label();
            this.HuMa2 = new System.Windows.Forms.Label();
            this.PrPr2 = new System.Windows.Forms.Label();
            this.MaPr2 = new System.Windows.Forms.Label();
            this.RoWk2 = new System.Windows.Forms.Label();
            this.WkPr2 = new System.Windows.Forms.Label();
            this.PaMa2 = new System.Windows.Forms.Label();
            this.DrPr2 = new System.Windows.Forms.Label();
            this.ShDr2 = new System.Windows.Forms.Label();
            this.HuPr2 = new System.Windows.Forms.Label();
            this.RoMa2 = new System.Windows.Forms.Label();
            this.PaPr2 = new System.Windows.Forms.Label();
            this.ShWk2 = new System.Windows.Forms.Label();
            this.RoPr2 = new System.Windows.Forms.Label();
            this.ShMa2 = new System.Windows.Forms.Label();
            this.ShPr2 = new System.Windows.Forms.Label();
            this.ToTo2 = new System.Windows.Forms.Label();
            this.PrTo2 = new System.Windows.Forms.Label();
            this.MaTo2 = new System.Windows.Forms.Label();
            this.PaTo2 = new System.Windows.Forms.Label();
            this.WkTo2 = new System.Windows.Forms.Label();
            this.RoTo2 = new System.Windows.Forms.Label();
            this.DrTo2 = new System.Windows.Forms.Label();
            this.ShTo2 = new System.Windows.Forms.Label();
            this.WaWa2 = new System.Windows.Forms.Label();
            this.WaSh2 = new System.Windows.Forms.Label();
            this.WaRo2 = new System.Windows.Forms.Label();
            this.WaPa2 = new System.Windows.Forms.Label();
            this.WaHu2 = new System.Windows.Forms.Label();
            this.WaDr2 = new System.Windows.Forms.Label();
            this.WaWk2 = new System.Windows.Forms.Label();
            this.WaMa2 = new System.Windows.Forms.Label();
            this.HuTo2 = new System.Windows.Forms.Label();
            this.WaPr2 = new System.Windows.Forms.Label();
            this.WaTo2 = new System.Windows.Forms.Label();
            this.TotalLabel3 = new System.Windows.Forms.Label();
            this.DruidLabel3 = new System.Windows.Forms.Label();
            this.WarlockLabel3 = new System.Windows.Forms.Label();
            this.MageLabel3 = new System.Windows.Forms.Label();
            this.PriestLabel3 = new System.Windows.Forms.Label();
            this.HunterLabel3 = new System.Windows.Forms.Label();
            this.PaladinLabel3 = new System.Windows.Forms.Label();
            this.RogueLabel3 = new System.Windows.Forms.Label();
            this.ShamanLabel3 = new System.Windows.Forms.Label();
            this.WarriorLabel3 = new System.Windows.Forms.Label();
            this.HunterLabel4 = new System.Windows.Forms.Label();
            this.WarriorLabel4 = new System.Windows.Forms.Label();
            this.TotalLabel4 = new System.Windows.Forms.Label();
            this.PriestLabel4 = new System.Windows.Forms.Label();
            this.MageLabel4 = new System.Windows.Forms.Label();
            this.WarlockLabel4 = new System.Windows.Forms.Label();
            this.PaladinLabel4 = new System.Windows.Forms.Label();
            this.DruidLabel4 = new System.Windows.Forms.Label();
            this.RogueLabel4 = new System.Windows.Forms.Label();
            this.ShamanLabel4 = new System.Windows.Forms.Label();
            this.Deck9RecordText = new System.Windows.Forms.Label();
            this.Deck8RecordText = new System.Windows.Forms.Label();
            this.Deck7RecordText = new System.Windows.Forms.Label();
            this.Deck6RecordText = new System.Windows.Forms.Label();
            this.Deck5RecordText = new System.Windows.Forms.Label();
            this.Deck4RecordText = new System.Windows.Forms.Label();
            this.Deck3RecordText = new System.Windows.Forms.Label();
            this.Deck2RecordText = new System.Windows.Forms.Label();
            this.Deck1RecordText = new System.Windows.Forms.Label();
            this.Deck0RecordText = new System.Windows.Forms.Label();
            this.RecordText = new System.Windows.Forms.Label();
            this.DecksText = new System.Windows.Forms.Label();
            this.Deck9TextBox = new System.Windows.Forms.TextBox();
            this.Deck8TextBox = new System.Windows.Forms.TextBox();
            this.Deck7TextBox = new System.Windows.Forms.TextBox();
            this.Deck6TextBox = new System.Windows.Forms.TextBox();
            this.Deck5TextBox = new System.Windows.Forms.TextBox();
            this.Deck4TextBox = new System.Windows.Forms.TextBox();
            this.Deck3TextBox = new System.Windows.Forms.TextBox();
            this.Deck2TextBox = new System.Windows.Forms.TextBox();
            this.Deck1TextBox = new System.Windows.Forms.TextBox();
            this.Deck0TextBox = new System.Windows.Forms.TextBox();
            this.DisconnectsLabel = new System.Windows.Forms.Label();
            this.Disconnect = new System.Windows.Forms.Label();
            this.MainPanel.SuspendLayout();
            this.tabControl1.SuspendLayout();
            this.PlayTab.SuspendLayout();
            this.RankedTab.SuspendLayout();
            this.ArenaTab.SuspendLayout();
            this.SuspendLayout();
            // 
            // MainPanel
            // 
            this.MainPanel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(227)))), ((int)(((byte)(226)))), ((int)(((byte)(214)))));
            this.MainPanel.Controls.Add(this.Disconnect);
            this.MainPanel.Controls.Add(this.DisconnectsLabel);
            this.MainPanel.Controls.Add(this.label1);
            this.MainPanel.Controls.Add(this.TotalwoArena);
            this.MainPanel.Controls.Add(this.ToToTotalLabel);
            this.MainPanel.Controls.Add(this.ToToTotal);
            this.MainPanel.Controls.Add(this.OutSideLabel);
            this.MainPanel.Controls.Add(this.tabControl1);
            this.MainPanel.Controls.Add(this.Deck9RecordText);
            this.MainPanel.Controls.Add(this.Deck8RecordText);
            this.MainPanel.Controls.Add(this.Deck7RecordText);
            this.MainPanel.Controls.Add(this.Deck6RecordText);
            this.MainPanel.Controls.Add(this.Deck5RecordText);
            this.MainPanel.Controls.Add(this.Deck4RecordText);
            this.MainPanel.Controls.Add(this.Deck3RecordText);
            this.MainPanel.Controls.Add(this.Deck2RecordText);
            this.MainPanel.Controls.Add(this.Deck1RecordText);
            this.MainPanel.Controls.Add(this.Deck0RecordText);
            this.MainPanel.Controls.Add(this.RecordText);
            this.MainPanel.Controls.Add(this.DecksText);
            this.MainPanel.Controls.Add(this.Deck9TextBox);
            this.MainPanel.Controls.Add(this.Deck8TextBox);
            this.MainPanel.Controls.Add(this.Deck7TextBox);
            this.MainPanel.Controls.Add(this.Deck6TextBox);
            this.MainPanel.Controls.Add(this.Deck5TextBox);
            this.MainPanel.Controls.Add(this.Deck4TextBox);
            this.MainPanel.Controls.Add(this.Deck3TextBox);
            this.MainPanel.Controls.Add(this.Deck2TextBox);
            this.MainPanel.Controls.Add(this.Deck1TextBox);
            this.MainPanel.Controls.Add(this.Deck0TextBox);
            this.MainPanel.Location = new System.Drawing.Point(0, 0);
            this.MainPanel.Name = "MainPanel";
            this.MainPanel.Size = new System.Drawing.Size(1280, 463);
            this.MainPanel.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 442);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(446, 13);
            this.label1.TabIndex = 27;
            this.label1.Text = "Left Click on a Record to add a Win, Right Click to add a Loss.  Ctrl+Click negat" +
                "es the effect.";
            // 
            // TotalwoArena
            // 
            this.TotalwoArena.AutoSize = true;
            this.TotalwoArena.Font = new System.Drawing.Font("Berlin Sans FB", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TotalwoArena.Location = new System.Drawing.Point(1031, 432);
            this.TotalwoArena.Name = "TotalwoArena";
            this.TotalwoArena.Size = new System.Drawing.Size(37, 21);
            this.TotalwoArena.TabIndex = 26;
            this.TotalwoArena.Text = "0/0";
            // 
            // ToToTotalLabel
            // 
            this.ToToTotalLabel.AutoSize = true;
            this.ToToTotalLabel.Location = new System.Drawing.Point(1096, 436);
            this.ToToTotalLabel.Name = "ToToTotalLabel";
            this.ToToTotalLabel.Size = new System.Drawing.Size(34, 13);
            this.ToToTotalLabel.TabIndex = 25;
            this.ToToTotalLabel.Text = "Total:";
            // 
            // ToToTotal
            // 
            this.ToToTotal.AutoSize = true;
            this.ToToTotal.Font = new System.Drawing.Font("Berlin Sans FB", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ToToTotal.Location = new System.Drawing.Point(1155, 429);
            this.ToToTotal.Name = "ToToTotal";
            this.ToToTotal.Size = new System.Drawing.Size(47, 26);
            this.ToToTotal.TabIndex = 24;
            this.ToToTotal.Text = "0/0";
            // 
            // OutSideLabel
            // 
            this.OutSideLabel.AutoSize = true;
            this.OutSideLabel.Location = new System.Drawing.Point(936, 436);
            this.OutSideLabel.Name = "OutSideLabel";
            this.OutSideLabel.Size = new System.Drawing.Size(90, 13);
            this.OutSideLabel.TabIndex = 23;
            this.OutSideLabel.Text = "Total(w/o Arena):";
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.PlayTab);
            this.tabControl1.Controls.Add(this.RankedTab);
            this.tabControl1.Controls.Add(this.ArenaTab);
            this.tabControl1.Location = new System.Drawing.Point(517, 39);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(706, 386);
            this.tabControl1.TabIndex = 22;
            // 
            // PlayTab
            // 
            this.PlayTab.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(235)))), ((int)(((byte)(233)))), ((int)(((byte)(242)))));
            this.PlayTab.Controls.Add(this.PrWa);
            this.PlayTab.Controls.Add(this.MaWa);
            this.PlayTab.Controls.Add(this.WkWa);
            this.PlayTab.Controls.Add(this.DrWa);
            this.PlayTab.Controls.Add(this.HuWa);
            this.PlayTab.Controls.Add(this.PaWa);
            this.PlayTab.Controls.Add(this.PrSh);
            this.PlayTab.Controls.Add(this.MaSh);
            this.PlayTab.Controls.Add(this.WkSh);
            this.PlayTab.Controls.Add(this.DrSh);
            this.PlayTab.Controls.Add(this.HuSh);
            this.PlayTab.Controls.Add(this.PaSh);
            this.PlayTab.Controls.Add(this.RoWa);
            this.PlayTab.Controls.Add(this.RoSh);
            this.PlayTab.Controls.Add(this.PrRo);
            this.PlayTab.Controls.Add(this.MaRo);
            this.PlayTab.Controls.Add(this.WkRo);
            this.PlayTab.Controls.Add(this.DrRo);
            this.PlayTab.Controls.Add(this.HuRo);
            this.PlayTab.Controls.Add(this.PaRo);
            this.PlayTab.Controls.Add(this.ShWa);
            this.PlayTab.Controls.Add(this.RoRo);
            this.PlayTab.Controls.Add(this.PrPa);
            this.PlayTab.Controls.Add(this.MaPa);
            this.PlayTab.Controls.Add(this.WkPa);
            this.PlayTab.Controls.Add(this.DrPa);
            this.PlayTab.Controls.Add(this.HuPa);
            this.PlayTab.Controls.Add(this.PaPa);
            this.PlayTab.Controls.Add(this.ShSh);
            this.PlayTab.Controls.Add(this.RoPa);
            this.PlayTab.Controls.Add(this.PrHu);
            this.PlayTab.Controls.Add(this.MaHu);
            this.PlayTab.Controls.Add(this.WkHu);
            this.PlayTab.Controls.Add(this.DrHu);
            this.PlayTab.Controls.Add(this.HuHu);
            this.PlayTab.Controls.Add(this.PaHu);
            this.PlayTab.Controls.Add(this.ShRo);
            this.PlayTab.Controls.Add(this.RoHu);
            this.PlayTab.Controls.Add(this.PrDr);
            this.PlayTab.Controls.Add(this.MaDr);
            this.PlayTab.Controls.Add(this.WkDr);
            this.PlayTab.Controls.Add(this.DrDr);
            this.PlayTab.Controls.Add(this.HuDr);
            this.PlayTab.Controls.Add(this.PaDr);
            this.PlayTab.Controls.Add(this.ShPa);
            this.PlayTab.Controls.Add(this.PrWk);
            this.PlayTab.Controls.Add(this.MaWk);
            this.PlayTab.Controls.Add(this.WkWk);
            this.PlayTab.Controls.Add(this.DrWk);
            this.PlayTab.Controls.Add(this.HuWk);
            this.PlayTab.Controls.Add(this.PrMa);
            this.PlayTab.Controls.Add(this.MaMa);
            this.PlayTab.Controls.Add(this.RoDr);
            this.PlayTab.Controls.Add(this.WkMa);
            this.PlayTab.Controls.Add(this.PaWk);
            this.PlayTab.Controls.Add(this.DrMa);
            this.PlayTab.Controls.Add(this.ShHu);
            this.PlayTab.Controls.Add(this.HuMa);
            this.PlayTab.Controls.Add(this.PrPr);
            this.PlayTab.Controls.Add(this.MaPr);
            this.PlayTab.Controls.Add(this.RoWk);
            this.PlayTab.Controls.Add(this.WkPr);
            this.PlayTab.Controls.Add(this.PaMa);
            this.PlayTab.Controls.Add(this.DrPr);
            this.PlayTab.Controls.Add(this.ShDr);
            this.PlayTab.Controls.Add(this.HuPr);
            this.PlayTab.Controls.Add(this.RoMa);
            this.PlayTab.Controls.Add(this.PaPr);
            this.PlayTab.Controls.Add(this.ShWk);
            this.PlayTab.Controls.Add(this.RoPr);
            this.PlayTab.Controls.Add(this.ShMa);
            this.PlayTab.Controls.Add(this.ShPr);
            this.PlayTab.Controls.Add(this.ToTo);
            this.PlayTab.Controls.Add(this.PrTo);
            this.PlayTab.Controls.Add(this.MaTo);
            this.PlayTab.Controls.Add(this.PaTo);
            this.PlayTab.Controls.Add(this.WkTo);
            this.PlayTab.Controls.Add(this.RoTo);
            this.PlayTab.Controls.Add(this.DrTo);
            this.PlayTab.Controls.Add(this.ShTo);
            this.PlayTab.Controls.Add(this.WaWa);
            this.PlayTab.Controls.Add(this.WaSh);
            this.PlayTab.Controls.Add(this.WaRo);
            this.PlayTab.Controls.Add(this.WaPa);
            this.PlayTab.Controls.Add(this.WaHu);
            this.PlayTab.Controls.Add(this.WaDr);
            this.PlayTab.Controls.Add(this.WaWk);
            this.PlayTab.Controls.Add(this.WaMa);
            this.PlayTab.Controls.Add(this.HuTo);
            this.PlayTab.Controls.Add(this.WaPr);
            this.PlayTab.Controls.Add(this.WaTo);
            this.PlayTab.Controls.Add(this.TotalLabel1);
            this.PlayTab.Controls.Add(this.DruidLabel1);
            this.PlayTab.Controls.Add(this.WarlockLabel1);
            this.PlayTab.Controls.Add(this.MageLabel1);
            this.PlayTab.Controls.Add(this.PriestLabel1);
            this.PlayTab.Controls.Add(this.HunterLabel1);
            this.PlayTab.Controls.Add(this.PaladinLabel1);
            this.PlayTab.Controls.Add(this.RogueLabel1);
            this.PlayTab.Controls.Add(this.ShamanLabel1);
            this.PlayTab.Controls.Add(this.WarriorLabel2);
            this.PlayTab.Controls.Add(this.WarriorLabel1);
            this.PlayTab.Controls.Add(this.TotalLabel2);
            this.PlayTab.Controls.Add(this.PriestLabel2);
            this.PlayTab.Controls.Add(this.MageLabel2);
            this.PlayTab.Controls.Add(this.HunterLabel2);
            this.PlayTab.Controls.Add(this.WarlockLabel2);
            this.PlayTab.Controls.Add(this.PaladinLabel2);
            this.PlayTab.Controls.Add(this.DruidLabel2);
            this.PlayTab.Controls.Add(this.RogueLabel2);
            this.PlayTab.Controls.Add(this.ShamanLabel2);
            this.PlayTab.Location = new System.Drawing.Point(4, 22);
            this.PlayTab.Name = "PlayTab";
            this.PlayTab.Padding = new System.Windows.Forms.Padding(3);
            this.PlayTab.Size = new System.Drawing.Size(698, 360);
            this.PlayTab.TabIndex = 0;
            this.PlayTab.Text = "Play";
            // 
            // PrWa
            // 
            this.PrWa.AutoSize = true;
            this.PrWa.Location = new System.Drawing.Point(66, 299);
            this.PrWa.Name = "PrWa";
            this.PrWa.Size = new System.Drawing.Size(24, 13);
            this.PrWa.TabIndex = 20;
            this.PrWa.Text = "0/0";
            this.PrWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWa
            // 
            this.MaWa.AutoSize = true;
            this.MaWa.Location = new System.Drawing.Point(66, 262);
            this.MaWa.Name = "MaWa";
            this.MaWa.Size = new System.Drawing.Size(24, 13);
            this.MaWa.TabIndex = 20;
            this.MaWa.Text = "0/0";
            this.MaWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWa
            // 
            this.WkWa.AutoSize = true;
            this.WkWa.Location = new System.Drawing.Point(66, 225);
            this.WkWa.Name = "WkWa";
            this.WkWa.Size = new System.Drawing.Size(24, 13);
            this.WkWa.TabIndex = 20;
            this.WkWa.Text = "0/0";
            this.WkWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWa
            // 
            this.DrWa.AutoSize = true;
            this.DrWa.Location = new System.Drawing.Point(66, 192);
            this.DrWa.Name = "DrWa";
            this.DrWa.Size = new System.Drawing.Size(24, 13);
            this.DrWa.TabIndex = 20;
            this.DrWa.Text = "0/0";
            this.DrWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWa
            // 
            this.HuWa.AutoSize = true;
            this.HuWa.Location = new System.Drawing.Point(66, 158);
            this.HuWa.Name = "HuWa";
            this.HuWa.Size = new System.Drawing.Size(24, 13);
            this.HuWa.TabIndex = 20;
            this.HuWa.Text = "0/0";
            this.HuWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWa
            // 
            this.PaWa.AutoSize = true;
            this.PaWa.Location = new System.Drawing.Point(66, 127);
            this.PaWa.Name = "PaWa";
            this.PaWa.Size = new System.Drawing.Size(24, 13);
            this.PaWa.TabIndex = 20;
            this.PaWa.Text = "0/0";
            this.PaWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrSh
            // 
            this.PrSh.AutoSize = true;
            this.PrSh.Location = new System.Drawing.Point(125, 299);
            this.PrSh.Name = "PrSh";
            this.PrSh.Size = new System.Drawing.Size(24, 13);
            this.PrSh.TabIndex = 19;
            this.PrSh.Text = "0/0";
            this.PrSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaSh
            // 
            this.MaSh.AutoSize = true;
            this.MaSh.Location = new System.Drawing.Point(125, 262);
            this.MaSh.Name = "MaSh";
            this.MaSh.Size = new System.Drawing.Size(24, 13);
            this.MaSh.TabIndex = 19;
            this.MaSh.Text = "0/0";
            this.MaSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkSh
            // 
            this.WkSh.AutoSize = true;
            this.WkSh.Location = new System.Drawing.Point(125, 225);
            this.WkSh.Name = "WkSh";
            this.WkSh.Size = new System.Drawing.Size(24, 13);
            this.WkSh.TabIndex = 19;
            this.WkSh.Text = "0/0";
            this.WkSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrSh
            // 
            this.DrSh.AutoSize = true;
            this.DrSh.Location = new System.Drawing.Point(125, 192);
            this.DrSh.Name = "DrSh";
            this.DrSh.Size = new System.Drawing.Size(24, 13);
            this.DrSh.TabIndex = 19;
            this.DrSh.Text = "0/0";
            this.DrSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuSh
            // 
            this.HuSh.AutoSize = true;
            this.HuSh.Location = new System.Drawing.Point(125, 158);
            this.HuSh.Name = "HuSh";
            this.HuSh.Size = new System.Drawing.Size(24, 13);
            this.HuSh.TabIndex = 19;
            this.HuSh.Text = "0/0";
            this.HuSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaSh
            // 
            this.PaSh.AutoSize = true;
            this.PaSh.Location = new System.Drawing.Point(125, 127);
            this.PaSh.Name = "PaSh";
            this.PaSh.Size = new System.Drawing.Size(24, 13);
            this.PaSh.TabIndex = 19;
            this.PaSh.Text = "0/0";
            this.PaSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWa
            // 
            this.RoWa.AutoSize = true;
            this.RoWa.Location = new System.Drawing.Point(66, 95);
            this.RoWa.Name = "RoWa";
            this.RoWa.Size = new System.Drawing.Size(24, 13);
            this.RoWa.TabIndex = 20;
            this.RoWa.Text = "0/0";
            this.RoWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoSh
            // 
            this.RoSh.AutoSize = true;
            this.RoSh.Location = new System.Drawing.Point(125, 95);
            this.RoSh.Name = "RoSh";
            this.RoSh.Size = new System.Drawing.Size(24, 13);
            this.RoSh.TabIndex = 19;
            this.RoSh.Text = "0/0";
            this.RoSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrRo
            // 
            this.PrRo.AutoSize = true;
            this.PrRo.Location = new System.Drawing.Point(191, 299);
            this.PrRo.Name = "PrRo";
            this.PrRo.Size = new System.Drawing.Size(24, 13);
            this.PrRo.TabIndex = 21;
            this.PrRo.Text = "0/0";
            this.PrRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaRo
            // 
            this.MaRo.AutoSize = true;
            this.MaRo.Location = new System.Drawing.Point(191, 262);
            this.MaRo.Name = "MaRo";
            this.MaRo.Size = new System.Drawing.Size(24, 13);
            this.MaRo.TabIndex = 21;
            this.MaRo.Text = "0/0";
            this.MaRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkRo
            // 
            this.WkRo.AutoSize = true;
            this.WkRo.Location = new System.Drawing.Point(191, 225);
            this.WkRo.Name = "WkRo";
            this.WkRo.Size = new System.Drawing.Size(24, 13);
            this.WkRo.TabIndex = 21;
            this.WkRo.Text = "0/0";
            this.WkRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrRo
            // 
            this.DrRo.AutoSize = true;
            this.DrRo.Location = new System.Drawing.Point(191, 192);
            this.DrRo.Name = "DrRo";
            this.DrRo.Size = new System.Drawing.Size(24, 13);
            this.DrRo.TabIndex = 21;
            this.DrRo.Text = "0/0";
            this.DrRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuRo
            // 
            this.HuRo.AutoSize = true;
            this.HuRo.Location = new System.Drawing.Point(191, 158);
            this.HuRo.Name = "HuRo";
            this.HuRo.Size = new System.Drawing.Size(24, 13);
            this.HuRo.TabIndex = 21;
            this.HuRo.Text = "0/0";
            this.HuRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaRo
            // 
            this.PaRo.AutoSize = true;
            this.PaRo.Location = new System.Drawing.Point(191, 127);
            this.PaRo.Name = "PaRo";
            this.PaRo.Size = new System.Drawing.Size(24, 13);
            this.PaRo.TabIndex = 21;
            this.PaRo.Text = "0/0";
            this.PaRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWa
            // 
            this.ShWa.AutoSize = true;
            this.ShWa.Location = new System.Drawing.Point(66, 65);
            this.ShWa.Name = "ShWa";
            this.ShWa.Size = new System.Drawing.Size(24, 13);
            this.ShWa.TabIndex = 20;
            this.ShWa.Text = "0/0";
            this.ShWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoRo
            // 
            this.RoRo.AutoSize = true;
            this.RoRo.Location = new System.Drawing.Point(191, 95);
            this.RoRo.Name = "RoRo";
            this.RoRo.Size = new System.Drawing.Size(24, 13);
            this.RoRo.TabIndex = 21;
            this.RoRo.Text = "0/0";
            this.RoRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPa
            // 
            this.PrPa.AutoSize = true;
            this.PrPa.Location = new System.Drawing.Point(256, 299);
            this.PrPa.Name = "PrPa";
            this.PrPa.Size = new System.Drawing.Size(24, 13);
            this.PrPa.TabIndex = 23;
            this.PrPa.Text = "0/0";
            this.PrPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPa
            // 
            this.MaPa.AutoSize = true;
            this.MaPa.Location = new System.Drawing.Point(256, 262);
            this.MaPa.Name = "MaPa";
            this.MaPa.Size = new System.Drawing.Size(24, 13);
            this.MaPa.TabIndex = 23;
            this.MaPa.Text = "0/0";
            this.MaPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPa
            // 
            this.WkPa.AutoSize = true;
            this.WkPa.Location = new System.Drawing.Point(256, 225);
            this.WkPa.Name = "WkPa";
            this.WkPa.Size = new System.Drawing.Size(24, 13);
            this.WkPa.TabIndex = 23;
            this.WkPa.Text = "0/0";
            this.WkPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPa
            // 
            this.DrPa.AutoSize = true;
            this.DrPa.Location = new System.Drawing.Point(256, 192);
            this.DrPa.Name = "DrPa";
            this.DrPa.Size = new System.Drawing.Size(24, 13);
            this.DrPa.TabIndex = 23;
            this.DrPa.Text = "0/0";
            this.DrPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPa
            // 
            this.HuPa.AutoSize = true;
            this.HuPa.Location = new System.Drawing.Point(256, 158);
            this.HuPa.Name = "HuPa";
            this.HuPa.Size = new System.Drawing.Size(24, 13);
            this.HuPa.TabIndex = 23;
            this.HuPa.Text = "0/0";
            this.HuPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPa
            // 
            this.PaPa.AutoSize = true;
            this.PaPa.Location = new System.Drawing.Point(256, 127);
            this.PaPa.Name = "PaPa";
            this.PaPa.Size = new System.Drawing.Size(24, 13);
            this.PaPa.TabIndex = 23;
            this.PaPa.Text = "0/0";
            this.PaPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShSh
            // 
            this.ShSh.AutoSize = true;
            this.ShSh.Location = new System.Drawing.Point(125, 65);
            this.ShSh.Name = "ShSh";
            this.ShSh.Size = new System.Drawing.Size(24, 13);
            this.ShSh.TabIndex = 19;
            this.ShSh.Text = "0/0";
            this.ShSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPa
            // 
            this.RoPa.AutoSize = true;
            this.RoPa.Location = new System.Drawing.Point(256, 95);
            this.RoPa.Name = "RoPa";
            this.RoPa.Size = new System.Drawing.Size(24, 13);
            this.RoPa.TabIndex = 23;
            this.RoPa.Text = "0/0";
            this.RoPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrHu
            // 
            this.PrHu.AutoSize = true;
            this.PrHu.Location = new System.Drawing.Point(321, 299);
            this.PrHu.Name = "PrHu";
            this.PrHu.Size = new System.Drawing.Size(24, 13);
            this.PrHu.TabIndex = 22;
            this.PrHu.Text = "0/0";
            this.PrHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaHu
            // 
            this.MaHu.AutoSize = true;
            this.MaHu.Location = new System.Drawing.Point(321, 262);
            this.MaHu.Name = "MaHu";
            this.MaHu.Size = new System.Drawing.Size(24, 13);
            this.MaHu.TabIndex = 22;
            this.MaHu.Text = "0/0";
            this.MaHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkHu
            // 
            this.WkHu.AutoSize = true;
            this.WkHu.Location = new System.Drawing.Point(321, 225);
            this.WkHu.Name = "WkHu";
            this.WkHu.Size = new System.Drawing.Size(24, 13);
            this.WkHu.TabIndex = 22;
            this.WkHu.Text = "0/0";
            this.WkHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrHu
            // 
            this.DrHu.AutoSize = true;
            this.DrHu.Location = new System.Drawing.Point(321, 192);
            this.DrHu.Name = "DrHu";
            this.DrHu.Size = new System.Drawing.Size(24, 13);
            this.DrHu.TabIndex = 22;
            this.DrHu.Text = "0/0";
            this.DrHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuHu
            // 
            this.HuHu.AutoSize = true;
            this.HuHu.Location = new System.Drawing.Point(321, 158);
            this.HuHu.Name = "HuHu";
            this.HuHu.Size = new System.Drawing.Size(24, 13);
            this.HuHu.TabIndex = 22;
            this.HuHu.Text = "0/0";
            this.HuHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaHu
            // 
            this.PaHu.AutoSize = true;
            this.PaHu.Location = new System.Drawing.Point(321, 127);
            this.PaHu.Name = "PaHu";
            this.PaHu.Size = new System.Drawing.Size(24, 13);
            this.PaHu.TabIndex = 22;
            this.PaHu.Text = "0/0";
            this.PaHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShRo
            // 
            this.ShRo.AutoSize = true;
            this.ShRo.Location = new System.Drawing.Point(191, 65);
            this.ShRo.Name = "ShRo";
            this.ShRo.Size = new System.Drawing.Size(24, 13);
            this.ShRo.TabIndex = 21;
            this.ShRo.Text = "0/0";
            this.ShRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoHu
            // 
            this.RoHu.AutoSize = true;
            this.RoHu.Location = new System.Drawing.Point(321, 95);
            this.RoHu.Name = "RoHu";
            this.RoHu.Size = new System.Drawing.Size(24, 13);
            this.RoHu.TabIndex = 22;
            this.RoHu.Text = "0/0";
            this.RoHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrDr
            // 
            this.PrDr.AutoSize = true;
            this.PrDr.Location = new System.Drawing.Point(384, 299);
            this.PrDr.Name = "PrDr";
            this.PrDr.Size = new System.Drawing.Size(24, 13);
            this.PrDr.TabIndex = 15;
            this.PrDr.Text = "0/0";
            this.PrDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaDr
            // 
            this.MaDr.AutoSize = true;
            this.MaDr.Location = new System.Drawing.Point(384, 262);
            this.MaDr.Name = "MaDr";
            this.MaDr.Size = new System.Drawing.Size(24, 13);
            this.MaDr.TabIndex = 15;
            this.MaDr.Text = "0/0";
            this.MaDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkDr
            // 
            this.WkDr.AutoSize = true;
            this.WkDr.Location = new System.Drawing.Point(384, 225);
            this.WkDr.Name = "WkDr";
            this.WkDr.Size = new System.Drawing.Size(24, 13);
            this.WkDr.TabIndex = 15;
            this.WkDr.Text = "0/0";
            this.WkDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrDr
            // 
            this.DrDr.AutoSize = true;
            this.DrDr.Location = new System.Drawing.Point(384, 192);
            this.DrDr.Name = "DrDr";
            this.DrDr.Size = new System.Drawing.Size(24, 13);
            this.DrDr.TabIndex = 15;
            this.DrDr.Text = "0/0";
            this.DrDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuDr
            // 
            this.HuDr.AutoSize = true;
            this.HuDr.Location = new System.Drawing.Point(384, 158);
            this.HuDr.Name = "HuDr";
            this.HuDr.Size = new System.Drawing.Size(24, 13);
            this.HuDr.TabIndex = 15;
            this.HuDr.Text = "0/0";
            this.HuDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaDr
            // 
            this.PaDr.AutoSize = true;
            this.PaDr.Location = new System.Drawing.Point(384, 127);
            this.PaDr.Name = "PaDr";
            this.PaDr.Size = new System.Drawing.Size(24, 13);
            this.PaDr.TabIndex = 15;
            this.PaDr.Text = "0/0";
            this.PaDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPa
            // 
            this.ShPa.AutoSize = true;
            this.ShPa.Location = new System.Drawing.Point(256, 65);
            this.ShPa.Name = "ShPa";
            this.ShPa.Size = new System.Drawing.Size(24, 13);
            this.ShPa.TabIndex = 23;
            this.ShPa.Text = "0/0";
            this.ShPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrWk
            // 
            this.PrWk.AutoSize = true;
            this.PrWk.Location = new System.Drawing.Point(448, 299);
            this.PrWk.Name = "PrWk";
            this.PrWk.Size = new System.Drawing.Size(24, 13);
            this.PrWk.TabIndex = 14;
            this.PrWk.Text = "0/0";
            this.PrWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWk
            // 
            this.MaWk.AutoSize = true;
            this.MaWk.Location = new System.Drawing.Point(448, 262);
            this.MaWk.Name = "MaWk";
            this.MaWk.Size = new System.Drawing.Size(24, 13);
            this.MaWk.TabIndex = 14;
            this.MaWk.Text = "0/0";
            this.MaWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWk
            // 
            this.WkWk.AutoSize = true;
            this.WkWk.Location = new System.Drawing.Point(448, 225);
            this.WkWk.Name = "WkWk";
            this.WkWk.Size = new System.Drawing.Size(24, 13);
            this.WkWk.TabIndex = 14;
            this.WkWk.Text = "0/0";
            this.WkWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWk
            // 
            this.DrWk.AutoSize = true;
            this.DrWk.Location = new System.Drawing.Point(448, 192);
            this.DrWk.Name = "DrWk";
            this.DrWk.Size = new System.Drawing.Size(24, 13);
            this.DrWk.TabIndex = 14;
            this.DrWk.Text = "0/0";
            this.DrWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWk
            // 
            this.HuWk.AutoSize = true;
            this.HuWk.Location = new System.Drawing.Point(448, 158);
            this.HuWk.Name = "HuWk";
            this.HuWk.Size = new System.Drawing.Size(24, 13);
            this.HuWk.TabIndex = 14;
            this.HuWk.Text = "0/0";
            this.HuWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrMa
            // 
            this.PrMa.AutoSize = true;
            this.PrMa.Location = new System.Drawing.Point(517, 299);
            this.PrMa.Name = "PrMa";
            this.PrMa.Size = new System.Drawing.Size(24, 13);
            this.PrMa.TabIndex = 16;
            this.PrMa.Text = "0/0";
            this.PrMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaMa
            // 
            this.MaMa.AutoSize = true;
            this.MaMa.Location = new System.Drawing.Point(517, 262);
            this.MaMa.Name = "MaMa";
            this.MaMa.Size = new System.Drawing.Size(24, 13);
            this.MaMa.TabIndex = 16;
            this.MaMa.Text = "0/0";
            this.MaMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoDr
            // 
            this.RoDr.AutoSize = true;
            this.RoDr.Location = new System.Drawing.Point(384, 95);
            this.RoDr.Name = "RoDr";
            this.RoDr.Size = new System.Drawing.Size(24, 13);
            this.RoDr.TabIndex = 15;
            this.RoDr.Text = "0/0";
            this.RoDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkMa
            // 
            this.WkMa.AutoSize = true;
            this.WkMa.Location = new System.Drawing.Point(517, 225);
            this.WkMa.Name = "WkMa";
            this.WkMa.Size = new System.Drawing.Size(24, 13);
            this.WkMa.TabIndex = 16;
            this.WkMa.Text = "0/0";
            this.WkMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWk
            // 
            this.PaWk.AutoSize = true;
            this.PaWk.Location = new System.Drawing.Point(448, 127);
            this.PaWk.Name = "PaWk";
            this.PaWk.Size = new System.Drawing.Size(24, 13);
            this.PaWk.TabIndex = 14;
            this.PaWk.Text = "0/0";
            this.PaWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrMa
            // 
            this.DrMa.AutoSize = true;
            this.DrMa.Location = new System.Drawing.Point(517, 192);
            this.DrMa.Name = "DrMa";
            this.DrMa.Size = new System.Drawing.Size(24, 13);
            this.DrMa.TabIndex = 16;
            this.DrMa.Text = "0/0";
            this.DrMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShHu
            // 
            this.ShHu.AutoSize = true;
            this.ShHu.Location = new System.Drawing.Point(321, 65);
            this.ShHu.Name = "ShHu";
            this.ShHu.Size = new System.Drawing.Size(24, 13);
            this.ShHu.TabIndex = 22;
            this.ShHu.Text = "0/0";
            this.ShHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuMa
            // 
            this.HuMa.AutoSize = true;
            this.HuMa.Location = new System.Drawing.Point(517, 158);
            this.HuMa.Name = "HuMa";
            this.HuMa.Size = new System.Drawing.Size(24, 13);
            this.HuMa.TabIndex = 16;
            this.HuMa.Text = "0/0";
            this.HuMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPr
            // 
            this.PrPr.AutoSize = true;
            this.PrPr.Location = new System.Drawing.Point(580, 299);
            this.PrPr.Name = "PrPr";
            this.PrPr.Size = new System.Drawing.Size(24, 13);
            this.PrPr.TabIndex = 18;
            this.PrPr.Text = "0/0";
            this.PrPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPr
            // 
            this.MaPr.AutoSize = true;
            this.MaPr.Location = new System.Drawing.Point(580, 262);
            this.MaPr.Name = "MaPr";
            this.MaPr.Size = new System.Drawing.Size(24, 13);
            this.MaPr.TabIndex = 18;
            this.MaPr.Text = "0/0";
            this.MaPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWk
            // 
            this.RoWk.AutoSize = true;
            this.RoWk.Location = new System.Drawing.Point(448, 95);
            this.RoWk.Name = "RoWk";
            this.RoWk.Size = new System.Drawing.Size(24, 13);
            this.RoWk.TabIndex = 14;
            this.RoWk.Text = "0/0";
            this.RoWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPr
            // 
            this.WkPr.AutoSize = true;
            this.WkPr.Location = new System.Drawing.Point(580, 225);
            this.WkPr.Name = "WkPr";
            this.WkPr.Size = new System.Drawing.Size(24, 13);
            this.WkPr.TabIndex = 18;
            this.WkPr.Text = "0/0";
            this.WkPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaMa
            // 
            this.PaMa.AutoSize = true;
            this.PaMa.Location = new System.Drawing.Point(517, 127);
            this.PaMa.Name = "PaMa";
            this.PaMa.Size = new System.Drawing.Size(24, 13);
            this.PaMa.TabIndex = 16;
            this.PaMa.Text = "0/0";
            this.PaMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPr
            // 
            this.DrPr.AutoSize = true;
            this.DrPr.Location = new System.Drawing.Point(580, 192);
            this.DrPr.Name = "DrPr";
            this.DrPr.Size = new System.Drawing.Size(24, 13);
            this.DrPr.TabIndex = 18;
            this.DrPr.Text = "0/0";
            this.DrPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShDr
            // 
            this.ShDr.AutoSize = true;
            this.ShDr.Location = new System.Drawing.Point(384, 65);
            this.ShDr.Name = "ShDr";
            this.ShDr.Size = new System.Drawing.Size(24, 13);
            this.ShDr.TabIndex = 15;
            this.ShDr.Text = "0/0";
            this.ShDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPr
            // 
            this.HuPr.AutoSize = true;
            this.HuPr.Location = new System.Drawing.Point(580, 158);
            this.HuPr.Name = "HuPr";
            this.HuPr.Size = new System.Drawing.Size(24, 13);
            this.HuPr.TabIndex = 18;
            this.HuPr.Text = "0/0";
            this.HuPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoMa
            // 
            this.RoMa.AutoSize = true;
            this.RoMa.Location = new System.Drawing.Point(517, 95);
            this.RoMa.Name = "RoMa";
            this.RoMa.Size = new System.Drawing.Size(24, 13);
            this.RoMa.TabIndex = 16;
            this.RoMa.Text = "0/0";
            this.RoMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPr
            // 
            this.PaPr.AutoSize = true;
            this.PaPr.Location = new System.Drawing.Point(580, 127);
            this.PaPr.Name = "PaPr";
            this.PaPr.Size = new System.Drawing.Size(24, 13);
            this.PaPr.TabIndex = 18;
            this.PaPr.Text = "0/0";
            this.PaPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWk
            // 
            this.ShWk.AutoSize = true;
            this.ShWk.Location = new System.Drawing.Point(448, 65);
            this.ShWk.Name = "ShWk";
            this.ShWk.Size = new System.Drawing.Size(24, 13);
            this.ShWk.TabIndex = 14;
            this.ShWk.Text = "0/0";
            this.ShWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPr
            // 
            this.RoPr.AutoSize = true;
            this.RoPr.Location = new System.Drawing.Point(580, 95);
            this.RoPr.Name = "RoPr";
            this.RoPr.Size = new System.Drawing.Size(24, 13);
            this.RoPr.TabIndex = 18;
            this.RoPr.Text = "0/0";
            this.RoPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShMa
            // 
            this.ShMa.AutoSize = true;
            this.ShMa.Location = new System.Drawing.Point(517, 65);
            this.ShMa.Name = "ShMa";
            this.ShMa.Size = new System.Drawing.Size(24, 13);
            this.ShMa.TabIndex = 16;
            this.ShMa.Text = "0/0";
            this.ShMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPr
            // 
            this.ShPr.AutoSize = true;
            this.ShPr.Location = new System.Drawing.Point(580, 65);
            this.ShPr.Name = "ShPr";
            this.ShPr.Size = new System.Drawing.Size(24, 13);
            this.ShPr.TabIndex = 18;
            this.ShPr.Text = "0/0";
            this.ShPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // ToTo
            // 
            this.ToTo.AutoSize = true;
            this.ToTo.Location = new System.Drawing.Point(646, 333);
            this.ToTo.Name = "ToTo";
            this.ToTo.Size = new System.Drawing.Size(24, 13);
            this.ToTo.TabIndex = 17;
            this.ToTo.Text = "0/0";
            // 
            // PrTo
            // 
            this.PrTo.AutoSize = true;
            this.PrTo.Location = new System.Drawing.Point(646, 299);
            this.PrTo.Name = "PrTo";
            this.PrTo.Size = new System.Drawing.Size(24, 13);
            this.PrTo.TabIndex = 17;
            this.PrTo.Text = "0/0";
            // 
            // MaTo
            // 
            this.MaTo.AutoSize = true;
            this.MaTo.Location = new System.Drawing.Point(646, 262);
            this.MaTo.Name = "MaTo";
            this.MaTo.Size = new System.Drawing.Size(24, 13);
            this.MaTo.TabIndex = 17;
            this.MaTo.Text = "0/0";
            // 
            // PaTo
            // 
            this.PaTo.AutoSize = true;
            this.PaTo.Location = new System.Drawing.Point(646, 127);
            this.PaTo.Name = "PaTo";
            this.PaTo.Size = new System.Drawing.Size(24, 13);
            this.PaTo.TabIndex = 17;
            this.PaTo.Text = "0/0";
            // 
            // WkTo
            // 
            this.WkTo.AutoSize = true;
            this.WkTo.Location = new System.Drawing.Point(646, 225);
            this.WkTo.Name = "WkTo";
            this.WkTo.Size = new System.Drawing.Size(24, 13);
            this.WkTo.TabIndex = 17;
            this.WkTo.Text = "0/0";
            // 
            // RoTo
            // 
            this.RoTo.AutoSize = true;
            this.RoTo.Location = new System.Drawing.Point(646, 95);
            this.RoTo.Name = "RoTo";
            this.RoTo.Size = new System.Drawing.Size(24, 13);
            this.RoTo.TabIndex = 17;
            this.RoTo.Text = "0/0";
            // 
            // DrTo
            // 
            this.DrTo.AutoSize = true;
            this.DrTo.Location = new System.Drawing.Point(646, 192);
            this.DrTo.Name = "DrTo";
            this.DrTo.Size = new System.Drawing.Size(24, 13);
            this.DrTo.TabIndex = 17;
            this.DrTo.Text = "0/0";
            // 
            // ShTo
            // 
            this.ShTo.AutoSize = true;
            this.ShTo.Location = new System.Drawing.Point(646, 65);
            this.ShTo.Name = "ShTo";
            this.ShTo.Size = new System.Drawing.Size(24, 13);
            this.ShTo.TabIndex = 17;
            this.ShTo.Text = "0/0";
            // 
            // WaWa
            // 
            this.WaWa.AutoSize = true;
            this.WaWa.Location = new System.Drawing.Point(66, 34);
            this.WaWa.Name = "WaWa";
            this.WaWa.Size = new System.Drawing.Size(30, 17);
            this.WaWa.TabIndex = 12;
            this.WaWa.Text = "0/0";
            this.WaWa.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaSh
            // 
            this.WaSh.AutoSize = true;
            this.WaSh.Location = new System.Drawing.Point(125, 34);
            this.WaSh.Name = "WaSh";
            this.WaSh.Size = new System.Drawing.Size(24, 13);
            this.WaSh.TabIndex = 12;
            this.WaSh.Text = "0/0";
            this.WaSh.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaRo
            // 
            this.WaRo.AutoSize = true;
            this.WaRo.Location = new System.Drawing.Point(191, 34);
            this.WaRo.Name = "WaRo";
            this.WaRo.Size = new System.Drawing.Size(24, 13);
            this.WaRo.TabIndex = 12;
            this.WaRo.Text = "0/0";
            this.WaRo.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaPa
            // 
            this.WaPa.AutoSize = true;
            this.WaPa.Location = new System.Drawing.Point(256, 34);
            this.WaPa.Name = "WaPa";
            this.WaPa.Size = new System.Drawing.Size(24, 13);
            this.WaPa.TabIndex = 12;
            this.WaPa.Text = "0/0";
            this.WaPa.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaHu
            // 
            this.WaHu.AutoSize = true;
            this.WaHu.Location = new System.Drawing.Point(321, 34);
            this.WaHu.Name = "WaHu";
            this.WaHu.Size = new System.Drawing.Size(24, 13);
            this.WaHu.TabIndex = 12;
            this.WaHu.Text = "0/0";
            this.WaHu.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaDr
            // 
            this.WaDr.AutoSize = true;
            this.WaDr.Location = new System.Drawing.Point(384, 34);
            this.WaDr.Name = "WaDr";
            this.WaDr.Size = new System.Drawing.Size(24, 13);
            this.WaDr.TabIndex = 12;
            this.WaDr.Text = "0/0";
            this.WaDr.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaWk
            // 
            this.WaWk.AutoSize = true;
            this.WaWk.Location = new System.Drawing.Point(448, 34);
            this.WaWk.Name = "WaWk";
            this.WaWk.Size = new System.Drawing.Size(24, 13);
            this.WaWk.TabIndex = 12;
            this.WaWk.Text = "0/0";
            this.WaWk.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaMa
            // 
            this.WaMa.AutoSize = true;
            this.WaMa.Location = new System.Drawing.Point(517, 34);
            this.WaMa.Name = "WaMa";
            this.WaMa.Size = new System.Drawing.Size(24, 13);
            this.WaMa.TabIndex = 12;
            this.WaMa.Text = "0/0";
            this.WaMa.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuTo
            // 
            this.HuTo.AutoSize = true;
            this.HuTo.Location = new System.Drawing.Point(646, 161);
            this.HuTo.Name = "HuTo";
            this.HuTo.Size = new System.Drawing.Size(24, 13);
            this.HuTo.TabIndex = 12;
            this.HuTo.Text = "0/0";
            // 
            // WaPr
            // 
            this.WaPr.AutoSize = true;
            this.WaPr.Location = new System.Drawing.Point(580, 34);
            this.WaPr.Name = "WaPr";
            this.WaPr.Size = new System.Drawing.Size(24, 13);
            this.WaPr.TabIndex = 12;
            this.WaPr.Text = "0/0";
            this.WaPr.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaTo
            // 
            this.WaTo.AutoSize = true;
            this.WaTo.Location = new System.Drawing.Point(646, 34);
            this.WaTo.Name = "WaTo";
            this.WaTo.Size = new System.Drawing.Size(24, 13);
            this.WaTo.TabIndex = 12;
            this.WaTo.Text = "0/0";
            // 
            // TotalLabel1
            // 
            this.TotalLabel1.AutoSize = true;
            this.TotalLabel1.Location = new System.Drawing.Point(642, 7);
            this.TotalLabel1.Name = "TotalLabel1";
            this.TotalLabel1.Size = new System.Drawing.Size(31, 13);
            this.TotalLabel1.TabIndex = 2;
            this.TotalLabel1.Text = "Total";
            // 
            // DruidLabel1
            // 
            this.DruidLabel1.AutoSize = true;
            this.DruidLabel1.Location = new System.Drawing.Point(576, 7);
            this.DruidLabel1.Name = "DruidLabel1";
            this.DruidLabel1.Size = new System.Drawing.Size(33, 13);
            this.DruidLabel1.TabIndex = 2;
            this.DruidLabel1.Text = "Priest";
            // 
            // WarlockLabel1
            // 
            this.WarlockLabel1.AutoSize = true;
            this.WarlockLabel1.Location = new System.Drawing.Point(512, 7);
            this.WarlockLabel1.Name = "WarlockLabel1";
            this.WarlockLabel1.Size = new System.Drawing.Size(34, 13);
            this.WarlockLabel1.TabIndex = 2;
            this.WarlockLabel1.Text = "Mage";
            // 
            // MageLabel1
            // 
            this.MageLabel1.AutoSize = true;
            this.MageLabel1.Location = new System.Drawing.Point(438, 7);
            this.MageLabel1.Name = "MageLabel1";
            this.MageLabel1.Size = new System.Drawing.Size(47, 13);
            this.MageLabel1.TabIndex = 2;
            this.MageLabel1.Text = "Warlock";
            // 
            // PriestLabel1
            // 
            this.PriestLabel1.AutoSize = true;
            this.PriestLabel1.Location = new System.Drawing.Point(380, 7);
            this.PriestLabel1.Name = "PriestLabel1";
            this.PriestLabel1.Size = new System.Drawing.Size(32, 13);
            this.PriestLabel1.TabIndex = 2;
            this.PriestLabel1.Text = "Druid";
            // 
            // HunterLabel1
            // 
            this.HunterLabel1.AutoSize = true;
            this.HunterLabel1.Location = new System.Drawing.Point(315, 7);
            this.HunterLabel1.Name = "HunterLabel1";
            this.HunterLabel1.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel1.TabIndex = 2;
            this.HunterLabel1.Text = "Hunter";
            // 
            // PaladinLabel1
            // 
            this.PaladinLabel1.AutoSize = true;
            this.PaladinLabel1.Location = new System.Drawing.Point(247, 7);
            this.PaladinLabel1.Name = "PaladinLabel1";
            this.PaladinLabel1.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel1.TabIndex = 2;
            this.PaladinLabel1.Text = "Paladin";
            // 
            // RogueLabel1
            // 
            this.RogueLabel1.AutoSize = true;
            this.RogueLabel1.Location = new System.Drawing.Point(184, 7);
            this.RogueLabel1.Name = "RogueLabel1";
            this.RogueLabel1.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel1.TabIndex = 2;
            this.RogueLabel1.Text = "Rogue";
            // 
            // ShamanLabel1
            // 
            this.ShamanLabel1.AutoSize = true;
            this.ShamanLabel1.Location = new System.Drawing.Point(114, 7);
            this.ShamanLabel1.Name = "ShamanLabel1";
            this.ShamanLabel1.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel1.TabIndex = 1;
            this.ShamanLabel1.Text = "Shaman";
            // 
            // WarriorLabel2
            // 
            this.WarriorLabel2.AutoSize = true;
            this.WarriorLabel2.Location = new System.Drawing.Point(6, 34);
            this.WarriorLabel2.Name = "WarriorLabel2";
            this.WarriorLabel2.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel2.TabIndex = 0;
            this.WarriorLabel2.Text = "Warrior";
            // 
            // WarriorLabel1
            // 
            this.WarriorLabel1.AutoSize = true;
            this.WarriorLabel1.Location = new System.Drawing.Point(53, 7);
            this.WarriorLabel1.Name = "WarriorLabel1";
            this.WarriorLabel1.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel1.TabIndex = 0;
            this.WarriorLabel1.Text = "Warrior";
            // 
            // TotalLabel2
            // 
            this.TotalLabel2.AutoSize = true;
            this.TotalLabel2.Location = new System.Drawing.Point(575, 333);
            this.TotalLabel2.Name = "TotalLabel2";
            this.TotalLabel2.Size = new System.Drawing.Size(34, 13);
            this.TotalLabel2.TabIndex = 24;
            this.TotalLabel2.Text = "Total:";
            // 
            // PriestLabel2
            // 
            this.PriestLabel2.AutoSize = true;
            this.PriestLabel2.Location = new System.Drawing.Point(6, 299);
            this.PriestLabel2.Name = "PriestLabel2";
            this.PriestLabel2.Size = new System.Drawing.Size(33, 13);
            this.PriestLabel2.TabIndex = 13;
            this.PriestLabel2.Text = "Priest";
            // 
            // MageLabel2
            // 
            this.MageLabel2.AutoSize = true;
            this.MageLabel2.Location = new System.Drawing.Point(6, 262);
            this.MageLabel2.Name = "MageLabel2";
            this.MageLabel2.Size = new System.Drawing.Size(34, 13);
            this.MageLabel2.TabIndex = 13;
            this.MageLabel2.Text = "Mage";
            // 
            // HunterLabel2
            // 
            this.HunterLabel2.AutoSize = true;
            this.HunterLabel2.Location = new System.Drawing.Point(6, 158);
            this.HunterLabel2.Name = "HunterLabel2";
            this.HunterLabel2.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel2.TabIndex = 0;
            this.HunterLabel2.Text = "Hunter";
            // 
            // WarlockLabel2
            // 
            this.WarlockLabel2.AutoSize = true;
            this.WarlockLabel2.Location = new System.Drawing.Point(6, 225);
            this.WarlockLabel2.Name = "WarlockLabel2";
            this.WarlockLabel2.Size = new System.Drawing.Size(47, 13);
            this.WarlockLabel2.TabIndex = 13;
            this.WarlockLabel2.Text = "Warlock";
            // 
            // PaladinLabel2
            // 
            this.PaladinLabel2.AutoSize = true;
            this.PaladinLabel2.Location = new System.Drawing.Point(6, 127);
            this.PaladinLabel2.Name = "PaladinLabel2";
            this.PaladinLabel2.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel2.TabIndex = 13;
            this.PaladinLabel2.Text = "Paladin";
            // 
            // DruidLabel2
            // 
            this.DruidLabel2.AutoSize = true;
            this.DruidLabel2.Location = new System.Drawing.Point(6, 192);
            this.DruidLabel2.Name = "DruidLabel2";
            this.DruidLabel2.Size = new System.Drawing.Size(32, 13);
            this.DruidLabel2.TabIndex = 13;
            this.DruidLabel2.Text = "Druid";
            // 
            // RogueLabel2
            // 
            this.RogueLabel2.AutoSize = true;
            this.RogueLabel2.Location = new System.Drawing.Point(6, 95);
            this.RogueLabel2.Name = "RogueLabel2";
            this.RogueLabel2.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel2.TabIndex = 13;
            this.RogueLabel2.Text = "Rogue";
            // 
            // ShamanLabel2
            // 
            this.ShamanLabel2.AutoSize = true;
            this.ShamanLabel2.Location = new System.Drawing.Point(6, 65);
            this.ShamanLabel2.Name = "ShamanLabel2";
            this.ShamanLabel2.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel2.TabIndex = 13;
            this.ShamanLabel2.Text = "Shaman";
            // 
            // RankedTab
            // 
            this.RankedTab.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(226)))), ((int)(((byte)(242)))), ((int)(((byte)(228)))));
            this.RankedTab.Controls.Add(this.PrWa3);
            this.RankedTab.Controls.Add(this.MaWa3);
            this.RankedTab.Controls.Add(this.WkWa3);
            this.RankedTab.Controls.Add(this.DrWa3);
            this.RankedTab.Controls.Add(this.HuWa3);
            this.RankedTab.Controls.Add(this.PaWa3);
            this.RankedTab.Controls.Add(this.PrSh3);
            this.RankedTab.Controls.Add(this.MaSh3);
            this.RankedTab.Controls.Add(this.WkSh3);
            this.RankedTab.Controls.Add(this.DrSh3);
            this.RankedTab.Controls.Add(this.HuSh3);
            this.RankedTab.Controls.Add(this.PaSh3);
            this.RankedTab.Controls.Add(this.RoWa3);
            this.RankedTab.Controls.Add(this.RoSh3);
            this.RankedTab.Controls.Add(this.PrRo3);
            this.RankedTab.Controls.Add(this.MaRo3);
            this.RankedTab.Controls.Add(this.WkRo3);
            this.RankedTab.Controls.Add(this.DrRo3);
            this.RankedTab.Controls.Add(this.HuRo3);
            this.RankedTab.Controls.Add(this.PaRo3);
            this.RankedTab.Controls.Add(this.ShWa3);
            this.RankedTab.Controls.Add(this.RoRo3);
            this.RankedTab.Controls.Add(this.PrPa3);
            this.RankedTab.Controls.Add(this.MaPa3);
            this.RankedTab.Controls.Add(this.WkPa3);
            this.RankedTab.Controls.Add(this.DrPa3);
            this.RankedTab.Controls.Add(this.HuPa3);
            this.RankedTab.Controls.Add(this.PaPa3);
            this.RankedTab.Controls.Add(this.ShSh3);
            this.RankedTab.Controls.Add(this.RoPa3);
            this.RankedTab.Controls.Add(this.PrHu3);
            this.RankedTab.Controls.Add(this.MaHu3);
            this.RankedTab.Controls.Add(this.WkHu3);
            this.RankedTab.Controls.Add(this.DrHu3);
            this.RankedTab.Controls.Add(this.HuHu3);
            this.RankedTab.Controls.Add(this.PaHu3);
            this.RankedTab.Controls.Add(this.ShRo3);
            this.RankedTab.Controls.Add(this.RoHu3);
            this.RankedTab.Controls.Add(this.PrDr3);
            this.RankedTab.Controls.Add(this.MaDr3);
            this.RankedTab.Controls.Add(this.WkDr3);
            this.RankedTab.Controls.Add(this.DrDr3);
            this.RankedTab.Controls.Add(this.HuDr3);
            this.RankedTab.Controls.Add(this.PaDr3);
            this.RankedTab.Controls.Add(this.ShPa3);
            this.RankedTab.Controls.Add(this.PrWk3);
            this.RankedTab.Controls.Add(this.MaWk3);
            this.RankedTab.Controls.Add(this.WkWk3);
            this.RankedTab.Controls.Add(this.DrWk3);
            this.RankedTab.Controls.Add(this.HuWk3);
            this.RankedTab.Controls.Add(this.PrMa3);
            this.RankedTab.Controls.Add(this.MaMa3);
            this.RankedTab.Controls.Add(this.RoDr3);
            this.RankedTab.Controls.Add(this.WkMa3);
            this.RankedTab.Controls.Add(this.PaWk3);
            this.RankedTab.Controls.Add(this.DrMa3);
            this.RankedTab.Controls.Add(this.ShHu3);
            this.RankedTab.Controls.Add(this.HuMa3);
            this.RankedTab.Controls.Add(this.PrPr3);
            this.RankedTab.Controls.Add(this.MaPr3);
            this.RankedTab.Controls.Add(this.RoWk3);
            this.RankedTab.Controls.Add(this.WkPr3);
            this.RankedTab.Controls.Add(this.PaMa3);
            this.RankedTab.Controls.Add(this.DrPr3);
            this.RankedTab.Controls.Add(this.ShDr3);
            this.RankedTab.Controls.Add(this.HuPr3);
            this.RankedTab.Controls.Add(this.RoMa3);
            this.RankedTab.Controls.Add(this.PaPr3);
            this.RankedTab.Controls.Add(this.ShWk3);
            this.RankedTab.Controls.Add(this.RoPr3);
            this.RankedTab.Controls.Add(this.ShMa3);
            this.RankedTab.Controls.Add(this.ShPr3);
            this.RankedTab.Controls.Add(this.ToTo3);
            this.RankedTab.Controls.Add(this.PrTo3);
            this.RankedTab.Controls.Add(this.MaTo3);
            this.RankedTab.Controls.Add(this.PaTo3);
            this.RankedTab.Controls.Add(this.WkTo3);
            this.RankedTab.Controls.Add(this.RoTo3);
            this.RankedTab.Controls.Add(this.DrTo3);
            this.RankedTab.Controls.Add(this.ShTo3);
            this.RankedTab.Controls.Add(this.WaWa3);
            this.RankedTab.Controls.Add(this.WaSh3);
            this.RankedTab.Controls.Add(this.WaRo3);
            this.RankedTab.Controls.Add(this.WaPa3);
            this.RankedTab.Controls.Add(this.WaHu3);
            this.RankedTab.Controls.Add(this.WaDr3);
            this.RankedTab.Controls.Add(this.WaWk3);
            this.RankedTab.Controls.Add(this.WaMa3);
            this.RankedTab.Controls.Add(this.HuTo3);
            this.RankedTab.Controls.Add(this.WaPr3);
            this.RankedTab.Controls.Add(this.WaTo3);
            this.RankedTab.Controls.Add(this.TotalLabel5);
            this.RankedTab.Controls.Add(this.DruidLabel5);
            this.RankedTab.Controls.Add(this.WarlockLabel5);
            this.RankedTab.Controls.Add(this.MageLabel5);
            this.RankedTab.Controls.Add(this.PriestLabel5);
            this.RankedTab.Controls.Add(this.HunterLabel5);
            this.RankedTab.Controls.Add(this.PaladinLabel5);
            this.RankedTab.Controls.Add(this.RogueLabel5);
            this.RankedTab.Controls.Add(this.ShamanLabel5);
            this.RankedTab.Controls.Add(this.WarriorLabel5);
            this.RankedTab.Controls.Add(this.WarriorLabel6);
            this.RankedTab.Controls.Add(this.HunterLabel6);
            this.RankedTab.Controls.Add(this.TotalLabel6);
            this.RankedTab.Controls.Add(this.PriestLabel6);
            this.RankedTab.Controls.Add(this.MageLabel6);
            this.RankedTab.Controls.Add(this.WarlockLabel6);
            this.RankedTab.Controls.Add(this.PaladinLabel6);
            this.RankedTab.Controls.Add(this.DruidLabel6);
            this.RankedTab.Controls.Add(this.RogueLabel6);
            this.RankedTab.Controls.Add(this.ShamanLabel6);
            this.RankedTab.Location = new System.Drawing.Point(4, 22);
            this.RankedTab.Name = "RankedTab";
            this.RankedTab.Padding = new System.Windows.Forms.Padding(3);
            this.RankedTab.Size = new System.Drawing.Size(698, 360);
            this.RankedTab.TabIndex = 1;
            this.RankedTab.Text = "Ranked";
            // 
            // PrWa3
            // 
            this.PrWa3.AutoSize = true;
            this.PrWa3.Location = new System.Drawing.Point(66, 299);
            this.PrWa3.Name = "PrWa3";
            this.PrWa3.Size = new System.Drawing.Size(24, 13);
            this.PrWa3.TabIndex = 20;
            this.PrWa3.Text = "0/0";
            this.PrWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWa3
            // 
            this.MaWa3.AutoSize = true;
            this.MaWa3.Location = new System.Drawing.Point(66, 262);
            this.MaWa3.Name = "MaWa3";
            this.MaWa3.Size = new System.Drawing.Size(24, 13);
            this.MaWa3.TabIndex = 20;
            this.MaWa3.Text = "0/0";
            this.MaWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWa3
            // 
            this.WkWa3.AutoSize = true;
            this.WkWa3.Location = new System.Drawing.Point(66, 225);
            this.WkWa3.Name = "WkWa3";
            this.WkWa3.Size = new System.Drawing.Size(24, 13);
            this.WkWa3.TabIndex = 20;
            this.WkWa3.Text = "0/0";
            this.WkWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWa3
            // 
            this.DrWa3.AutoSize = true;
            this.DrWa3.Location = new System.Drawing.Point(66, 192);
            this.DrWa3.Name = "DrWa3";
            this.DrWa3.Size = new System.Drawing.Size(24, 13);
            this.DrWa3.TabIndex = 20;
            this.DrWa3.Text = "0/0";
            this.DrWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWa3
            // 
            this.HuWa3.AutoSize = true;
            this.HuWa3.Location = new System.Drawing.Point(66, 158);
            this.HuWa3.Name = "HuWa3";
            this.HuWa3.Size = new System.Drawing.Size(24, 13);
            this.HuWa3.TabIndex = 20;
            this.HuWa3.Text = "0/0";
            this.HuWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWa3
            // 
            this.PaWa3.AutoSize = true;
            this.PaWa3.Location = new System.Drawing.Point(66, 127);
            this.PaWa3.Name = "PaWa3";
            this.PaWa3.Size = new System.Drawing.Size(24, 13);
            this.PaWa3.TabIndex = 20;
            this.PaWa3.Text = "0/0";
            this.PaWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrSh3
            // 
            this.PrSh3.AutoSize = true;
            this.PrSh3.Location = new System.Drawing.Point(125, 299);
            this.PrSh3.Name = "PrSh3";
            this.PrSh3.Size = new System.Drawing.Size(24, 13);
            this.PrSh3.TabIndex = 19;
            this.PrSh3.Text = "0/0";
            this.PrSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaSh3
            // 
            this.MaSh3.AutoSize = true;
            this.MaSh3.Location = new System.Drawing.Point(125, 262);
            this.MaSh3.Name = "MaSh3";
            this.MaSh3.Size = new System.Drawing.Size(24, 13);
            this.MaSh3.TabIndex = 19;
            this.MaSh3.Text = "0/0";
            this.MaSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkSh3
            // 
            this.WkSh3.AutoSize = true;
            this.WkSh3.Location = new System.Drawing.Point(125, 225);
            this.WkSh3.Name = "WkSh3";
            this.WkSh3.Size = new System.Drawing.Size(24, 13);
            this.WkSh3.TabIndex = 19;
            this.WkSh3.Text = "0/0";
            this.WkSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrSh3
            // 
            this.DrSh3.AutoSize = true;
            this.DrSh3.Location = new System.Drawing.Point(125, 192);
            this.DrSh3.Name = "DrSh3";
            this.DrSh3.Size = new System.Drawing.Size(24, 13);
            this.DrSh3.TabIndex = 19;
            this.DrSh3.Text = "0/0";
            this.DrSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuSh3
            // 
            this.HuSh3.AutoSize = true;
            this.HuSh3.Location = new System.Drawing.Point(125, 158);
            this.HuSh3.Name = "HuSh3";
            this.HuSh3.Size = new System.Drawing.Size(24, 13);
            this.HuSh3.TabIndex = 19;
            this.HuSh3.Text = "0/0";
            this.HuSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaSh3
            // 
            this.PaSh3.AutoSize = true;
            this.PaSh3.Location = new System.Drawing.Point(125, 127);
            this.PaSh3.Name = "PaSh3";
            this.PaSh3.Size = new System.Drawing.Size(24, 13);
            this.PaSh3.TabIndex = 19;
            this.PaSh3.Text = "0/0";
            this.PaSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWa3
            // 
            this.RoWa3.AutoSize = true;
            this.RoWa3.Location = new System.Drawing.Point(66, 95);
            this.RoWa3.Name = "RoWa3";
            this.RoWa3.Size = new System.Drawing.Size(24, 13);
            this.RoWa3.TabIndex = 20;
            this.RoWa3.Text = "0/0";
            this.RoWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoSh3
            // 
            this.RoSh3.AutoSize = true;
            this.RoSh3.Location = new System.Drawing.Point(125, 95);
            this.RoSh3.Name = "RoSh3";
            this.RoSh3.Size = new System.Drawing.Size(24, 13);
            this.RoSh3.TabIndex = 19;
            this.RoSh3.Text = "0/0";
            this.RoSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrRo3
            // 
            this.PrRo3.AutoSize = true;
            this.PrRo3.Location = new System.Drawing.Point(191, 299);
            this.PrRo3.Name = "PrRo3";
            this.PrRo3.Size = new System.Drawing.Size(24, 13);
            this.PrRo3.TabIndex = 21;
            this.PrRo3.Text = "0/0";
            this.PrRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaRo3
            // 
            this.MaRo3.AutoSize = true;
            this.MaRo3.Location = new System.Drawing.Point(191, 262);
            this.MaRo3.Name = "MaRo3";
            this.MaRo3.Size = new System.Drawing.Size(24, 13);
            this.MaRo3.TabIndex = 21;
            this.MaRo3.Text = "0/0";
            this.MaRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkRo3
            // 
            this.WkRo3.AutoSize = true;
            this.WkRo3.Location = new System.Drawing.Point(191, 225);
            this.WkRo3.Name = "WkRo3";
            this.WkRo3.Size = new System.Drawing.Size(24, 13);
            this.WkRo3.TabIndex = 21;
            this.WkRo3.Text = "0/0";
            this.WkRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrRo3
            // 
            this.DrRo3.AutoSize = true;
            this.DrRo3.Location = new System.Drawing.Point(191, 192);
            this.DrRo3.Name = "DrRo3";
            this.DrRo3.Size = new System.Drawing.Size(24, 13);
            this.DrRo3.TabIndex = 21;
            this.DrRo3.Text = "0/0";
            this.DrRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuRo3
            // 
            this.HuRo3.AutoSize = true;
            this.HuRo3.Location = new System.Drawing.Point(191, 158);
            this.HuRo3.Name = "HuRo3";
            this.HuRo3.Size = new System.Drawing.Size(24, 13);
            this.HuRo3.TabIndex = 21;
            this.HuRo3.Text = "0/0";
            this.HuRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaRo3
            // 
            this.PaRo3.AutoSize = true;
            this.PaRo3.Location = new System.Drawing.Point(191, 127);
            this.PaRo3.Name = "PaRo3";
            this.PaRo3.Size = new System.Drawing.Size(24, 13);
            this.PaRo3.TabIndex = 21;
            this.PaRo3.Text = "0/0";
            this.PaRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWa3
            // 
            this.ShWa3.AutoSize = true;
            this.ShWa3.Location = new System.Drawing.Point(66, 65);
            this.ShWa3.Name = "ShWa3";
            this.ShWa3.Size = new System.Drawing.Size(24, 13);
            this.ShWa3.TabIndex = 20;
            this.ShWa3.Text = "0/0";
            this.ShWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoRo3
            // 
            this.RoRo3.AutoSize = true;
            this.RoRo3.Location = new System.Drawing.Point(191, 95);
            this.RoRo3.Name = "RoRo3";
            this.RoRo3.Size = new System.Drawing.Size(24, 13);
            this.RoRo3.TabIndex = 21;
            this.RoRo3.Text = "0/0";
            this.RoRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPa3
            // 
            this.PrPa3.AutoSize = true;
            this.PrPa3.Location = new System.Drawing.Point(256, 299);
            this.PrPa3.Name = "PrPa3";
            this.PrPa3.Size = new System.Drawing.Size(24, 13);
            this.PrPa3.TabIndex = 23;
            this.PrPa3.Text = "0/0";
            this.PrPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPa3
            // 
            this.MaPa3.AutoSize = true;
            this.MaPa3.Location = new System.Drawing.Point(256, 262);
            this.MaPa3.Name = "MaPa3";
            this.MaPa3.Size = new System.Drawing.Size(24, 13);
            this.MaPa3.TabIndex = 23;
            this.MaPa3.Text = "0/0";
            this.MaPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPa3
            // 
            this.WkPa3.AutoSize = true;
            this.WkPa3.Location = new System.Drawing.Point(256, 225);
            this.WkPa3.Name = "WkPa3";
            this.WkPa3.Size = new System.Drawing.Size(24, 13);
            this.WkPa3.TabIndex = 23;
            this.WkPa3.Text = "0/0";
            this.WkPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPa3
            // 
            this.DrPa3.AutoSize = true;
            this.DrPa3.Location = new System.Drawing.Point(256, 192);
            this.DrPa3.Name = "DrPa3";
            this.DrPa3.Size = new System.Drawing.Size(24, 13);
            this.DrPa3.TabIndex = 23;
            this.DrPa3.Text = "0/0";
            this.DrPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPa3
            // 
            this.HuPa3.AutoSize = true;
            this.HuPa3.Location = new System.Drawing.Point(256, 158);
            this.HuPa3.Name = "HuPa3";
            this.HuPa3.Size = new System.Drawing.Size(24, 13);
            this.HuPa3.TabIndex = 23;
            this.HuPa3.Text = "0/0";
            this.HuPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPa3
            // 
            this.PaPa3.AutoSize = true;
            this.PaPa3.Location = new System.Drawing.Point(256, 127);
            this.PaPa3.Name = "PaPa3";
            this.PaPa3.Size = new System.Drawing.Size(24, 13);
            this.PaPa3.TabIndex = 23;
            this.PaPa3.Text = "0/0";
            this.PaPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShSh3
            // 
            this.ShSh3.AutoSize = true;
            this.ShSh3.Location = new System.Drawing.Point(125, 65);
            this.ShSh3.Name = "ShSh3";
            this.ShSh3.Size = new System.Drawing.Size(24, 13);
            this.ShSh3.TabIndex = 19;
            this.ShSh3.Text = "0/0";
            this.ShSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPa3
            // 
            this.RoPa3.AutoSize = true;
            this.RoPa3.Location = new System.Drawing.Point(256, 95);
            this.RoPa3.Name = "RoPa3";
            this.RoPa3.Size = new System.Drawing.Size(24, 13);
            this.RoPa3.TabIndex = 23;
            this.RoPa3.Text = "0/0";
            this.RoPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrHu3
            // 
            this.PrHu3.AutoSize = true;
            this.PrHu3.Location = new System.Drawing.Point(321, 299);
            this.PrHu3.Name = "PrHu3";
            this.PrHu3.Size = new System.Drawing.Size(24, 13);
            this.PrHu3.TabIndex = 22;
            this.PrHu3.Text = "0/0";
            this.PrHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaHu3
            // 
            this.MaHu3.AutoSize = true;
            this.MaHu3.Location = new System.Drawing.Point(321, 262);
            this.MaHu3.Name = "MaHu3";
            this.MaHu3.Size = new System.Drawing.Size(24, 13);
            this.MaHu3.TabIndex = 22;
            this.MaHu3.Text = "0/0";
            this.MaHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkHu3
            // 
            this.WkHu3.AutoSize = true;
            this.WkHu3.Location = new System.Drawing.Point(321, 225);
            this.WkHu3.Name = "WkHu3";
            this.WkHu3.Size = new System.Drawing.Size(24, 13);
            this.WkHu3.TabIndex = 22;
            this.WkHu3.Text = "0/0";
            this.WkHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrHu3
            // 
            this.DrHu3.AutoSize = true;
            this.DrHu3.Location = new System.Drawing.Point(321, 192);
            this.DrHu3.Name = "DrHu3";
            this.DrHu3.Size = new System.Drawing.Size(24, 13);
            this.DrHu3.TabIndex = 22;
            this.DrHu3.Text = "0/0";
            this.DrHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuHu3
            // 
            this.HuHu3.AutoSize = true;
            this.HuHu3.Location = new System.Drawing.Point(321, 158);
            this.HuHu3.Name = "HuHu3";
            this.HuHu3.Size = new System.Drawing.Size(24, 13);
            this.HuHu3.TabIndex = 22;
            this.HuHu3.Text = "0/0";
            this.HuHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaHu3
            // 
            this.PaHu3.AutoSize = true;
            this.PaHu3.Location = new System.Drawing.Point(321, 127);
            this.PaHu3.Name = "PaHu3";
            this.PaHu3.Size = new System.Drawing.Size(24, 13);
            this.PaHu3.TabIndex = 22;
            this.PaHu3.Text = "0/0";
            this.PaHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShRo3
            // 
            this.ShRo3.AutoSize = true;
            this.ShRo3.Location = new System.Drawing.Point(191, 65);
            this.ShRo3.Name = "ShRo3";
            this.ShRo3.Size = new System.Drawing.Size(24, 13);
            this.ShRo3.TabIndex = 21;
            this.ShRo3.Text = "0/0";
            this.ShRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoHu3
            // 
            this.RoHu3.AutoSize = true;
            this.RoHu3.Location = new System.Drawing.Point(321, 95);
            this.RoHu3.Name = "RoHu3";
            this.RoHu3.Size = new System.Drawing.Size(24, 13);
            this.RoHu3.TabIndex = 22;
            this.RoHu3.Text = "0/0";
            this.RoHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrDr3
            // 
            this.PrDr3.AutoSize = true;
            this.PrDr3.Location = new System.Drawing.Point(384, 299);
            this.PrDr3.Name = "PrDr3";
            this.PrDr3.Size = new System.Drawing.Size(24, 13);
            this.PrDr3.TabIndex = 15;
            this.PrDr3.Text = "0/0";
            this.PrDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaDr3
            // 
            this.MaDr3.AutoSize = true;
            this.MaDr3.Location = new System.Drawing.Point(384, 262);
            this.MaDr3.Name = "MaDr3";
            this.MaDr3.Size = new System.Drawing.Size(24, 13);
            this.MaDr3.TabIndex = 15;
            this.MaDr3.Text = "0/0";
            this.MaDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkDr3
            // 
            this.WkDr3.AutoSize = true;
            this.WkDr3.Location = new System.Drawing.Point(384, 225);
            this.WkDr3.Name = "WkDr3";
            this.WkDr3.Size = new System.Drawing.Size(24, 13);
            this.WkDr3.TabIndex = 15;
            this.WkDr3.Text = "0/0";
            this.WkDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrDr3
            // 
            this.DrDr3.AutoSize = true;
            this.DrDr3.Location = new System.Drawing.Point(384, 192);
            this.DrDr3.Name = "DrDr3";
            this.DrDr3.Size = new System.Drawing.Size(24, 13);
            this.DrDr3.TabIndex = 15;
            this.DrDr3.Text = "0/0";
            this.DrDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuDr3
            // 
            this.HuDr3.AutoSize = true;
            this.HuDr3.Location = new System.Drawing.Point(384, 158);
            this.HuDr3.Name = "HuDr3";
            this.HuDr3.Size = new System.Drawing.Size(24, 13);
            this.HuDr3.TabIndex = 15;
            this.HuDr3.Text = "0/0";
            this.HuDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaDr3
            // 
            this.PaDr3.AutoSize = true;
            this.PaDr3.Location = new System.Drawing.Point(384, 127);
            this.PaDr3.Name = "PaDr3";
            this.PaDr3.Size = new System.Drawing.Size(24, 13);
            this.PaDr3.TabIndex = 15;
            this.PaDr3.Text = "0/0";
            this.PaDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPa3
            // 
            this.ShPa3.AutoSize = true;
            this.ShPa3.Location = new System.Drawing.Point(256, 65);
            this.ShPa3.Name = "ShPa3";
            this.ShPa3.Size = new System.Drawing.Size(24, 13);
            this.ShPa3.TabIndex = 23;
            this.ShPa3.Text = "0/0";
            this.ShPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrWk3
            // 
            this.PrWk3.AutoSize = true;
            this.PrWk3.Location = new System.Drawing.Point(448, 299);
            this.PrWk3.Name = "PrWk3";
            this.PrWk3.Size = new System.Drawing.Size(24, 13);
            this.PrWk3.TabIndex = 14;
            this.PrWk3.Text = "0/0";
            this.PrWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWk3
            // 
            this.MaWk3.AutoSize = true;
            this.MaWk3.Location = new System.Drawing.Point(448, 262);
            this.MaWk3.Name = "MaWk3";
            this.MaWk3.Size = new System.Drawing.Size(24, 13);
            this.MaWk3.TabIndex = 14;
            this.MaWk3.Text = "0/0";
            this.MaWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWk3
            // 
            this.WkWk3.AutoSize = true;
            this.WkWk3.Location = new System.Drawing.Point(448, 225);
            this.WkWk3.Name = "WkWk3";
            this.WkWk3.Size = new System.Drawing.Size(24, 13);
            this.WkWk3.TabIndex = 14;
            this.WkWk3.Text = "0/0";
            this.WkWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWk3
            // 
            this.DrWk3.AutoSize = true;
            this.DrWk3.Location = new System.Drawing.Point(448, 192);
            this.DrWk3.Name = "DrWk3";
            this.DrWk3.Size = new System.Drawing.Size(24, 13);
            this.DrWk3.TabIndex = 14;
            this.DrWk3.Text = "0/0";
            this.DrWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWk3
            // 
            this.HuWk3.AutoSize = true;
            this.HuWk3.Location = new System.Drawing.Point(448, 158);
            this.HuWk3.Name = "HuWk3";
            this.HuWk3.Size = new System.Drawing.Size(24, 13);
            this.HuWk3.TabIndex = 14;
            this.HuWk3.Text = "0/0";
            this.HuWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrMa3
            // 
            this.PrMa3.AutoSize = true;
            this.PrMa3.Location = new System.Drawing.Point(517, 299);
            this.PrMa3.Name = "PrMa3";
            this.PrMa3.Size = new System.Drawing.Size(24, 13);
            this.PrMa3.TabIndex = 16;
            this.PrMa3.Text = "0/0";
            this.PrMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaMa3
            // 
            this.MaMa3.AutoSize = true;
            this.MaMa3.Location = new System.Drawing.Point(517, 262);
            this.MaMa3.Name = "MaMa3";
            this.MaMa3.Size = new System.Drawing.Size(24, 13);
            this.MaMa3.TabIndex = 16;
            this.MaMa3.Text = "0/0";
            this.MaMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoDr3
            // 
            this.RoDr3.AutoSize = true;
            this.RoDr3.Location = new System.Drawing.Point(384, 95);
            this.RoDr3.Name = "RoDr3";
            this.RoDr3.Size = new System.Drawing.Size(24, 13);
            this.RoDr3.TabIndex = 15;
            this.RoDr3.Text = "0/0";
            this.RoDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkMa3
            // 
            this.WkMa3.AutoSize = true;
            this.WkMa3.Location = new System.Drawing.Point(517, 225);
            this.WkMa3.Name = "WkMa3";
            this.WkMa3.Size = new System.Drawing.Size(24, 13);
            this.WkMa3.TabIndex = 16;
            this.WkMa3.Text = "0/0";
            this.WkMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWk3
            // 
            this.PaWk3.AutoSize = true;
            this.PaWk3.Location = new System.Drawing.Point(448, 127);
            this.PaWk3.Name = "PaWk3";
            this.PaWk3.Size = new System.Drawing.Size(24, 13);
            this.PaWk3.TabIndex = 14;
            this.PaWk3.Text = "0/0";
            this.PaWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrMa3
            // 
            this.DrMa3.AutoSize = true;
            this.DrMa3.Location = new System.Drawing.Point(517, 192);
            this.DrMa3.Name = "DrMa3";
            this.DrMa3.Size = new System.Drawing.Size(24, 13);
            this.DrMa3.TabIndex = 16;
            this.DrMa3.Text = "0/0";
            this.DrMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShHu3
            // 
            this.ShHu3.AutoSize = true;
            this.ShHu3.Location = new System.Drawing.Point(321, 65);
            this.ShHu3.Name = "ShHu3";
            this.ShHu3.Size = new System.Drawing.Size(24, 13);
            this.ShHu3.TabIndex = 22;
            this.ShHu3.Text = "0/0";
            this.ShHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuMa3
            // 
            this.HuMa3.AutoSize = true;
            this.HuMa3.Location = new System.Drawing.Point(517, 158);
            this.HuMa3.Name = "HuMa3";
            this.HuMa3.Size = new System.Drawing.Size(24, 13);
            this.HuMa3.TabIndex = 16;
            this.HuMa3.Text = "0/0";
            this.HuMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPr3
            // 
            this.PrPr3.AutoSize = true;
            this.PrPr3.Location = new System.Drawing.Point(580, 299);
            this.PrPr3.Name = "PrPr3";
            this.PrPr3.Size = new System.Drawing.Size(24, 13);
            this.PrPr3.TabIndex = 18;
            this.PrPr3.Text = "0/0";
            this.PrPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPr3
            // 
            this.MaPr3.AutoSize = true;
            this.MaPr3.Location = new System.Drawing.Point(580, 262);
            this.MaPr3.Name = "MaPr3";
            this.MaPr3.Size = new System.Drawing.Size(24, 13);
            this.MaPr3.TabIndex = 18;
            this.MaPr3.Text = "0/0";
            this.MaPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWk3
            // 
            this.RoWk3.AutoSize = true;
            this.RoWk3.Location = new System.Drawing.Point(448, 95);
            this.RoWk3.Name = "RoWk3";
            this.RoWk3.Size = new System.Drawing.Size(24, 13);
            this.RoWk3.TabIndex = 14;
            this.RoWk3.Text = "0/0";
            this.RoWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPr3
            // 
            this.WkPr3.AutoSize = true;
            this.WkPr3.Location = new System.Drawing.Point(580, 225);
            this.WkPr3.Name = "WkPr3";
            this.WkPr3.Size = new System.Drawing.Size(24, 13);
            this.WkPr3.TabIndex = 18;
            this.WkPr3.Text = "0/0";
            this.WkPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaMa3
            // 
            this.PaMa3.AutoSize = true;
            this.PaMa3.Location = new System.Drawing.Point(517, 127);
            this.PaMa3.Name = "PaMa3";
            this.PaMa3.Size = new System.Drawing.Size(24, 13);
            this.PaMa3.TabIndex = 16;
            this.PaMa3.Text = "0/0";
            this.PaMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPr3
            // 
            this.DrPr3.AutoSize = true;
            this.DrPr3.Location = new System.Drawing.Point(580, 192);
            this.DrPr3.Name = "DrPr3";
            this.DrPr3.Size = new System.Drawing.Size(24, 13);
            this.DrPr3.TabIndex = 18;
            this.DrPr3.Text = "0/0";
            this.DrPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShDr3
            // 
            this.ShDr3.AutoSize = true;
            this.ShDr3.Location = new System.Drawing.Point(384, 65);
            this.ShDr3.Name = "ShDr3";
            this.ShDr3.Size = new System.Drawing.Size(24, 13);
            this.ShDr3.TabIndex = 15;
            this.ShDr3.Text = "0/0";
            this.ShDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPr3
            // 
            this.HuPr3.AutoSize = true;
            this.HuPr3.Location = new System.Drawing.Point(580, 158);
            this.HuPr3.Name = "HuPr3";
            this.HuPr3.Size = new System.Drawing.Size(24, 13);
            this.HuPr3.TabIndex = 18;
            this.HuPr3.Text = "0/0";
            this.HuPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoMa3
            // 
            this.RoMa3.AutoSize = true;
            this.RoMa3.Location = new System.Drawing.Point(517, 95);
            this.RoMa3.Name = "RoMa3";
            this.RoMa3.Size = new System.Drawing.Size(24, 13);
            this.RoMa3.TabIndex = 16;
            this.RoMa3.Text = "0/0";
            this.RoMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPr3
            // 
            this.PaPr3.AutoSize = true;
            this.PaPr3.Location = new System.Drawing.Point(580, 127);
            this.PaPr3.Name = "PaPr3";
            this.PaPr3.Size = new System.Drawing.Size(24, 13);
            this.PaPr3.TabIndex = 18;
            this.PaPr3.Text = "0/0";
            this.PaPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWk3
            // 
            this.ShWk3.AutoSize = true;
            this.ShWk3.Location = new System.Drawing.Point(448, 65);
            this.ShWk3.Name = "ShWk3";
            this.ShWk3.Size = new System.Drawing.Size(24, 13);
            this.ShWk3.TabIndex = 14;
            this.ShWk3.Text = "0/0";
            this.ShWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPr3
            // 
            this.RoPr3.AutoSize = true;
            this.RoPr3.Location = new System.Drawing.Point(580, 95);
            this.RoPr3.Name = "RoPr3";
            this.RoPr3.Size = new System.Drawing.Size(24, 13);
            this.RoPr3.TabIndex = 18;
            this.RoPr3.Text = "0/0";
            this.RoPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShMa3
            // 
            this.ShMa3.AutoSize = true;
            this.ShMa3.Location = new System.Drawing.Point(517, 65);
            this.ShMa3.Name = "ShMa3";
            this.ShMa3.Size = new System.Drawing.Size(24, 13);
            this.ShMa3.TabIndex = 16;
            this.ShMa3.Text = "0/0";
            this.ShMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPr3
            // 
            this.ShPr3.AutoSize = true;
            this.ShPr3.Location = new System.Drawing.Point(580, 65);
            this.ShPr3.Name = "ShPr3";
            this.ShPr3.Size = new System.Drawing.Size(24, 13);
            this.ShPr3.TabIndex = 18;
            this.ShPr3.Text = "0/0";
            this.ShPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // ToTo3
            // 
            this.ToTo3.AutoSize = true;
            this.ToTo3.Location = new System.Drawing.Point(646, 333);
            this.ToTo3.Name = "ToTo3";
            this.ToTo3.Size = new System.Drawing.Size(24, 13);
            this.ToTo3.TabIndex = 17;
            this.ToTo3.Text = "0/0";
            // 
            // PrTo3
            // 
            this.PrTo3.AutoSize = true;
            this.PrTo3.Location = new System.Drawing.Point(646, 299);
            this.PrTo3.Name = "PrTo3";
            this.PrTo3.Size = new System.Drawing.Size(24, 13);
            this.PrTo3.TabIndex = 17;
            this.PrTo3.Text = "0/0";
            // 
            // MaTo3
            // 
            this.MaTo3.AutoSize = true;
            this.MaTo3.Location = new System.Drawing.Point(646, 262);
            this.MaTo3.Name = "MaTo3";
            this.MaTo3.Size = new System.Drawing.Size(24, 13);
            this.MaTo3.TabIndex = 17;
            this.MaTo3.Text = "0/0";
            // 
            // PaTo3
            // 
            this.PaTo3.AutoSize = true;
            this.PaTo3.Location = new System.Drawing.Point(646, 127);
            this.PaTo3.Name = "PaTo3";
            this.PaTo3.Size = new System.Drawing.Size(24, 13);
            this.PaTo3.TabIndex = 17;
            this.PaTo3.Text = "0/0";
            // 
            // WkTo3
            // 
            this.WkTo3.AutoSize = true;
            this.WkTo3.Location = new System.Drawing.Point(646, 225);
            this.WkTo3.Name = "WkTo3";
            this.WkTo3.Size = new System.Drawing.Size(24, 13);
            this.WkTo3.TabIndex = 17;
            this.WkTo3.Text = "0/0";
            // 
            // RoTo3
            // 
            this.RoTo3.AutoSize = true;
            this.RoTo3.Location = new System.Drawing.Point(646, 95);
            this.RoTo3.Name = "RoTo3";
            this.RoTo3.Size = new System.Drawing.Size(24, 13);
            this.RoTo3.TabIndex = 17;
            this.RoTo3.Text = "0/0";
            // 
            // DrTo3
            // 
            this.DrTo3.AutoSize = true;
            this.DrTo3.Location = new System.Drawing.Point(646, 192);
            this.DrTo3.Name = "DrTo3";
            this.DrTo3.Size = new System.Drawing.Size(24, 13);
            this.DrTo3.TabIndex = 17;
            this.DrTo3.Text = "0/0";
            // 
            // ShTo3
            // 
            this.ShTo3.AutoSize = true;
            this.ShTo3.Location = new System.Drawing.Point(646, 65);
            this.ShTo3.Name = "ShTo3";
            this.ShTo3.Size = new System.Drawing.Size(24, 13);
            this.ShTo3.TabIndex = 17;
            this.ShTo3.Text = "0/0";
            // 
            // WaWa3
            // 
            this.WaWa3.AutoSize = true;
            this.WaWa3.Location = new System.Drawing.Point(66, 34);
            this.WaWa3.Name = "WaWa3";
            this.WaWa3.Size = new System.Drawing.Size(24, 13);
            this.WaWa3.TabIndex = 12;
            this.WaWa3.Text = "0/0";
            this.WaWa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaSh3
            // 
            this.WaSh3.AutoSize = true;
            this.WaSh3.Location = new System.Drawing.Point(125, 34);
            this.WaSh3.Name = "WaSh3";
            this.WaSh3.Size = new System.Drawing.Size(24, 13);
            this.WaSh3.TabIndex = 12;
            this.WaSh3.Text = "0/0";
            this.WaSh3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaRo3
            // 
            this.WaRo3.AutoSize = true;
            this.WaRo3.Location = new System.Drawing.Point(191, 34);
            this.WaRo3.Name = "WaRo3";
            this.WaRo3.Size = new System.Drawing.Size(24, 13);
            this.WaRo3.TabIndex = 12;
            this.WaRo3.Text = "0/0";
            this.WaRo3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaPa3
            // 
            this.WaPa3.AutoSize = true;
            this.WaPa3.Location = new System.Drawing.Point(256, 34);
            this.WaPa3.Name = "WaPa3";
            this.WaPa3.Size = new System.Drawing.Size(24, 13);
            this.WaPa3.TabIndex = 12;
            this.WaPa3.Text = "0/0";
            this.WaPa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaHu3
            // 
            this.WaHu3.AutoSize = true;
            this.WaHu3.Location = new System.Drawing.Point(321, 34);
            this.WaHu3.Name = "WaHu3";
            this.WaHu3.Size = new System.Drawing.Size(24, 13);
            this.WaHu3.TabIndex = 12;
            this.WaHu3.Text = "0/0";
            this.WaHu3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaDr3
            // 
            this.WaDr3.AutoSize = true;
            this.WaDr3.Location = new System.Drawing.Point(384, 34);
            this.WaDr3.Name = "WaDr3";
            this.WaDr3.Size = new System.Drawing.Size(24, 13);
            this.WaDr3.TabIndex = 12;
            this.WaDr3.Text = "0/0";
            this.WaDr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaWk3
            // 
            this.WaWk3.AutoSize = true;
            this.WaWk3.Location = new System.Drawing.Point(448, 34);
            this.WaWk3.Name = "WaWk3";
            this.WaWk3.Size = new System.Drawing.Size(24, 13);
            this.WaWk3.TabIndex = 12;
            this.WaWk3.Text = "0/0";
            this.WaWk3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaMa3
            // 
            this.WaMa3.AutoSize = true;
            this.WaMa3.Location = new System.Drawing.Point(517, 34);
            this.WaMa3.Name = "WaMa3";
            this.WaMa3.Size = new System.Drawing.Size(24, 13);
            this.WaMa3.TabIndex = 12;
            this.WaMa3.Text = "0/0";
            this.WaMa3.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuTo3
            // 
            this.HuTo3.AutoSize = true;
            this.HuTo3.Location = new System.Drawing.Point(646, 161);
            this.HuTo3.Name = "HuTo3";
            this.HuTo3.Size = new System.Drawing.Size(24, 13);
            this.HuTo3.TabIndex = 12;
            this.HuTo3.Text = "0/0";
            // 
            // WaPr3
            // 
            this.WaPr3.AutoSize = true;
            this.WaPr3.Location = new System.Drawing.Point(580, 34);
            this.WaPr3.Name = "WaPr3";
            this.WaPr3.Size = new System.Drawing.Size(24, 13);
            this.WaPr3.TabIndex = 12;
            this.WaPr3.Text = "0/0";
            this.WaPr3.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaTo3
            // 
            this.WaTo3.AutoSize = true;
            this.WaTo3.Location = new System.Drawing.Point(646, 34);
            this.WaTo3.Name = "WaTo3";
            this.WaTo3.Size = new System.Drawing.Size(24, 13);
            this.WaTo3.TabIndex = 12;
            this.WaTo3.Text = "0/0";
            // 
            // TotalLabel5
            // 
            this.TotalLabel5.AutoSize = true;
            this.TotalLabel5.Location = new System.Drawing.Point(642, 7);
            this.TotalLabel5.Name = "TotalLabel5";
            this.TotalLabel5.Size = new System.Drawing.Size(31, 13);
            this.TotalLabel5.TabIndex = 2;
            this.TotalLabel5.Text = "Total";
            // 
            // DruidLabel5
            // 
            this.DruidLabel5.AutoSize = true;
            this.DruidLabel5.Location = new System.Drawing.Point(576, 7);
            this.DruidLabel5.Name = "DruidLabel5";
            this.DruidLabel5.Size = new System.Drawing.Size(33, 13);
            this.DruidLabel5.TabIndex = 2;
            this.DruidLabel5.Text = "Priest";
            // 
            // WarlockLabel5
            // 
            this.WarlockLabel5.AutoSize = true;
            this.WarlockLabel5.Location = new System.Drawing.Point(512, 7);
            this.WarlockLabel5.Name = "WarlockLabel5";
            this.WarlockLabel5.Size = new System.Drawing.Size(34, 13);
            this.WarlockLabel5.TabIndex = 2;
            this.WarlockLabel5.Text = "Mage";
            // 
            // MageLabel5
            // 
            this.MageLabel5.AutoSize = true;
            this.MageLabel5.Location = new System.Drawing.Point(438, 7);
            this.MageLabel5.Name = "MageLabel5";
            this.MageLabel5.Size = new System.Drawing.Size(47, 13);
            this.MageLabel5.TabIndex = 2;
            this.MageLabel5.Text = "Warlock";
            // 
            // PriestLabel5
            // 
            this.PriestLabel5.AutoSize = true;
            this.PriestLabel5.Location = new System.Drawing.Point(380, 7);
            this.PriestLabel5.Name = "PriestLabel5";
            this.PriestLabel5.Size = new System.Drawing.Size(32, 13);
            this.PriestLabel5.TabIndex = 2;
            this.PriestLabel5.Text = "Druid";
            // 
            // HunterLabel5
            // 
            this.HunterLabel5.AutoSize = true;
            this.HunterLabel5.Location = new System.Drawing.Point(315, 7);
            this.HunterLabel5.Name = "HunterLabel5";
            this.HunterLabel5.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel5.TabIndex = 2;
            this.HunterLabel5.Text = "Hunter";
            // 
            // PaladinLabel5
            // 
            this.PaladinLabel5.AutoSize = true;
            this.PaladinLabel5.Location = new System.Drawing.Point(247, 7);
            this.PaladinLabel5.Name = "PaladinLabel5";
            this.PaladinLabel5.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel5.TabIndex = 2;
            this.PaladinLabel5.Text = "Paladin";
            // 
            // RogueLabel5
            // 
            this.RogueLabel5.AutoSize = true;
            this.RogueLabel5.Location = new System.Drawing.Point(184, 7);
            this.RogueLabel5.Name = "RogueLabel5";
            this.RogueLabel5.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel5.TabIndex = 2;
            this.RogueLabel5.Text = "Rogue";
            // 
            // ShamanLabel5
            // 
            this.ShamanLabel5.AutoSize = true;
            this.ShamanLabel5.Location = new System.Drawing.Point(114, 7);
            this.ShamanLabel5.Name = "ShamanLabel5";
            this.ShamanLabel5.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel5.TabIndex = 1;
            this.ShamanLabel5.Text = "Shaman";
            // 
            // WarriorLabel5
            // 
            this.WarriorLabel5.AutoSize = true;
            this.WarriorLabel5.Location = new System.Drawing.Point(53, 7);
            this.WarriorLabel5.Name = "WarriorLabel5";
            this.WarriorLabel5.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel5.TabIndex = 0;
            this.WarriorLabel5.Text = "Warrior";
            // 
            // WarriorLabel6
            // 
            this.WarriorLabel6.AutoSize = true;
            this.WarriorLabel6.Location = new System.Drawing.Point(6, 34);
            this.WarriorLabel6.Name = "WarriorLabel6";
            this.WarriorLabel6.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel6.TabIndex = 0;
            this.WarriorLabel6.Text = "Warrior";
            // 
            // HunterLabel6
            // 
            this.HunterLabel6.AutoSize = true;
            this.HunterLabel6.Location = new System.Drawing.Point(6, 158);
            this.HunterLabel6.Name = "HunterLabel6";
            this.HunterLabel6.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel6.TabIndex = 0;
            this.HunterLabel6.Text = "Hunter";
            // 
            // TotalLabel6
            // 
            this.TotalLabel6.AutoSize = true;
            this.TotalLabel6.Location = new System.Drawing.Point(575, 333);
            this.TotalLabel6.Name = "TotalLabel6";
            this.TotalLabel6.Size = new System.Drawing.Size(34, 13);
            this.TotalLabel6.TabIndex = 24;
            this.TotalLabel6.Text = "Total:";
            // 
            // PriestLabel6
            // 
            this.PriestLabel6.AutoSize = true;
            this.PriestLabel6.Location = new System.Drawing.Point(6, 299);
            this.PriestLabel6.Name = "PriestLabel6";
            this.PriestLabel6.Size = new System.Drawing.Size(33, 13);
            this.PriestLabel6.TabIndex = 13;
            this.PriestLabel6.Text = "Priest";
            // 
            // MageLabel6
            // 
            this.MageLabel6.AutoSize = true;
            this.MageLabel6.Location = new System.Drawing.Point(6, 262);
            this.MageLabel6.Name = "MageLabel6";
            this.MageLabel6.Size = new System.Drawing.Size(34, 13);
            this.MageLabel6.TabIndex = 13;
            this.MageLabel6.Text = "Mage";
            // 
            // WarlockLabel6
            // 
            this.WarlockLabel6.AutoSize = true;
            this.WarlockLabel6.Location = new System.Drawing.Point(6, 225);
            this.WarlockLabel6.Name = "WarlockLabel6";
            this.WarlockLabel6.Size = new System.Drawing.Size(47, 13);
            this.WarlockLabel6.TabIndex = 13;
            this.WarlockLabel6.Text = "Warlock";
            // 
            // PaladinLabel6
            // 
            this.PaladinLabel6.AutoSize = true;
            this.PaladinLabel6.Location = new System.Drawing.Point(6, 127);
            this.PaladinLabel6.Name = "PaladinLabel6";
            this.PaladinLabel6.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel6.TabIndex = 13;
            this.PaladinLabel6.Text = "Paladin";
            // 
            // DruidLabel6
            // 
            this.DruidLabel6.AutoSize = true;
            this.DruidLabel6.Location = new System.Drawing.Point(6, 192);
            this.DruidLabel6.Name = "DruidLabel6";
            this.DruidLabel6.Size = new System.Drawing.Size(32, 13);
            this.DruidLabel6.TabIndex = 13;
            this.DruidLabel6.Text = "Druid";
            // 
            // RogueLabel6
            // 
            this.RogueLabel6.AutoSize = true;
            this.RogueLabel6.Location = new System.Drawing.Point(6, 95);
            this.RogueLabel6.Name = "RogueLabel6";
            this.RogueLabel6.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel6.TabIndex = 13;
            this.RogueLabel6.Text = "Rogue";
            // 
            // ShamanLabel6
            // 
            this.ShamanLabel6.AutoSize = true;
            this.ShamanLabel6.Location = new System.Drawing.Point(6, 65);
            this.ShamanLabel6.Name = "ShamanLabel6";
            this.ShamanLabel6.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel6.TabIndex = 13;
            this.ShamanLabel6.Text = "Shaman";
            // 
            // ArenaTab
            // 
            this.ArenaTab.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(238)))), ((int)(((byte)(217)))), ((int)(((byte)(213)))));
            this.ArenaTab.Controls.Add(this.PrWa2);
            this.ArenaTab.Controls.Add(this.MaWa2);
            this.ArenaTab.Controls.Add(this.WkWa2);
            this.ArenaTab.Controls.Add(this.DrWa2);
            this.ArenaTab.Controls.Add(this.HuWa2);
            this.ArenaTab.Controls.Add(this.PaWa2);
            this.ArenaTab.Controls.Add(this.PrSh2);
            this.ArenaTab.Controls.Add(this.MaSh2);
            this.ArenaTab.Controls.Add(this.WkSh2);
            this.ArenaTab.Controls.Add(this.DrSh2);
            this.ArenaTab.Controls.Add(this.HuSh2);
            this.ArenaTab.Controls.Add(this.PaSh2);
            this.ArenaTab.Controls.Add(this.RoWa2);
            this.ArenaTab.Controls.Add(this.RoSh2);
            this.ArenaTab.Controls.Add(this.PrRo2);
            this.ArenaTab.Controls.Add(this.MaRo2);
            this.ArenaTab.Controls.Add(this.WkRo2);
            this.ArenaTab.Controls.Add(this.DrRo2);
            this.ArenaTab.Controls.Add(this.HuRo2);
            this.ArenaTab.Controls.Add(this.PaRo2);
            this.ArenaTab.Controls.Add(this.ShWa2);
            this.ArenaTab.Controls.Add(this.RoRo2);
            this.ArenaTab.Controls.Add(this.PrPa2);
            this.ArenaTab.Controls.Add(this.MaPa2);
            this.ArenaTab.Controls.Add(this.WkPa2);
            this.ArenaTab.Controls.Add(this.DrPa2);
            this.ArenaTab.Controls.Add(this.HuPa2);
            this.ArenaTab.Controls.Add(this.PaPa2);
            this.ArenaTab.Controls.Add(this.ShSh2);
            this.ArenaTab.Controls.Add(this.RoPa2);
            this.ArenaTab.Controls.Add(this.PrHu2);
            this.ArenaTab.Controls.Add(this.MaHu2);
            this.ArenaTab.Controls.Add(this.WkHu2);
            this.ArenaTab.Controls.Add(this.DrHu2);
            this.ArenaTab.Controls.Add(this.HuHu2);
            this.ArenaTab.Controls.Add(this.PaHu2);
            this.ArenaTab.Controls.Add(this.ShRo2);
            this.ArenaTab.Controls.Add(this.RoHu2);
            this.ArenaTab.Controls.Add(this.PrDr2);
            this.ArenaTab.Controls.Add(this.MaDr2);
            this.ArenaTab.Controls.Add(this.WkDr2);
            this.ArenaTab.Controls.Add(this.DrDr2);
            this.ArenaTab.Controls.Add(this.HuDr2);
            this.ArenaTab.Controls.Add(this.PaDr2);
            this.ArenaTab.Controls.Add(this.ShPa2);
            this.ArenaTab.Controls.Add(this.PrWk2);
            this.ArenaTab.Controls.Add(this.MaWk2);
            this.ArenaTab.Controls.Add(this.WkWk2);
            this.ArenaTab.Controls.Add(this.DrWk2);
            this.ArenaTab.Controls.Add(this.HuWk2);
            this.ArenaTab.Controls.Add(this.PrMa2);
            this.ArenaTab.Controls.Add(this.MaMa2);
            this.ArenaTab.Controls.Add(this.RoDr2);
            this.ArenaTab.Controls.Add(this.WkMa2);
            this.ArenaTab.Controls.Add(this.PaWk2);
            this.ArenaTab.Controls.Add(this.DrMa2);
            this.ArenaTab.Controls.Add(this.ShHu2);
            this.ArenaTab.Controls.Add(this.HuMa2);
            this.ArenaTab.Controls.Add(this.PrPr2);
            this.ArenaTab.Controls.Add(this.MaPr2);
            this.ArenaTab.Controls.Add(this.RoWk2);
            this.ArenaTab.Controls.Add(this.WkPr2);
            this.ArenaTab.Controls.Add(this.PaMa2);
            this.ArenaTab.Controls.Add(this.DrPr2);
            this.ArenaTab.Controls.Add(this.ShDr2);
            this.ArenaTab.Controls.Add(this.HuPr2);
            this.ArenaTab.Controls.Add(this.RoMa2);
            this.ArenaTab.Controls.Add(this.PaPr2);
            this.ArenaTab.Controls.Add(this.ShWk2);
            this.ArenaTab.Controls.Add(this.RoPr2);
            this.ArenaTab.Controls.Add(this.ShMa2);
            this.ArenaTab.Controls.Add(this.ShPr2);
            this.ArenaTab.Controls.Add(this.ToTo2);
            this.ArenaTab.Controls.Add(this.PrTo2);
            this.ArenaTab.Controls.Add(this.MaTo2);
            this.ArenaTab.Controls.Add(this.PaTo2);
            this.ArenaTab.Controls.Add(this.WkTo2);
            this.ArenaTab.Controls.Add(this.RoTo2);
            this.ArenaTab.Controls.Add(this.DrTo2);
            this.ArenaTab.Controls.Add(this.ShTo2);
            this.ArenaTab.Controls.Add(this.WaWa2);
            this.ArenaTab.Controls.Add(this.WaSh2);
            this.ArenaTab.Controls.Add(this.WaRo2);
            this.ArenaTab.Controls.Add(this.WaPa2);
            this.ArenaTab.Controls.Add(this.WaHu2);
            this.ArenaTab.Controls.Add(this.WaDr2);
            this.ArenaTab.Controls.Add(this.WaWk2);
            this.ArenaTab.Controls.Add(this.WaMa2);
            this.ArenaTab.Controls.Add(this.HuTo2);
            this.ArenaTab.Controls.Add(this.WaPr2);
            this.ArenaTab.Controls.Add(this.WaTo2);
            this.ArenaTab.Controls.Add(this.TotalLabel3);
            this.ArenaTab.Controls.Add(this.DruidLabel3);
            this.ArenaTab.Controls.Add(this.WarlockLabel3);
            this.ArenaTab.Controls.Add(this.MageLabel3);
            this.ArenaTab.Controls.Add(this.PriestLabel3);
            this.ArenaTab.Controls.Add(this.HunterLabel3);
            this.ArenaTab.Controls.Add(this.PaladinLabel3);
            this.ArenaTab.Controls.Add(this.RogueLabel3);
            this.ArenaTab.Controls.Add(this.ShamanLabel3);
            this.ArenaTab.Controls.Add(this.WarriorLabel3);
            this.ArenaTab.Controls.Add(this.HunterLabel4);
            this.ArenaTab.Controls.Add(this.WarriorLabel4);
            this.ArenaTab.Controls.Add(this.TotalLabel4);
            this.ArenaTab.Controls.Add(this.PriestLabel4);
            this.ArenaTab.Controls.Add(this.MageLabel4);
            this.ArenaTab.Controls.Add(this.WarlockLabel4);
            this.ArenaTab.Controls.Add(this.PaladinLabel4);
            this.ArenaTab.Controls.Add(this.DruidLabel4);
            this.ArenaTab.Controls.Add(this.RogueLabel4);
            this.ArenaTab.Controls.Add(this.ShamanLabel4);
            this.ArenaTab.Location = new System.Drawing.Point(4, 22);
            this.ArenaTab.Name = "ArenaTab";
            this.ArenaTab.Padding = new System.Windows.Forms.Padding(3);
            this.ArenaTab.Size = new System.Drawing.Size(698, 360);
            this.ArenaTab.TabIndex = 2;
            this.ArenaTab.Text = "Arena";
            // 
            // PrWa2
            // 
            this.PrWa2.AutoSize = true;
            this.PrWa2.Location = new System.Drawing.Point(66, 299);
            this.PrWa2.Name = "PrWa2";
            this.PrWa2.Size = new System.Drawing.Size(24, 13);
            this.PrWa2.TabIndex = 20;
            this.PrWa2.Text = "0/0";
            this.PrWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWa2
            // 
            this.MaWa2.AutoSize = true;
            this.MaWa2.Location = new System.Drawing.Point(66, 262);
            this.MaWa2.Name = "MaWa2";
            this.MaWa2.Size = new System.Drawing.Size(24, 13);
            this.MaWa2.TabIndex = 20;
            this.MaWa2.Text = "0/0";
            this.MaWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWa2
            // 
            this.WkWa2.AutoSize = true;
            this.WkWa2.Location = new System.Drawing.Point(66, 225);
            this.WkWa2.Name = "WkWa2";
            this.WkWa2.Size = new System.Drawing.Size(24, 13);
            this.WkWa2.TabIndex = 20;
            this.WkWa2.Text = "0/0";
            this.WkWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWa2
            // 
            this.DrWa2.AutoSize = true;
            this.DrWa2.Location = new System.Drawing.Point(66, 192);
            this.DrWa2.Name = "DrWa2";
            this.DrWa2.Size = new System.Drawing.Size(24, 13);
            this.DrWa2.TabIndex = 20;
            this.DrWa2.Text = "0/0";
            this.DrWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWa2
            // 
            this.HuWa2.AutoSize = true;
            this.HuWa2.Location = new System.Drawing.Point(66, 158);
            this.HuWa2.Name = "HuWa2";
            this.HuWa2.Size = new System.Drawing.Size(24, 13);
            this.HuWa2.TabIndex = 20;
            this.HuWa2.Text = "0/0";
            this.HuWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWa2
            // 
            this.PaWa2.AutoSize = true;
            this.PaWa2.Location = new System.Drawing.Point(66, 127);
            this.PaWa2.Name = "PaWa2";
            this.PaWa2.Size = new System.Drawing.Size(24, 13);
            this.PaWa2.TabIndex = 20;
            this.PaWa2.Text = "0/0";
            this.PaWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrSh2
            // 
            this.PrSh2.AutoSize = true;
            this.PrSh2.Location = new System.Drawing.Point(125, 299);
            this.PrSh2.Name = "PrSh2";
            this.PrSh2.Size = new System.Drawing.Size(24, 13);
            this.PrSh2.TabIndex = 19;
            this.PrSh2.Text = "0/0";
            this.PrSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaSh2
            // 
            this.MaSh2.AutoSize = true;
            this.MaSh2.Location = new System.Drawing.Point(125, 262);
            this.MaSh2.Name = "MaSh2";
            this.MaSh2.Size = new System.Drawing.Size(24, 13);
            this.MaSh2.TabIndex = 19;
            this.MaSh2.Text = "0/0";
            this.MaSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkSh2
            // 
            this.WkSh2.AutoSize = true;
            this.WkSh2.Location = new System.Drawing.Point(125, 225);
            this.WkSh2.Name = "WkSh2";
            this.WkSh2.Size = new System.Drawing.Size(24, 13);
            this.WkSh2.TabIndex = 19;
            this.WkSh2.Text = "0/0";
            this.WkSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrSh2
            // 
            this.DrSh2.AutoSize = true;
            this.DrSh2.Location = new System.Drawing.Point(125, 192);
            this.DrSh2.Name = "DrSh2";
            this.DrSh2.Size = new System.Drawing.Size(24, 13);
            this.DrSh2.TabIndex = 19;
            this.DrSh2.Text = "0/0";
            this.DrSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuSh2
            // 
            this.HuSh2.AutoSize = true;
            this.HuSh2.Location = new System.Drawing.Point(125, 158);
            this.HuSh2.Name = "HuSh2";
            this.HuSh2.Size = new System.Drawing.Size(24, 13);
            this.HuSh2.TabIndex = 19;
            this.HuSh2.Text = "0/0";
            this.HuSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaSh2
            // 
            this.PaSh2.AutoSize = true;
            this.PaSh2.Location = new System.Drawing.Point(125, 127);
            this.PaSh2.Name = "PaSh2";
            this.PaSh2.Size = new System.Drawing.Size(24, 13);
            this.PaSh2.TabIndex = 19;
            this.PaSh2.Text = "0/0";
            this.PaSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWa2
            // 
            this.RoWa2.AutoSize = true;
            this.RoWa2.Location = new System.Drawing.Point(66, 95);
            this.RoWa2.Name = "RoWa2";
            this.RoWa2.Size = new System.Drawing.Size(24, 13);
            this.RoWa2.TabIndex = 20;
            this.RoWa2.Text = "0/0";
            this.RoWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoSh2
            // 
            this.RoSh2.AutoSize = true;
            this.RoSh2.Location = new System.Drawing.Point(125, 95);
            this.RoSh2.Name = "RoSh2";
            this.RoSh2.Size = new System.Drawing.Size(24, 13);
            this.RoSh2.TabIndex = 19;
            this.RoSh2.Text = "0/0";
            this.RoSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrRo2
            // 
            this.PrRo2.AutoSize = true;
            this.PrRo2.Location = new System.Drawing.Point(191, 299);
            this.PrRo2.Name = "PrRo2";
            this.PrRo2.Size = new System.Drawing.Size(24, 13);
            this.PrRo2.TabIndex = 21;
            this.PrRo2.Text = "0/0";
            this.PrRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaRo2
            // 
            this.MaRo2.AutoSize = true;
            this.MaRo2.Location = new System.Drawing.Point(191, 262);
            this.MaRo2.Name = "MaRo2";
            this.MaRo2.Size = new System.Drawing.Size(24, 13);
            this.MaRo2.TabIndex = 21;
            this.MaRo2.Text = "0/0";
            this.MaRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkRo2
            // 
            this.WkRo2.AutoSize = true;
            this.WkRo2.Location = new System.Drawing.Point(191, 225);
            this.WkRo2.Name = "WkRo2";
            this.WkRo2.Size = new System.Drawing.Size(24, 13);
            this.WkRo2.TabIndex = 21;
            this.WkRo2.Text = "0/0";
            this.WkRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrRo2
            // 
            this.DrRo2.AutoSize = true;
            this.DrRo2.Location = new System.Drawing.Point(191, 192);
            this.DrRo2.Name = "DrRo2";
            this.DrRo2.Size = new System.Drawing.Size(24, 13);
            this.DrRo2.TabIndex = 21;
            this.DrRo2.Text = "0/0";
            this.DrRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuRo2
            // 
            this.HuRo2.AutoSize = true;
            this.HuRo2.Location = new System.Drawing.Point(191, 158);
            this.HuRo2.Name = "HuRo2";
            this.HuRo2.Size = new System.Drawing.Size(24, 13);
            this.HuRo2.TabIndex = 21;
            this.HuRo2.Text = "0/0";
            this.HuRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaRo2
            // 
            this.PaRo2.AutoSize = true;
            this.PaRo2.Location = new System.Drawing.Point(191, 127);
            this.PaRo2.Name = "PaRo2";
            this.PaRo2.Size = new System.Drawing.Size(24, 13);
            this.PaRo2.TabIndex = 21;
            this.PaRo2.Text = "0/0";
            this.PaRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWa2
            // 
            this.ShWa2.AutoSize = true;
            this.ShWa2.Location = new System.Drawing.Point(66, 65);
            this.ShWa2.Name = "ShWa2";
            this.ShWa2.Size = new System.Drawing.Size(24, 13);
            this.ShWa2.TabIndex = 20;
            this.ShWa2.Text = "0/0";
            this.ShWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoRo2
            // 
            this.RoRo2.AutoSize = true;
            this.RoRo2.Location = new System.Drawing.Point(191, 95);
            this.RoRo2.Name = "RoRo2";
            this.RoRo2.Size = new System.Drawing.Size(24, 13);
            this.RoRo2.TabIndex = 21;
            this.RoRo2.Text = "0/0";
            this.RoRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPa2
            // 
            this.PrPa2.AutoSize = true;
            this.PrPa2.Location = new System.Drawing.Point(256, 299);
            this.PrPa2.Name = "PrPa2";
            this.PrPa2.Size = new System.Drawing.Size(24, 13);
            this.PrPa2.TabIndex = 23;
            this.PrPa2.Text = "0/0";
            this.PrPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPa2
            // 
            this.MaPa2.AutoSize = true;
            this.MaPa2.Location = new System.Drawing.Point(256, 262);
            this.MaPa2.Name = "MaPa2";
            this.MaPa2.Size = new System.Drawing.Size(24, 13);
            this.MaPa2.TabIndex = 23;
            this.MaPa2.Text = "0/0";
            this.MaPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPa2
            // 
            this.WkPa2.AutoSize = true;
            this.WkPa2.Location = new System.Drawing.Point(256, 225);
            this.WkPa2.Name = "WkPa2";
            this.WkPa2.Size = new System.Drawing.Size(24, 13);
            this.WkPa2.TabIndex = 23;
            this.WkPa2.Text = "0/0";
            this.WkPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPa2
            // 
            this.DrPa2.AutoSize = true;
            this.DrPa2.Location = new System.Drawing.Point(256, 192);
            this.DrPa2.Name = "DrPa2";
            this.DrPa2.Size = new System.Drawing.Size(24, 13);
            this.DrPa2.TabIndex = 23;
            this.DrPa2.Text = "0/0";
            this.DrPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPa2
            // 
            this.HuPa2.AutoSize = true;
            this.HuPa2.Location = new System.Drawing.Point(256, 158);
            this.HuPa2.Name = "HuPa2";
            this.HuPa2.Size = new System.Drawing.Size(24, 13);
            this.HuPa2.TabIndex = 23;
            this.HuPa2.Text = "0/0";
            this.HuPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPa2
            // 
            this.PaPa2.AutoSize = true;
            this.PaPa2.Location = new System.Drawing.Point(256, 127);
            this.PaPa2.Name = "PaPa2";
            this.PaPa2.Size = new System.Drawing.Size(24, 13);
            this.PaPa2.TabIndex = 23;
            this.PaPa2.Text = "0/0";
            this.PaPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShSh2
            // 
            this.ShSh2.AutoSize = true;
            this.ShSh2.Location = new System.Drawing.Point(125, 65);
            this.ShSh2.Name = "ShSh2";
            this.ShSh2.Size = new System.Drawing.Size(24, 13);
            this.ShSh2.TabIndex = 19;
            this.ShSh2.Text = "0/0";
            this.ShSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPa2
            // 
            this.RoPa2.AutoSize = true;
            this.RoPa2.Location = new System.Drawing.Point(256, 95);
            this.RoPa2.Name = "RoPa2";
            this.RoPa2.Size = new System.Drawing.Size(24, 13);
            this.RoPa2.TabIndex = 23;
            this.RoPa2.Text = "0/0";
            this.RoPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrHu2
            // 
            this.PrHu2.AutoSize = true;
            this.PrHu2.Location = new System.Drawing.Point(321, 299);
            this.PrHu2.Name = "PrHu2";
            this.PrHu2.Size = new System.Drawing.Size(24, 13);
            this.PrHu2.TabIndex = 22;
            this.PrHu2.Text = "0/0";
            this.PrHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaHu2
            // 
            this.MaHu2.AutoSize = true;
            this.MaHu2.Location = new System.Drawing.Point(321, 262);
            this.MaHu2.Name = "MaHu2";
            this.MaHu2.Size = new System.Drawing.Size(24, 13);
            this.MaHu2.TabIndex = 22;
            this.MaHu2.Text = "0/0";
            this.MaHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkHu2
            // 
            this.WkHu2.AutoSize = true;
            this.WkHu2.Location = new System.Drawing.Point(321, 225);
            this.WkHu2.Name = "WkHu2";
            this.WkHu2.Size = new System.Drawing.Size(24, 13);
            this.WkHu2.TabIndex = 22;
            this.WkHu2.Text = "0/0";
            this.WkHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrHu2
            // 
            this.DrHu2.AutoSize = true;
            this.DrHu2.Location = new System.Drawing.Point(321, 192);
            this.DrHu2.Name = "DrHu2";
            this.DrHu2.Size = new System.Drawing.Size(24, 13);
            this.DrHu2.TabIndex = 22;
            this.DrHu2.Text = "0/0";
            this.DrHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuHu2
            // 
            this.HuHu2.AutoSize = true;
            this.HuHu2.Location = new System.Drawing.Point(321, 158);
            this.HuHu2.Name = "HuHu2";
            this.HuHu2.Size = new System.Drawing.Size(24, 13);
            this.HuHu2.TabIndex = 22;
            this.HuHu2.Text = "0/0";
            this.HuHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaHu2
            // 
            this.PaHu2.AutoSize = true;
            this.PaHu2.Location = new System.Drawing.Point(321, 127);
            this.PaHu2.Name = "PaHu2";
            this.PaHu2.Size = new System.Drawing.Size(24, 13);
            this.PaHu2.TabIndex = 22;
            this.PaHu2.Text = "0/0";
            this.PaHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShRo2
            // 
            this.ShRo2.AutoSize = true;
            this.ShRo2.Location = new System.Drawing.Point(191, 65);
            this.ShRo2.Name = "ShRo2";
            this.ShRo2.Size = new System.Drawing.Size(24, 13);
            this.ShRo2.TabIndex = 21;
            this.ShRo2.Text = "0/0";
            this.ShRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoHu2
            // 
            this.RoHu2.AutoSize = true;
            this.RoHu2.Location = new System.Drawing.Point(321, 95);
            this.RoHu2.Name = "RoHu2";
            this.RoHu2.Size = new System.Drawing.Size(24, 13);
            this.RoHu2.TabIndex = 22;
            this.RoHu2.Text = "0/0";
            this.RoHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrDr2
            // 
            this.PrDr2.AutoSize = true;
            this.PrDr2.Location = new System.Drawing.Point(384, 299);
            this.PrDr2.Name = "PrDr2";
            this.PrDr2.Size = new System.Drawing.Size(24, 13);
            this.PrDr2.TabIndex = 15;
            this.PrDr2.Text = "0/0";
            this.PrDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaDr2
            // 
            this.MaDr2.AutoSize = true;
            this.MaDr2.Location = new System.Drawing.Point(384, 262);
            this.MaDr2.Name = "MaDr2";
            this.MaDr2.Size = new System.Drawing.Size(24, 13);
            this.MaDr2.TabIndex = 15;
            this.MaDr2.Text = "0/0";
            this.MaDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkDr2
            // 
            this.WkDr2.AutoSize = true;
            this.WkDr2.Location = new System.Drawing.Point(384, 225);
            this.WkDr2.Name = "WkDr2";
            this.WkDr2.Size = new System.Drawing.Size(24, 13);
            this.WkDr2.TabIndex = 15;
            this.WkDr2.Text = "0/0";
            this.WkDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrDr2
            // 
            this.DrDr2.AutoSize = true;
            this.DrDr2.Location = new System.Drawing.Point(384, 192);
            this.DrDr2.Name = "DrDr2";
            this.DrDr2.Size = new System.Drawing.Size(24, 13);
            this.DrDr2.TabIndex = 15;
            this.DrDr2.Text = "0/0";
            this.DrDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuDr2
            // 
            this.HuDr2.AutoSize = true;
            this.HuDr2.Location = new System.Drawing.Point(384, 158);
            this.HuDr2.Name = "HuDr2";
            this.HuDr2.Size = new System.Drawing.Size(24, 13);
            this.HuDr2.TabIndex = 15;
            this.HuDr2.Text = "0/0";
            this.HuDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaDr2
            // 
            this.PaDr2.AutoSize = true;
            this.PaDr2.Location = new System.Drawing.Point(384, 127);
            this.PaDr2.Name = "PaDr2";
            this.PaDr2.Size = new System.Drawing.Size(24, 13);
            this.PaDr2.TabIndex = 15;
            this.PaDr2.Text = "0/0";
            this.PaDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPa2
            // 
            this.ShPa2.AutoSize = true;
            this.ShPa2.Location = new System.Drawing.Point(256, 65);
            this.ShPa2.Name = "ShPa2";
            this.ShPa2.Size = new System.Drawing.Size(24, 13);
            this.ShPa2.TabIndex = 23;
            this.ShPa2.Text = "0/0";
            this.ShPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrWk2
            // 
            this.PrWk2.AutoSize = true;
            this.PrWk2.Location = new System.Drawing.Point(448, 299);
            this.PrWk2.Name = "PrWk2";
            this.PrWk2.Size = new System.Drawing.Size(24, 13);
            this.PrWk2.TabIndex = 14;
            this.PrWk2.Text = "0/0";
            this.PrWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaWk2
            // 
            this.MaWk2.AutoSize = true;
            this.MaWk2.Location = new System.Drawing.Point(448, 262);
            this.MaWk2.Name = "MaWk2";
            this.MaWk2.Size = new System.Drawing.Size(24, 13);
            this.MaWk2.TabIndex = 14;
            this.MaWk2.Text = "0/0";
            this.MaWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkWk2
            // 
            this.WkWk2.AutoSize = true;
            this.WkWk2.Location = new System.Drawing.Point(448, 225);
            this.WkWk2.Name = "WkWk2";
            this.WkWk2.Size = new System.Drawing.Size(24, 13);
            this.WkWk2.TabIndex = 14;
            this.WkWk2.Text = "0/0";
            this.WkWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrWk2
            // 
            this.DrWk2.AutoSize = true;
            this.DrWk2.Location = new System.Drawing.Point(448, 192);
            this.DrWk2.Name = "DrWk2";
            this.DrWk2.Size = new System.Drawing.Size(24, 13);
            this.DrWk2.TabIndex = 14;
            this.DrWk2.Text = "0/0";
            this.DrWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuWk2
            // 
            this.HuWk2.AutoSize = true;
            this.HuWk2.Location = new System.Drawing.Point(448, 158);
            this.HuWk2.Name = "HuWk2";
            this.HuWk2.Size = new System.Drawing.Size(24, 13);
            this.HuWk2.TabIndex = 14;
            this.HuWk2.Text = "0/0";
            this.HuWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrMa2
            // 
            this.PrMa2.AutoSize = true;
            this.PrMa2.Location = new System.Drawing.Point(517, 299);
            this.PrMa2.Name = "PrMa2";
            this.PrMa2.Size = new System.Drawing.Size(24, 13);
            this.PrMa2.TabIndex = 16;
            this.PrMa2.Text = "0/0";
            this.PrMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaMa2
            // 
            this.MaMa2.AutoSize = true;
            this.MaMa2.Location = new System.Drawing.Point(517, 262);
            this.MaMa2.Name = "MaMa2";
            this.MaMa2.Size = new System.Drawing.Size(24, 13);
            this.MaMa2.TabIndex = 16;
            this.MaMa2.Text = "0/0";
            this.MaMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoDr2
            // 
            this.RoDr2.AutoSize = true;
            this.RoDr2.Location = new System.Drawing.Point(384, 95);
            this.RoDr2.Name = "RoDr2";
            this.RoDr2.Size = new System.Drawing.Size(24, 13);
            this.RoDr2.TabIndex = 15;
            this.RoDr2.Text = "0/0";
            this.RoDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkMa2
            // 
            this.WkMa2.AutoSize = true;
            this.WkMa2.Location = new System.Drawing.Point(517, 225);
            this.WkMa2.Name = "WkMa2";
            this.WkMa2.Size = new System.Drawing.Size(24, 13);
            this.WkMa2.TabIndex = 16;
            this.WkMa2.Text = "0/0";
            this.WkMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaWk2
            // 
            this.PaWk2.AutoSize = true;
            this.PaWk2.Location = new System.Drawing.Point(448, 127);
            this.PaWk2.Name = "PaWk2";
            this.PaWk2.Size = new System.Drawing.Size(24, 13);
            this.PaWk2.TabIndex = 14;
            this.PaWk2.Text = "0/0";
            this.PaWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrMa2
            // 
            this.DrMa2.AutoSize = true;
            this.DrMa2.Location = new System.Drawing.Point(517, 192);
            this.DrMa2.Name = "DrMa2";
            this.DrMa2.Size = new System.Drawing.Size(24, 13);
            this.DrMa2.TabIndex = 16;
            this.DrMa2.Text = "0/0";
            this.DrMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShHu2
            // 
            this.ShHu2.AutoSize = true;
            this.ShHu2.Location = new System.Drawing.Point(321, 65);
            this.ShHu2.Name = "ShHu2";
            this.ShHu2.Size = new System.Drawing.Size(24, 13);
            this.ShHu2.TabIndex = 22;
            this.ShHu2.Text = "0/0";
            this.ShHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuMa2
            // 
            this.HuMa2.AutoSize = true;
            this.HuMa2.Location = new System.Drawing.Point(517, 158);
            this.HuMa2.Name = "HuMa2";
            this.HuMa2.Size = new System.Drawing.Size(24, 13);
            this.HuMa2.TabIndex = 16;
            this.HuMa2.Text = "0/0";
            this.HuMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PrPr2
            // 
            this.PrPr2.AutoSize = true;
            this.PrPr2.Location = new System.Drawing.Point(580, 299);
            this.PrPr2.Name = "PrPr2";
            this.PrPr2.Size = new System.Drawing.Size(24, 13);
            this.PrPr2.TabIndex = 18;
            this.PrPr2.Text = "0/0";
            this.PrPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // MaPr2
            // 
            this.MaPr2.AutoSize = true;
            this.MaPr2.Location = new System.Drawing.Point(580, 262);
            this.MaPr2.Name = "MaPr2";
            this.MaPr2.Size = new System.Drawing.Size(24, 13);
            this.MaPr2.TabIndex = 18;
            this.MaPr2.Text = "0/0";
            this.MaPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoWk2
            // 
            this.RoWk2.AutoSize = true;
            this.RoWk2.Location = new System.Drawing.Point(448, 95);
            this.RoWk2.Name = "RoWk2";
            this.RoWk2.Size = new System.Drawing.Size(24, 13);
            this.RoWk2.TabIndex = 14;
            this.RoWk2.Text = "0/0";
            this.RoWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WkPr2
            // 
            this.WkPr2.AutoSize = true;
            this.WkPr2.Location = new System.Drawing.Point(580, 225);
            this.WkPr2.Name = "WkPr2";
            this.WkPr2.Size = new System.Drawing.Size(24, 13);
            this.WkPr2.TabIndex = 18;
            this.WkPr2.Text = "0/0";
            this.WkPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaMa2
            // 
            this.PaMa2.AutoSize = true;
            this.PaMa2.Location = new System.Drawing.Point(517, 127);
            this.PaMa2.Name = "PaMa2";
            this.PaMa2.Size = new System.Drawing.Size(24, 13);
            this.PaMa2.TabIndex = 16;
            this.PaMa2.Text = "0/0";
            this.PaMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // DrPr2
            // 
            this.DrPr2.AutoSize = true;
            this.DrPr2.Location = new System.Drawing.Point(580, 192);
            this.DrPr2.Name = "DrPr2";
            this.DrPr2.Size = new System.Drawing.Size(24, 13);
            this.DrPr2.TabIndex = 18;
            this.DrPr2.Text = "0/0";
            this.DrPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShDr2
            // 
            this.ShDr2.AutoSize = true;
            this.ShDr2.Location = new System.Drawing.Point(384, 65);
            this.ShDr2.Name = "ShDr2";
            this.ShDr2.Size = new System.Drawing.Size(24, 13);
            this.ShDr2.TabIndex = 15;
            this.ShDr2.Text = "0/0";
            this.ShDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuPr2
            // 
            this.HuPr2.AutoSize = true;
            this.HuPr2.Location = new System.Drawing.Point(580, 158);
            this.HuPr2.Name = "HuPr2";
            this.HuPr2.Size = new System.Drawing.Size(24, 13);
            this.HuPr2.TabIndex = 18;
            this.HuPr2.Text = "0/0";
            this.HuPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoMa2
            // 
            this.RoMa2.AutoSize = true;
            this.RoMa2.Location = new System.Drawing.Point(517, 95);
            this.RoMa2.Name = "RoMa2";
            this.RoMa2.Size = new System.Drawing.Size(24, 13);
            this.RoMa2.TabIndex = 16;
            this.RoMa2.Text = "0/0";
            this.RoMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // PaPr2
            // 
            this.PaPr2.AutoSize = true;
            this.PaPr2.Location = new System.Drawing.Point(580, 127);
            this.PaPr2.Name = "PaPr2";
            this.PaPr2.Size = new System.Drawing.Size(24, 13);
            this.PaPr2.TabIndex = 18;
            this.PaPr2.Text = "0/0";
            this.PaPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShWk2
            // 
            this.ShWk2.AutoSize = true;
            this.ShWk2.Location = new System.Drawing.Point(448, 65);
            this.ShWk2.Name = "ShWk2";
            this.ShWk2.Size = new System.Drawing.Size(24, 13);
            this.ShWk2.TabIndex = 14;
            this.ShWk2.Text = "0/0";
            this.ShWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // RoPr2
            // 
            this.RoPr2.AutoSize = true;
            this.RoPr2.Location = new System.Drawing.Point(580, 95);
            this.RoPr2.Name = "RoPr2";
            this.RoPr2.Size = new System.Drawing.Size(24, 13);
            this.RoPr2.TabIndex = 18;
            this.RoPr2.Text = "0/0";
            this.RoPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShMa2
            // 
            this.ShMa2.AutoSize = true;
            this.ShMa2.Location = new System.Drawing.Point(517, 65);
            this.ShMa2.Name = "ShMa2";
            this.ShMa2.Size = new System.Drawing.Size(24, 13);
            this.ShMa2.TabIndex = 16;
            this.ShMa2.Text = "0/0";
            this.ShMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ShPr2
            // 
            this.ShPr2.AutoSize = true;
            this.ShPr2.Location = new System.Drawing.Point(580, 65);
            this.ShPr2.Name = "ShPr2";
            this.ShPr2.Size = new System.Drawing.Size(24, 13);
            this.ShPr2.TabIndex = 18;
            this.ShPr2.Text = "0/0";
            this.ShPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // ToTo2
            // 
            this.ToTo2.AutoSize = true;
            this.ToTo2.Location = new System.Drawing.Point(646, 333);
            this.ToTo2.Name = "ToTo2";
            this.ToTo2.Size = new System.Drawing.Size(24, 13);
            this.ToTo2.TabIndex = 17;
            this.ToTo2.Text = "0/0";
            // 
            // PrTo2
            // 
            this.PrTo2.AutoSize = true;
            this.PrTo2.Location = new System.Drawing.Point(646, 299);
            this.PrTo2.Name = "PrTo2";
            this.PrTo2.Size = new System.Drawing.Size(24, 13);
            this.PrTo2.TabIndex = 17;
            this.PrTo2.Text = "0/0";
            // 
            // MaTo2
            // 
            this.MaTo2.AutoSize = true;
            this.MaTo2.Location = new System.Drawing.Point(646, 262);
            this.MaTo2.Name = "MaTo2";
            this.MaTo2.Size = new System.Drawing.Size(24, 13);
            this.MaTo2.TabIndex = 17;
            this.MaTo2.Text = "0/0";
            // 
            // PaTo2
            // 
            this.PaTo2.AutoSize = true;
            this.PaTo2.Location = new System.Drawing.Point(646, 127);
            this.PaTo2.Name = "PaTo2";
            this.PaTo2.Size = new System.Drawing.Size(24, 13);
            this.PaTo2.TabIndex = 17;
            this.PaTo2.Text = "0/0";
            // 
            // WkTo2
            // 
            this.WkTo2.AutoSize = true;
            this.WkTo2.Location = new System.Drawing.Point(646, 225);
            this.WkTo2.Name = "WkTo2";
            this.WkTo2.Size = new System.Drawing.Size(24, 13);
            this.WkTo2.TabIndex = 17;
            this.WkTo2.Text = "0/0";
            // 
            // RoTo2
            // 
            this.RoTo2.AutoSize = true;
            this.RoTo2.Location = new System.Drawing.Point(646, 95);
            this.RoTo2.Name = "RoTo2";
            this.RoTo2.Size = new System.Drawing.Size(24, 13);
            this.RoTo2.TabIndex = 17;
            this.RoTo2.Text = "0/0";
            // 
            // DrTo2
            // 
            this.DrTo2.AutoSize = true;
            this.DrTo2.Location = new System.Drawing.Point(646, 192);
            this.DrTo2.Name = "DrTo2";
            this.DrTo2.Size = new System.Drawing.Size(24, 13);
            this.DrTo2.TabIndex = 17;
            this.DrTo2.Text = "0/0";
            // 
            // ShTo2
            // 
            this.ShTo2.AutoSize = true;
            this.ShTo2.Location = new System.Drawing.Point(646, 65);
            this.ShTo2.Name = "ShTo2";
            this.ShTo2.Size = new System.Drawing.Size(24, 13);
            this.ShTo2.TabIndex = 17;
            this.ShTo2.Text = "0/0";
            // 
            // WaWa2
            // 
            this.WaWa2.AutoSize = true;
            this.WaWa2.Location = new System.Drawing.Point(66, 34);
            this.WaWa2.Name = "WaWa2";
            this.WaWa2.Size = new System.Drawing.Size(24, 13);
            this.WaWa2.TabIndex = 12;
            this.WaWa2.Text = "0/0";
            this.WaWa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaSh2
            // 
            this.WaSh2.AutoSize = true;
            this.WaSh2.Location = new System.Drawing.Point(125, 34);
            this.WaSh2.Name = "WaSh2";
            this.WaSh2.Size = new System.Drawing.Size(24, 13);
            this.WaSh2.TabIndex = 12;
            this.WaSh2.Text = "0/0";
            this.WaSh2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaRo2
            // 
            this.WaRo2.AutoSize = true;
            this.WaRo2.Location = new System.Drawing.Point(191, 34);
            this.WaRo2.Name = "WaRo2";
            this.WaRo2.Size = new System.Drawing.Size(24, 13);
            this.WaRo2.TabIndex = 12;
            this.WaRo2.Text = "0/0";
            this.WaRo2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaPa2
            // 
            this.WaPa2.AutoSize = true;
            this.WaPa2.Location = new System.Drawing.Point(256, 34);
            this.WaPa2.Name = "WaPa2";
            this.WaPa2.Size = new System.Drawing.Size(24, 13);
            this.WaPa2.TabIndex = 12;
            this.WaPa2.Text = "0/0";
            this.WaPa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaHu2
            // 
            this.WaHu2.AutoSize = true;
            this.WaHu2.Location = new System.Drawing.Point(321, 34);
            this.WaHu2.Name = "WaHu2";
            this.WaHu2.Size = new System.Drawing.Size(24, 13);
            this.WaHu2.TabIndex = 12;
            this.WaHu2.Text = "0/0";
            this.WaHu2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaDr2
            // 
            this.WaDr2.AutoSize = true;
            this.WaDr2.Location = new System.Drawing.Point(384, 34);
            this.WaDr2.Name = "WaDr2";
            this.WaDr2.Size = new System.Drawing.Size(24, 13);
            this.WaDr2.TabIndex = 12;
            this.WaDr2.Text = "0/0";
            this.WaDr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaWk2
            // 
            this.WaWk2.AutoSize = true;
            this.WaWk2.Location = new System.Drawing.Point(448, 34);
            this.WaWk2.Name = "WaWk2";
            this.WaWk2.Size = new System.Drawing.Size(24, 13);
            this.WaWk2.TabIndex = 12;
            this.WaWk2.Text = "0/0";
            this.WaWk2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaMa2
            // 
            this.WaMa2.AutoSize = true;
            this.WaMa2.Location = new System.Drawing.Point(517, 34);
            this.WaMa2.Name = "WaMa2";
            this.WaMa2.Size = new System.Drawing.Size(24, 13);
            this.WaMa2.TabIndex = 12;
            this.WaMa2.Text = "0/0";
            this.WaMa2.Click += new System.EventHandler(this.Record_Click);
            // 
            // HuTo2
            // 
            this.HuTo2.AutoSize = true;
            this.HuTo2.Location = new System.Drawing.Point(646, 161);
            this.HuTo2.Name = "HuTo2";
            this.HuTo2.Size = new System.Drawing.Size(24, 13);
            this.HuTo2.TabIndex = 12;
            this.HuTo2.Text = "0/0";
            // 
            // WaPr2
            // 
            this.WaPr2.AutoSize = true;
            this.WaPr2.Location = new System.Drawing.Point(580, 34);
            this.WaPr2.Name = "WaPr2";
            this.WaPr2.Size = new System.Drawing.Size(24, 13);
            this.WaPr2.TabIndex = 12;
            this.WaPr2.Text = "0/0";
            this.WaPr2.Click += new System.EventHandler(this.Record_Click);
            // 
            // WaTo2
            // 
            this.WaTo2.AutoSize = true;
            this.WaTo2.Location = new System.Drawing.Point(646, 34);
            this.WaTo2.Name = "WaTo2";
            this.WaTo2.Size = new System.Drawing.Size(24, 13);
            this.WaTo2.TabIndex = 12;
            this.WaTo2.Text = "0/0";
            // 
            // TotalLabel3
            // 
            this.TotalLabel3.AutoSize = true;
            this.TotalLabel3.Location = new System.Drawing.Point(642, 7);
            this.TotalLabel3.Name = "TotalLabel3";
            this.TotalLabel3.Size = new System.Drawing.Size(31, 13);
            this.TotalLabel3.TabIndex = 2;
            this.TotalLabel3.Text = "Total";
            // 
            // DruidLabel3
            // 
            this.DruidLabel3.AutoSize = true;
            this.DruidLabel3.Location = new System.Drawing.Point(576, 7);
            this.DruidLabel3.Name = "DruidLabel3";
            this.DruidLabel3.Size = new System.Drawing.Size(33, 13);
            this.DruidLabel3.TabIndex = 2;
            this.DruidLabel3.Text = "Priest";
            // 
            // WarlockLabel3
            // 
            this.WarlockLabel3.AutoSize = true;
            this.WarlockLabel3.Location = new System.Drawing.Point(512, 7);
            this.WarlockLabel3.Name = "WarlockLabel3";
            this.WarlockLabel3.Size = new System.Drawing.Size(34, 13);
            this.WarlockLabel3.TabIndex = 2;
            this.WarlockLabel3.Text = "Mage";
            // 
            // MageLabel3
            // 
            this.MageLabel3.AutoSize = true;
            this.MageLabel3.Location = new System.Drawing.Point(438, 7);
            this.MageLabel3.Name = "MageLabel3";
            this.MageLabel3.Size = new System.Drawing.Size(47, 13);
            this.MageLabel3.TabIndex = 2;
            this.MageLabel3.Text = "Warlock";
            // 
            // PriestLabel3
            // 
            this.PriestLabel3.AutoSize = true;
            this.PriestLabel3.Location = new System.Drawing.Point(380, 7);
            this.PriestLabel3.Name = "PriestLabel3";
            this.PriestLabel3.Size = new System.Drawing.Size(32, 13);
            this.PriestLabel3.TabIndex = 2;
            this.PriestLabel3.Text = "Druid";
            // 
            // HunterLabel3
            // 
            this.HunterLabel3.AutoSize = true;
            this.HunterLabel3.Location = new System.Drawing.Point(315, 7);
            this.HunterLabel3.Name = "HunterLabel3";
            this.HunterLabel3.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel3.TabIndex = 2;
            this.HunterLabel3.Text = "Hunter";
            // 
            // PaladinLabel3
            // 
            this.PaladinLabel3.AutoSize = true;
            this.PaladinLabel3.Location = new System.Drawing.Point(247, 7);
            this.PaladinLabel3.Name = "PaladinLabel3";
            this.PaladinLabel3.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel3.TabIndex = 2;
            this.PaladinLabel3.Text = "Paladin";
            // 
            // RogueLabel3
            // 
            this.RogueLabel3.AutoSize = true;
            this.RogueLabel3.Location = new System.Drawing.Point(184, 7);
            this.RogueLabel3.Name = "RogueLabel3";
            this.RogueLabel3.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel3.TabIndex = 2;
            this.RogueLabel3.Text = "Rogue";
            // 
            // ShamanLabel3
            // 
            this.ShamanLabel3.AutoSize = true;
            this.ShamanLabel3.Location = new System.Drawing.Point(114, 7);
            this.ShamanLabel3.Name = "ShamanLabel3";
            this.ShamanLabel3.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel3.TabIndex = 1;
            this.ShamanLabel3.Text = "Shaman";
            // 
            // WarriorLabel3
            // 
            this.WarriorLabel3.AutoSize = true;
            this.WarriorLabel3.Location = new System.Drawing.Point(53, 7);
            this.WarriorLabel3.Name = "WarriorLabel3";
            this.WarriorLabel3.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel3.TabIndex = 0;
            this.WarriorLabel3.Text = "Warrior";
            // 
            // HunterLabel4
            // 
            this.HunterLabel4.AutoSize = true;
            this.HunterLabel4.Location = new System.Drawing.Point(6, 158);
            this.HunterLabel4.Name = "HunterLabel4";
            this.HunterLabel4.Size = new System.Drawing.Size(39, 13);
            this.HunterLabel4.TabIndex = 0;
            this.HunterLabel4.Text = "Hunter";
            // 
            // WarriorLabel4
            // 
            this.WarriorLabel4.AutoSize = true;
            this.WarriorLabel4.Location = new System.Drawing.Point(6, 34);
            this.WarriorLabel4.Name = "WarriorLabel4";
            this.WarriorLabel4.Size = new System.Drawing.Size(41, 13);
            this.WarriorLabel4.TabIndex = 0;
            this.WarriorLabel4.Text = "Warrior";
            // 
            // TotalLabel4
            // 
            this.TotalLabel4.AutoSize = true;
            this.TotalLabel4.Location = new System.Drawing.Point(575, 333);
            this.TotalLabel4.Name = "TotalLabel4";
            this.TotalLabel4.Size = new System.Drawing.Size(34, 13);
            this.TotalLabel4.TabIndex = 24;
            this.TotalLabel4.Text = "Total:";
            // 
            // PriestLabel4
            // 
            this.PriestLabel4.AutoSize = true;
            this.PriestLabel4.Location = new System.Drawing.Point(6, 299);
            this.PriestLabel4.Name = "PriestLabel4";
            this.PriestLabel4.Size = new System.Drawing.Size(33, 13);
            this.PriestLabel4.TabIndex = 13;
            this.PriestLabel4.Text = "Priest";
            // 
            // MageLabel4
            // 
            this.MageLabel4.AutoSize = true;
            this.MageLabel4.Location = new System.Drawing.Point(6, 262);
            this.MageLabel4.Name = "MageLabel4";
            this.MageLabel4.Size = new System.Drawing.Size(34, 13);
            this.MageLabel4.TabIndex = 13;
            this.MageLabel4.Text = "Mage";
            // 
            // WarlockLabel4
            // 
            this.WarlockLabel4.AutoSize = true;
            this.WarlockLabel4.Location = new System.Drawing.Point(6, 225);
            this.WarlockLabel4.Name = "WarlockLabel4";
            this.WarlockLabel4.Size = new System.Drawing.Size(47, 13);
            this.WarlockLabel4.TabIndex = 13;
            this.WarlockLabel4.Text = "Warlock";
            // 
            // PaladinLabel4
            // 
            this.PaladinLabel4.AutoSize = true;
            this.PaladinLabel4.Location = new System.Drawing.Point(6, 127);
            this.PaladinLabel4.Name = "PaladinLabel4";
            this.PaladinLabel4.Size = new System.Drawing.Size(42, 13);
            this.PaladinLabel4.TabIndex = 13;
            this.PaladinLabel4.Text = "Paladin";
            // 
            // DruidLabel4
            // 
            this.DruidLabel4.AutoSize = true;
            this.DruidLabel4.Location = new System.Drawing.Point(6, 192);
            this.DruidLabel4.Name = "DruidLabel4";
            this.DruidLabel4.Size = new System.Drawing.Size(32, 13);
            this.DruidLabel4.TabIndex = 13;
            this.DruidLabel4.Text = "Druid";
            // 
            // RogueLabel4
            // 
            this.RogueLabel4.AutoSize = true;
            this.RogueLabel4.Location = new System.Drawing.Point(6, 95);
            this.RogueLabel4.Name = "RogueLabel4";
            this.RogueLabel4.Size = new System.Drawing.Size(39, 13);
            this.RogueLabel4.TabIndex = 13;
            this.RogueLabel4.Text = "Rogue";
            // 
            // ShamanLabel4
            // 
            this.ShamanLabel4.AutoSize = true;
            this.ShamanLabel4.Location = new System.Drawing.Point(6, 65);
            this.ShamanLabel4.Name = "ShamanLabel4";
            this.ShamanLabel4.Size = new System.Drawing.Size(46, 13);
            this.ShamanLabel4.TabIndex = 13;
            this.ShamanLabel4.Text = "Shaman";
            // 
            // Deck9RecordText
            // 
            this.Deck9RecordText.AutoSize = true;
            this.Deck9RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck9RecordText.Location = new System.Drawing.Point(380, 365);
            this.Deck9RecordText.Name = "Deck9RecordText";
            this.Deck9RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck9RecordText.TabIndex = 21;
            this.Deck9RecordText.Text = "0/0";
            this.Deck9RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck8RecordText
            // 
            this.Deck8RecordText.AutoSize = true;
            this.Deck8RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck8RecordText.Location = new System.Drawing.Point(380, 330);
            this.Deck8RecordText.Name = "Deck8RecordText";
            this.Deck8RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck8RecordText.TabIndex = 20;
            this.Deck8RecordText.Text = "0/0";
            this.Deck8RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck7RecordText
            // 
            this.Deck7RecordText.AutoSize = true;
            this.Deck7RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck7RecordText.Location = new System.Drawing.Point(380, 295);
            this.Deck7RecordText.Name = "Deck7RecordText";
            this.Deck7RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck7RecordText.TabIndex = 19;
            this.Deck7RecordText.Text = "0/0";
            this.Deck7RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck6RecordText
            // 
            this.Deck6RecordText.AutoSize = true;
            this.Deck6RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck6RecordText.Location = new System.Drawing.Point(380, 260);
            this.Deck6RecordText.Name = "Deck6RecordText";
            this.Deck6RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck6RecordText.TabIndex = 18;
            this.Deck6RecordText.Text = "0/0";
            this.Deck6RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck5RecordText
            // 
            this.Deck5RecordText.AutoSize = true;
            this.Deck5RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck5RecordText.Location = new System.Drawing.Point(380, 225);
            this.Deck5RecordText.Name = "Deck5RecordText";
            this.Deck5RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck5RecordText.TabIndex = 17;
            this.Deck5RecordText.Text = "0/0";
            this.Deck5RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck4RecordText
            // 
            this.Deck4RecordText.AutoSize = true;
            this.Deck4RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck4RecordText.Location = new System.Drawing.Point(380, 190);
            this.Deck4RecordText.Name = "Deck4RecordText";
            this.Deck4RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck4RecordText.TabIndex = 16;
            this.Deck4RecordText.Text = "0/0";
            this.Deck4RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck3RecordText
            // 
            this.Deck3RecordText.AutoSize = true;
            this.Deck3RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck3RecordText.Location = new System.Drawing.Point(380, 154);
            this.Deck3RecordText.Name = "Deck3RecordText";
            this.Deck3RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck3RecordText.TabIndex = 15;
            this.Deck3RecordText.Text = "0/0";
            this.Deck3RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck2RecordText
            // 
            this.Deck2RecordText.AutoSize = true;
            this.Deck2RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck2RecordText.Location = new System.Drawing.Point(380, 119);
            this.Deck2RecordText.Name = "Deck2RecordText";
            this.Deck2RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck2RecordText.TabIndex = 14;
            this.Deck2RecordText.Text = "0/0";
            this.Deck2RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck1RecordText
            // 
            this.Deck1RecordText.AutoSize = true;
            this.Deck1RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck1RecordText.Location = new System.Drawing.Point(380, 84);
            this.Deck1RecordText.Name = "Deck1RecordText";
            this.Deck1RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck1RecordText.TabIndex = 13;
            this.Deck1RecordText.Text = "0/0";
            this.Deck1RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // Deck0RecordText
            // 
            this.Deck0RecordText.AutoSize = true;
            this.Deck0RecordText.Font = new System.Drawing.Font("Arial", 18F, System.Drawing.FontStyle.Bold);
            this.Deck0RecordText.Location = new System.Drawing.Point(380, 47);
            this.Deck0RecordText.Name = "Deck0RecordText";
            this.Deck0RecordText.Size = new System.Drawing.Size(46, 29);
            this.Deck0RecordText.TabIndex = 12;
            this.Deck0RecordText.Text = "0/0";
            this.Deck0RecordText.Click += new System.EventHandler(this.Record_Click);
            // 
            // RecordText
            // 
            this.RecordText.AutoSize = true;
            this.RecordText.Location = new System.Drawing.Point(381, 24);
            this.RecordText.Name = "RecordText";
            this.RecordText.Size = new System.Drawing.Size(42, 13);
            this.RecordText.TabIndex = 11;
            this.RecordText.Text = "Record";
            // 
            // DecksText
            // 
            this.DecksText.AutoSize = true;
            this.DecksText.Location = new System.Drawing.Point(163, 24);
            this.DecksText.Name = "DecksText";
            this.DecksText.Size = new System.Drawing.Size(38, 13);
            this.DecksText.TabIndex = 10;
            this.DecksText.Text = "Decks";
            // 
            // Deck9TextBox
            // 
            this.Deck9TextBox.Location = new System.Drawing.Point(58, 367);
            this.Deck9TextBox.Name = "Deck9TextBox";
            this.Deck9TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck9TextBox.TabIndex = 9;
            this.Deck9TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck8TextBox
            // 
            this.Deck8TextBox.Location = new System.Drawing.Point(58, 332);
            this.Deck8TextBox.Name = "Deck8TextBox";
            this.Deck8TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck8TextBox.TabIndex = 8;
            this.Deck8TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck7TextBox
            // 
            this.Deck7TextBox.Location = new System.Drawing.Point(58, 297);
            this.Deck7TextBox.Name = "Deck7TextBox";
            this.Deck7TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck7TextBox.TabIndex = 7;
            this.Deck7TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck6TextBox
            // 
            this.Deck6TextBox.Location = new System.Drawing.Point(58, 262);
            this.Deck6TextBox.Name = "Deck6TextBox";
            this.Deck6TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck6TextBox.TabIndex = 6;
            this.Deck6TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck5TextBox
            // 
            this.Deck5TextBox.Location = new System.Drawing.Point(58, 227);
            this.Deck5TextBox.Name = "Deck5TextBox";
            this.Deck5TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck5TextBox.TabIndex = 5;
            this.Deck5TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck4TextBox
            // 
            this.Deck4TextBox.Location = new System.Drawing.Point(58, 192);
            this.Deck4TextBox.Name = "Deck4TextBox";
            this.Deck4TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck4TextBox.TabIndex = 4;
            this.Deck4TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck3TextBox
            // 
            this.Deck3TextBox.Location = new System.Drawing.Point(58, 156);
            this.Deck3TextBox.Name = "Deck3TextBox";
            this.Deck3TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck3TextBox.TabIndex = 3;
            this.Deck3TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck2TextBox
            // 
            this.Deck2TextBox.Location = new System.Drawing.Point(58, 121);
            this.Deck2TextBox.Name = "Deck2TextBox";
            this.Deck2TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck2TextBox.TabIndex = 2;
            this.Deck2TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck1TextBox
            // 
            this.Deck1TextBox.Location = new System.Drawing.Point(58, 86);
            this.Deck1TextBox.Name = "Deck1TextBox";
            this.Deck1TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck1TextBox.TabIndex = 1;
            this.Deck1TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // Deck0TextBox
            // 
            this.Deck0TextBox.Location = new System.Drawing.Point(58, 49);
            this.Deck0TextBox.Name = "Deck0TextBox";
            this.Deck0TextBox.Size = new System.Drawing.Size(261, 20);
            this.Deck0TextBox.TabIndex = 0;
            this.Deck0TextBox.TextChanged += new System.EventHandler(this.TextChangedEvent);
            // 
            // DisconnectsLabel
            // 
            this.DisconnectsLabel.AutoSize = true;
            this.DisconnectsLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.DisconnectsLabel.Location = new System.Drawing.Point(1053, 16);
            this.DisconnectsLabel.Name = "DisconnectsLabel";
            this.DisconnectsLabel.Size = new System.Drawing.Size(113, 20);
            this.DisconnectsLabel.TabIndex = 28;
            this.DisconnectsLabel.Text = "Disconnects:";
            // 
            // Disconnect
            // 
            this.Disconnect.AutoSize = true;
            this.Disconnect.Font = new System.Drawing.Font("Berlin Sans FB", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Disconnect.Location = new System.Drawing.Point(1173, 15);
            this.Disconnect.Name = "Disconnect";
            this.Disconnect.Size = new System.Drawing.Size(21, 21);
            this.Disconnect.TabIndex = 29;
            this.Disconnect.Text = "0";
            this.Disconnect.Click += new System.EventHandler(this.Disconnect_Click);

            foreach (Control label in PlayTab.Controls)
            {
                if (label is Label)
                {
                    label.Font = new System.Drawing.Font("Microsoft YaHei UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                }
            }

            foreach (Control label in ArenaTab.Controls)
            {
                if (label is Label)
                {
                    label.Font = new System.Drawing.Font("Microsoft YaHei UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                }
            }

            foreach (Control label in RankedTab.Controls)
            {
                if (label is Label)
                {
                    label.Font = new System.Drawing.Font("Microsoft YaHei UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                }
            }

            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 461);
            this.Controls.Add(this.MainPanel);
            this.Name = "Form1";
            this.Text = "Hearthstone Stat Tracker";
            this.MainPanel.ResumeLayout(false);
            this.MainPanel.PerformLayout();
            this.tabControl1.ResumeLayout(false);
            this.PlayTab.ResumeLayout(false);
            this.PlayTab.PerformLayout();
            this.RankedTab.ResumeLayout(false);
            this.RankedTab.PerformLayout();
            this.ArenaTab.ResumeLayout(false);
            this.ArenaTab.PerformLayout();
            this.ResumeLayout(false);
        }
        #endregion


        private System.Windows.Forms.Panel MainPanel;
        private System.Windows.Forms.TextBox Deck9TextBox;
        private System.Windows.Forms.TextBox Deck8TextBox;
        private System.Windows.Forms.TextBox Deck7TextBox;
        private System.Windows.Forms.TextBox Deck6TextBox;
        private System.Windows.Forms.TextBox Deck5TextBox;
        private System.Windows.Forms.TextBox Deck4TextBox;
        private System.Windows.Forms.TextBox Deck3TextBox;
        private System.Windows.Forms.TextBox Deck2TextBox;
        private System.Windows.Forms.TextBox Deck1TextBox;
        private System.Windows.Forms.TextBox Deck0TextBox;
        private System.Windows.Forms.Label DecksText;
        private System.Windows.Forms.Label RecordText;
        private System.Windows.Forms.Label Deck9RecordText;
        private System.Windows.Forms.Label Deck8RecordText;
        private System.Windows.Forms.Label Deck7RecordText;
        private System.Windows.Forms.Label Deck6RecordText;
        private System.Windows.Forms.Label Deck5RecordText;
        private System.Windows.Forms.Label Deck4RecordText;
        private System.Windows.Forms.Label Deck3RecordText;
        private System.Windows.Forms.Label Deck2RecordText;
        private System.Windows.Forms.Label Deck1RecordText;
        private System.Windows.Forms.Label Deck0RecordText;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage RankedTab;
        private System.Windows.Forms.TabPage ArenaTab;
        private System.Windows.Forms.TabPage PlayTab;
        private System.Windows.Forms.Label WarriorLabel1;
        private System.Windows.Forms.Label ShamanLabel1;
        private System.Windows.Forms.Label RogueLabel1;
        private System.Windows.Forms.Label PaladinLabel1;
        private System.Windows.Forms.Label TotalLabel1;
        private System.Windows.Forms.Label DruidLabel1;
        private System.Windows.Forms.Label WarlockLabel1;
        private System.Windows.Forms.Label MageLabel1;
        private System.Windows.Forms.Label PriestLabel1;
        private System.Windows.Forms.Label HunterLabel1;
        private System.Windows.Forms.Label WarriorLabel2;
        private System.Windows.Forms.Label ShamanLabel2;
        private System.Windows.Forms.Label RogueLabel2;
        private System.Windows.Forms.Label PriestLabel2;
        private System.Windows.Forms.Label MageLabel2;
        private System.Windows.Forms.Label WarlockLabel2;
        private System.Windows.Forms.Label PaladinLabel2;
        private System.Windows.Forms.Label DruidLabel2;
        private System.Windows.Forms.Label HunterLabel2;
        private System.Windows.Forms.Label TotalLabel2;
        private System.Windows.Forms.Label WaWa;
        private System.Windows.Forms.Label WaSh;
        private System.Windows.Forms.Label WaRo;
        private System.Windows.Forms.Label WaPa;
        private System.Windows.Forms.Label WaHu;
        private System.Windows.Forms.Label WaDr;
        private System.Windows.Forms.Label WaWk;
        private System.Windows.Forms.Label WaMa;
        private System.Windows.Forms.Label WaPr;
        private System.Windows.Forms.Label WaTo;
        private System.Windows.Forms.Label ShWa;
        private System.Windows.Forms.Label ShSh;
        private System.Windows.Forms.Label ShRo;
        private System.Windows.Forms.Label ShPa;
        private System.Windows.Forms.Label ShHu;
        private System.Windows.Forms.Label ShDr;
        private System.Windows.Forms.Label ShWk;
        private System.Windows.Forms.Label ShMa;
        private System.Windows.Forms.Label ShPr;
        private System.Windows.Forms.Label ShTo;
        private System.Windows.Forms.Label RoWa;
        private System.Windows.Forms.Label RoSh;
        private System.Windows.Forms.Label RoRo;
        private System.Windows.Forms.Label RoPa;
        private System.Windows.Forms.Label RoHu;
        private System.Windows.Forms.Label RoDr;
        private System.Windows.Forms.Label RoWk;
        private System.Windows.Forms.Label RoMa;
        private System.Windows.Forms.Label RoPr;
        private System.Windows.Forms.Label RoTo;
        private System.Windows.Forms.Label PrWa;
        private System.Windows.Forms.Label MaWa;
        private System.Windows.Forms.Label WkWa;
        private System.Windows.Forms.Label DrWa;
        private System.Windows.Forms.Label HuWa;
        private System.Windows.Forms.Label PaWa;
        private System.Windows.Forms.Label PrSh;
        private System.Windows.Forms.Label MaSh;
        private System.Windows.Forms.Label WkSh;
        private System.Windows.Forms.Label DrSh;
        private System.Windows.Forms.Label HuSh;
        private System.Windows.Forms.Label PaSh;
        private System.Windows.Forms.Label PrRo;
        private System.Windows.Forms.Label MaRo;
        private System.Windows.Forms.Label WkRo;
        private System.Windows.Forms.Label DrRo;
        private System.Windows.Forms.Label HuRo;
        private System.Windows.Forms.Label PaRo;
        private System.Windows.Forms.Label PrPa;
        private System.Windows.Forms.Label MaPa;
        private System.Windows.Forms.Label WkPa;
        private System.Windows.Forms.Label DrPa;
        private System.Windows.Forms.Label HuPa;
        private System.Windows.Forms.Label PaPa;
        private System.Windows.Forms.Label PrHu;
        private System.Windows.Forms.Label MaHu;
        private System.Windows.Forms.Label WkHu;
        private System.Windows.Forms.Label DrHu;
        private System.Windows.Forms.Label HuHu;
        private System.Windows.Forms.Label PaHu;
        private System.Windows.Forms.Label PrDr;
        private System.Windows.Forms.Label MaDr;
        private System.Windows.Forms.Label WkDr;
        private System.Windows.Forms.Label DrDr;
        private System.Windows.Forms.Label HuDr;
        private System.Windows.Forms.Label PaDr;
        private System.Windows.Forms.Label PrWk;
        private System.Windows.Forms.Label MaWk;
        private System.Windows.Forms.Label WkWk;
        private System.Windows.Forms.Label DrWk;
        private System.Windows.Forms.Label HuWk;
        private System.Windows.Forms.Label PrMa;
        private System.Windows.Forms.Label MaMa;
        private System.Windows.Forms.Label WkMa;
        private System.Windows.Forms.Label PaWk;
        private System.Windows.Forms.Label DrMa;
        private System.Windows.Forms.Label HuMa;
        private System.Windows.Forms.Label PrPr;
        private System.Windows.Forms.Label MaPr;
        private System.Windows.Forms.Label WkPr;
        private System.Windows.Forms.Label PaMa;
        private System.Windows.Forms.Label DrPr;
        private System.Windows.Forms.Label HuPr;
        private System.Windows.Forms.Label PaPr;
        private System.Windows.Forms.Label ToTo;
        private System.Windows.Forms.Label PrTo;
        private System.Windows.Forms.Label MaTo;
        private System.Windows.Forms.Label PaTo;
        private System.Windows.Forms.Label WkTo;
        private System.Windows.Forms.Label DrTo;
        private System.Windows.Forms.Label HuTo;
        private System.Windows.Forms.Label WarriorLabel3;
        private System.Windows.Forms.Label ShamanLabel3;
        private System.Windows.Forms.Label RogueLabel3;
        private System.Windows.Forms.Label PaladinLabel3;
        private System.Windows.Forms.Label TotalLabel3;
        private System.Windows.Forms.Label DruidLabel3;
        private System.Windows.Forms.Label WarlockLabel3;
        private System.Windows.Forms.Label MageLabel3;
        private System.Windows.Forms.Label PriestLabel3;
        private System.Windows.Forms.Label HunterLabel3;
        private System.Windows.Forms.Label WarriorLabel4;
        private System.Windows.Forms.Label ShamanLabel4;
        private System.Windows.Forms.Label RogueLabel4;
        private System.Windows.Forms.Label PriestLabel4;
        private System.Windows.Forms.Label MageLabel4;
        private System.Windows.Forms.Label WarlockLabel4;
        private System.Windows.Forms.Label PaladinLabel4;
        private System.Windows.Forms.Label DruidLabel4;
        private System.Windows.Forms.Label HunterLabel4;
        private System.Windows.Forms.Label TotalLabel4;
        private System.Windows.Forms.Label WaWa2;
        private System.Windows.Forms.Label WaSh2;
        private System.Windows.Forms.Label WaRo2;
        private System.Windows.Forms.Label WaPa2;
        private System.Windows.Forms.Label WaHu2;
        private System.Windows.Forms.Label WaDr2;
        private System.Windows.Forms.Label WaWk2;
        private System.Windows.Forms.Label WaMa2;
        private System.Windows.Forms.Label WaPr2;
        private System.Windows.Forms.Label WaTo2;
        private System.Windows.Forms.Label ShWa2;
        private System.Windows.Forms.Label ShSh2;
        private System.Windows.Forms.Label ShRo2;
        private System.Windows.Forms.Label ShPa2;
        private System.Windows.Forms.Label ShHu2;
        private System.Windows.Forms.Label ShDr2;
        private System.Windows.Forms.Label ShWk2;
        private System.Windows.Forms.Label ShMa2;
        private System.Windows.Forms.Label ShPr2;
        private System.Windows.Forms.Label ShTo2;
        private System.Windows.Forms.Label RoWa2;
        private System.Windows.Forms.Label RoSh2;
        private System.Windows.Forms.Label RoRo2;
        private System.Windows.Forms.Label RoPa2;
        private System.Windows.Forms.Label RoHu2;
        private System.Windows.Forms.Label RoDr2;
        private System.Windows.Forms.Label RoWk2;
        private System.Windows.Forms.Label RoMa2;
        private System.Windows.Forms.Label RoPr2;
        private System.Windows.Forms.Label RoTo2;
        private System.Windows.Forms.Label PrWa2;
        private System.Windows.Forms.Label MaWa2;
        private System.Windows.Forms.Label WkWa2;
        private System.Windows.Forms.Label DrWa2;
        private System.Windows.Forms.Label HuWa2;
        private System.Windows.Forms.Label PaWa2;
        private System.Windows.Forms.Label PrSh2;
        private System.Windows.Forms.Label MaSh2;
        private System.Windows.Forms.Label WkSh2;
        private System.Windows.Forms.Label DrSh2;
        private System.Windows.Forms.Label HuSh2;
        private System.Windows.Forms.Label PaSh2;
        private System.Windows.Forms.Label PrRo2;
        private System.Windows.Forms.Label MaRo2;
        private System.Windows.Forms.Label WkRo2;
        private System.Windows.Forms.Label DrRo2;
        private System.Windows.Forms.Label HuRo2;
        private System.Windows.Forms.Label PaRo2;
        private System.Windows.Forms.Label PrPa2;
        private System.Windows.Forms.Label MaPa2;
        private System.Windows.Forms.Label WkPa2;
        private System.Windows.Forms.Label DrPa2;
        private System.Windows.Forms.Label HuPa2;
        private System.Windows.Forms.Label PaPa2;
        private System.Windows.Forms.Label PrHu2;
        private System.Windows.Forms.Label MaHu2;
        private System.Windows.Forms.Label WkHu2;
        private System.Windows.Forms.Label DrHu2;
        private System.Windows.Forms.Label HuHu2;
        private System.Windows.Forms.Label PaHu2;
        private System.Windows.Forms.Label PrDr2;
        private System.Windows.Forms.Label MaDr2;
        private System.Windows.Forms.Label WkDr2;
        private System.Windows.Forms.Label DrDr2;
        private System.Windows.Forms.Label HuDr2;
        private System.Windows.Forms.Label PaDr2;
        private System.Windows.Forms.Label PrWk2;
        private System.Windows.Forms.Label MaWk2;
        private System.Windows.Forms.Label WkWk2;
        private System.Windows.Forms.Label DrWk2;
        private System.Windows.Forms.Label HuWk2;
        private System.Windows.Forms.Label PrMa2;
        private System.Windows.Forms.Label MaMa2;
        private System.Windows.Forms.Label WkMa2;
        private System.Windows.Forms.Label PaWk2;
        private System.Windows.Forms.Label DrMa2;
        private System.Windows.Forms.Label HuMa2;
        private System.Windows.Forms.Label PrPr2;
        private System.Windows.Forms.Label MaPr2;
        private System.Windows.Forms.Label WkPr2;
        private System.Windows.Forms.Label PaMa2;
        private System.Windows.Forms.Label DrPr2;
        private System.Windows.Forms.Label HuPr2;
        private System.Windows.Forms.Label PaPr2;
        private System.Windows.Forms.Label ToTo2;
        private System.Windows.Forms.Label PrTo2;
        private System.Windows.Forms.Label MaTo2;
        private System.Windows.Forms.Label PaTo2;
        private System.Windows.Forms.Label WkTo2;
        private System.Windows.Forms.Label DrTo2;
        private System.Windows.Forms.Label HuTo2;
        private System.Windows.Forms.Label WarriorLabel5;
        private System.Windows.Forms.Label ShamanLabel5;
        private System.Windows.Forms.Label RogueLabel5;
        private System.Windows.Forms.Label PaladinLabel5;
        private System.Windows.Forms.Label TotalLabel5;
        private System.Windows.Forms.Label DruidLabel5;
        private System.Windows.Forms.Label WarlockLabel5;
        private System.Windows.Forms.Label MageLabel5;
        private System.Windows.Forms.Label PriestLabel5;
        private System.Windows.Forms.Label HunterLabel5;
        private System.Windows.Forms.Label WarriorLabel6;
        private System.Windows.Forms.Label ShamanLabel6;
        private System.Windows.Forms.Label RogueLabel6;
        private System.Windows.Forms.Label PriestLabel6;
        private System.Windows.Forms.Label MageLabel6;
        private System.Windows.Forms.Label WarlockLabel6;
        private System.Windows.Forms.Label PaladinLabel6;
        private System.Windows.Forms.Label DruidLabel6;
        private System.Windows.Forms.Label HunterLabel6;
        private System.Windows.Forms.Label TotalLabel6;
        private System.Windows.Forms.Label WaWa3;
        private System.Windows.Forms.Label WaSh3;
        private System.Windows.Forms.Label WaRo3;
        private System.Windows.Forms.Label WaPa3;
        private System.Windows.Forms.Label WaHu3;
        private System.Windows.Forms.Label WaDr3;
        private System.Windows.Forms.Label WaWk3;
        private System.Windows.Forms.Label WaMa3;
        private System.Windows.Forms.Label WaPr3;
        private System.Windows.Forms.Label WaTo3;
        private System.Windows.Forms.Label ShWa3;
        private System.Windows.Forms.Label ShSh3;
        private System.Windows.Forms.Label ShRo3;
        private System.Windows.Forms.Label ShPa3;
        private System.Windows.Forms.Label ShHu3;
        private System.Windows.Forms.Label ShDr3;
        private System.Windows.Forms.Label ShWk3;
        private System.Windows.Forms.Label ShMa3;
        private System.Windows.Forms.Label ShPr3;
        private System.Windows.Forms.Label ShTo3;
        private System.Windows.Forms.Label RoWa3;
        private System.Windows.Forms.Label RoSh3;
        private System.Windows.Forms.Label RoRo3;
        private System.Windows.Forms.Label RoPa3;
        private System.Windows.Forms.Label RoHu3;
        private System.Windows.Forms.Label RoDr3;
        private System.Windows.Forms.Label RoWk3;
        private System.Windows.Forms.Label RoMa3;
        private System.Windows.Forms.Label RoPr3;
        private System.Windows.Forms.Label RoTo3;
        private System.Windows.Forms.Label PrWa3;
        private System.Windows.Forms.Label MaWa3;
        private System.Windows.Forms.Label WkWa3;
        private System.Windows.Forms.Label DrWa3;
        private System.Windows.Forms.Label HuWa3;
        private System.Windows.Forms.Label PaWa3;
        private System.Windows.Forms.Label PrSh3;
        private System.Windows.Forms.Label MaSh3;
        private System.Windows.Forms.Label WkSh3;
        private System.Windows.Forms.Label DrSh3;
        private System.Windows.Forms.Label HuSh3;
        private System.Windows.Forms.Label PaSh3;
        private System.Windows.Forms.Label PrRo3;
        private System.Windows.Forms.Label MaRo3;
        private System.Windows.Forms.Label WkRo3;
        private System.Windows.Forms.Label DrRo3;
        private System.Windows.Forms.Label HuRo3;
        private System.Windows.Forms.Label PaRo3;
        private System.Windows.Forms.Label PrPa3;
        private System.Windows.Forms.Label MaPa3;
        private System.Windows.Forms.Label WkPa3;
        private System.Windows.Forms.Label DrPa3;
        private System.Windows.Forms.Label HuPa3;
        private System.Windows.Forms.Label PaPa3;
        private System.Windows.Forms.Label PrHu3;
        private System.Windows.Forms.Label MaHu3;
        private System.Windows.Forms.Label WkHu3;
        private System.Windows.Forms.Label DrHu3;
        private System.Windows.Forms.Label HuHu3;
        private System.Windows.Forms.Label PaHu3;
        private System.Windows.Forms.Label PrDr3;
        private System.Windows.Forms.Label MaDr3;
        private System.Windows.Forms.Label WkDr3;
        private System.Windows.Forms.Label DrDr3;
        private System.Windows.Forms.Label HuDr3;
        private System.Windows.Forms.Label PaDr3;
        private System.Windows.Forms.Label PrWk3;
        private System.Windows.Forms.Label MaWk3;
        private System.Windows.Forms.Label WkWk3;
        private System.Windows.Forms.Label DrWk3;
        private System.Windows.Forms.Label HuWk3;
        private System.Windows.Forms.Label PrMa3;
        private System.Windows.Forms.Label MaMa3;
        private System.Windows.Forms.Label WkMa3;
        private System.Windows.Forms.Label PaWk3;
        private System.Windows.Forms.Label DrMa3;
        private System.Windows.Forms.Label HuMa3;
        private System.Windows.Forms.Label PrPr3;
        private System.Windows.Forms.Label MaPr3;
        private System.Windows.Forms.Label WkPr3;
        private System.Windows.Forms.Label PaMa3;
        private System.Windows.Forms.Label DrPr3;
        private System.Windows.Forms.Label HuPr3;
        private System.Windows.Forms.Label PaPr3;
        private System.Windows.Forms.Label ToTo3;
        private System.Windows.Forms.Label PrTo3;
        private System.Windows.Forms.Label MaTo3;
        private System.Windows.Forms.Label PaTo3;
        private System.Windows.Forms.Label WkTo3;
        private System.Windows.Forms.Label DrTo3;
        private System.Windows.Forms.Label HuTo3;
        private System.Windows.Forms.Label ToToTotal;
        private System.Windows.Forms.Label OutSideLabel;
        private System.Windows.Forms.Label TotalwoArena;
        private System.Windows.Forms.Label ToToTotalLabel;
        private Label label1;
        private Label Disconnect;
        private Label DisconnectsLabel;
    }
}

