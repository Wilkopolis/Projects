import sys, pygame
from keyboard.keyboard import handle_input
from keyboard.keyboard import init_keyboard
from graphics.draw import redraw
from graphics.draw import init_draw
from graphics.menus import *
from world.dungeon import *

def game_loop():
    while (1):
        handle_input()

def init():
    # init
    pygame.init()
    # fonts
    title_font = myfont = pygame.font.SysFont("browallianew", 32)
    # window
    size = width, height = 1280, 720
    screen = pygame.display.set_mode(size)
    # menus
    menus = [Menu("Menu", size[0] / 2 - 150 / 2, size[1] / 2 - 200 / 2, 150,
        200, True, Color.yellow, [])]
    # game
    dungeon = Dungeon()

    # init the global stuff in the other modules
    init_draw(screen, title_font, menus)
    init_keyboard(menus, dungeon)
    redraw()

def run_game():
    init()
    game_loop()

if __name__ == "__main__":
    run_game()