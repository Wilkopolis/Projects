import sys
from toolbox import *

def draw ( window, state ):
	print chr(27) + "[2J"
	if (state == State.MAIN):
		draw_main_menu(window)
	elif (state == State.GAME):
		pass

def draw_main_menu( window ):
	for j in range (0, window[0]):		
		p('-')
	n()
	for i in range (0, window[1]-2):	
		p('|')
		for j in range (0, window[0] - 2):
			p(' ')	
		p('|')
		n()

def p ( char ):	
	sys.stdout.write(char)

def n ():
	print('')