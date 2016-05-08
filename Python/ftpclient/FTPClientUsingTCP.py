##########################################################################
"""  FTPClientUsingTCP.py 

    Ken Goydan           
    Cisc450 Spring 2015                   
    Due 3/17  

	The client will prompt the user for two items: a destination file server
	machine name or IP address, and the name of a file supposedly stored on
	the destination file server. The client will establish a TPC connection 
	and send the filename to the server. The server will send back the size 
	of the file (for the buffer). If the size is 0, then the client will 
	concluding the file was not found, and exit. If found the client will 
	read the next message from the server with the appropriate buffer size.
	The client-server will use 2 TCP connections: one for control commands
	and one for transferring the file.
"""

from socket import *
import sys

#'well known' ports 
controlPort = 12321
dataPort = 12322

# Get target file #
#------------------

#get user input
serverAndFile = input("FTPClientUsingTCP: Enter the server's IP Address (space) and the location of the desired file: ")

#get address, port, and file name from user input
serverAddress, fileName = serverAndFile.split(' ')

#connect to server from given information
print ("FTPClientUsingTCP: Attempting to connect to " + serverAddress + " at " + str(controlPort) + ".")
clientControlSocket = socket(AF_INET, SOCK_STREAM)
#catch a failure to connect 
try:
	clientControlSocket.connect((serverAddress, controlPort))
except TimeoutError:
	#catch the failure and exit
	print ("FTPClientUsingTCP: Unable to open TCP connection to " + serverAddress + " at " + str(controlPort) + ".")
	sys.exit("FTPClientUsingTCP: Now exiting.")

print("FTPClientUsingTCP: Connection successful.")

# Check for file existance #
#---------------------------

#send file name
clientControlSocket.send(bytes(fileName, "utf-8"))

#recieve buffer size, 0 if file not found
bufferSize = clientControlSocket.recv(1024).decode("utf-8")

if bufferSize == '0':
	#the file was not found, close the control socket and exit
	print("FTPClientUsingTCP: The file ", fileName, " was not found, now exiting.")
	clientControlSocket.close()
else:
	# Read in the file if it exists #
	#--------------------------------

	#the file was found, now open the data socket
	print("FTPClientUsingTCP: The file ", fileName, " exists!")	

	#again, try to connect, exit if we fail somehow
	clientDataSocket = socket(AF_INET, SOCK_STREAM)
	try:
		clientDataSocket.connect((serverName, dataPort))
	except TimeoutError:
		#catch the failure and exit
		print ("FTPClientUsingTCP: Unable to open TCP connection to " + serverName + " at " + str(dataPort) + ".")
		sys.exit("FTPClientUsingTCP: Now exiting.")

	print("FTPClientUsingTCP: Now downloading file...")

	#open the file as raw bytes and write the received data into it	
	fileHandle = open(fileName, 'bw')
	fileData = clientDataSocket.recv(int(bufferSize))
	fileHandle.write(fileData)
	fileHandle.close()

	print("FTPClientUsingTCP: Transfer Complete!")
	#close the data and control socket
	clientControlSocket.close()
	clientDataSocket.close()