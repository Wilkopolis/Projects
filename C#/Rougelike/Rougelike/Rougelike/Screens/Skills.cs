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

        void InitializeSkillButtons()
        {
            //Mayor
            SkillButtons = new List<SkillButton>();
            SkillButton zaproom = new SkillButton(Content.Load<Texture2D>("textures/game/skills/zaproom"), new Vector2(880, 110), new Skill("zaproom", 20));
            SkillButtons.Add(zaproom);

            SkillButton zapsafe = new SkillButton(Content.Load<Texture2D>("textures/game/skills/safe"), new Vector2(860, 80), new Skill("zapsafe", 20));
            SkillButtons.Add(zapsafe);

            SkillButton zap = new SkillButton(Content.Load<Texture2D>("textures/game/skills/zap"), new Vector2(920, 110), new Skill("zap", 0), Keys.Z);
            SkillButtons.Add(zap);

            SkillButton zapstronger = new SkillButton(Content.Load<Texture2D>("textures/game/skills/stronger"), new Vector2(900, 80), new Skill("zapstronger", 20));
            SkillButtons.Add(zapstronger);

            SkillButton zapcheaper = new SkillButton(Content.Load<Texture2D>("textures/game/skills/cheaper"), new Vector2(940, 80), new Skill("zapcheaper", 20));
            SkillButtons.Add(zapcheaper);

            SkillButton zapinspect = new SkillButton(Content.Load<Texture2D>("textures/game/skills/inspect"), new Vector2(980, 110), new Skill("zapinspect", 20));
            SkillButtons.Add(zapinspect);
        }

        void CheckSkillButtons()
        {
            foreach (SkillButton button in SkillButtons)
            {
                if (MouseOver(button))
                {
                    if (Click())
                        button.WasClicked = true;
                    if (Released())
                    {
                        if (button.WasClicked)
                        {
                            if (button.Skill.ExperienceCost <= Save.Kevin.Experience && PreRequesitesMet(button.Skill))
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
                    if (button.WasPressed)
                    {
                        HandleSkill(button);
                        break;
                    }
                    button.WasPressed = false;
                }
            }            
        }

        void HandleSkill(SkillButton button)
        {
            switch (button.Skill.Name)
            {
                case "zap":
                    if (PreRequesitesMet(button.Skill))
                    {
                        foreach (Entity entity in Save.GetRoom().Entities)
                        {
                            if (entity is Enemy && MouseOver(entity))
                            {
                                if (Save.Kevin.Power >= 1)
                                {
                                    Save.Kevin.Power -= 1;
                                    Deal((Enemy)entity, 5);
                                }
                            }
                        }
                    }
                    break;
            }
        }

        void DrawSkills()
        {
            SpriteBatch.DrawString(SegeoUiMono, "MasterMind", OffsetVector + new Vector2(850, 45), Color.White);
            foreach (SkillButton button in SkillButtons)
            {
                Draw(button);
            }
        }

        bool PreRequesitesMet(Skill skill)
        {
            switch (skill.Name)
            {
                case "zap":
                    return true;

                case "zaproom":
                    return true;

                case "zapsafe":
                    return PlayerHasSkill("zaproom");

                case "zapstronger":
                    return PlayerHasSkill("zap") || PlayerHasSkill("zaproom");

                case "zapcheaper":
                    return PlayerHasSkill("zap") || PlayerHasSkill("zaproom");

                case "zapinspect":
                    return true;

                default:
                    return false;
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
