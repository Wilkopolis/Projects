class Tile(object):

	floor_sprite = ""
	entities = []

	def __init__(self):
		pass
	
	def get_solid():
		result = False
		for entity in entities:
			result |= entity.solid
		return result

	def get_enemy():
		result = null		
		for entity in entities:
			if entity is Enemy:
				result = entity
				break
		return result

	def get_sprites():
		result = [floor_sprite]
		if len(entities) > 0:
			result.append(entities[-1].sprite_id)
		return result

	def get_opaque():
		result = False
		for entity in entities:
			result |= entity.opaque
		return result

class WallTile(Tile):
	
	entities = [Wall()]
