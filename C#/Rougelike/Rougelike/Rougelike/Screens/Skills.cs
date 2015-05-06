using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Rougelike
{
    public class Skill
    {
        public List<Skill> PreRequesites;
        public int ExperienceCost;
        public string Name;

        public Skill(string name)
        {
            Name = name;
        }

        public Skill(string name, int experiencecost)
        {
            Name = name;
            ExperienceCost = experiencecost;
        }

        public Skill(string name, int experiencecost, List<Skill> prerequesites)
        {
            Name = name;
            ExperienceCost = experiencecost;
            PreRequesites = prerequesites;
        }
    }

    partial class Rougelike
    {
        List<SkillButton> SkillButtons;

        void InitializeSkillButtons(Class playerclass)
        {
            SkillButtons = new List<SkillButton>();
            switch (playerclass)
            {
                case Class.MASTERMIND:
                    SkillButton zaproom = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/zaproom"), new Vector2(880, 110), new Skill("zaproom", 10), Keys.Z);
                    SkillButtons.Add(zaproom);

                    SkillButton zapsafe = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/safe"), new Vector2(860, 80), new Skill("zapsafe", 5));
                    SkillButtons.Add(zapsafe);

                    SkillButton zap = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/zap"), new Vector2(920, 110), new Skill("zap", 5), Keys.Z);
                    SkillButtons.Add(zap);

                    SkillButton zapstronger = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/stronger"), new Vector2(900, 80), new Skill("zapstronger", 15));
                    SkillButtons.Add(zapstronger);

                    SkillButton zapcheaper = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/cheaper"), new Vector2(940, 80), new Skill("zapcheaper", 5));
                    SkillButtons.Add(zapcheaper);

                    SkillButton zapinspect = new SkillButton(Content.Load<Texture2D>("textures/game/skills/mayor/inspect"), new Vector2(980, 110), new Skill("zapinspect", 5));
                    SkillButtons.Add(zapcheaper);
                    break;

                case Class.PHARMACIST:
                    SkillButton grogsoakedblade = new SkillButton(Content.Load<Texture2D>("textures/game/skills/pharmacist/grogsoakedblade"), new Vector2(880, 110), new Skill("grogsoakedblade", 15));
                    SkillButtons.Add(grogsoakedblade);

                    SkillButton prescription = new SkillButton(Content.Load<Texture2D>("textures/game/skills/pharmacist/prescriptiononly"), new Vector2(900, 110), new Skill("prescription", 15));
                    SkillButtons.Add(prescription);

                    SkillButton fda = new SkillButton(Content.Load<Texture2D>("textures/game/skills/pharmacist/fda"), new Vector2(920, 110), new Skill("fda", 10));
                    SkillButtons.Add(fda);

                    SkillButton degree = new SkillButton(Content.Load<Texture2D>("textures/game/skills/pharmacist/degree"), new Vector2(910, 80), new Skill("degree", 10));
                    SkillButtons.Add(degree);
                    break;
            }

        }

        void CheckSkillButtons()
        {
            foreach (SkillButton button in SkillButtons)
            {
                if (MouseOver(button))
                {
                    // TODO Add hovoering tool tip/description
                    if (Click())
                        button.WasClicked = true;
                    if (Released())
                    {
                        if (button.WasClicked)
                        {
                            if (button.Skill.ExperienceCost <= Save.Kevin.Experience && PreRequesitesMet(button.Skill) && !PlayerHasSkill(button.Skill))
                            {
                                button.Visable = true;
                                Save.Kevin.Experience -= button.Skill.ExperienceCost;
                                Save.Kevin.Skills.Add(button.Skill);
                            }
                        }
                        button.WasClicked = false;
                    }
                }
            }
        }

        void CheckActiveSkills()
        {
            foreach (SkillButton button in SkillButtons)
            {
                // Keyboard
                if (Pressed(button.Hotkey) && DescriptionList.Count == 0)
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed && PlayerHasSkill(button.Skill))
                    {
                        HandleSkill(button);
                    }
                    button.WasPressed = false;
                }
            }
            foreach (RoomButton button in MegaMapButtons.FindAll(button => button is RoomButton))
            {
                if (MouseOver(button))
                {
                    if (RightClick())
                        button.WasRightClicked = true;
                    else if (RightReleased())
                    {
                        if (PlayerHasSkill("inspect"))
                        {
                            if (button.Room.Visited && Save.Kevin.Power >= 1)
                            {
                                Save.Kevin.Power--;
                                button.Room.Known = true;
                            }
                        }
                        button.WasRightClicked = false;
                    }
                }
            }
        }

        void HandleSkill(SkillButton button)
        {
            switch (button.Skill.Name)
            {
                case "zap":
                    foreach (Fighter fighter in Save.GetRoom().Entities.FindAll(entity => entity is Fighter))
                    {
                        if (MouseOver(fighter))
                        {
                            if (Save.Kevin.Power >= 1)
                            {
                                Save.Kevin.Power -= 1;
                                Deal(fighter, 5);
                                if (fighter.HP <= 0)
                                    UpdateOptions = true;
                            }
                        }
                    }
                    break;

                case "zaproom":
                    if (MegaMapMode)
                    {
                        foreach (RoomButton roombutton in MegaMapButtons.FindAll(butt => butt is RoomButton))
                        {
                            if (MouseOver(roombutton) && Save.Kevin.Power >= 2 || (PlayerHasSkill("zapcheaper") && Save.Kevin.Power >= 1))
                            {
                                Save.Kevin.Power -= 2;
                                if (PlayerHasSkill("zapcheaper"))
                                    Save.Kevin.Power++;
                                foreach (Fighter fighter in roombutton.Room.Entities.FindAll(entity => entity is Fighter))
                                {
                                    fighter.HP -= 3;
                                    if (fighter.HP <= 0)
                                        UpdateOptions = true;
                                }
                                if (PlayerHasSkill("zapsafe"))
                                {
                                    Save.Kevin.HP += 3;
                                }
                            }
                        }
                    }
                    break;
            }
        }

        void DrawSkills()
        {
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.GetClass(), OffsetVector + new Vector2(850, 45), Color.White);

            foreach (SkillButton button in SkillButtons)
            {
                Draw(button);
            }
        }

        bool PreRequesitesMet(Skill skill)
        {
            switch (skill.Name)
            {
                case "zapsafe":
                    return PlayerHasSkill("zaproom");

                case "zapstronger":
                    return PlayerHasSkill("zap") || PlayerHasSkill("zaproom");

                case "zapcheaper":
                    return PlayerHasSkill("zaproom");

                case "degree":
                    return PlayerHasSkill("fda") || PlayerHasSkill("prescription");

                default:
                    return true;
            }
        }

        bool PlayerHasSkill(string skillname)
        {
            foreach (Skill skill in Save.Kevin.Skills)
            {
                if (skill.Name == skillname)
                    return true;
            }
            return false;
        }

        bool PlayerHasSkill(Skill skill)
        {
            foreach (Skill skills in Save.Kevin.Skills)
            {
                if (skill.Name == skills.Name)
                    return true;
            }
            return false;
        }
    }

    public class SkillButton : Button
    {
        public Skill Skill;

        public SkillButton(Texture2D sprite, Vector2 position, Skill skill)
        {
            Sprite = sprite;
            Skill = skill;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Visable = false;
        }

        public SkillButton(Texture2D sprite, Vector2 position, Skill skill, Keys hotkey)
        {
            Sprite = sprite;
            Skill = skill;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Hotkey = hotkey;
            Visable = false;
        }
    }
}
