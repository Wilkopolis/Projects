##########################################################################
"""  MakeUpperCaseClientUsingUDP.py                                     
  
    Ken Goydan           
    Cisc450 Spring 2015                   
    Due 3/17 

    This module will act as a client to a server who will be sent a runtime
    defined utf-8 encoded string (as bytes). First, the client will prompt 
    the user to enter a lowercase sentence. The sentence will be sent as 
    bytes to the server. The client will then listen for a reply from the 
    server. After the server returns the modified string, the client 
    program will display the now uppercase string, then exit. All using 
    UDP. The server must be run first.
"""

from socket import *

# STUDENTS - replace with your server machine's name 
serverName = "73.13.205.236"

# STUDENTS - you should randomize your port number.         
# This port number in practice is often a "Well Known Number"  
serverPort = 13000

# create UDP socket
# Error in book? clientSocket = socket(socket.AF_INET, socket.SOCK_DGRAM)
#    corrected by  Amer 4-2013 
clientSocket = socket(AF_INET, SOCK_DGRAM)

# get user's input from keyboard
# raw_input changed to input for Python 3  Amer 4-2013
message = input("Input lowercase sentence: ")

# send user's sentence out socket; destination host and port number req'd
# need to cast message to bytes for Python 3   Amer 4-2013
clientSocket.sendto(bytes(message,"utf-8"), (serverName, serverPort))

print ("Sent to Make Upper Case Server running over UDP: ", message)

# receive modified sentence in all upper case letters from server
modifiedMessage, serverAddress = clientSocket.recvfrom(2048)

# output modified sentence and close the socket
print ("Received back from Server: ", modifiedMessage)

# close the UDP socket
clientSocket.close()