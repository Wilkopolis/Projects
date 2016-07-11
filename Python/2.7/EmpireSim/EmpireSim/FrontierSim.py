import sys, pygame

class Color(object):
    dark_gray = (36, 36, 35)
    yellow = (245, 203, 92, 220)
    yellow_fade = (245, 203, 92, 40)

def game_loop():
    while (1):
        pass

def init():
    global screen, title_font
    # init
    pygame.init()
    # fonts
    title_font = myfont = pygame.font.SysFont("browallianew", 32)
    # window
    size = width, height = 1280, 720
    screen = pygame.display.set_mode(size)

    redraw()

def run_game():
    init()
    game_loop()

def redraw():
    screen.fill(Color.dark_gray)
    pygame.display.flip()

if __name__ == "__main__":
    run_game()