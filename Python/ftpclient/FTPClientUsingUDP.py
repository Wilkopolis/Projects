##########################################################################
"""  FTPClientUsingUDP.py 

Ken Goydan           
Cisc450 Spring 2015                   
Due 3/17  

The client will prompt the user for two items: a destination file server
machine name or IP address, and the name of a file supposedly stored on
the destination file server. The client will establish a TPC connection 
and send the filename to the server. The server will send back the size 
of the file (for the buffer). If the size is 0, then the client will 
concluding the file was not found, and exit. If found the client will 
recieve the calculated md5 hash from the server through the TCP connection
and set up a data socket for the transfer of the file over UDP. Because 
the file is too large to be sent via UDP in a single packet, it will have 
to be broken up into several packets. Instead of receiving 

	bufferSize / packetSize

amount of packets and writing them to file-this program will control the 
flow of packets, 1 at a time through TCP, with the server. Each time the
Client recieves a packet through UDP, it will request another through TCP.
After the transmission is complete the client will compare both the server
md5 hash of the file and calculate its own. The client will remark if the
hashes match or not, then exit.
"""

from socket import *
from math import ceil
import sys
import hashlib

#'well known' ports 
controlPort = 12321
dataPort = 12322

# Get target file #
#------------------

#get user input
serverAndFile = input("FTPClientUsingUDP: Enter the server's IP Address (space) and the location of the desired file: ")

#get address, port, and file name from user input
serverAddress, fileName = serverAndFile.split(' ')

#connect to server from given information
print ("FTPClientUsingUDP: Attempting to connect to " + serverAddress + " at " + str(controlPort) + ".")
clientControlSocket = socket(AF_INET, SOCK_STREAM)
#catch a failure to connect 
try:
	clientControlSocket.connect((serverAddress, controlPort))
except TimeoutError:
	#catch the failure and exit
	print ("FTPClientUsingUDP: Unable to open TCP connection to " + serverAddress + " at " + str(controlPort) + ".")
	sys.exit("FTPClientUsingUDP: Now exiting.")

print("FTPClientUsingUDP: Connection successful.")

# Check for file existance #
#---------------------------

#send file name
clientControlSocket.send(bytes(fileName, "utf-8"))

#recieve buffer size, 0 if file not found
bufferSize = clientControlSocket.recv(1024).decode("utf-8")

if bufferSize == '0':
	#the file was not found, close the control socket and exit
	print("FTPClientUsingUDP: The file ", fileName, " was not found, now exiting.")
	clientControlSocket.close()
else:
	# Read in the file if it exists #
	#--------------------------------

	print("FTPClientUsingUDP: The file ", fileName, " exists!")	

	#recieve the server's hash of the file
	print("FTPClientUsingUDP: Waiting to receive ", fileName, " hash.")	
	serverFileHash = clientControlSocket.recv(1024).decode("utf-8")
	print("FTPClientUsingUDP: ", fileName, " hash is")	
	print (serverFileHash)
	
	print("FTPClientUsingUDP: Now downloading file...")
	#open the file to write the downloaded file into
	fileHandle = open(fileName, 'bw')

	#set up the data socket
	clientDataSocket = socket(AF_INET, SOCK_DGRAM)
	clientDataSocket.bind(("", dataPort))

	# Recieve the File #
	#-------------------

	#determine how many packets we are recieving
	packetAmount = ceil(int(bufferSize)/1024)
	interationCount = 0
	#tell the server to send the first packet
	clientControlSocket.send(bytes("start", "utf-8"))
	print ("FTPClientUsingUDP: Starting reception.")
	while interationCount < packetAmount:
		print ("FTPClientUsingUDP: Receiving packet ", str(interationCount), " of ", str(packetAmount),".")
		#read in a packet from the data socket
		fileData, serverAddress = clientDataSocket.recvfrom(1024)
		#write the data to file
		fileHandle.write(fileData)		
		#request the next packet
		clientControlSocket.send(bytes("continue", "utf-8"))
		interationCount += 1
	fileHandle.close()

	print("FTPClientUsingUDP: Download complete!. Checking integrity.")

	# Compare the Hashes #
	#---------------------

	fileHandle = open(fileName, "br")
	#calculate our hash
	ourFileHash = hashlib.md5(fileHandle.read()).hexdigest()
	fileHandle.close()

	#print the verdict
	if ourFileHash == serverFileHash:
		print("FTPClientUsingUDP: Our hash and the Server's match! Writing and exiting.")
	else:
		print("FTPClientUsingUDP: Our hash and the Server's do not match. Oh well, we tried.")

	print("FTPClientUsingUDP: Transfer Complete!")

	#close the data and control socket
	clientControlSocket.close()
	clientDataSocket.close()