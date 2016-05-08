##########################################################################
"""  FTPServerUsingUDP.py 

Ken Goydan           
Cisc450 Spring 2015                   
Due 3/17  

The server will set up a control socket on 'well-known' port 12321, 
listening for a client. Once the client has connected the server will 
recieve a message containing the desired file. The server will check
to see if the file is available. 
	If the file is available the server
will send the file's size to the client followed by the md5 hash of the 
file. The server will then set up a UDP data socket on 'well-known' port 
12322 and transmit the file as bytes to the client. After transmission 
the server will then close both the control socket and the data socket 
then exit. 
	If the file is not available, then the server will close the 
control port and exit.
"""

from socket import *
from os import path
from math import ceil
import hashlib

# Wait for client #
#------------------

controlPort = 12321
dataPort = 12322

#set up a socket to listen for incoming clients
serverConnectionSocket = socket(AF_INET,SOCK_STREAM)
serverConnectionSocket.bind(("", controlPort))
serverConnectionSocket.listen(1)
print ("FTPServerUsingUDP: Listening for connections...")

#accept in a client
serverControlSocket, clientAddress = serverConnectionSocket.accept()
print("FTPServerUsingUDP: Client ", clientAddress, " has connected.")

#read in the file name
fileName = serverControlSocket.recv(1024)

# Check for file existence #
#---------------------------

print("FTPServerUsingUDP: Looking for ", fileName)

if path.isfile(fileName):
    print("FTPServerUsingUDP: Found it!")

    #tell the client the size of the expected file
    bufferSize = path.getsize(fileName)
    serverControlSocket.send(bytes(str(bufferSize), "utf-8"))

    #open the file as raw bytes and read it into data
    fileHandle = open(fileName, "br")

    #calculate our hash
    fileHash = hashlib.md5()
    fileHash.update(fileHandle.read())
    #send out hash
    serverControlSocket.send(bytes(fileHash.hexdigest(), "utf-8"))
    fileHandle.close()

    print("FTPServerUsingUDP: Transmitting the file...")

    #open the file to send via UDP
    fileHandle = open(fileName, "br")

    # Transmit the File #
    #--------------------

    #set up the transmission socket
    serverDataSocket = socket(AF_INET, SOCK_DGRAM)
    #determine how many packets we are sending
    packetAmount = ceil(bufferSize/1024)
    interationCount = 0
    print ("FTPServerUsingUDP: Starting transmission.")
    #send 1 UDP packet each time we get the go-ahead from the client
    while interationCount < packetAmount and not serverControlSocket.recv(1024).decode("utf-8") == "stop":   
    	print ("FTPServerUsingUDP: Trasnmitting packet ", str(interationCount), " of ", str(packetAmount),".") 	
    	currentData = fileHandle.read(1024)
    	serverDataSocket.sendto(currentData, (clientAddress[0], dataPort))
    	interationCount+=1

    print("FTPServerUsingUDP: Transmission complete! Now exiting.")

    #clean up the connections
    serverControlSocket.close()
    serverDataSocket.close()    
else:
    print("FTPServerUsingUDP: File not found. Now exiting.")

    #file not found, trasnmist 0 and close out
    messageToClient = "0"
    serverControlSocket.send(bytes(messageToClient, "utf-8"))
    serverControlSocket.close()