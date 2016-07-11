import pygame, sys
from graphics.draw import redraw

def init_keyboard(m, d):
    global menus
    menus = m
    global dungeon
    dungeon = d

def handle_input():
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_F10:
                sys.exit()
            elif event.key == pygame.K_ESCAPE:
                escape_menu = filter(lambda m: m.title == "Menu", menus)[0]
                escape_menu.visible = not escape_menu.visible
                redraw()
            elif event.key == pygame.K_q:
                move(-1, -1)
            elif event.key == pygame.K_w:
                move(0, -1)
            elif event.key == pygame.K_e:
                move(1, -1)
            elif event.key == pygame.K_d:
                move(1, 0)
            elif event.key == pygame.K_c:
                move(1, 1)
            elif event.key == pygame.K_x:
                move(0, 1)
            elif event.key == pygame.K_z:
                move(-1, 1)
            elif event.key == pygame.K_a:
                move(-1, 0)
            elif event.key == pygame.K_s:
                move(0, 0)

def move(offset):
    new_pos = Vector(dungeon.player_pos.x + offset.x, dungeon.player_pos.y + offset.y)
    new_tile = dungeon.tiles[new_pos.x][new_pos.y]
    enemy = new_tile.get_enemy()
    if enemy != None:
        dungeon.player.attack(enemy)
    elif new_tile.get_solid():
        return
    else:
        pass
