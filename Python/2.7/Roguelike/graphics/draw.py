import pygame
from colors import *

def init_draw(s, t, m):
    global screen
    screen = s
    global title_font
    title_font = t
    global menus
    menus = m

def load_sprites():
	sprites["wall_tile"] = pygame.load("art\\wall_tile.png")	
	sprites["floor_tile"] = pygame.load("art\\floor_tile.png")
	pass

def draw_background():
	# draw map & entities
	draw_map()
	# draw player
	screen.blit(sprites["player"], 32, 32)

def draw_map():
	height, width = ceil(screen.height / 32), ceil(screen.width / 32)
	tile_start = Vector(dungeon.player_pos.x - width / 2, dungeon.player_pos.y - height / 2)
	for i in range(0, width):
		for j in range(0, height):
			tile_pos = Vector(tile_start.x + i, tile_start.y + j)
			tile_sprites = dungeon.tiles[tile_pos.x][tile_pos.y].get_sprites()
			pixel_pos = Vector(32 * i, 32 * j)
			for sprite_id in tile_sprites:
				screen.blit(sprites[sprite_id], pixel_pos.x, pixel_pos.y)

def draw_menus():
    for menu in menus:
        if menu.visible:
            menu.draw(screen, title_font)

def redraw():
    screen.fill(Color.dark_gray)
    #draw_background()
    draw_menus()
    pygame.display.flip()