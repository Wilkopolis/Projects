class Entity(object):

	sprite_id = ""
	solid = True
	opaque = True

class Wall(Entity):

	sprite_id = "wall"
	solid = True
	opaque = True

class Enemy(Entity):
	pass
