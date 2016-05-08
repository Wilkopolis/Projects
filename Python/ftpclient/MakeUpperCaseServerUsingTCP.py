##########################################################################
"""  MakeUpperCaseServerUsingTCP.py 

    Ken Goydan           
    Cisc450 Spring 2015                   
    Due 3/17                                 

    This module will act as a server to a client who will send utf-8 encoded
    strings as bytes. The server will bind a socket to listen for incomming
    connections. For each connection, the server will reconstruct the string,
    convert each character into its uppercase form, then send the new string 
    back (as bytes) to the same client. All using TCP. The server will 
    recieve and serve any client as long as the program is running.
"""

from socket import *

# STUDENTS: randomize this port number (use same one that client uses!)
serverPort = 12321

# create TCP welcoming socket
serverSocket = socket(AF_INET,SOCK_STREAM)
serverSocket.bind(("",serverPort))

# server begins listening for incoming TCP requests
serverSocket.listen(1)

# output to console that server is listening 
print ("The Make Upper Case Server running over TCP is ready to receive ... ")

while 1:
    # server waits for incoming requests; new socket created on return
    connectionSocket, addr = serverSocket.accept()
     
    # read a sentence of bytes from socket sent by the client
    sentence = connectionSocket.recv(1024)

    # output to console the sentence received from the client 
    print ("Received From Client: ", sentence)
	 
    # convert the sentence to upper case
    capitalizedSentence = sentence.upper()
	 
    # send back modified sentence over the TCP connection
    connectionSocket.send(capitalizedSentence)

    # output to console the sentence sent back to the client 
    print ("Sent back to Client: ", capitalizedSentence)
	 
    # close the TCP connection; the welcoming socket continues
    connectionSocket.close()