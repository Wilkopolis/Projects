##########################################################################
"""  FTPServerUsingTCP.py 

Ken Goydan           
Cisc450 Spring 2015                   
Due 3/17  

    The server will set up a control port on 'well-known' port 12321, 
    listening for a client. Once the client has connected the server will 
    receive a message containing the desired file. The server will check
    to see if the file is available. If the file is available the server
    will send the file's size to the client. The server will then set up
    a data socket on 'well-known' port 12322 and transmit the file as 
    bytes to the client. The server will then close both the control 
    socket and the data socket then exit. If the file is not available, 
    then the sever will send a file size of '0' and close the sockets and
    exit.
"""

from socket import *
from os import path
#'well known' ports 
controlPort = 12321
dataPort = 12322

# Wait for client #
#------------------

#set up a socket to listen for incoming clients
serverConnectionSocket = socket(AF_INET,SOCK_STREAM)
serverConnectionSocket.bind(("", controlPort))
serverConnectionSocket.listen(1)
print ("FTPClientUsingTCP: Listening for connections...")

#accept in a client
serverControlSocket, clientAddress = serverConnectionSocket.accept()
print("FTPClientUsingTCP: Client ", clientAddress, " has connected.")

#read in the file name
fileName = serverControlSocket.recv(1024)

# Check for file existence #
#---------------------------

print("FTPClientUsingTCP: Looking for ", fileName)

if path.isfile(fileName):
    print("FTPClientUsingTCP: Found it!")

    # Transmit the file #
    #--------------------

    #calculate the buffer size
    messageToClient = str(path.getsize(fileName))

    #set up the data socket
    serverDataSocket = socket(AF_INET,SOCK_STREAM)
    serverDataSocket.bind(("", dataPort))
    serverDataSocket.listen(1)

    #transmit the file size
    serverControlSocket.send(bytes(messageToClient, "utf-8"))

    #accept the client's data connection request
    serverDataSocket, clientAddress = serverDataSocket.accept()

    #open the file as raw bytes and read it into data
    fileHandle = open(fileName, "br")
    fileData = fileHandle.read()

    print("FTPClientUsingTCP: Transmitting the file...")
    #transmit the data
    serverDataSocket.send(fileData)
    print("FTPClientUsingTCP: Transmission complete! Now exiting.")

    #clean up the connections
    serverControlSocket.close()
    serverDataSocket.close()        
else:
    print("FTPClientUsingTCP: File not found. Now exiting.")

    #file not found, transmit 0 and close out
    messageToClient = "0"
    serverControlSocket.send(bytes(messageToClient, "utf-8"))
    serverControlSocket.close()
