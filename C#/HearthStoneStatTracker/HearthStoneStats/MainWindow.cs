using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace HearthStoneStats
{
    public partial class Form1 : Form
    {
        Dictionary<String, Record> books = new Dictionary<string, Record>();
        int Disconnects;

        public Form1()
        {
            InitializeComponent();
            //Load Content
            try
            {
                string[] records;
                StreamReader streamreader = new StreamReader("stats.txt");
                string importedsettings = streamreader.ReadToEnd();
                records = importedsettings.Split(';');
                int i = 0;
                for (i = 0; i < records.Length; i++)
                {
                    records[i] = records[i].Trim();
                }
                streamreader.Close();

                //Build deck records
                this.Deck0RecordText.Text = records[0].Split(':')[1];
                this.Deck0TextBox.Text = records[0].Split(':')[0];
                this.Deck1RecordText.Text = records[1].Split(':')[1];
                this.Deck1TextBox.Text = records[1].Split(':')[0];
                this.Deck2RecordText.Text = records[2].Split(':')[1];
                this.Deck2TextBox.Text = records[2].Split(':')[0];
                this.Deck3RecordText.Text = records[3].Split(':')[1];
                this.Deck3TextBox.Text = records[3].Split(':')[0];
                this.Deck4RecordText.Text = records[4].Split(':')[1];
                this.Deck4TextBox.Text = records[4].Split(':')[0];
                this.Deck5RecordText.Text = records[5].Split(':')[1];
                this.Deck5TextBox.Text = records[5].Split(':')[0];
                this.Deck6RecordText.Text = records[6].Split(':')[1];
                this.Deck6TextBox.Text = records[6].Split(':')[0];
                this.Deck7RecordText.Text = records[7].Split(':')[1];
                this.Deck7TextBox.Text = records[7].Split(':')[0];
                this.Deck8RecordText.Text = records[8].Split(':')[1];
                this.Deck8TextBox.Text = records[8].Split(':')[0];
                this.Deck9RecordText.Text = records[9].Split(':')[1];
                this.Deck9TextBox.Text = records[9].Split(':')[0];
                books.Add("Deck0RecordText", new Record(Convert.ToInt32(records[0].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[0].Split(':')[1].Split('/')[1])));
                books.Add("Deck1RecordText", new Record(Convert.ToInt32(records[1].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[1].Split(':')[1].Split('/')[1])));
                books.Add("Deck2RecordText", new Record(Convert.ToInt32(records[2].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[2].Split(':')[1].Split('/')[1])));
                books.Add("Deck3RecordText", new Record(Convert.ToInt32(records[3].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[3].Split(':')[1].Split('/')[1])));
                books.Add("Deck4RecordText", new Record(Convert.ToInt32(records[4].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[4].Split(':')[1].Split('/')[1])));
                books.Add("Deck5RecordText", new Record(Convert.ToInt32(records[5].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[5].Split(':')[1].Split('/')[1])));
                books.Add("Deck6RecordText", new Record(Convert.ToInt32(records[6].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[6].Split(':')[1].Split('/')[1])));
                books.Add("Deck7RecordText", new Record(Convert.ToInt32(records[7].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[7].Split(':')[1].Split('/')[1])));
                books.Add("Deck8RecordText", new Record(Convert.ToInt32(records[8].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[8].Split(':')[1].Split('/')[1])));
                books.Add("Deck9RecordText", new Record(Convert.ToInt32(records[9].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[9].Split(':')[1].Split('/')[1])));

                this.WaWa.Text = records[10].Split(':')[0];
                this.WaSh.Text = records[10].Split(':')[1];
                this.WaRo.Text = records[10].Split(':')[2];
                this.WaPa.Text = records[10].Split(':')[3];
                this.WaHu.Text = records[10].Split(':')[4];
                this.WaDr.Text = records[10].Split(':')[5];
                this.WaWk.Text = records[10].Split(':')[6];
                this.WaMa.Text = records[10].Split(':')[7];
                this.WaPr.Text = records[10].Split(':')[8];
                this.ShWa.Text = records[11].Split(':')[0];
                this.ShSh.Text = records[11].Split(':')[1];
                this.ShRo.Text = records[11].Split(':')[2];
                this.ShPa.Text = records[11].Split(':')[3];
                this.ShHu.Text = records[11].Split(':')[4];
                this.ShDr.Text = records[11].Split(':')[5];
                this.ShWk.Text = records[11].Split(':')[6];
                this.ShMa.Text = records[11].Split(':')[7];
                this.ShPr.Text = records[11].Split(':')[8];
                this.RoWa.Text = records[12].Split(':')[0];
                this.RoSh.Text = records[12].Split(':')[1];
                this.RoRo.Text = records[12].Split(':')[2];
                this.RoPa.Text = records[12].Split(':')[3];
                this.RoHu.Text = records[12].Split(':')[4];
                this.RoDr.Text = records[12].Split(':')[5];
                this.RoWk.Text = records[12].Split(':')[6];
                this.RoMa.Text = records[12].Split(':')[7];
                this.RoPr.Text = records[12].Split(':')[8];
                this.PaWa.Text = records[13].Split(':')[0];
                this.PaSh.Text = records[13].Split(':')[1];
                this.PaRo.Text = records[13].Split(':')[2];
                this.PaPa.Text = records[13].Split(':')[3];
                this.PaHu.Text = records[13].Split(':')[4];
                this.PaDr.Text = records[13].Split(':')[5];
                this.PaWk.Text = records[13].Split(':')[6];
                this.PaMa.Text = records[13].Split(':')[7];
                this.PaPr.Text = records[13].Split(':')[8];
                this.HuWa.Text = records[14].Split(':')[0];
                this.HuSh.Text = records[14].Split(':')[1];
                this.HuRo.Text = records[14].Split(':')[2];
                this.HuPa.Text = records[14].Split(':')[3];
                this.HuHu.Text = records[14].Split(':')[4];
                this.HuDr.Text = records[14].Split(':')[5];
                this.HuWk.Text = records[14].Split(':')[6];
                this.HuMa.Text = records[14].Split(':')[7];
                this.HuPr.Text = records[14].Split(':')[8];
                this.DrWa.Text = records[15].Split(':')[0];
                this.DrSh.Text = records[15].Split(':')[1];
                this.DrRo.Text = records[15].Split(':')[2];
                this.DrPa.Text = records[15].Split(':')[3];
                this.DrHu.Text = records[15].Split(':')[4];
                this.DrDr.Text = records[15].Split(':')[5];
                this.DrWk.Text = records[15].Split(':')[6];
                this.DrMa.Text = records[15].Split(':')[7];
                this.DrPr.Text = records[15].Split(':')[8];
                this.WkWa.Text = records[16].Split(':')[0];
                this.WkSh.Text = records[16].Split(':')[1];
                this.WkRo.Text = records[16].Split(':')[2];
                this.WkPa.Text = records[16].Split(':')[3];
                this.WkHu.Text = records[16].Split(':')[4];
                this.WkDr.Text = records[16].Split(':')[5];
                this.WkWk.Text = records[16].Split(':')[6];
                this.WkMa.Text = records[16].Split(':')[7];
                this.WkPr.Text = records[16].Split(':')[8];
                this.MaWa.Text = records[17].Split(':')[0];
                this.MaSh.Text = records[17].Split(':')[1];
                this.MaRo.Text = records[17].Split(':')[2];
                this.MaPa.Text = records[17].Split(':')[3];
                this.MaHu.Text = records[17].Split(':')[4];
                this.MaDr.Text = records[17].Split(':')[5];
                this.MaWk.Text = records[17].Split(':')[6];
                this.MaMa.Text = records[17].Split(':')[7];
                this.MaPr.Text = records[17].Split(':')[8];
                this.PrWa.Text = records[18].Split(':')[0];
                this.PrSh.Text = records[18].Split(':')[1];
                this.PrRo.Text = records[18].Split(':')[2];
                this.PrPa.Text = records[18].Split(':')[3];
                this.PrHu.Text = records[18].Split(':')[4];
                this.PrDr.Text = records[18].Split(':')[5];
                this.PrWk.Text = records[18].Split(':')[6];
                this.PrMa.Text = records[18].Split(':')[7];
                this.PrPr.Text = records[18].Split(':')[8];
                books.Add("WaWa", new Record(Convert.ToInt32(records[10].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[0].Split('/')[1])));
                books.Add("WaSh", new Record(Convert.ToInt32(records[10].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[1].Split('/')[1])));
                books.Add("WaRo", new Record(Convert.ToInt32(records[10].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[2].Split('/')[1])));
                books.Add("WaPa", new Record(Convert.ToInt32(records[10].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[3].Split('/')[1])));
                books.Add("WaHu", new Record(Convert.ToInt32(records[10].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[4].Split('/')[1])));
                books.Add("WaDr", new Record(Convert.ToInt32(records[10].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[5].Split('/')[1])));
                books.Add("WaWk", new Record(Convert.ToInt32(records[10].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[6].Split('/')[1])));
                books.Add("WaMa", new Record(Convert.ToInt32(records[10].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[7].Split('/')[1])));
                books.Add("WaPr", new Record(Convert.ToInt32(records[10].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[10].Split(':')[8].Split('/')[1])));
                this.WaTo.Text = (books["WaWa"] + books["WaSh"] + books["WaRo"] + books["WaPa"] + books["WaHu"] + books["WaDr"] + books["WaWk"] + books["WaMa"] + books["WaPr"]).ToString();
                books.Add("ShWa", new Record(Convert.ToInt32(records[11].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[0].Split('/')[1])));
                books.Add("ShSh", new Record(Convert.ToInt32(records[11].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[1].Split('/')[1])));
                books.Add("ShRo", new Record(Convert.ToInt32(records[11].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[2].Split('/')[1])));
                books.Add("ShPa", new Record(Convert.ToInt32(records[11].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[3].Split('/')[1])));
                books.Add("ShHu", new Record(Convert.ToInt32(records[11].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[4].Split('/')[1])));
                books.Add("ShDr", new Record(Convert.ToInt32(records[11].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[5].Split('/')[1])));
                books.Add("ShWk", new Record(Convert.ToInt32(records[11].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[6].Split('/')[1])));
                books.Add("ShMa", new Record(Convert.ToInt32(records[11].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[7].Split('/')[1])));
                books.Add("ShPr", new Record(Convert.ToInt32(records[11].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[11].Split(':')[8].Split('/')[1])));
                this.ShTo.Text = (books["ShWa"] + books["ShSh"] + books["ShRo"] + books["ShPa"] + books["ShHu"] + books["ShDr"] + books["ShWk"] + books["ShMa"] + books["ShPr"]).ToString();
                books.Add("RoWa", new Record(Convert.ToInt32(records[12].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[0].Split('/')[1])));
                books.Add("RoSh", new Record(Convert.ToInt32(records[12].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[1].Split('/')[1])));
                books.Add("RoRo", new Record(Convert.ToInt32(records[12].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[2].Split('/')[1])));
                books.Add("RoPa", new Record(Convert.ToInt32(records[12].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[3].Split('/')[1])));
                books.Add("RoHu", new Record(Convert.ToInt32(records[12].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[4].Split('/')[1])));
                books.Add("RoDr", new Record(Convert.ToInt32(records[12].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[5].Split('/')[1])));
                books.Add("RoWk", new Record(Convert.ToInt32(records[12].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[6].Split('/')[1])));
                books.Add("RoMa", new Record(Convert.ToInt32(records[12].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[7].Split('/')[1])));
                books.Add("RoPr", new Record(Convert.ToInt32(records[12].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[12].Split(':')[8].Split('/')[1])));
                this.RoTo.Text = (books["RoWa"] + books["RoSh"] + books["RoRo"] + books["RoPa"] + books["RoHu"] + books["RoDr"] + books["RoWk"] + books["RoMa"] + books["RoPr"]).ToString();
                books.Add("PaWa", new Record(Convert.ToInt32(records[13].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[0].Split('/')[1])));
                books.Add("PaSh", new Record(Convert.ToInt32(records[13].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[1].Split('/')[1])));
                books.Add("PaRo", new Record(Convert.ToInt32(records[13].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[2].Split('/')[1])));
                books.Add("PaPa", new Record(Convert.ToInt32(records[13].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[3].Split('/')[1])));
                books.Add("PaHu", new Record(Convert.ToInt32(records[13].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[4].Split('/')[1])));
                books.Add("PaDr", new Record(Convert.ToInt32(records[13].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[5].Split('/')[1])));
                books.Add("PaWk", new Record(Convert.ToInt32(records[13].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[6].Split('/')[1])));
                books.Add("PaMa", new Record(Convert.ToInt32(records[13].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[7].Split('/')[1])));
                books.Add("PaPr", new Record(Convert.ToInt32(records[13].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[13].Split(':')[8].Split('/')[1])));
                this.PaTo.Text = (books["PaWa"] + books["PaSh"] + books["PaRo"] + books["PaPa"] + books["PaHu"] + books["PaDr"] + books["PaWk"] + books["PaMa"] + books["PaPr"]).ToString();
                books.Add("HuWa", new Record(Convert.ToInt32(records[14].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[0].Split('/')[1])));
                books.Add("HuSh", new Record(Convert.ToInt32(records[14].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[1].Split('/')[1])));
                books.Add("HuRo", new Record(Convert.ToInt32(records[14].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[2].Split('/')[1])));
                books.Add("HuPa", new Record(Convert.ToInt32(records[14].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[3].Split('/')[1])));
                books.Add("HuHu", new Record(Convert.ToInt32(records[14].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[4].Split('/')[1])));
                books.Add("HuDr", new Record(Convert.ToInt32(records[14].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[5].Split('/')[1])));
                books.Add("HuWk", new Record(Convert.ToInt32(records[14].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[6].Split('/')[1])));
                books.Add("HuMa", new Record(Convert.ToInt32(records[14].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[7].Split('/')[1])));
                books.Add("HuPr", new Record(Convert.ToInt32(records[14].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[14].Split(':')[8].Split('/')[1])));
                this.HuTo.Text = (books["HuWa"] + books["HuSh"] + books["HuRo"] + books["HuPa"] + books["HuHu"] + books["HuDr"] + books["HuWk"] + books["HuMa"] + books["HuPr"]).ToString();
                books.Add("DrWa", new Record(Convert.ToInt32(records[15].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[0].Split('/')[1])));
                books.Add("DrSh", new Record(Convert.ToInt32(records[15].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[1].Split('/')[1])));
                books.Add("DrRo", new Record(Convert.ToInt32(records[15].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[2].Split('/')[1])));
                books.Add("DrPa", new Record(Convert.ToInt32(records[15].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[3].Split('/')[1])));
                books.Add("DrHu", new Record(Convert.ToInt32(records[15].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[4].Split('/')[1])));
                books.Add("DrDr", new Record(Convert.ToInt32(records[15].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[5].Split('/')[1])));
                books.Add("DrWk", new Record(Convert.ToInt32(records[15].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[6].Split('/')[1])));
                books.Add("DrMa", new Record(Convert.ToInt32(records[15].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[7].Split('/')[1])));
                books.Add("DrPr", new Record(Convert.ToInt32(records[15].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[15].Split(':')[8].Split('/')[1])));
                this.DrTo.Text = (books["DrWa"] + books["DrSh"] + books["DrRo"] + books["DrPa"] + books["DrHu"] + books["DrDr"] + books["DrWk"] + books["DrMa"] + books["DrPr"]).ToString();
                books.Add("WkWa", new Record(Convert.ToInt32(records[16].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[0].Split('/')[1])));
                books.Add("WkSh", new Record(Convert.ToInt32(records[16].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[1].Split('/')[1])));
                books.Add("WkRo", new Record(Convert.ToInt32(records[16].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[2].Split('/')[1])));
                books.Add("WkPa", new Record(Convert.ToInt32(records[16].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[3].Split('/')[1])));
                books.Add("WkHu", new Record(Convert.ToInt32(records[16].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[4].Split('/')[1])));
                books.Add("WkDr", new Record(Convert.ToInt32(records[16].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[5].Split('/')[1])));
                books.Add("WkWk", new Record(Convert.ToInt32(records[16].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[6].Split('/')[1])));
                books.Add("WkMa", new Record(Convert.ToInt32(records[16].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[7].Split('/')[1])));
                books.Add("WkPr", new Record(Convert.ToInt32(records[16].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[16].Split(':')[8].Split('/')[1])));
                this.WkTo.Text = (books["WkWa"] + books["WkSh"] + books["WkRo"] + books["WkPa"] + books["WkHu"] + books["WkDr"] + books["WkWk"] + books["WkMa"] + books["WkPr"]).ToString();
                books.Add("MaWa", new Record(Convert.ToInt32(records[17].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[0].Split('/')[1])));
                books.Add("MaSh", new Record(Convert.ToInt32(records[17].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[1].Split('/')[1])));
                books.Add("MaRo", new Record(Convert.ToInt32(records[17].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[2].Split('/')[1])));
                books.Add("MaPa", new Record(Convert.ToInt32(records[17].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[3].Split('/')[1])));
                books.Add("MaHu", new Record(Convert.ToInt32(records[17].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[4].Split('/')[1])));
                books.Add("MaDr", new Record(Convert.ToInt32(records[17].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[5].Split('/')[1])));
                books.Add("MaWk", new Record(Convert.ToInt32(records[17].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[6].Split('/')[1])));
                books.Add("MaMa", new Record(Convert.ToInt32(records[17].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[7].Split('/')[1])));
                books.Add("MaPr", new Record(Convert.ToInt32(records[17].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[17].Split(':')[8].Split('/')[1])));
                this.MaTo.Text = (books["MaWa"] + books["MaSh"] + books["MaRo"] + books["MaPa"] + books["MaHu"] + books["MaDr"] + books["MaWk"] + books["MaMa"] + books["MaPr"]).ToString();
                books.Add("PrWa", new Record(Convert.ToInt32(records[18].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[0].Split('/')[1])));
                books.Add("PrSh", new Record(Convert.ToInt32(records[18].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[1].Split('/')[1])));
                books.Add("PrRo", new Record(Convert.ToInt32(records[18].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[2].Split('/')[1])));
                books.Add("PrPa", new Record(Convert.ToInt32(records[18].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[3].Split('/')[1])));
                books.Add("PrHu", new Record(Convert.ToInt32(records[18].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[4].Split('/')[1])));
                books.Add("PrDr", new Record(Convert.ToInt32(records[18].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[5].Split('/')[1])));
                books.Add("PrWk", new Record(Convert.ToInt32(records[18].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[6].Split('/')[1])));
                books.Add("PrMa", new Record(Convert.ToInt32(records[18].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[7].Split('/')[1])));
                books.Add("PrPr", new Record(Convert.ToInt32(records[18].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[18].Split(':')[8].Split('/')[1])));
                this.PrTo.Text = (books["PrWa"] + books["PrSh"] + books["PrRo"] + books["PrPa"] + books["PrHu"] + books["PrDr"] + books["PrWk"] + books["PrMa"] + books["PrPr"]).ToString();
                this.ToTo.Text = (books["WaWa"] + books["WaSh"] + books["WaRo"] + books["WaPa"] + books["WaHu"] + books["WaDr"] + books["WaWk"] + books["WaMa"] + books["WaPr"] +
                 books["ShWa"] + books["ShSh"] + books["ShRo"] + books["ShPa"] + books["ShHu"] + books["ShDr"] + books["ShWk"] + books["ShMa"] + books["ShPr"] +
                 books["RoWa"] + books["RoSh"] + books["RoRo"] + books["RoPa"] + books["RoHu"] + books["RoDr"] + books["RoWk"] + books["RoMa"] + books["RoPr"] +
                 books["PaWa"] + books["PaSh"] + books["PaRo"] + books["PaPa"] + books["PaHu"] + books["PaDr"] + books["PaWk"] + books["PaMa"] + books["PaPr"] +
                 books["HuWa"] + books["HuSh"] + books["HuRo"] + books["HuPa"] + books["HuHu"] + books["HuDr"] + books["HuWk"] + books["HuMa"] + books["HuPr"] +
                 books["DrWa"] + books["DrSh"] + books["DrRo"] + books["DrPa"] + books["DrHu"] + books["DrDr"] + books["DrWk"] + books["DrMa"] + books["DrPr"] +
                 books["WkWa"] + books["WkSh"] + books["WkRo"] + books["WkPa"] + books["WkHu"] + books["WkDr"] + books["WkWk"] + books["WkMa"] + books["WkPr"] +
                 books["MaWa"] + books["MaSh"] + books["MaRo"] + books["MaPa"] + books["MaHu"] + books["MaDr"] + books["MaWk"] + books["MaMa"] + books["MaPr"] +
                 books["PrWa"] + books["PrSh"] + books["PrRo"] + books["PrPa"] + books["PrHu"] + books["PrDr"] + books["PrWk"] + books["PrMa"] + books["PrPr"]).ToString();

                this.WaWa3.Text = records[19].Split(':')[0];
                this.WaSh3.Text = records[19].Split(':')[1];
                this.WaRo3.Text = records[19].Split(':')[2];
                this.WaPa3.Text = records[19].Split(':')[3];
                this.WaHu3.Text = records[19].Split(':')[4];
                this.WaDr3.Text = records[19].Split(':')[5];
                this.WaWk3.Text = records[19].Split(':')[6];
                this.WaMa3.Text = records[19].Split(':')[7];
                this.WaPr3.Text = records[19].Split(':')[8];
                this.ShWa3.Text = records[20].Split(':')[0];
                this.ShSh3.Text = records[20].Split(':')[1];
                this.ShRo3.Text = records[20].Split(':')[2];
                this.ShPa3.Text = records[20].Split(':')[3];
                this.ShHu3.Text = records[20].Split(':')[4];
                this.ShDr3.Text = records[20].Split(':')[5];
                this.ShWk3.Text = records[20].Split(':')[6];
                this.ShMa3.Text = records[20].Split(':')[7];
                this.ShPr3.Text = records[20].Split(':')[8];
                this.RoWa3.Text = records[21].Split(':')[0];
                this.RoSh3.Text = records[21].Split(':')[1];
                this.RoRo3.Text = records[21].Split(':')[2];
                this.RoPa3.Text = records[21].Split(':')[3];
                this.RoHu3.Text = records[21].Split(':')[4];
                this.RoDr3.Text = records[21].Split(':')[5];
                this.RoWk3.Text = records[21].Split(':')[6];
                this.RoMa3.Text = records[21].Split(':')[7];
                this.RoPr3.Text = records[21].Split(':')[8];
                this.PaWa3.Text = records[22].Split(':')[0];
                this.PaSh3.Text = records[22].Split(':')[1];
                this.PaRo3.Text = records[22].Split(':')[2];
                this.PaPa3.Text = records[22].Split(':')[3];
                this.PaHu3.Text = records[22].Split(':')[4];
                this.PaDr3.Text = records[22].Split(':')[5];
                this.PaWk3.Text = records[22].Split(':')[6];
                this.PaMa3.Text = records[22].Split(':')[7];
                this.PaPr3.Text = records[22].Split(':')[8];
                this.HuWa3.Text = records[23].Split(':')[0];
                this.HuSh3.Text = records[23].Split(':')[1];
                this.HuRo3.Text = records[23].Split(':')[2];
                this.HuPa3.Text = records[23].Split(':')[3];
                this.HuHu3.Text = records[23].Split(':')[4];
                this.HuDr3.Text = records[23].Split(':')[5];
                this.HuWk3.Text = records[23].Split(':')[6];
                this.HuMa3.Text = records[23].Split(':')[7];
                this.HuPr3.Text = records[23].Split(':')[8];
                this.DrWa3.Text = records[24].Split(':')[0];
                this.DrSh3.Text = records[24].Split(':')[1];
                this.DrRo3.Text = records[24].Split(':')[2];
                this.DrPa3.Text = records[24].Split(':')[3];
                this.DrHu3.Text = records[24].Split(':')[4];
                this.DrDr3.Text = records[24].Split(':')[5];
                this.DrWk3.Text = records[24].Split(':')[6];
                this.DrMa3.Text = records[24].Split(':')[7];
                this.DrPr3.Text = records[24].Split(':')[8];
                this.WkWa3.Text = records[25].Split(':')[0];
                this.WkSh3.Text = records[25].Split(':')[1];
                this.WkRo3.Text = records[25].Split(':')[2];
                this.WkPa3.Text = records[25].Split(':')[3];
                this.WkHu3.Text = records[25].Split(':')[4];
                this.WkDr3.Text = records[25].Split(':')[5];
                this.WkWk3.Text = records[25].Split(':')[6];
                this.WkMa3.Text = records[25].Split(':')[7];
                this.WkPr3.Text = records[25].Split(':')[8];
                this.MaWa3.Text = records[26].Split(':')[0];
                this.MaSh3.Text = records[26].Split(':')[1];
                this.MaRo3.Text = records[26].Split(':')[2];
                this.MaPa3.Text = records[26].Split(':')[3];
                this.MaHu3.Text = records[26].Split(':')[4];
                this.MaDr3.Text = records[26].Split(':')[5];
                this.MaWk3.Text = records[26].Split(':')[6];
                this.MaMa3.Text = records[26].Split(':')[7];
                this.MaPr3.Text = records[26].Split(':')[8];
                this.PrWa3.Text = records[27].Split(':')[0];
                this.PrSh3.Text = records[27].Split(':')[1];
                this.PrRo3.Text = records[27].Split(':')[2];
                this.PrPa3.Text = records[27].Split(':')[3];
                this.PrHu3.Text = records[27].Split(':')[4];
                this.PrDr3.Text = records[27].Split(':')[5];
                this.PrWk3.Text = records[27].Split(':')[6];
                this.PrMa3.Text = records[27].Split(':')[7];
                this.PrPr3.Text = records[27].Split(':')[8];
                books.Add("WaWa3", new Record(Convert.ToInt32(records[19].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[0].Split('/')[1])));
                books.Add("WaSh3", new Record(Convert.ToInt32(records[19].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[1].Split('/')[1])));
                books.Add("WaRo3", new Record(Convert.ToInt32(records[19].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[2].Split('/')[1])));
                books.Add("WaPa3", new Record(Convert.ToInt32(records[19].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[3].Split('/')[1])));
                books.Add("WaHu3", new Record(Convert.ToInt32(records[19].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[4].Split('/')[1])));
                books.Add("WaDr3", new Record(Convert.ToInt32(records[19].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[5].Split('/')[1])));
                books.Add("WaWk3", new Record(Convert.ToInt32(records[19].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[6].Split('/')[1])));
                books.Add("WaMa3", new Record(Convert.ToInt32(records[19].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[7].Split('/')[1])));
                books.Add("WaPr3", new Record(Convert.ToInt32(records[19].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[19].Split(':')[8].Split('/')[1])));
                this.WaTo3.Text = (books["WaWa3"] + books["WaSh3"] + books["WaRo3"] + books["WaPa3"] + books["WaHu3"] + books["WaDr3"] + books["WaWk3"] + books["WaMa3"] + books["WaPr3"]).ToString();
                books.Add("ShWa3", new Record(Convert.ToInt32(records[20].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[0].Split('/')[1])));
                books.Add("ShSh3", new Record(Convert.ToInt32(records[20].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[1].Split('/')[1])));
                books.Add("ShRo3", new Record(Convert.ToInt32(records[20].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[2].Split('/')[1])));
                books.Add("ShPa3", new Record(Convert.ToInt32(records[20].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[3].Split('/')[1])));
                books.Add("ShHu3", new Record(Convert.ToInt32(records[20].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[4].Split('/')[1])));
                books.Add("ShDr3", new Record(Convert.ToInt32(records[20].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[5].Split('/')[1])));
                books.Add("ShWk3", new Record(Convert.ToInt32(records[20].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[6].Split('/')[1])));
                books.Add("ShMa3", new Record(Convert.ToInt32(records[20].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[7].Split('/')[1])));
                books.Add("ShPr3", new Record(Convert.ToInt32(records[20].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[20].Split(':')[8].Split('/')[1])));
                this.ShTo3.Text = (books["ShWa3"] + books["ShSh3"] + books["ShRo3"] + books["ShPa3"] + books["ShHu3"] + books["ShDr3"] + books["ShWk3"] + books["ShMa3"] + books["ShPr3"]).ToString();
                books.Add("RoWa3", new Record(Convert.ToInt32(records[21].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[0].Split('/')[1])));
                books.Add("RoSh3", new Record(Convert.ToInt32(records[21].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[1].Split('/')[1])));
                books.Add("RoRo3", new Record(Convert.ToInt32(records[21].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[2].Split('/')[1])));
                books.Add("RoPa3", new Record(Convert.ToInt32(records[21].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[3].Split('/')[1])));
                books.Add("RoHu3", new Record(Convert.ToInt32(records[21].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[4].Split('/')[1])));
                books.Add("RoDr3", new Record(Convert.ToInt32(records[21].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[5].Split('/')[1])));
                books.Add("RoWk3", new Record(Convert.ToInt32(records[21].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[6].Split('/')[1])));
                books.Add("RoMa3", new Record(Convert.ToInt32(records[21].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[7].Split('/')[1])));
                books.Add("RoPr3", new Record(Convert.ToInt32(records[21].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[21].Split(':')[8].Split('/')[1])));
                this.RoTo3.Text = (books["RoWa3"] + books["RoSh3"] + books["RoRo3"] + books["RoPa3"] + books["RoHu3"] + books["RoDr3"] + books["RoWk3"] + books["RoMa3"] + books["RoPr3"]).ToString();
                books.Add("PaWa3", new Record(Convert.ToInt32(records[22].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[0].Split('/')[1])));
                books.Add("PaSh3", new Record(Convert.ToInt32(records[22].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[1].Split('/')[1])));
                books.Add("PaRo3", new Record(Convert.ToInt32(records[22].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[2].Split('/')[1])));
                books.Add("PaPa3", new Record(Convert.ToInt32(records[22].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[3].Split('/')[1])));
                books.Add("PaHu3", new Record(Convert.ToInt32(records[22].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[4].Split('/')[1])));
                books.Add("PaDr3", new Record(Convert.ToInt32(records[22].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[5].Split('/')[1])));
                books.Add("PaWk3", new Record(Convert.ToInt32(records[22].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[6].Split('/')[1])));
                books.Add("PaMa3", new Record(Convert.ToInt32(records[22].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[7].Split('/')[1])));
                books.Add("PaPr3", new Record(Convert.ToInt32(records[22].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[22].Split(':')[8].Split('/')[1])));
                this.PaTo3.Text = (books["PaWa3"] + books["PaSh3"] + books["PaRo3"] + books["PaPa3"] + books["PaHu3"] + books["PaDr3"] + books["PaWk3"] + books["PaMa3"] + books["PaPr3"]).ToString();
                books.Add("HuWa3", new Record(Convert.ToInt32(records[23].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[0].Split('/')[1])));
                books.Add("HuSh3", new Record(Convert.ToInt32(records[23].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[1].Split('/')[1])));
                books.Add("HuRo3", new Record(Convert.ToInt32(records[23].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[2].Split('/')[1])));
                books.Add("HuPa3", new Record(Convert.ToInt32(records[23].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[3].Split('/')[1])));
                books.Add("HuHu3", new Record(Convert.ToInt32(records[23].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[4].Split('/')[1])));
                books.Add("HuDr3", new Record(Convert.ToInt32(records[23].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[5].Split('/')[1])));
                books.Add("HuWk3", new Record(Convert.ToInt32(records[23].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[6].Split('/')[1])));
                books.Add("HuMa3", new Record(Convert.ToInt32(records[23].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[7].Split('/')[1])));
                books.Add("HuPr3", new Record(Convert.ToInt32(records[23].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[23].Split(':')[8].Split('/')[1])));
                this.HuTo3.Text = (books["HuWa3"] + books["HuSh3"] + books["HuRo3"] + books["HuPa3"] + books["HuHu3"] + books["HuDr3"] + books["HuWk3"] + books["HuMa3"] + books["HuPr3"]).ToString();
                books.Add("DrWa3", new Record(Convert.ToInt32(records[24].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[0].Split('/')[1])));
                books.Add("DrSh3", new Record(Convert.ToInt32(records[24].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[1].Split('/')[1])));
                books.Add("DrRo3", new Record(Convert.ToInt32(records[24].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[2].Split('/')[1])));
                books.Add("DrPa3", new Record(Convert.ToInt32(records[24].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[3].Split('/')[1])));
                books.Add("DrHu3", new Record(Convert.ToInt32(records[24].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[4].Split('/')[1])));
                books.Add("DrDr3", new Record(Convert.ToInt32(records[24].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[5].Split('/')[1])));
                books.Add("DrWk3", new Record(Convert.ToInt32(records[24].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[6].Split('/')[1])));
                books.Add("DrMa3", new Record(Convert.ToInt32(records[24].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[7].Split('/')[1])));
                books.Add("DrPr3", new Record(Convert.ToInt32(records[24].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[24].Split(':')[8].Split('/')[1])));
                this.DrTo3.Text = (books["DrWa3"] + books["DrSh3"] + books["DrRo3"] + books["DrPa3"] + books["DrHu3"] + books["DrDr3"] + books["DrWk3"] + books["DrMa3"] + books["DrPr3"]).ToString();
                books.Add("WkWa3", new Record(Convert.ToInt32(records[25].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[0].Split('/')[1])));
                books.Add("WkSh3", new Record(Convert.ToInt32(records[25].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[1].Split('/')[1])));
                books.Add("WkRo3", new Record(Convert.ToInt32(records[25].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[2].Split('/')[1])));
                books.Add("WkPa3", new Record(Convert.ToInt32(records[25].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[3].Split('/')[1])));
                books.Add("WkHu3", new Record(Convert.ToInt32(records[25].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[4].Split('/')[1])));
                books.Add("WkDr3", new Record(Convert.ToInt32(records[25].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[5].Split('/')[1])));
                books.Add("WkWk3", new Record(Convert.ToInt32(records[25].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[6].Split('/')[1])));
                books.Add("WkMa3", new Record(Convert.ToInt32(records[25].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[7].Split('/')[1])));
                books.Add("WkPr3", new Record(Convert.ToInt32(records[25].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[25].Split(':')[8].Split('/')[1])));
                this.WkTo3.Text = (books["WkWa3"] + books["WkSh3"] + books["WkRo3"] + books["WkPa3"] + books["WkHu3"] + books["WkDr3"] + books["WkWk3"] + books["WkMa3"] + books["WkPr3"]).ToString();
                books.Add("MaWa3", new Record(Convert.ToInt32(records[26].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[0].Split('/')[1])));
                books.Add("MaSh3", new Record(Convert.ToInt32(records[26].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[1].Split('/')[1])));
                books.Add("MaRo3", new Record(Convert.ToInt32(records[26].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[2].Split('/')[1])));
                books.Add("MaPa3", new Record(Convert.ToInt32(records[26].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[3].Split('/')[1])));
                books.Add("MaHu3", new Record(Convert.ToInt32(records[26].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[4].Split('/')[1])));
                books.Add("MaDr3", new Record(Convert.ToInt32(records[26].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[5].Split('/')[1])));
                books.Add("MaWk3", new Record(Convert.ToInt32(records[26].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[6].Split('/')[1])));
                books.Add("MaMa3", new Record(Convert.ToInt32(records[26].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[7].Split('/')[1])));
                books.Add("MaPr3", new Record(Convert.ToInt32(records[26].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[26].Split(':')[8].Split('/')[1])));
                this.MaTo3.Text = (books["MaWa3"] + books["MaSh3"] + books["MaRo3"] + books["MaPa3"] + books["MaHu3"] + books["MaDr3"] + books["MaWk3"] + books["MaMa3"] + books["MaPr3"]).ToString();
                books.Add("PrWa3", new Record(Convert.ToInt32(records[27].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[0].Split('/')[1])));
                books.Add("PrSh3", new Record(Convert.ToInt32(records[27].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[1].Split('/')[1])));
                books.Add("PrRo3", new Record(Convert.ToInt32(records[27].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[2].Split('/')[1])));
                books.Add("PrPa3", new Record(Convert.ToInt32(records[27].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[3].Split('/')[1])));
                books.Add("PrHu3", new Record(Convert.ToInt32(records[27].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[4].Split('/')[1])));
                books.Add("PrDr3", new Record(Convert.ToInt32(records[27].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[5].Split('/')[1])));
                books.Add("PrWk3", new Record(Convert.ToInt32(records[27].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[6].Split('/')[1])));
                books.Add("PrMa3", new Record(Convert.ToInt32(records[27].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[7].Split('/')[1])));
                books.Add("PrPr3", new Record(Convert.ToInt32(records[27].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[27].Split(':')[8].Split('/')[1])));
                this.PrTo3.Text = (books["PrWa3"] + books["PrSh3"] + books["PrRo3"] + books["PrPa3"] + books["PrHu3"] + books["PrDr3"] + books["PrWk3"] + books["PrMa3"] + books["PrPr3"]).ToString();
                this.ToTo3.Text = (books["WaWa3"] + books["WaSh3"] + books["WaRo3"] + books["WaPa3"] + books["WaHu3"] + books["WaDr3"] + books["WaWk3"] + books["WaMa3"] + books["WaPr3"] +
                 books["ShWa3"] + books["ShSh3"] + books["ShRo3"] + books["ShPa3"] + books["ShHu3"] + books["ShDr3"] + books["ShWk3"] + books["ShMa3"] + books["ShPr3"] +
                 books["RoWa3"] + books["RoSh3"] + books["RoRo3"] + books["RoPa3"] + books["RoHu3"] + books["RoDr3"] + books["RoWk3"] + books["RoMa3"] + books["RoPr3"] +
                 books["PaWa3"] + books["PaSh3"] + books["PaRo3"] + books["PaPa3"] + books["PaHu3"] + books["PaDr3"] + books["PaWk3"] + books["PaMa3"] + books["PaPr3"] +
                 books["HuWa3"] + books["HuSh3"] + books["HuRo3"] + books["HuPa3"] + books["HuHu3"] + books["HuDr3"] + books["HuWk3"] + books["HuMa3"] + books["HuPr3"] +
                 books["DrWa3"] + books["DrSh3"] + books["DrRo3"] + books["DrPa3"] + books["DrHu3"] + books["DrDr3"] + books["DrWk3"] + books["DrMa3"] + books["DrPr3"] +
                 books["WkWa3"] + books["WkSh3"] + books["WkRo3"] + books["WkPa3"] + books["WkHu3"] + books["WkDr3"] + books["WkWk3"] + books["WkMa3"] + books["WkPr3"] +
                 books["MaWa3"] + books["MaSh3"] + books["MaRo3"] + books["MaPa3"] + books["MaHu3"] + books["MaDr3"] + books["MaWk3"] + books["MaMa3"] + books["MaPr3"] +
                 books["PrWa3"] + books["PrSh3"] + books["PrRo3"] + books["PrPa3"] + books["PrHu3"] + books["PrDr3"] + books["PrWk3"] + books["PrMa3"] + books["PrPr3"]).ToString();
                this.WaWa2.Text = records[28].Split(':')[0];
                this.WaSh2.Text = records[28].Split(':')[1];
                this.WaRo2.Text = records[28].Split(':')[2];
                this.WaPa2.Text = records[28].Split(':')[3];
                this.WaHu2.Text = records[28].Split(':')[4];
                this.WaDr2.Text = records[28].Split(':')[5];
                this.WaWk2.Text = records[28].Split(':')[6];
                this.WaMa2.Text = records[28].Split(':')[7];
                this.WaPr2.Text = records[28].Split(':')[8];
                this.ShWa2.Text = records[29].Split(':')[0];
                this.ShSh2.Text = records[29].Split(':')[1];
                this.ShRo2.Text = records[29].Split(':')[2];
                this.ShPa2.Text = records[29].Split(':')[3];
                this.ShHu2.Text = records[29].Split(':')[4];
                this.ShDr2.Text = records[29].Split(':')[5];
                this.ShWk2.Text = records[29].Split(':')[6];
                this.ShMa2.Text = records[29].Split(':')[7];
                this.ShPr2.Text = records[29].Split(':')[8];
                this.RoWa2.Text = records[30].Split(':')[0];
                this.RoSh2.Text = records[30].Split(':')[1];
                this.RoRo2.Text = records[30].Split(':')[2];
                this.RoPa2.Text = records[30].Split(':')[3];
                this.RoHu2.Text = records[30].Split(':')[4];
                this.RoDr2.Text = records[30].Split(':')[5];
                this.RoWk2.Text = records[30].Split(':')[6];
                this.RoMa2.Text = records[30].Split(':')[7];
                this.RoPr2.Text = records[30].Split(':')[8];
                this.PaWa2.Text = records[31].Split(':')[0];
                this.PaSh2.Text = records[31].Split(':')[1];
                this.PaRo2.Text = records[31].Split(':')[2];
                this.PaPa2.Text = records[31].Split(':')[3];
                this.PaHu2.Text = records[31].Split(':')[4];
                this.PaDr2.Text = records[31].Split(':')[5];
                this.PaWk2.Text = records[31].Split(':')[6];
                this.PaMa2.Text = records[31].Split(':')[7];
                this.PaPr2.Text = records[31].Split(':')[8];
                this.HuWa2.Text = records[32].Split(':')[0];
                this.HuSh2.Text = records[32].Split(':')[1];
                this.HuRo2.Text = records[32].Split(':')[2];
                this.HuPa2.Text = records[32].Split(':')[3];
                this.HuHu2.Text = records[32].Split(':')[4];
                this.HuDr2.Text = records[32].Split(':')[5];
                this.HuWk2.Text = records[32].Split(':')[6];
                this.HuMa2.Text = records[32].Split(':')[7];
                this.HuPr2.Text = records[32].Split(':')[8];
                this.DrWa2.Text = records[33].Split(':')[0];
                this.DrSh2.Text = records[33].Split(':')[1];
                this.DrRo2.Text = records[33].Split(':')[2];
                this.DrPa2.Text = records[33].Split(':')[3];
                this.DrHu2.Text = records[33].Split(':')[4];
                this.DrDr2.Text = records[33].Split(':')[5];
                this.DrWk2.Text = records[33].Split(':')[6];
                this.DrMa2.Text = records[33].Split(':')[7];
                this.DrPr2.Text = records[33].Split(':')[8];
                this.WkWa2.Text = records[34].Split(':')[0];
                this.WkSh2.Text = records[34].Split(':')[1];
                this.WkRo2.Text = records[34].Split(':')[2];
                this.WkPa2.Text = records[34].Split(':')[3];
                this.WkHu2.Text = records[34].Split(':')[4];
                this.WkDr2.Text = records[34].Split(':')[5];
                this.WkWk2.Text = records[34].Split(':')[6];
                this.WkMa2.Text = records[34].Split(':')[7];
                this.WkPr2.Text = records[34].Split(':')[8];
                this.MaWa2.Text = records[35].Split(':')[0];
                this.MaSh2.Text = records[35].Split(':')[1];
                this.MaRo2.Text = records[35].Split(':')[2];
                this.MaPa2.Text = records[35].Split(':')[3];
                this.MaHu2.Text = records[35].Split(':')[4];
                this.MaDr2.Text = records[35].Split(':')[5];
                this.MaWk2.Text = records[35].Split(':')[6];
                this.MaMa2.Text = records[35].Split(':')[7];
                this.MaPr2.Text = records[35].Split(':')[8];
                this.PrWa2.Text = records[36].Split(':')[0];
                this.PrSh2.Text = records[36].Split(':')[1];
                this.PrRo2.Text = records[36].Split(':')[2];
                this.PrPa2.Text = records[36].Split(':')[3];
                this.PrHu2.Text = records[36].Split(':')[4];
                this.PrDr2.Text = records[36].Split(':')[5];
                this.PrWk2.Text = records[36].Split(':')[6];
                this.PrMa2.Text = records[36].Split(':')[7];
                this.PrPr2.Text = records[36].Split(':')[8];
                books.Add("WaWa2", new Record(Convert.ToInt32(records[28].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[0].Split('/')[1])));
                books.Add("WaSh2", new Record(Convert.ToInt32(records[28].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[1].Split('/')[1])));
                books.Add("WaRo2", new Record(Convert.ToInt32(records[28].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[2].Split('/')[1])));
                books.Add("WaPa2", new Record(Convert.ToInt32(records[28].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[3].Split('/')[1])));
                books.Add("WaHu2", new Record(Convert.ToInt32(records[28].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[4].Split('/')[1])));
                books.Add("WaDr2", new Record(Convert.ToInt32(records[28].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[5].Split('/')[1])));
                books.Add("WaWk2", new Record(Convert.ToInt32(records[28].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[6].Split('/')[1])));
                books.Add("WaMa2", new Record(Convert.ToInt32(records[28].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[7].Split('/')[1])));
                books.Add("WaPr2", new Record(Convert.ToInt32(records[28].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[28].Split(':')[8].Split('/')[1])));
                this.WaTo2.Text = (books["WaWa2"] + books["WaSh2"] + books["WaRo2"] + books["WaPa2"] + books["WaHu2"] + books["WaDr2"] + books["WaWk2"] + books["WaMa2"] + books["WaPr2"]).ToString();
                books.Add("ShWa2", new Record(Convert.ToInt32(records[29].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[0].Split('/')[1])));
                books.Add("ShSh2", new Record(Convert.ToInt32(records[29].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[1].Split('/')[1])));
                books.Add("ShRo2", new Record(Convert.ToInt32(records[29].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[2].Split('/')[1])));
                books.Add("ShPa2", new Record(Convert.ToInt32(records[29].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[3].Split('/')[1])));
                books.Add("ShHu2", new Record(Convert.ToInt32(records[29].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[4].Split('/')[1])));
                books.Add("ShDr2", new Record(Convert.ToInt32(records[29].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[5].Split('/')[1])));
                books.Add("ShWk2", new Record(Convert.ToInt32(records[29].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[6].Split('/')[1])));
                books.Add("ShMa2", new Record(Convert.ToInt32(records[29].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[7].Split('/')[1])));
                books.Add("ShPr2", new Record(Convert.ToInt32(records[29].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[29].Split(':')[8].Split('/')[1])));
                this.ShTo2.Text = (books["ShWa2"] + books["ShSh2"] + books["ShRo2"] + books["ShPa2"] + books["ShHu2"] + books["ShDr2"] + books["ShWk2"] + books["ShMa2"] + books["ShPr2"]).ToString();
                books.Add("RoWa2", new Record(Convert.ToInt32(records[30].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[0].Split('/')[1])));
                books.Add("RoSh2", new Record(Convert.ToInt32(records[30].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[1].Split('/')[1])));
                books.Add("RoRo2", new Record(Convert.ToInt32(records[30].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[2].Split('/')[1])));
                books.Add("RoPa2", new Record(Convert.ToInt32(records[30].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[3].Split('/')[1])));
                books.Add("RoHu2", new Record(Convert.ToInt32(records[30].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[4].Split('/')[1])));
                books.Add("RoDr2", new Record(Convert.ToInt32(records[30].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[5].Split('/')[1])));
                books.Add("RoWk2", new Record(Convert.ToInt32(records[30].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[6].Split('/')[1])));
                books.Add("RoMa2", new Record(Convert.ToInt32(records[30].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[7].Split('/')[1])));
                books.Add("RoPr2", new Record(Convert.ToInt32(records[30].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[30].Split(':')[8].Split('/')[1])));
                this.RoTo2.Text = (books["RoWa2"] + books["RoSh2"] + books["RoRo2"] + books["RoPa2"] + books["RoHu2"] + books["RoDr2"] + books["RoWk2"] + books["RoMa2"] + books["RoPr2"]).ToString();
                books.Add("PaWa2", new Record(Convert.ToInt32(records[31].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[0].Split('/')[1])));
                books.Add("PaSh2", new Record(Convert.ToInt32(records[31].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[1].Split('/')[1])));
                books.Add("PaRo2", new Record(Convert.ToInt32(records[31].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[2].Split('/')[1])));
                books.Add("PaPa2", new Record(Convert.ToInt32(records[31].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[3].Split('/')[1])));
                books.Add("PaHu2", new Record(Convert.ToInt32(records[31].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[4].Split('/')[1])));
                books.Add("PaDr2", new Record(Convert.ToInt32(records[31].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[5].Split('/')[1])));
                books.Add("PaWk2", new Record(Convert.ToInt32(records[31].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[6].Split('/')[1])));
                books.Add("PaMa2", new Record(Convert.ToInt32(records[31].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[7].Split('/')[1])));
                books.Add("PaPr2", new Record(Convert.ToInt32(records[31].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[31].Split(':')[8].Split('/')[1])));
                this.PaTo2.Text = (books["PaWa2"] + books["PaSh2"] + books["PaRo2"] + books["PaPa2"] + books["PaHu2"] + books["PaDr2"] + books["PaWk2"] + books["PaMa2"] + books["PaPr2"]).ToString();
                books.Add("HuWa2", new Record(Convert.ToInt32(records[32].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[0].Split('/')[1])));
                books.Add("HuSh2", new Record(Convert.ToInt32(records[32].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[1].Split('/')[1])));
                books.Add("HuRo2", new Record(Convert.ToInt32(records[32].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[2].Split('/')[1])));
                books.Add("HuPa2", new Record(Convert.ToInt32(records[32].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[3].Split('/')[1])));
                books.Add("HuHu2", new Record(Convert.ToInt32(records[32].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[4].Split('/')[1])));
                books.Add("HuDr2", new Record(Convert.ToInt32(records[32].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[5].Split('/')[1])));
                books.Add("HuWk2", new Record(Convert.ToInt32(records[32].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[6].Split('/')[1])));
                books.Add("HuMa2", new Record(Convert.ToInt32(records[32].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[7].Split('/')[1])));
                books.Add("HuPr2", new Record(Convert.ToInt32(records[32].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[32].Split(':')[8].Split('/')[1])));
                this.HuTo2.Text = (books["HuWa2"] + books["HuSh2"] + books["HuRo2"] + books["HuPa2"] + books["HuHu2"] + books["HuDr2"] + books["HuWk2"] + books["HuMa2"] + books["HuPr2"]).ToString();
                books.Add("DrWa2", new Record(Convert.ToInt32(records[33].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[0].Split('/')[1])));
                books.Add("DrSh2", new Record(Convert.ToInt32(records[33].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[1].Split('/')[1])));
                books.Add("DrRo2", new Record(Convert.ToInt32(records[33].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[2].Split('/')[1])));
                books.Add("DrPa2", new Record(Convert.ToInt32(records[33].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[3].Split('/')[1])));
                books.Add("DrHu2", new Record(Convert.ToInt32(records[33].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[4].Split('/')[1])));
                books.Add("DrDr2", new Record(Convert.ToInt32(records[33].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[5].Split('/')[1])));
                books.Add("DrWk2", new Record(Convert.ToInt32(records[33].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[6].Split('/')[1])));
                books.Add("DrMa2", new Record(Convert.ToInt32(records[33].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[7].Split('/')[1])));
                books.Add("DrPr2", new Record(Convert.ToInt32(records[33].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[33].Split(':')[8].Split('/')[1])));
                this.DrTo2.Text = (books["DrWa2"] + books["DrSh2"] + books["DrRo2"] + books["DrPa2"] + books["DrHu2"] + books["DrDr2"] + books["DrWk2"] + books["DrMa2"] + books["DrPr2"]).ToString();
                books.Add("WkWa2", new Record(Convert.ToInt32(records[34].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[0].Split('/')[1])));
                books.Add("WkSh2", new Record(Convert.ToInt32(records[34].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[1].Split('/')[1])));
                books.Add("WkRo2", new Record(Convert.ToInt32(records[34].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[2].Split('/')[1])));
                books.Add("WkPa2", new Record(Convert.ToInt32(records[34].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[3].Split('/')[1])));
                books.Add("WkHu2", new Record(Convert.ToInt32(records[34].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[4].Split('/')[1])));
                books.Add("WkDr2", new Record(Convert.ToInt32(records[34].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[5].Split('/')[1])));
                books.Add("WkWk2", new Record(Convert.ToInt32(records[34].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[6].Split('/')[1])));
                books.Add("WkMa2", new Record(Convert.ToInt32(records[34].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[7].Split('/')[1])));
                books.Add("WkPr2", new Record(Convert.ToInt32(records[34].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[34].Split(':')[8].Split('/')[1])));
                this.WkTo2.Text = (books["WkWa2"] + books["WkSh2"] + books["WkRo2"] + books["WkPa2"] + books["WkHu2"] + books["WkDr2"] + books["WkWk2"] + books["WkMa2"] + books["WkPr2"]).ToString();
                books.Add("MaWa2", new Record(Convert.ToInt32(records[35].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[0].Split('/')[1])));
                books.Add("MaSh2", new Record(Convert.ToInt32(records[35].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[1].Split('/')[1])));
                books.Add("MaRo2", new Record(Convert.ToInt32(records[35].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[2].Split('/')[1])));
                books.Add("MaPa2", new Record(Convert.ToInt32(records[35].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[3].Split('/')[1])));
                books.Add("MaHu2", new Record(Convert.ToInt32(records[35].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[4].Split('/')[1])));
                books.Add("MaDr2", new Record(Convert.ToInt32(records[35].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[5].Split('/')[1])));
                books.Add("MaWk2", new Record(Convert.ToInt32(records[35].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[6].Split('/')[1])));
                books.Add("MaMa2", new Record(Convert.ToInt32(records[35].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[7].Split('/')[1])));
                books.Add("MaPr2", new Record(Convert.ToInt32(records[35].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[35].Split(':')[8].Split('/')[1])));
                this.MaTo2.Text = (books["MaWa2"] + books["MaSh2"] + books["MaRo2"] + books["MaPa2"] + books["MaHu2"] + books["MaDr2"] + books["MaWk2"] + books["MaMa2"] + books["MaPr2"]).ToString();
                books.Add("PrWa2", new Record(Convert.ToInt32(records[36].Split(':')[0].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[0].Split('/')[1])));
                books.Add("PrSh2", new Record(Convert.ToInt32(records[36].Split(':')[1].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[1].Split('/')[1])));
                books.Add("PrRo2", new Record(Convert.ToInt32(records[36].Split(':')[2].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[2].Split('/')[1])));
                books.Add("PrPa2", new Record(Convert.ToInt32(records[36].Split(':')[3].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[3].Split('/')[1])));
                books.Add("PrHu2", new Record(Convert.ToInt32(records[36].Split(':')[4].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[4].Split('/')[1])));
                books.Add("PrDr2", new Record(Convert.ToInt32(records[36].Split(':')[5].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[5].Split('/')[1])));
                books.Add("PrWk2", new Record(Convert.ToInt32(records[36].Split(':')[6].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[6].Split('/')[1])));
                books.Add("PrMa2", new Record(Convert.ToInt32(records[36].Split(':')[7].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[7].Split('/')[1])));
                books.Add("PrPr2", new Record(Convert.ToInt32(records[36].Split(':')[8].Split('/')[0]), Convert.ToInt32(records[36].Split(':')[8].Split('/')[1])));
                this.PrTo2.Text = (books["PrWa2"] + books["PrSh2"] + books["PrRo2"] + books["PrPa2"] + books["PrHu2"] + books["PrDr2"] + books["PrWk2"] + books["PrMa2"] + books["PrPr2"]).ToString();
                this.ToTo2.Text = (books["WaWa2"] + books["WaSh2"] + books["WaRo2"] + books["WaPa2"] + books["WaHu2"] + books["WaDr2"] + books["WaWk2"] + books["WaMa2"] + books["WaPr2"] +
                 books["ShWa2"] + books["ShSh2"] + books["ShRo2"] + books["ShPa2"] + books["ShHu2"] + books["ShDr2"] + books["ShWk2"] + books["ShMa2"] + books["ShPr2"] +
                 books["RoWa2"] + books["RoSh2"] + books["RoRo2"] + books["RoPa2"] + books["RoHu2"] + books["RoDr2"] + books["RoWk2"] + books["RoMa2"] + books["RoPr2"] +
                 books["PaWa2"] + books["PaSh2"] + books["PaRo2"] + books["PaPa2"] + books["PaHu2"] + books["PaDr2"] + books["PaWk2"] + books["PaMa2"] + books["PaPr2"] +
                 books["HuWa2"] + books["HuSh2"] + books["HuRo2"] + books["HuPa2"] + books["HuHu2"] + books["HuDr2"] + books["HuWk2"] + books["HuMa2"] + books["HuPr2"] +
                 books["DrWa2"] + books["DrSh2"] + books["DrRo2"] + books["DrPa2"] + books["DrHu2"] + books["DrDr2"] + books["DrWk2"] + books["DrMa2"] + books["DrPr2"] +
                 books["WkWa2"] + books["WkSh2"] + books["WkRo2"] + books["WkPa2"] + books["WkHu2"] + books["WkDr2"] + books["WkWk2"] + books["WkMa2"] + books["WkPr2"] +
                 books["MaWa2"] + books["MaSh2"] + books["MaRo2"] + books["MaPa2"] + books["MaHu2"] + books["MaDr2"] + books["MaWk2"] + books["MaMa2"] + books["MaPr2"] +
                 books["PrWa2"] + books["PrSh2"] + books["PrRo2"] + books["PrPa2"] + books["PrHu2"] + books["PrDr2"] + books["PrWk2"] + books["PrMa2"] + books["PrPr2"]).ToString();

                this.ToToTotal.Text = (Convert.ToInt32(ToTo3.Text.Split('/')[0]) + Convert.ToInt32(ToTo2.Text.Split('/')[0]) + Convert.ToInt32(ToTo.Text.Split('/')[0])).ToString() + "/"
                    + (Convert.ToInt32(ToTo3.Text.Split('/')[1]) + Convert.ToInt32(ToTo2.Text.Split('/')[1]) + Convert.ToInt32(ToTo.Text.Split('/')[1])).ToString();

                this.TotalwoArena.Text = (Convert.ToInt32(ToTo3.Text.Split('/')[0]) + Convert.ToInt32(ToTo.Text.Split('/')[0])).ToString() + "/"
                    + (Convert.ToInt32(ToTo3.Text.Split('/')[1]) + Convert.ToInt32(ToTo.Text.Split('/')[1])).ToString();

                Disconnects = Convert.ToInt32(records[37].Split(':')[1]);
                Disconnect.Text = records[37].Split(':')[1];

                SaveChanges();

            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }
        }

        private void Record_Click(object sender, EventArgs e)
        {
            if (e is MouseEventArgs)
            {
                if (((MouseEventArgs)e).Button == MouseButtons.Left)
                {
                    Record temp;
                    if (Control.ModifierKeys == 0)
                    {
                        temp = Win(((Label)sender));
                    }
                    else
                    {
                        temp = unWin(((Label)sender));
                    }
                    if (temp != null)
                    {
                        ((Label)sender).Text = temp.wins.ToString() + "/" + temp.losses.ToString();
                    }
                    SaveChanges();
                    UpdateTotals();
                }
                else if ((((MouseEventArgs)e).Button == MouseButtons.Right))
                {
                    Record temp;
                    if (Control.ModifierKeys == 0)
                    {
                        temp = Lose(((Label)sender));
                    }
                    else
                    {
                        temp = unLose(((Label)sender));
                    }
                    if (temp != null)
                    {
                        ((Label)sender).Text = temp.wins.ToString() + "/" + temp.losses.ToString();
                    }
                    SaveChanges();
                    UpdateTotals();
                }
            }
        }

        private void SaveChanges()
        {
            // Build stats.txt
            string file =
                Deck0TextBox.Text + ":" + Deck0RecordText.Text + ";" + "\n" +
                Deck1TextBox.Text + ":" + Deck1RecordText.Text + ";" + "\n" +
                Deck2TextBox.Text + ":" + Deck2RecordText.Text + ";" + "\n" +
                Deck3TextBox.Text + ":" + Deck3RecordText.Text + ";" + "\n" +
                Deck4TextBox.Text + ":" + Deck4RecordText.Text + ";" + "\n" +
                Deck5TextBox.Text + ":" + Deck5RecordText.Text + ";" + "\n" +
                Deck6TextBox.Text + ":" + Deck6RecordText.Text + ";" + "\n" +
                Deck7TextBox.Text + ":" + Deck7RecordText.Text + ";" + "\n" +
                Deck8TextBox.Text + ":" + Deck8RecordText.Text + ";" + "\n" +
                Deck9TextBox.Text + ":" + Deck9RecordText.Text + ";" + "\n" +
                "\n" +
                WaWa.Text + ":" + WaSh.Text + ":" + WaRo.Text + ":" + WaPa.Text + ":" + WaHu.Text + ":" + WaDr.Text + ":" + WaWk.Text + ":" + WaMa.Text + ":" + WaPr.Text + ";" + "\n" +
                ShWa.Text + ":" + ShSh.Text + ":" + ShRo.Text + ":" + ShPa.Text + ":" + ShHu.Text + ":" + ShDr.Text + ":" + ShWk.Text + ":" + ShMa.Text + ":" + ShPr.Text + ";" + "\n" +
                RoWa.Text + ":" + RoSh.Text + ":" + RoRo.Text + ":" + RoPa.Text + ":" + RoHu.Text + ":" + RoDr.Text + ":" + RoWk.Text + ":" + RoMa.Text + ":" + RoPr.Text + ";" + "\n" +
                PaWa.Text + ":" + PaSh.Text + ":" + PaRo.Text + ":" + PaPa.Text + ":" + PaHu.Text + ":" + PaDr.Text + ":" + PaWk.Text + ":" + PaMa.Text + ":" + PaPr.Text + ";" + "\n" +
                HuWa.Text + ":" + HuSh.Text + ":" + HuRo.Text + ":" + HuPa.Text + ":" + HuHu.Text + ":" + HuDr.Text + ":" + HuWk.Text + ":" + HuMa.Text + ":" + HuPr.Text + ";" + "\n" +
                DrWa.Text + ":" + DrSh.Text + ":" + DrRo.Text + ":" + DrPa.Text + ":" + DrHu.Text + ":" + DrDr.Text + ":" + DrWk.Text + ":" + DrMa.Text + ":" + DrPr.Text + ";" + "\n" +
                WkWa.Text + ":" + WkSh.Text + ":" + WkRo.Text + ":" + WkPa.Text + ":" + WkHu.Text + ":" + WkDr.Text + ":" + WkWk.Text + ":" + WkMa.Text + ":" + WkPr.Text + ";" + "\n" +
                MaWa.Text + ":" + MaSh.Text + ":" + MaRo.Text + ":" + MaPa.Text + ":" + MaHu.Text + ":" + MaDr.Text + ":" + MaWk.Text + ":" + MaMa.Text + ":" + MaPr.Text + ";" + "\n" +
                PrWa.Text + ":" + PrSh.Text + ":" + PrRo.Text + ":" + PrPa.Text + ":" + PrHu.Text + ":" + PrDr.Text + ":" + PrWk.Text + ":" + PrMa.Text + ":" + PrPr.Text + ";" + "\n" +
                "\n" +
                WaWa3.Text + ":" + WaSh3.Text + ":" + WaRo3.Text + ":" + WaPa3.Text + ":" + WaHu3.Text + ":" + WaDr3.Text + ":" + WaWk3.Text + ":" + WaMa3.Text + ":" + WaPr3.Text + ";" + "\n" +
                ShWa3.Text + ":" + ShSh3.Text + ":" + ShRo3.Text + ":" + ShPa3.Text + ":" + ShHu3.Text + ":" + ShDr3.Text + ":" + ShWk3.Text + ":" + ShMa3.Text + ":" + ShPr3.Text + ";" + "\n" +
                RoWa3.Text + ":" + RoSh3.Text + ":" + RoRo3.Text + ":" + RoPa3.Text + ":" + RoHu3.Text + ":" + RoDr3.Text + ":" + RoWk3.Text + ":" + RoMa3.Text + ":" + RoPr3.Text + ";" + "\n" +
                PaWa3.Text + ":" + PaSh3.Text + ":" + PaRo3.Text + ":" + PaPa3.Text + ":" + PaHu3.Text + ":" + PaDr3.Text + ":" + PaWk3.Text + ":" + PaMa3.Text + ":" + PaPr3.Text + ";" + "\n" +
                HuWa3.Text + ":" + HuSh3.Text + ":" + HuRo3.Text + ":" + HuPa3.Text + ":" + HuHu3.Text + ":" + HuDr3.Text + ":" + HuWk3.Text + ":" + HuMa3.Text + ":" + HuPr3.Text + ";" + "\n" +
                DrWa3.Text + ":" + DrSh3.Text + ":" + DrRo3.Text + ":" + DrPa3.Text + ":" + DrHu3.Text + ":" + DrDr3.Text + ":" + DrWk3.Text + ":" + DrMa3.Text + ":" + DrPr3.Text + ";" + "\n" +
                WkWa3.Text + ":" + WkSh3.Text + ":" + WkRo3.Text + ":" + WkPa3.Text + ":" + WkHu3.Text + ":" + WkDr3.Text + ":" + WkWk3.Text + ":" + WkMa3.Text + ":" + WkPr3.Text + ";" + "\n" +
                MaWa3.Text + ":" + MaSh3.Text + ":" + MaRo3.Text + ":" + MaPa3.Text + ":" + MaHu3.Text + ":" + MaDr3.Text + ":" + MaWk3.Text + ":" + MaMa3.Text + ":" + MaPr3.Text + ";" + "\n" +
                PrWa3.Text + ":" + PrSh3.Text + ":" + PrRo3.Text + ":" + PrPa3.Text + ":" + PrHu3.Text + ":" + PrDr3.Text + ":" + PrWk3.Text + ":" + PrMa3.Text + ":" + PrPr3.Text + ";" + "\n" +
                "\n" +
                WaWa2.Text + ":" + WaSh2.Text + ":" + WaRo2.Text + ":" + WaPa2.Text + ":" + WaHu2.Text + ":" + WaDr2.Text + ":" + WaWk2.Text + ":" + WaMa2.Text + ":" + WaPr2.Text + ";" + "\n" +
                ShWa2.Text + ":" + ShSh2.Text + ":" + ShRo2.Text + ":" + ShPa2.Text + ":" + ShHu2.Text + ":" + ShDr2.Text + ":" + ShWk2.Text + ":" + ShMa2.Text + ":" + ShPr2.Text + ";" + "\n" +
                RoWa2.Text + ":" + RoSh2.Text + ":" + RoRo2.Text + ":" + RoPa2.Text + ":" + RoHu2.Text + ":" + RoDr2.Text + ":" + RoWk2.Text + ":" + RoMa2.Text + ":" + RoPr2.Text + ";" + "\n" +
                PaWa2.Text + ":" + PaSh2.Text + ":" + PaRo2.Text + ":" + PaPa2.Text + ":" + PaHu2.Text + ":" + PaDr2.Text + ":" + PaWk2.Text + ":" + PaMa2.Text + ":" + PaPr2.Text + ";" + "\n" +
                HuWa2.Text + ":" + HuSh2.Text + ":" + HuRo2.Text + ":" + HuPa2.Text + ":" + HuHu2.Text + ":" + HuDr2.Text + ":" + HuWk2.Text + ":" + HuMa2.Text + ":" + HuPr2.Text + ";" + "\n" +
                DrWa2.Text + ":" + DrSh2.Text + ":" + DrRo2.Text + ":" + DrPa2.Text + ":" + DrHu2.Text + ":" + DrDr2.Text + ":" + DrWk2.Text + ":" + DrMa2.Text + ":" + DrPr2.Text + ";" + "\n" +
                WkWa2.Text + ":" + WkSh2.Text + ":" + WkRo2.Text + ":" + WkPa2.Text + ":" + WkHu2.Text + ":" + WkDr2.Text + ":" + WkWk2.Text + ":" + WkMa2.Text + ":" + WkPr2.Text + ";" + "\n" +
                MaWa2.Text + ":" + MaSh2.Text + ":" + MaRo2.Text + ":" + MaPa2.Text + ":" + MaHu2.Text + ":" + MaDr2.Text + ":" + MaWk2.Text + ":" + MaMa2.Text + ":" + MaPr2.Text + ";" + "\n" +
                PrWa2.Text + ":" + PrSh2.Text + ":" + PrRo2.Text + ":" + PrPa2.Text + ":" + PrHu2.Text + ":" + PrDr2.Text + ":" + PrWk2.Text + ":" + PrMa2.Text + ":" + PrPr2.Text + ";" + "\n" +
                "\n" +
                "Disconnects:" + Disconnects.ToString() + ";";

            System.IO.File.WriteAllText(Directory.GetCurrentDirectory() + "\\stats.txt", file);
        }

        private void TextChangedEvent(object sender, EventArgs e)
        {
            SaveChanges();
        }

        private Record Win(Label label)
        {
            return books[label.Name].Win();
        }

        private Record Lose(Label label)
        {
            return books[label.Name].Lose();
        }

        private Record unWin(Label label)
        {
            return books[label.Name].unWin();
        }

        private Record unLose(Label label)
        {
            return books[label.Name].unLose();
        }

        private void UpdateTotals()
        {
            try
            {
                this.WaTo.Text = (books["WaWa"] + books["WaSh"] + books["WaRo"] + books["WaPa"] + books["WaHu"] + books["WaDr"] + books["WaWk"] + books["WaMa"] + books["WaPr"]).ToString();
                this.ShTo.Text = (books["ShWa"] + books["ShSh"] + books["ShRo"] + books["ShPa"] + books["ShHu"] + books["ShDr"] + books["ShWk"] + books["ShMa"] + books["ShPr"]).ToString();
                this.RoTo.Text = (books["RoWa"] + books["RoSh"] + books["RoRo"] + books["RoPa"] + books["RoHu"] + books["RoDr"] + books["RoWk"] + books["RoMa"] + books["RoPr"]).ToString();
                this.PaTo.Text = (books["PaWa"] + books["PaSh"] + books["PaRo"] + books["PaPa"] + books["PaHu"] + books["PaDr"] + books["PaWk"] + books["PaMa"] + books["PaPr"]).ToString();
                this.HuTo.Text = (books["HuWa"] + books["HuSh"] + books["HuRo"] + books["HuPa"] + books["HuHu"] + books["HuDr"] + books["HuWk"] + books["HuMa"] + books["HuPr"]).ToString();
                this.DrTo.Text = (books["DrWa"] + books["DrSh"] + books["DrRo"] + books["DrPa"] + books["DrHu"] + books["DrDr"] + books["DrWk"] + books["DrMa"] + books["DrPr"]).ToString();
                this.WkTo.Text = (books["WkWa"] + books["WkSh"] + books["WkRo"] + books["WkPa"] + books["WkHu"] + books["WkDr"] + books["WkWk"] + books["WkMa"] + books["WkPr"]).ToString();
                this.MaTo.Text = (books["MaWa"] + books["MaSh"] + books["MaRo"] + books["MaPa"] + books["MaHu"] + books["MaDr"] + books["MaWk"] + books["MaMa"] + books["MaPr"]).ToString();
                this.PrTo.Text = (books["PrWa"] + books["PrSh"] + books["PrRo"] + books["PrPa"] + books["PrHu"] + books["PrDr"] + books["PrWk"] + books["PrMa"] + books["PrPr"]).ToString();

                this.ToTo.Text = (books["WaWa"] + books["WaSh"] + books["WaRo"] + books["WaPa"] + books["WaHu"] + books["WaDr"] + books["WaWk"] + books["WaMa"] + books["WaPr"] +
                books["ShWa"] + books["ShSh"] + books["ShRo"] + books["ShPa"] + books["ShHu"] + books["ShDr"] + books["ShWk"] + books["ShMa"] + books["ShPr"] +
                books["RoWa"] + books["RoSh"] + books["RoRo"] + books["RoPa"] + books["RoHu"] + books["RoDr"] + books["RoWk"] + books["RoMa"] + books["RoPr"] +
                books["PaWa"] + books["PaSh"] + books["PaRo"] + books["PaPa"] + books["PaHu"] + books["PaDr"] + books["PaWk"] + books["PaMa"] + books["PaPr"] +
                books["HuWa"] + books["HuSh"] + books["HuRo"] + books["HuPa"] + books["HuHu"] + books["HuDr"] + books["HuWk"] + books["HuMa"] + books["HuPr"] +
                books["DrWa"] + books["DrSh"] + books["DrRo"] + books["DrPa"] + books["DrHu"] + books["DrDr"] + books["DrWk"] + books["DrMa"] + books["DrPr"] +
                books["WkWa"] + books["WkSh"] + books["WkRo"] + books["WkPa"] + books["WkHu"] + books["WkDr"] + books["WkWk"] + books["WkMa"] + books["WkPr"] +
                books["MaWa"] + books["MaSh"] + books["MaRo"] + books["MaPa"] + books["MaHu"] + books["MaDr"] + books["MaWk"] + books["MaMa"] + books["MaPr"] +
                books["PrWa"] + books["PrSh"] + books["PrRo"] + books["PrPa"] + books["PrHu"] + books["PrDr"] + books["PrWk"] + books["PrMa"] + books["PrPr"]).ToString();

                this.WaTo2.Text = (books["WaWa2"] + books["WaSh2"] + books["WaRo2"] + books["WaPa2"] + books["WaHu2"] + books["WaDr2"] + books["WaWk2"] + books["WaMa2"] + books["WaPr2"]).ToString();
                this.ShTo2.Text = (books["ShWa2"] + books["ShSh2"] + books["ShRo2"] + books["ShPa2"] + books["ShHu2"] + books["ShDr2"] + books["ShWk2"] + books["ShMa2"] + books["ShPr2"]).ToString();
                this.RoTo2.Text = (books["RoWa2"] + books["RoSh2"] + books["RoRo2"] + books["RoPa2"] + books["RoHu2"] + books["RoDr2"] + books["RoWk2"] + books["RoMa2"] + books["RoPr2"]).ToString();
                this.PaTo2.Text = (books["PaWa2"] + books["PaSh2"] + books["PaRo2"] + books["PaPa2"] + books["PaHu2"] + books["PaDr2"] + books["PaWk2"] + books["PaMa2"] + books["PaPr2"]).ToString();
                this.HuTo2.Text = (books["HuWa2"] + books["HuSh2"] + books["HuRo2"] + books["HuPa2"] + books["HuHu2"] + books["HuDr2"] + books["HuWk2"] + books["HuMa2"] + books["HuPr2"]).ToString();
                this.DrTo2.Text = (books["DrWa2"] + books["DrSh2"] + books["DrRo2"] + books["DrPa2"] + books["DrHu2"] + books["DrDr2"] + books["DrWk2"] + books["DrMa2"] + books["DrPr2"]).ToString();
                this.WkTo2.Text = (books["WkWa2"] + books["WkSh2"] + books["WkRo2"] + books["WkPa2"] + books["WkHu2"] + books["WkDr2"] + books["WkWk2"] + books["WkMa2"] + books["WkPr2"]).ToString();
                this.MaTo2.Text = (books["MaWa2"] + books["MaSh2"] + books["MaRo2"] + books["MaPa2"] + books["MaHu2"] + books["MaDr2"] + books["MaWk2"] + books["MaMa2"] + books["MaPr2"]).ToString();
                this.PrTo2.Text = (books["PrWa2"] + books["PrSh2"] + books["PrRo2"] + books["PrPa2"] + books["PrHu2"] + books["PrDr2"] + books["PrWk2"] + books["PrMa2"] + books["PrPr2"]).ToString();

                this.ToTo2.Text = (books["WaWa2"] + books["WaSh2"] + books["WaRo2"] + books["WaPa2"] + books["WaHu2"] + books["WaDr2"] + books["WaWk2"] + books["WaMa2"] + books["WaPr2"] +
                books["ShWa2"] + books["ShSh2"] + books["ShRo2"] + books["ShPa2"] + books["ShHu2"] + books["ShDr2"] + books["ShWk2"] + books["ShMa2"] + books["ShPr2"] +
                books["RoWa2"] + books["RoSh2"] + books["RoRo2"] + books["RoPa2"] + books["RoHu2"] + books["RoDr2"] + books["RoWk2"] + books["RoMa2"] + books["RoPr2"] +
                books["PaWa2"] + books["PaSh2"] + books["PaRo2"] + books["PaPa2"] + books["PaHu2"] + books["PaDr2"] + books["PaWk2"] + books["PaMa2"] + books["PaPr2"] +
                books["HuWa2"] + books["HuSh2"] + books["HuRo2"] + books["HuPa2"] + books["HuHu2"] + books["HuDr2"] + books["HuWk2"] + books["HuMa2"] + books["HuPr2"] +
                books["DrWa2"] + books["DrSh2"] + books["DrRo2"] + books["DrPa2"] + books["DrHu2"] + books["DrDr2"] + books["DrWk2"] + books["DrMa2"] + books["DrPr2"] +
                books["WkWa2"] + books["WkSh2"] + books["WkRo2"] + books["WkPa2"] + books["WkHu2"] + books["WkDr2"] + books["WkWk2"] + books["WkMa2"] + books["WkPr2"] +
                books["MaWa2"] + books["MaSh2"] + books["MaRo2"] + books["MaPa2"] + books["MaHu2"] + books["MaDr2"] + books["MaWk2"] + books["MaMa2"] + books["MaPr2"] +
                books["PrWa2"] + books["PrSh2"] + books["PrRo2"] + books["PrPa2"] + books["PrHu2"] + books["PrDr2"] + books["PrWk2"] + books["PrMa2"] + books["PrPr2"]).ToString();

                this.WaTo3.Text = (books["WaWa3"] + books["WaSh3"] + books["WaRo3"] + books["WaPa3"] + books["WaHu3"] + books["WaDr3"] + books["WaWk3"] + books["WaMa3"] + books["WaPr3"]).ToString();
                this.ShTo3.Text = (books["ShWa3"] + books["ShSh3"] + books["ShRo3"] + books["ShPa3"] + books["ShHu3"] + books["ShDr3"] + books["ShWk3"] + books["ShMa3"] + books["ShPr3"]).ToString();
                this.RoTo3.Text = (books["RoWa3"] + books["RoSh3"] + books["RoRo3"] + books["RoPa3"] + books["RoHu3"] + books["RoDr3"] + books["RoWk3"] + books["RoMa3"] + books["RoPr3"]).ToString();
                this.PaTo3.Text = (books["PaWa3"] + books["PaSh3"] + books["PaRo3"] + books["PaPa3"] + books["PaHu3"] + books["PaDr3"] + books["PaWk3"] + books["PaMa3"] + books["PaPr3"]).ToString();
                this.HuTo3.Text = (books["HuWa3"] + books["HuSh3"] + books["HuRo3"] + books["HuPa3"] + books["HuHu3"] + books["HuDr3"] + books["HuWk3"] + books["HuMa3"] + books["HuPr3"]).ToString();
                this.DrTo3.Text = (books["DrWa3"] + books["DrSh3"] + books["DrRo3"] + books["DrPa3"] + books["DrHu3"] + books["DrDr3"] + books["DrWk3"] + books["DrMa3"] + books["DrPr3"]).ToString();
                this.WkTo3.Text = (books["WkWa3"] + books["WkSh3"] + books["WkRo3"] + books["WkPa3"] + books["WkHu3"] + books["WkDr3"] + books["WkWk3"] + books["WkMa3"] + books["WkPr3"]).ToString();
                this.MaTo3.Text = (books["MaWa3"] + books["MaSh3"] + books["MaRo3"] + books["MaPa3"] + books["MaHu3"] + books["MaDr3"] + books["MaWk3"] + books["MaMa3"] + books["MaPr3"]).ToString();
                this.PrTo3.Text = (books["PrWa3"] + books["PrSh3"] + books["PrRo3"] + books["PrPa3"] + books["PrHu3"] + books["PrDr3"] + books["PrWk3"] + books["PrMa3"] + books["PrPr3"]).ToString();

                this.ToTo3.Text = (books["WaWa3"] + books["WaSh3"] + books["WaRo3"] + books["WaPa3"] + books["WaHu3"] + books["WaDr3"] + books["WaWk3"] + books["WaMa3"] + books["WaPr3"] +
                books["ShWa3"] + books["ShSh3"] + books["ShRo3"] + books["ShPa3"] + books["ShHu3"] + books["ShDr3"] + books["ShWk3"] + books["ShMa3"] + books["ShPr3"] +
                books["RoWa3"] + books["RoSh3"] + books["RoRo3"] + books["RoPa3"] + books["RoHu3"] + books["RoDr3"] + books["RoWk3"] + books["RoMa3"] + books["RoPr3"] +
                books["PaWa3"] + books["PaSh3"] + books["PaRo3"] + books["PaPa3"] + books["PaHu3"] + books["PaDr3"] + books["PaWk3"] + books["PaMa3"] + books["PaPr3"] +
                books["HuWa3"] + books["HuSh3"] + books["HuRo3"] + books["HuPa3"] + books["HuHu3"] + books["HuDr3"] + books["HuWk3"] + books["HuMa3"] + books["HuPr3"] +
                books["DrWa3"] + books["DrSh3"] + books["DrRo3"] + books["DrPa3"] + books["DrHu3"] + books["DrDr3"] + books["DrWk3"] + books["DrMa3"] + books["DrPr3"] +
                books["WkWa3"] + books["WkSh3"] + books["WkRo3"] + books["WkPa3"] + books["WkHu3"] + books["WkDr3"] + books["WkWk3"] + books["WkMa3"] + books["WkPr3"] +
                books["MaWa3"] + books["MaSh3"] + books["MaRo3"] + books["MaPa3"] + books["MaHu3"] + books["MaDr3"] + books["MaWk3"] + books["MaMa3"] + books["MaPr3"] +
                books["PrWa3"] + books["PrSh3"] + books["PrRo3"] + books["PrPa3"] + books["PrHu3"] + books["PrDr3"] + books["PrWk3"] + books["PrMa3"] + books["PrPr3"]).ToString();

                this.ToToTotal.Text = (Convert.ToInt32(ToTo3.Text.Split('/')[0]) + Convert.ToInt32(ToTo2.Text.Split('/')[0]) + Convert.ToInt32(ToTo.Text.Split('/')[0])).ToString() + "/"
                    + (Convert.ToInt32(ToTo3.Text.Split('/')[1]) + Convert.ToInt32(ToTo2.Text.Split('/')[1]) + Convert.ToInt32(ToTo.Text.Split('/')[1])).ToString();

                this.TotalwoArena.Text = (Convert.ToInt32(ToTo3.Text.Split('/')[0]) + Convert.ToInt32(ToTo.Text.Split('/')[0])).ToString() + "/"
                    + (Convert.ToInt32(ToTo3.Text.Split('/')[1]) + Convert.ToInt32(ToTo.Text.Split('/')[1])).ToString();

                this.Disconnect.Text = Disconnects.ToString();
            }
            catch (Exception ee)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(ee.Message);
                // This is only happening because evens are being thrown before the book is finished being filled during initialization
            }
        }

        private void Disconnect_Click(object sender, EventArgs e)
        {
            if (Control.ModifierKeys == 0)
            {
                Disconnects++;
                this.Disconnect.Text = Disconnects.ToString();
            }
            else
            {
                Disconnects--;
                this.Disconnect.Text = Disconnects.ToString();
            }
            SaveChanges();
        }
    }
}
