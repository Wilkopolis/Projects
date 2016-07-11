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
        HealthPotion GenericItem;
        Tab CurrentTab;
        int CurrentTemplateIndex = 0;
        int CurrentEnemyIndex = 0;
        int HashID = 0;
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
        Texture2D MiniPrize;
        Texture2D SavedBackground;
        Texture2D EnemyBackground;
        Texture2D Enemy1;
        Texture2D Enemy2;
        Texture2D Enemy3;
        Texture2D Enemy4;
        Texture2D Payout;
        Texture2D[] EnemySprites = new Texture2D[4];
        List<Button> EditorButtons;
        List<EnemyButton> EnemyButtons;
        List<TemplateButton> TemplateButtons;
        string CurrentTemplateName;
        string CurrentCreatureName;
        bool Saved;
        
        void InitializeEditor()
        {
            EditorButtons = new List<Button>();
            EnemyButtons = new List<EnemyButton>();
            TemplateButtons = new List<TemplateButton>();

            EmptyTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/empty"), false);
            SolidTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/solid"), true);
            StairsSprite = Content.Load<Texture2D>("textures/game/tiles/stairs");
            DoorTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/door"), false);
            DoorTile.Door = true;

            EmptyTiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    EmptyTiles[i, j] = EmptyTile.Copy();
                }
            } 
            
            DoorTiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    DoorTiles[i, j] = EmptyTile.Copy();
                }
            }
            DoorTiles[0, 4] = DoorTile.Copy();
            DoorTiles[0, 5] = DoorTile.Copy();
            DoorTiles[7, 0] = DoorTile.Copy();
            DoorTiles[7, 9] = DoorTile.Copy();
            DoorTiles[14, 4] = DoorTile.Copy();
            DoorTiles[14, 5] = DoorTile.Copy();

            CurrentTab = Tab.TEMPLATES;
            CurrentTemplate = new RoomTemplate(EmptyTiles);

            EditorBackground = Content.Load<Texture2D>("textures/editor/background");
            SelectedTab = Content.Load<Texture2D>("textures/editor/buttons/selectedtab");
            UnselectedTab = Content.Load<Texture2D>("textures/editor/buttons/unselectedtab");
            UnselectedSummary = Content.Load<Texture2D>("textures/editor/buttons/unselectedsummary");
            SelectedSummary = Content.Load<Texture2D>("textures/editor/buttons/selectedsummary");
            MiniSolid = Content.Load<Texture2D>("textures/editor/template/solid");
            MiniEmpty = Content.Load<Texture2D>("textures/editor/template/empty");
            MiniItem = Content.Load<Texture2D>("textures/editor/template/item");
            MiniDoor = Content.Load<Texture2D>("textures/editor/template/door");
            MiniEnemy = Content.Load<Texture2D>("textures/editor/template/enemy");
            MiniPrize = Content.Load<Texture2D>("textures/editor/template/prize");
            
            DesciptionBack = Content.Load<Texture2D>("textures/game/descriptor/back");
            DesciptionExit = Content.Load<Texture2D>("textures/game/descriptor/exit");
            DescriptionSourceBackdrop = Content.Load<Texture2D>("textures/game/descriptor/backdrop");

            Enemy1 = Content.Load<Texture2D>("textures/game/creatures/enemy");
            EnemySprites[0] = Enemy1;
            Enemy2 = Content.Load<Texture2D>("textures/game/creatures/enemy2");
            EnemySprites[1] = Enemy2;
            Enemy3 = Content.Load<Texture2D>("textures/game/creatures/enemy3");
            EnemySprites[2] = Enemy3;
            Enemy4 = Content.Load<Texture2D>("textures/game/creatures/enemy4");
            EnemySprites[3] = Enemy4;
            Payout = Content.Load<Texture2D>("textures/editor/payout");
            EnemyBackground = Content.Load<Texture2D>("textures/editor/enemybackdrop");
            SavedBackground = Content.Load<Texture2D>("textures/editor/saved");

            Button templatestabbutton = new Button(SelectedTab, new Vector2(1100, 40), "templatestab", Keys.A);
            EditorButtons.Add(templatestabbutton);

            Button enemiestabbutton = new Button(UnselectedTab, new Vector2(1210, 40), "enemiestab", Keys.S);
            EditorButtons.Add(enemiestabbutton);

            Button newbutton = new Button(Content.Load<Texture2D>("textures/editor/buttons/new"), new Vector2(1210, 80), "new", Keys.N);
            EditorButtons.Add(newbutton);

            Button savebutton = new Button(Content.Load<Texture2D>("textures/editor/buttons/save"), new Vector2(1099, 80), "save", Keys.D);
            EditorButtons.Add(savebutton);

            // Button doorbutton = new Button("door", Keys.W);
            // EditorButtons.Add(doorbutton);

            Button itembutton = new Button("item", Keys.Q);
            EditorButtons.Add(itembutton);

            Button prizebutton = new Button("prize", Keys.E);
            EditorButtons.Add(prizebutton);

            Button breaky = new Button("break", Keys.P);
            EditorButtons.Add(breaky);

            Button hp = new Button(Content.Load<Texture2D>("textures/editor/buttons/hp"), new Vector2(1085, 640), "hp");
            EditorButtons.Add(hp);

            Button ap = new Button(Content.Load<Texture2D>("textures/editor/buttons/ap"), new Vector2(1155, 640), "ap");
            EditorButtons.Add(ap);
            
            Button sprite = new Button(Content.Load<Texture2D>("textures/editor/buttons/sprite"), new Vector2(1155, 680), "sprite");
            EditorButtons.Add(sprite);

            Button damage = new Button(Content.Load<Texture2D>("textures/editor/buttons/damage"), new Vector2(1085, 680), "damage");
            EditorButtons.Add(damage);

            Button difficulty = new Button(Content.Load<Texture2D>("textures/editor/buttons/difficulty"), new Vector2(1130, 480), "difficulty");
            EditorButtons.Add(difficulty);

            Button up = new Button("up", Keys.Up);
            EditorButtons.Add(up);
            
            Button down = new Button("down", Keys.Down);
            EditorButtons.Add(down);

            Button quit = new Button("quit", Keys.F10);
            EditorButtons.Add(quit);

            GenericItem = new HealthPotion(Content.Load<Texture2D>("textures/editor/item"));

            LoadEditorCreatures();
            LoadEditorTemplates();

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

            CheckHoverDescription();

            if (CurrentTab == Tab.TEMPLATES)
                CheckTemplateButtons();
            else
                CheckEnemyButtons();

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

        bool CheckHoverDescription() 
        {
            foreach (Entity enemy in CurrentTemplate.Entities)
            {
                if (MouseOver(enemy))
                {
                    if (HoverDescription == null)
                    {
                        HoverDescription = new Description(enemy);
                    }
                    return true;
                }
            }
            HoverDescription = null;
            return false;
        }

        void CheckTemplateButtons()
        {
            foreach (TemplateButton button in TemplateButtons)
            {
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
                }
            }
        }

        void CheckEnemyButtons()
        {
            foreach (EnemyButton button in EnemyButtons)
            {
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
                }
            }
        }

        void HandleEditorInput(Button button, bool LeftClick)
        {
            if (LeftClick)
            {
                switch (button.Action)
                {
                    case "quit":
                        Quit();
                        break;

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
                                foreach (TemplateButton B in TemplateButtons)
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
                                foreach (EnemyButton E in EnemyButtons)
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
                            if (CurrentTemplateIndex > TemplateButtons.Count() - 7)
                            {
                                CurrentTemplateIndex = TemplateButtons.Count() - 7;
                            }
                            else
                            {
                                foreach (TemplateButton B in TemplateButtons)
                                {
                                    B.Position.Y -= 51;
                                }
                            }
                            ReallignTemplates();
                        }
                        else
                        {
                            CurrentEnemyIndex++;
                            if (CurrentEnemyIndex > EnemyButtons.Count() - 7)
                            {
                                CurrentEnemyIndex = EnemyButtons.Count() - 7;
                            }
                            else
                            {
                                foreach (EnemyButton E in EnemyButtons)
                                {
                                    E.Position.Y -= 51;
                                }
                            }
                            ReallignEnemies();
                        }
                        break;

                    case "sprite":
                        if (CurrentEnemy.Sprite == Enemy1)
                        {
                            CurrentEnemy.Sprite = Enemy2;
                        }
                        else if (CurrentEnemy.Sprite == Enemy2)
                        {
                            CurrentEnemy.Sprite = Enemy3;
                        }
                        else if (CurrentEnemy.Sprite == Enemy3)
                        {
                            CurrentEnemy.Sprite = Enemy4;
                        }
                        else if (CurrentEnemy.Sprite == Enemy4)
                        {
                            CurrentEnemy.Sprite = Enemy1;
                        }
                        break;

                    case "hp":
                        CurrentEnemy.HP++;
                        CurrentEnemy.MaxHP++;
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
                            foreach (TemplateButton c in TemplateButtons)
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
                            foreach (EnemyButton e in EnemyButtons)
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
                            TemplateButton result = new TemplateButton(UnselectedSummary, CurrentTemplateName + ".lvl", DoorTiles, 0);
                            TemplateButtons.Add(result);
                            TemplateButtons.Sort();
                            ReallignTemplates();
                        }
                        else if (CurrentTab == Tab.ENEMIES)
                        {
                            CurrentCreatureName = Convert.ToString(Convert.ToInt32(CurrentCreatureName.Split('.')[0]) + 1) + ".nme";
                            EnemyButton result = new EnemyButton(UnselectedSummary, Enemy1, CurrentCreatureName);
                            EnemyButtons.Add(result);
                            EnemyButtons.Sort();
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
                                    CurrentTemplate.Tiles[i, j] = DoorTile.Copy();
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
                                    HealthPotion newthing = GenericItem.Copy(new Vector2I(i, j), GenericItem.Hash);
                                    if (CurrentTemplate.Entities.Contains(newthing))
                                        CurrentTemplate.Entities.Remove(newthing);
                                    else
                                        CurrentTemplate.Entities.Add(newthing);
                                }
                            }
                        }
                        break;

                    case "prize":
                        for (int i = 0; i < 15; i++)
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                if (MouseOver(i, j))
                                {
                                    CurrentTemplate.Payout = new Vector2I(i, j);
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

                    case "sprite":
                        if (CurrentEnemy.Sprite == Enemy1)
                        {
                            CurrentEnemy.Sprite = Enemy4;
                        }
                        else if (CurrentEnemy.Sprite == Enemy2)
                        {
                            CurrentEnemy.Sprite = Enemy3;
                        }
                        else if (CurrentEnemy.Sprite == Enemy3)
                        {
                            CurrentEnemy.Sprite = Enemy2;
                        }
                        else if (CurrentEnemy.Sprite == Enemy4)
                        {
                            CurrentEnemy.Sprite = Enemy1;
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
                    foreach (TemplateButton button in TemplateButtons)
                    {
                        Draw(button);
                    }
                    break;

                case Tab.ENEMIES:
                    foreach (EnemyButton button in EnemyButtons)
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
            
            if (HoverDescription != null)
                Draw(HoverDescription);
                
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
                        CurrentTemplate.Tiles[i, j].Solid = !CurrentTemplate.Tiles[i, j].Solid;
                        if (CurrentTemplate.Tiles[i, j].Solid)
                            CurrentTemplate.Tiles[i, j] = SolidTile.Copy();
                        else
                            CurrentTemplate.Tiles[i, j] = EmptyTile.Copy();
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
                            // In Editor keep same hash or we lose track of which it is
                            Enemy enemy = CurrentEnemy.Copy(new Vector2I(i, j), CurrentEnemy.Hash);
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

        void LoadEditorCreatures()
        {
            Vector2I Origin = new Vector2I(34, 34);

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
                    EnemyButton result = new EnemyButton(UnselectedSummary, EnemySprites[Convert.ToInt32(stats[4].Split('=')[1])], CurrentCreatureName);
                    result.Enemy.Hash = Convert.ToInt32(stats[0].Split('=')[1]);
                    if (stats[1].Split('=')[1].Trim() == "Smart")
                        result.Enemy.Brains = Nature.SMART;
                    else
                        result.Enemy.Brains = Nature.DUMB;
                    result.Enemy.MaxHP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.Enemy.HP = result.Enemy.MaxHP;
                    result.Enemy.Damage = Convert.ToInt32(stats[5].Split('=')[1]);
                    result.Enemy.Origin = Origin;
                    result.Enemy.Side = Faction.NERD;
                    string[] mods = contents[1].Split(':')[1].Split(',');
                    if (mods[0] != "")
                    {
                        foreach (string m in mods)
                            result.Enemy.Effects.Add((Effect)Convert.ToInt32(m));
                    }
                    result.Origin = new Vector2(UnselectedSummary.Width / 2, UnselectedSummary.Height / 2);
                    result.Action = "enemy";
                    EnemyButtons.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            EnemyButtons.Sort();
            ReallignEnemies();
        }

        void LoadEditorTemplates()
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
                    TemplateButton result = new TemplateButton(UnselectedSummary, CurrentTemplateName, DoorTiles, 0);

                    string[] solids = contents[0].Split(':')[1].Split(',');
                    foreach (string s in solids)
                    {
                        if (s != "")
                        {
                            string[] pair = s.Split('/');
                            result.Template.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = SolidTile.Copy();
                        }
                    }

                    string[] doors = contents[1].Split(':')[1].Split(',');
                    foreach (string d in doors)
                    {
                        if (d != "")
                        {
                            string[] pair = d.Split('/');
                            result.Template.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = DoorTile.Copy();
                        }
                    }

                    string[] payout = contents[2].Split(':')[1].Split('/');
                    result.Template.Payout = new Vector2I(Convert.ToInt32(payout[0]), Convert.ToInt32(payout[1]));

                    string[] creatures = contents[3].Split(':')[1].Split(',');
                    foreach (string c in creatures)
                    {
                        if (c != "")
                        {
                            string[] pair = c.Split('=');
                            int hash = Convert.ToInt32(pair[0]);
                            Enemy enemy = EnemyButtons.Single(x => x.Enemy.Hash == hash).Enemy;
                            Enemy guy = enemy.Copy(new Vector2I(Convert.ToInt32(pair[1].Split('/')[0]), Convert.ToInt32(pair[1].Split('/')[1])), enemy.Hash);
                            result.Template.Entities.Add(guy);
                        }
                    }

                    result.Template.Difficulty = Convert.ToInt32(contents[4].Split(':')[1]);
                    TemplateButtons.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }            

            TemplateButtons.Sort();
            ReallignTemplates();
        }

        void SaveContent()
        {
            for (int i = 0; i < EnemyButtons.Count(); i++)
            {
                EnemyButton E = EnemyButtons.ElementAt(i);
                string directory = Directory.GetCurrentDirectory() + @"\enemytemplates\" + i.ToString() + ".nme";
                string content = "";    
                content += "Hash = ";
                content += E.Enemy.Hash.ToString();
                content += "\n";
                content += "Brains = ";
                if (E.Enemy.Brains == Nature.SMART)
                    content += "Smart";
                else
                    content += "Dumb";
                content += "\n";
                content += "MaxHP = ";
                content += E.Enemy.MaxHP.ToString();
                content += "\n";
                content += ",";
                content += "\n";
                content += "Texture = ";
                content += Array.IndexOf(EnemySprites, E.Enemy.Sprite).ToString();
                content += ",";
                content += "\n";
                content += "Damage = ";
                content += E.Enemy.Damage.ToString();
                content += "\n";
                content += "-";
                content += "\n";
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
            
            for (int i = 0; i < TemplateButtons.Count(); i++)
            {
                TemplateButton T = TemplateButtons.ElementAt(i);
                string directory = Directory.GetCurrentDirectory() + @"\roomtemplates\" + i.ToString() + ".lvl";
                string content = "SOLIDS:";
                content += "\n";
                bool doit = false;
                for (int j = 0; j < 15; j++)
                {
                    for (int k = 0; k < 10; k++)
                    {
                        if (T.Template.Tiles[j,k].Solid)
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
                content += "PAYOUT:";
                content += "\n";
                if (T.Template.Payout == null)
                {
                    content += "0";
                    content += "/";
                    content += "0";
                }
                else
                {
                    content += T.Template.Payout.X.ToString();
                    content += "/";
                    content += T.Template.Payout.Y.ToString();
                }
                content += "\n"; 
                content += "-";
                content += "\n"; 
                content += "ENEMIES:";
                content += "\n";
                for (int j = 0; j < T.Template.Entities.Count(); j++)
                {
                    Entity E = T.Template.Entities.ElementAt(j);
                    if (E.GetClass() == "Enemy")
                    {
                        content += E.Hash.ToString();
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
            int pos = -CurrentTemplateIndex;
            foreach (TemplateButton t in TemplateButtons)
            {
                t.Visable = false;
                t.Position = new Vector2(1155, 125 + pos * 51);
                pos++;
            }
            for (int i = CurrentTemplateIndex; i < CurrentTemplateIndex + 7; i++)
            {
                if (i < TemplateButtons.Count() && CurrentTab == Tab.TEMPLATES)
                {
                    TemplateButtons.ElementAt(i).Visable = true;
                }
            }
        }

        void ReallignEnemies()
        {
            int pos = -CurrentEnemyIndex;
            foreach (EnemyButton e in EnemyButtons)
            {
                e.Visable = false;
                e.Position = new Vector2(1155, 125 + pos * 51);
                pos++;
            }
            for (int i = CurrentEnemyIndex; i < CurrentEnemyIndex + 7; i++)
            {
                if (i < EnemyButtons.Count() && CurrentTab == Tab.ENEMIES)
                {
                    EnemyButtons.ElementAt(i).Visable = true;
                }
            }
        }
    }
}
