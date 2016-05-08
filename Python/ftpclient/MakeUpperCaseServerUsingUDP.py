##########################################################################
""" MakeUpperCaseServerUsingUDP.py                                    
  
    Ken Goydan           
    Cisc450 Spring 2015                   
    Due 3/17 

    This module will act as a server to a client who will send utf-8 encoded
    strings as bytes. The server will bind a socket to listen for incomming
    connections. For each connection, the server will reconstruct the string,
    convert each character into its uppercase form, then send the new string 
    back (as bytes) to the same client. All using UDP. The server will 
    recieve and serve any client as long as the program is running. The 
    server must be run first.
"""

from socket import *

# STUDENTS - you should randomize your port number.         
# This port number in practice is often a "Well Known Number" 
serverPort = 12321

# create UDP socket and bind to your specified port
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(("", serverPort))

# output to console that server is listening
print ("The Make Upper Case Server running over UDP is ready to receive ... ")

while 1:
    # read client's message AND REMEMBER client's address (IP and port)
    message, clientAddress = serverSocket.recvfrom(2048)

    # output to console the sentence received from client over UDP
    print ("Received from Client: ", message)
	
    # change client's sentence to upper case letters
    modifiedMessage = message.upper()
	
    # send back modified sentence to the client using remembered address
    serverSocket.sendto(modifiedMessage, clientAddress)
 
    # output to console the modified sentence sent back to client
    print ("Sent back to Client: ", modifiedMessage)