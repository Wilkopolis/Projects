import pygame
from colors import *

class Menu(object):

    title = "null"
    x = 0
    y = 0
    w = 0
    h = 0
    visible = False
    fixed = False
    hotkey = pygame.K_ESCAPE
    buttons = []
    background_color = Color.yellow_fade

    title_bar_height = 20
    border_thickness = 4

    def __init__(self, t, x, y, w, h, f, bc, b):
        self.title = t
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.fixed = f
        self.background_color = bc
        self.buttons = b

    def draw(self, screen, font):
        # left_border
        left_border = pygame.Surface((self.border_thickness, self.h),
            pygame.SRCALPHA, 32)
        left_border.fill(Color.yellow)
        # title_bar
        title_bar = pygame.Surface((self.w - 2 * self.border_thickness,
            self.title_bar_height), pygame.SRCALPHA, 32)
        title_bar.fill(Color.yellow)
        # right_border
        right_border = pygame.Surface((self.border_thickness, self.h),
            pygame.SRCALPHA, 32)
        right_border.fill(Color.yellow)
        # bottom_border
        bottom_border = pygame.Surface((self.w - 2 * self.border_thickness,
            self.border_thickness), pygame.SRCALPHA, 32)
        bottom_border.fill(Color.yellow)
        # background
        background = pygame.Surface((self.w - 2 * self.border_thickness,
            self.h - self.border_thickness - self.title_bar_height),
            pygame.SRCALPHA, 32)
        background.fill(self.background_color)
        # menu title
        label = font.render(self.title, 1, Color.dark_gray)
        # blit em
        screen.blit(left_border, (self.x, self.y))
        screen.blit(title_bar, (self.x + self.border_thickness, self.y))
        screen.blit(right_border, (self.x + self.w - self.border_thickness,
            self.y))
        screen.blit(bottom_border, (self.x + self.border_thickness, self.y +
            self.h - self.border_thickness))
        screen.blit(background, (self.x + self.border_thickness, self.y +
            self.title_bar_height))
        screen.blit(label, (self.x + 2, self.y - 10))

class Button(object):

    x = 0
    y = 0
    w = 0
    h = 0
    inner_text = "Options"

    def __init__(self, t, x, y, w, h):
        self.inner_text = t
