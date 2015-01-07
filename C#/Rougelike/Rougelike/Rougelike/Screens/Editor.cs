using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

namespace Rougelike
{
    public partial class Rougelike
    {
        RoomTemplate CurrentTemplate;
        Enemy CurrentEnemy;
        Item GenericItem;
        Tab CurrentTab;
        int CurrentTemplateIndex = 0;
        int CurrentEnemyIndex = 0;
        Texture2D EditorBackground;
        Texture2D SelectedTab;
        Texture2D UnselectedTab;
        Texture2D UnselectedSummary;
        Texture2D SelectedSummary;
        Texture2D MiniSolid;
        Texture2D MiniEmpty;
        Texture2D MiniEnemy;
        Texture2D MiniItem;
        Texture2D MiniDoor;
        Texture2D SavedBackground;
        List<Button> EditorButtons;
        List<EnemyButton> Enemies;
        List<TemplateButton> Templates;
        string CurrentTemplateName;
        string CurrentCreatureName;
        bool Saved;
        
        void InitializeEditor()
        {
            EditorButtons = new List<Button>();
            Enemies = new List<EnemyButton>();
            Templates = new List<TemplateButton>();

            CurrentTab = Tab.TEMPLATES;
            CurrentTemplate = new RoomTemplate();

            EditorBackground = Content.Load<Texture2D>("textures/editor/background");
            SelectedTab = Content.Load<Texture2D>("textures/editor/selected");
            UnselectedTab = Content.Load<Texture2D>("textures/editor/unselected");
            UnselectedSummary = Content.Load<Texture2D>("textures/editor/summary");
            SelectedSummary = Content.Load<Texture2D>("textures/editor/summaryselected");
            MiniSolid = Content.Load<Texture2D>("textures/editor/template/solid");
            MiniEmpty = Content.Load<Texture2D>("textures/editor/template/empty");
            MiniItem = Content.Load<Texture2D>("textures/editor/template/item");
            MiniDoor = Content.Load<Texture2D>("textures/editor/template/door");
            MiniEnemy = Content.Load<Texture2D>("textures/editor/template/enemy");
            SavedBackground = Content.Load<Texture2D>("textures/editor/saved");

            Button templatestabbutton = new Button(SelectedTab, new Vector2(1100, 40), "templatestab", Keys.A);
            EditorButtons.Add(templatestabbutton);

            Button enemiestabbutton = new Button(UnselectedTab, new Vector2(1210, 40), "enemiestab", Keys.S);
            EditorButtons.Add(enemiestabbutton);

            Button newbutton = new Button(Content.Load<Texture2D>("textures/editor/new"), new Vector2(1210, 80), "new", Keys.N);
            EditorButtons.Add(newbutton);

            Button savebutton = new Button(Content.Load<Texture2D>("textures/editor/save"), new Vector2(1099, 80), "save", Keys.D);
            EditorButtons.Add(savebutton);

            Button doorbutton = new Button("door", Keys.W);
            EditorButtons.Add(doorbutton);

            Button itembutton = new Button("item", Keys.Q);
            EditorButtons.Add(itembutton);

            Button breaky = new Button("break", Keys.P);
            EditorButtons.Add(breaky);

            Button hp = new Button(Content.Load<Texture2D>("textures/editor/hp"), new Vector2(1085, 640), "hp");
            EditorButtons.Add(hp);

            Button ap = new Button(Content.Load<Texture2D>("textures/editor/ap"), new Vector2(1155, 640), "ap");
            EditorButtons.Add(ap);

            Button sprite = new Button(Content.Load<Texture2D>("textures/editor/sprite"), new Vector2(1155, 680), "sprite");
            EditorButtons.Add(sprite);
            
            Button damage = new Button(Content.Load<Texture2D>("textures/editor/damage"), new Vector2(1085, 680), "damage");
            EditorButtons.Add(damage);

            Button difficulty = new Button(Content.Load<Texture2D>("textures/editor/difficulty"), new Vector2(1130, 480), "difficulty");
            EditorButtons.Add(difficulty);

            Button up = new Button("up", Keys.Up);
            EditorButtons.Add(up);
            
            Button down = new Button("down", Keys.Down);
            EditorButtons.Add(down);

            Button quit = new Button("quit", Keys.F10);
            EditorButtons.Add(quit);

            GenericItem = new Item(Content.Load<Texture2D>("textures/editor/item"));

            LoadCreatures();
            LoadTemplates();

            GameState = State.EDITOR;
        }

        void CheckEditorInput()
        {
            foreach (Button button in EditorButtons)
            {
                // Keyboard
                if (Pressed(button.Hotkey))
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed)
                    {
                        HandleEditorInput(button, true);
                    }
                    button.WasPressed = false;
                }
                // Mouse
                if (MouseOver(button))
                {
                    if (Click())
                    {
                        button.WasClicked = true;
                    }
                    else if (Released())
                    {
                        if (button.WasClicked)
                        {
                            HandleEditorInput(button, true);
                        }
                        button.WasClicked = false;
                    }

                    if (RightClick())
                    {
                        button.WasRightClicked = true;
                    }
                    else if (RightReleased())
                    {
                        if (button.WasRightClicked)
                        {
                            HandleEditorInput(button, false);
                        }
                        button.WasRightClicked = false;
                    }
                }
            }

            if (Click())
            {
                Saved = false;
                HandleSolid();
            }
            if (RightClick())
            {
                Saved = false;
                HandleEnemy();
            }
        }

        void HandleEditorInput(Button button, bool LeftClick)
        {
            if (LeftClick)
            {
                switch (button.Action)
                {
                    case "templatestab":
                        CurrentTab = Tab.TEMPLATES;
                        button.Sprite = SelectedTab;
                        foreach (Button b in EditorButtons)
                        {
                            if (b.Action == "enemy")
                            {
                                ((EnemyButton)b).Visable = false;
                            }
                            else if (b.Action == "enemiestab")
                            {
                                b.Sprite = UnselectedTab;
                            }
                        }
                        ReallignTemplates();
                        break;

                    case "enemiestab":
                        CurrentTab = Tab.ENEMIES;
                        button.Sprite = SelectedTab;
                        foreach (Button b in EditorButtons)
                        {
                            if (b.Action == "room")
                            {
                                ((TemplateButton)b).Visable = false;
                            }
                            else if (b.Action == "templatestab")
                            {
                                b.Sprite = UnselectedTab;
                            }
                        }
                        ReallignEnemies();
                        break;

                    case "up":
                        if (CurrentTab == Tab.TEMPLATES)
                        {
                            CurrentTemplateIndex--;
                            if (CurrentTemplateIndex < 0)
                            {
                                CurrentTemplateIndex = 0;
                            }
                            else
                            {
                                foreach (TemplateButton B in Templates)
                                {
                                    B.Position.Y += 51;
                                }
                            }
                            ReallignTemplates();
                        }
                        else
                        {
                            CurrentEnemyIndex--;
                            if (CurrentEnemyIndex < 0)
                            {
                                CurrentEnemyIndex = 0;
                            }
                            else
                            {
                                foreach (EnemyButton E in Enemies)
                                {
                                    E.Position.Y += 51;
                                }
                            }
                            ReallignEnemies();
                        }
                        break;

                    case "down":
                        if (CurrentTab == Tab.TEMPLATES)
                        {
                            CurrentTemplateIndex++;
                            if (CurrentTemplateIndex > Templates.Count() - 7)
                            {
                                CurrentTemplateIndex = Templates.Count() - 7;
                            }
                            else
                            {
                                foreach (TemplateButton B in Templates)
                                {
                                    B.Position.Y -= 51;
                                }
                            }
                            ReallignTemplates();
                        }
                        else
                        {
                            CurrentEnemyIndex++;
                            if (CurrentEnemyIndex > Enemies.Count() - 7)
                            {
                                CurrentEnemyIndex = Enemies.Count() - 7;
                            }
                            else
                            {
                                foreach (EnemyButton E in Enemies)
                                {
                                    E.Position.Y -= 51;
                                }
                            }
                            ReallignEnemies();
                        }
                        break;

                    case "sprite":
                        if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY1)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY2;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY2)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY3;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY3)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY4;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY4)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY1;
                        }
                        break;

                    case "hp":
                        CurrentEnemy.HP++;
                        CurrentEnemy.MaxHP++;
                        break;

                    case "ap":
                        CurrentEnemy.AP++;
                        CurrentEnemy.MaxAP++;
                        break;

                    case "damage":
                        CurrentEnemy.Damage++;
                        break;

                    case "break":
                        //Pause to debug
                        break;

                    case "room":
                        if (((TemplateButton)button).Visable && CurrentTab == Tab.TEMPLATES)
                        {
                            foreach (TemplateButton c in Templates)
                            {
                                c.Sprite = UnselectedSummary;
                            }
                            button.Sprite = SelectedSummary;
                            CurrentTemplate = ((TemplateButton)button).Template;
                        }
                        break;

                    case "enemy":
                        if (((EnemyButton)button).Visable && CurrentTab == Tab.ENEMIES)
                        {
                            foreach (EnemyButton e in Enemies)
                            {
                                e.Sprite = UnselectedSummary;
                            }
                            button.Sprite = SelectedSummary;
                            CurrentEnemy = ((EnemyButton)button).Enemy;
                        }
                        break;

                    case "save":
                        SaveContent();
                        break;

                    case "new":
                        if (CurrentTab == Tab.TEMPLATES)
                        {
                            CurrentTemplateName = Convert.ToString(Convert.ToInt32(CurrentTemplateName.Split('.')[0]) + 1);
                            TemplateButton result = new TemplateButton(UnselectedSummary, CurrentTemplateName + ".lvl", 0);
                            EditorButtons.Add(result);
                            ReallignTemplates();
                        }
                        else if (CurrentTab == Tab.ENEMIES)
                        {
                            CurrentCreatureName = Convert.ToString(Convert.ToInt32(CurrentCreatureName.Split('.')[0]) + 1);
                            EnemyButton result = new EnemyButton(UnselectedSummary, CurrentCreatureName);
                            EditorButtons.Add(result);
                            ReallignEnemies();
                        }
                        break;

                    case "door":
                        for (int i = 0; i < 15; i++)
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                if (MouseOver(i, j))
                                {
                                    CurrentTemplate.Tiles[i, j].Door = !CurrentTemplate.Tiles[i, j].Door;
                                    CurrentTemplate.Tiles[i, j].AssetIndex = 0;
                                }
                            }
                        }
                        break;

                    case "item":
                        for (int i = 0; i < 15; i++)
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                if (MouseOver(i, j))
                                {
                                    Item newthing = GenericItem.Copy(new Vector2(i, j));
                                    if (CurrentTemplate.Entities.Contains(newthing))
                                        CurrentTemplate.Entities.Remove(newthing);
                                    else
                                        CurrentTemplate.Entities.Add(newthing);
                                }
                            }
                        }
                        break;

                    case "difficulty":
                        CurrentTemplate.Difficulty++;
                        break;
                }
            }
            else
            {
                switch (button.Action)
                {
                    case "hp":
                        CurrentEnemy.HP--;
                        CurrentEnemy.MaxHP--;
                        break;

                    case "ap":
                        CurrentEnemy.AP--;
                        CurrentEnemy.MaxAP--;
                        break;

                    case "sprite":
                        if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY1)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY4;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY2)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY1;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY3)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY2;
                        }
                        else if (CurrentEnemy.AssetIndex == (int)Texture.ENEMY4)
                        {
                            CurrentEnemy.AssetIndex = (int)Texture.ENEMY3;
                        }
                        break;

                    case "damage":
                        CurrentEnemy.Damage--;
                        break;

                    case "difficulty":
                        CurrentTemplate.Difficulty--;
                        break;
                }
            }
        }

        void DrawEditorScreen()
        {
            Draw(EditorBackground);
            
            DrawEditorRoom();

            DrawCurrentEnemy();

            switch (CurrentTab)
            {
                case Tab.TEMPLATES:
                    foreach (TemplateButton button in Templates)
                    {
                        Draw(button);
                    }
                    break;

                case Tab.ENEMIES:
                    foreach (EnemyButton button in Enemies)
                    {
                        Draw(button);
                    }
                    break;
            }

            foreach (Button button in EditorButtons)
            {
                if (button.GetType() == typeof(EnemyButton))
                    Draw((EnemyButton)button);
                else if (button.GetType() == typeof(TemplateButton))
                    Draw((TemplateButton)button);
                else
                    Draw(button);
            }

            SpriteBatch.DrawString(Calibri, "templates", OffsetVector + new Vector2(1072, 31), Color.White);
            SpriteBatch.DrawString(Calibri, "enemies", OffsetVector + new Vector2(1188, 31), Color.White);

            if (Saved)
            {
                DrawSaved();
            }
        }

        void HandleSolid()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    if (MouseOver(i, j))
                    {
                        if (CurrentTemplate.Tiles[i, j].AssetIndex == (int)Texture.EMPTY)
                            CurrentTemplate.Tiles[i, j].AssetIndex = (int)Texture.ROCK;
                        else
                            CurrentTemplate.Tiles[i, j].AssetIndex = (int)Texture.EMPTY;
                    }
                }
            }
        }

        void HandleEnemy()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    if (MouseOver(i, j))
                    {
                        if (CurrentEnemy != null)
                        {
                            Enemy enemy = CurrentEnemy.Copy(new Vector2(i, j));
                            if (CurrentTemplate.Entities.Contains(enemy))
                            {
                                CurrentTemplate.Entities.Remove(enemy);
                            }
                            else
                                CurrentTemplate.Entities.Add(enemy);
                        }
                    }
                }
            }
        }

        void LoadTemplates()
        {
            //Foreach .lvl files add it to the list
            string[] fileNames = Directory.GetFiles(Directory.GetCurrentDirectory() + @"\roomtemplates\");
            try
            {
                foreach (string file in fileNames)
                {
                    StreamReader streamreader = new StreamReader(file);
                    string importedlevel = streamreader.ReadToEnd();
                    streamreader.Close();

                    string[] contents = importedlevel.Replace("\r\n", "").Replace("\n", "").Replace("\r", "").Split('-');

                    CurrentTemplateName = Strip(file);
                    TemplateButton result = new TemplateButton(UnselectedSummary, CurrentTemplateName, 0);

                    string[] solids = contents[0].Split(':')[1].Split(',');
                    foreach (string s in solids)
                    {
                        if (s != "")
                        {
                            string[] pair = s.Split('/');
                            result.Template.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = new Tile(true);
                        }
                    }

                    string[] doors = contents[1].Split(':')[1].Split(',');
                    foreach (string d in doors)
                    {
                        if (d != "")
                        {
                            string[] pair = d.Split('/');
                            result.Template.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])].Door = true;
                        }
                    }

                    string[] creatures = contents[2].Split(':')[1].Split(',');
                    foreach (string c in creatures)
                    {
                        if (c != "")
                        {
                            string[] pair = c.Split('=');
                            int enemy = Convert.ToInt32(pair[0]);
                            Enemy guy = Enemies.ElementAt(enemy).Enemy.Copy(new Vector2(Convert.ToInt32(pair[1].Split('/')[0]), Convert.ToInt32(pair[1].Split('/')[1])));
                            result.Template.Entities.Add(guy);
                        }
                    }

                    string[] items = contents[3].Split(':')[1].Split(',');
                    foreach (string i in items)
                    {
                        if (i != "")
                        {
                            string[] pair = i.Split('/');
                            result.Template.Entities.Add(GenericItem.Copy(GenericItem.HashID, new Vector2(Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1]))));
                        }
                    }
                    result.Template.Difficulty = Convert.ToInt32(contents[4].Split(':')[1]);
                    Templates.Add(result);
                    EditorButtons.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }            
            ReallignTemplates();
        }

        void LoadCreatures()
        {
            Vector2 Origin = new Vector2(34, 34);

            //Foreach .nme files add it to the list
            string[] fileNames = Directory.GetFiles(Directory.GetCurrentDirectory() + @"\enemytemplates\");
            try
            {
                foreach (string file in fileNames)
                {
                    StreamReader streamreader = new StreamReader(file);
                    string importedenemy = streamreader.ReadToEnd();
                    streamreader.Close();

                    string[] contents = importedenemy.Replace("\r\n", "").Replace("\n", "").Replace("\r", "").Split('-');

                    string[] stats = contents[0].Split(':')[1].Split(',');

                    CurrentCreatureName = Strip(file);
                    EnemyButton result = new EnemyButton(UnselectedSummary, CurrentCreatureName);
                    result.Enemy.HashID = Convert.ToInt32(CurrentCreatureName.Split('.')[0]);
                    if (stats[0].Split('=')[1].Trim() == "Smart")
                        result.Enemy.Brains = Creature.Nature.SMART;
                    else
                        result.Enemy.Brains = Creature.Nature.DUMB;
                    result.Enemy.HP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.Enemy.MaxHP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.Enemy.AP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.Enemy.MaxAP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.Enemy.AssetIndex = Convert.ToInt32(stats[3].Split('=')[1]);
                    result.Enemy.Damage = Convert.ToInt32(stats[4].Split('=')[1]);
                    result.Enemy.Origin = Origin;
                    result.Enemy.Side = Creature.Faction.NERD;
                    string[] mods = contents[1].Split(':')[1].Split(',');
                    if (mods[0] != "")
                    {
                        foreach (string m in mods)
                            result.Enemy.Effects.AddLast((Effect)Convert.ToInt32(m));
                    }
                    result.Origin = new Vector2(UnselectedSummary.Width / 2, UnselectedSummary.Height / 2);
                    result.Action = "enemy";
                    Enemies.Add(result);
                    EditorButtons.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            ReallignEnemies();
        }
        
        void SaveContent()
        {
            for (int i = 0; i < Enemies.Count(); i++)
            {
                EnemyButton E = Enemies.ElementAt(i);
                string directory = Directory.GetCurrentDirectory() + @"\enemytemplates\" + i.ToString() + ".nme";
                string content = "STATS:";
                content += "\n";
                content += "Brains = ";
                if (E.Enemy.Brains == Creature.Nature.SMART)
                    content += "Smart";
                else
                    content += "Dumb";
                content += ",";
                content += "\n";
                content += "MaxHP = ";
                content += E.Enemy.MaxHP.ToString();
                content += ",";
                content += "\n";
                content += "MaxAP = ";
                content += E.Enemy.MaxAP.ToString();
                content += ",";
                content += "\n";
                content += "Texture = ";
                content += E.Enemy.AssetIndex.ToString();
                content += ",";
                content += "\n";
                content += "Damage = ";
                content += E.Enemy.Damage.ToString();
                content += "\n";
                content += "-";
                content += "\n";
                content += "MODS:";
                for (int j = 0; j < E.Enemy.Effects.Count(); j++)
                {
                    int e = (int)E.Enemy.Effects.ElementAt(j);
                    content += e.ToString();
                    if (j != E.Enemy.Effects.Count() - 1)
                    {
                        content += ", ";
                    }
                }
                content += "\n";
                File.WriteAllText(@directory, content);
            }
            for (int i = 0; i < Templates.Count(); i++)
            {
                TemplateButton T = Templates.ElementAt(i);
                string directory = Directory.GetCurrentDirectory() + @"\roomtemplates\" + i.ToString() + ".lvl";
                string content = "SOLIDS:";
                content += "\n";
                bool doit = false;
                for (int j = 0; j < 15; j++)
                {
                    for (int k = 0; k < 10; k++)
                    {
                        if (T.Template.Tiles[j,k].AssetIndex == (int)Texture.ROCK)
                        {
                            content += j.ToString();
                            content += "/";
                            content += k.ToString();
                            content += ",";
                            content += "\n";
                            doit = true;
                        }
                    }
                }
                if (doit)
                    content = content.Substring(0, content.Length - 2) + "\n";
                content += "-";
                content += "\n"; 
                content += "DOORS:";
                content += "\n";
                doit = false;
                for (int j = 0; j < 15; j++)
                {
                    for (int k = 0; k < 10; k++)
                    {
                        if (T.Template.Tiles[j, k].Door)
                        {
                            content += j.ToString();
                            content += "/";
                            content += k.ToString();
                            content += ",";
                            content += "\n";
                            doit = true;
                        }
                    }
                }
                if (doit)
                    content = content.Substring(0, content.Length - 2) + "\n";
                content += "-";
                content += "\n"; 
                content += "ENEMIES:";
                content += "\n";
                for (int j = 0; j < T.Template.Entities.Count(); j++)
                {
                    Entity E = T.Template.Entities.ElementAt(j);
                    if (E.GetClass() == "Enemy")
                    {
                        content += E.HashID.ToString();
                        content += "=";
                        content += E.Position.X.ToString();
                        content += "/";
                        content += E.Position.Y.ToString();
                        if (j != T.Template.Entities.Count() - 1)
                            content += ",";
                        content += "\n";
                    }
                }
                content += "-";
                content += "\n";
                content += "ITEMS:";
                content += "\n";
                for (int j = 0; j < T.Template.Entities.Count(); j++)
                {
                    Entity E = T.Template.Entities.ElementAt(j);
                    if (E.GetClass() == "Item")
                    {
                        content += E.Position.X.ToString();
                        content += "/";
                        content += E.Position.Y.ToString();
                        if (j != T.Template.Entities.Count() - 1)
                            content += ",";
                        content += "\n";
                    }
                }
                content += "-";
                content += "\n";
                content += "DIFFICULTY: ";
                content += T.Template.Difficulty.ToString();
                content += "\n";
                File.WriteAllText(@directory, content);
            }
            Saved = true;
        }

        string Strip(string file)
        {
            int index = 0;
            for (int i = 0; i < file.Length; i++)
            {
                if (file.ElementAt(i) == '\\')
                {
                    index = i;
                }
            }
            return file.Substring(index + 1, file.Length - index - 1);
        }

        void ReallignTemplates()
        {
            Templates.Sort(delegate(TemplateButton x, TemplateButton y)
            {
                if (x.Template.Difficulty > y.Template.Difficulty) return 1;
                else return -1;
            });
            int pos = -CurrentTemplateIndex;
            foreach (TemplateButton t in Templates)
            {
                t.Visable = false;
                t.Position = new Vector2(1155, 125 + pos * 51);
                pos++;
            }
            for (int i = CurrentTemplateIndex; i < CurrentTemplateIndex + 7; i++)
            {
                if (i < Templates.Count() && CurrentTab == Tab.TEMPLATES)
                {
                    Templates.ElementAt(i).Visable = true;
                }
            }
        }

        void ReallignEnemies()
        {
            Enemies.Sort(delegate(EnemyButton x, EnemyButton y)
            {
                if (Convert.ToInt32(x.Enemy.Name.Split('.')[0]) > Convert.ToInt32(y.Enemy.Name.Split('.')[0])) return 1;
                else return -1;
            });

            int pos = -CurrentEnemyIndex;
            foreach (EnemyButton e in Enemies)
            {
                e.Visable = false;
                e.Position = new Vector2(1155, 125 + pos * 51);
                pos++;
            }
            for (int i = CurrentEnemyIndex; i < CurrentEnemyIndex + 7; i++)
            {
                if (i < Enemies.Count() && CurrentTab == Tab.ENEMIES)
                {
                    Enemies.ElementAt(i).Visable = true;
                }
            }
        }
    }
}
