##########################################################################
""" MakeUpperCaseClientUsingTCP.py               

    Ken Goydan           
    Cisc450 Spring 2015                   
    Due 3/17   

    This module will act as a client to a server who will be sent a runtime
    defined utf-8 encoded string (as bytes). First, the client will set up a
    connection to the server. Then the client will prompt the user to enter
    a lowercase sentence. The sentence will be sent as bytes to the server.   
    After the server returns the modified string, the client program will
    display the now uppercase string, then exit. All using TCP.
"""

from socket import *

# STUDENTS - replace your server machine's name 
serverName = "73.13.205.236"

# STUDENTS - you should randomize your port number.         
# This port number in practice is often a "Well Known Number"  
serverPort = 12999

# create TCP socket on client to use for connecting to remote
# server.  Indicate the server's remote listening port
# Error in textbook?   socket(socket.AF_INET, socket.SOCK_STREAM)  Amer 4-2013 
clientSocket = socket(AF_INET, SOCK_STREAM)

# open the TCP connection
clientSocket.connect((serverName,serverPort))

# interactively get user's line to be converted to upper case
# authors' use of raw_input changed to input for Python 3  Amer 4-2013
sentence = input("Input lowercase sentence: ")

# send the user's line over the TCP connection
# No need to specify server name, port
# sentence casted to bytes for Python 3  Amer 4-2013
clientSocket.send(bytes(sentence, "utf-8"))

#output to console what is sent to the server
print ("Sent to Make Upper Case Server: ", sentence)

# get user's line back from server having been modified by the server
modifiedSentence = clientSocket.recv(1024)

# output the modified user's line 
print ("Received from Make Upper Case Server: ", modifiedSentence)

# close the TCP connection
clientSocket.close()