import os
import random

def print_list(templist):
	count = 0
	for item in templist:
		print (str(count) + '. ' + str(item))
		count += 1
	print ('')

def get_all_options(path):
        templist = []
        for dirpath, dirnames, filenames in os.walk(path):
            templist.extend(filenames)
            templist.extend(dirnames)
            break
        for entry in templist:
        	if '.bat' in entry:
        		templist.remove(entry)
        for entry in templist:
        	if '.py' in entry:
        		templist.remove(entry)
        return templist

# // MAIN //
# Gather all Files and Folders
state = 'main'
depth = 0
currentlist = get_all_options(os.getcwd())

while (True):
	# Print waiter line
	if (state == 'main'):
		print ("Our catagories for today are: \n")
		print_list (currentlist)
		special = random.choice(range(len(currentlist)))
		print ("Our special for this evening is \n " + str(currentlist[special]) + '\n')
	elif (state == 'sub'):
		print ('in ' + os.getcwd() + ' we have: \n')
		print_list (currentlist)		
		special = random.choice(range(len(currentlist)))
		print ("May I suggests the \n " + str(currentlist[special]) + '\n')
	elif (state == 'reroll'):
		print ('No? Perhaps then the\n ' + str(currentlist[special]) + '\n')

	# Print Instructions
	if os.path.isfile(os.getcwd() + '\\'+ currentlist[special]):		
		print ("'p' to play, 'r' to reroll, or 'b' for back \n")
	else:		
		print ("'y' for the special, 'r' to reroll, or 'b' for back \n")

	# Get Request
	command = input ('@ ')

	# Handle Request
	if command == 'y':
		print ('Splendid. \n')
		if os.path.isfile(os.getcwd() + '\\'+ currentlist[special]):
			os.startfile('"' + os.getcwd() + '\\'+ currentlist[special] + '"')
		else:			
			os.chdir(os.getcwd() + '\\'+ currentlist[special])
			depth += 1
			currentlist = get_all_options(os.getcwd())		
			state = 'sub'
	elif command == 'r':		
		special = random.choice(range(len(currentlist)))
		state = 'reroll'
	elif command == 'p' and os.path.isfile(os.getcwd() + '\\'+ currentlist[special]):
		print ('Right away sir. \n However if you would like something else,')
		os.startfile('"' + os.getcwd() + '\\'+ currentlist[special] + '"')
	elif command == 'b':
		if depth != 0:
			os.chdir("..")
			depth -= 1
		currentlist = get_all_options(os.getcwd())	
		if depth == 0:
			state == 'main'
	else:
		print ("Ahh, excellent choice sir. \n")
		if (os.path.isfile(os.getcwd() + '\\'+ currentlist[int(command)])):
			os.startfile('"' + os.getcwd() + '\\'+ currentlist[int(command)] + '"')
		else:			
			os.chdir(os.getcwd() + '\\'+ currentlist[int(command)])
			depth += 1
			currentlist = get_all_options(os.getcwd())
			state = 'sub'
