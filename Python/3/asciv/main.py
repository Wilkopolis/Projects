from time import sleep
from toolbox import *
from graphics import draw

def main ():
	state = State.MAIN
	run = True
	draw(get_terminal_size(), state)
	while run:
		sleep(1)

if __name__ == '__main__':
    main()

