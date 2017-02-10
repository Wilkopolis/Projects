var EFFECT_NONE = 'none';
// skills
var SKILL_REGEN_I = "Regen I";
var SKILL_REGEN_II = "Regen II";
var SKILL_REGEN_III = "Regen III";
var SKILL_REGEN_IV = "Regen IV";
var SKILL_BUBBLE_I = "Bubble I";
var SKILL_BUBBLE_II = "Bubble II";
var SKILL_THRONS_I = "Throns I";
var SKILL_THRONS_II = "Throns II";
var SKILL_SPARK_I = "Spark I";
var SKILL_SPARK_II = "Spark II";
var SKILL_SPARK_III = "Spark III";
var SKILL_LEAP = "Leap";
var SKILL_SLAM = "Slam";
var SKILL_MICROWAVE_I = "Microwave I";
var SKILL_MICROWAVE_II = "Microwave II";
var SKILL_MICROWAVE_III = "Microwave III";
var SKILL_PROACTIVE_ARMOR_I = "Proactive Armor I";
var SKILL_PROACTIVE_ARMOR_II = "Proactive Armor II";
var SKILL_PROACTIVE_ARMOR_III = "Proactive Armor III";
var SKILL_MINE = "Mine";
var SKILL_SENTRY_I = "Sentry I";
var SKILL_SUPPORT_SENTRY_I = "Support Sentry I";
var SKILL_ADRENALINE_SENTRY_I = "Adrenaline Sentry I";
var SKILL_SENTRY_II = "Sentry II";
var SKILL_SENTRY_COMPANION = "Sentry Companion";
var SKILL_SENTRY_III = "Sentry III";
var SKILL_LOOTING = "Looting";
var SKILL_BUILD_ROBOCHEF = "Build Robochef";
var SKILL_BUILD_ROBOMECHANIC = "Build Robomechanic";
var SKILL_REDO = "Redo";
var SKILL_IRON_SKIN_I = "Iron Skin I";
var SKILL_IRON_SKIN_II = "Iron Skin II";
var SKILL_RAGE_I = "Rage I";
var SKILL_RAGE_II = "Rage II";
var SKILL_DUAL_WIELDING_I = "Dual Wielding I";
var SKILL_DUAL_WIELDING_II = "Dual Wielding II";
var SKILL_DUAL_WIELDING_III = "Dual Wielding III";
var SKILL_STRONGER_ALLIES = "Stronger Allies";
var SKILL_MORE_ALLIES = "More Allies";
var SKILL_HEFTIER_ALLIES = "Heftier Allies";
var SKILL_FRIENDS_DOWNTOWN = "Friends Downtown";
var SKILL_CHANGE_PLACES = "Change Places";
var SKILL_BLINK_I = "Blink I";
var SKILL_BLINK_II = "Blink II";
var SKILL_BLINK_EXIT = "Blink Exit Damage";
var SKILL_BLINK_HEAL = "Blink Heal";
var SKILL_BLINK_FREQUENCY = "Blink Frequency";
var SKILL_BLINK_STUN = "Blink Stun on Land";

function Skills (occupation) {
	// default skills
	this.defaultSkills = [new Skill(SKILL_REGEN_I, 2),
	new Skill(SKILL_REGEN_II, 2, new Requirement(SKILL_REGEN_I)),
	new Skill(SKILL_REGEN_III, 3, new Requirement(SKILL_REGEN_II)),
	new Skill(SKILL_REGEN_IV, 5, new Requirement(SKILL_REGEN_III))];
	// class specific skills
	this.classSkills = [];

	this.getSkill = function(skillName) {
		for (var i = this.defaultSkills.length - 1; i >= 0; i--) {
			if (this.defaultSkills[i].name == skillName)
				return this.defaultSkills[i].purchased;
		}
		for (var i = this.classSkills.length - 1; i >= 0; i--) {
			if (this.classSkills[i].name == skillName)
				return this.classSkills[i].purchased;
		}
	}
}

function Skill(name, cost, requirement) {
	this.name = name;
	this.purchased = false;
	this.cost = cost;
	this.requirement = requirement;

	this.requirementsMet = function() {
		if (requirement == null)
			return this.cost <= player.skillPoints;
		else
			return this.requirement.isSatisfied() && this.cost <= player.skillPoints;

	};
}

function Requirement(skill) {
	this.skill = skill;

	this.isSatisfied = function() {
		return player.skills.getSkill(this.skill);
	};
}