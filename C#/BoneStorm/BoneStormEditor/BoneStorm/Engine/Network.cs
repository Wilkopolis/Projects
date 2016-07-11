namespace BoneStorm
{
    class ClientConnection
    {
        public bool readyToConnect = false;
        public bool handshakeComplete = false;

        public void Handshake()
        {
            // if readyToConnect
            // connect to server

            // on connect to server
            // send my character sprite

            // wait for new port 
            // on recieve new port
            // close this connection

            // start connect to new server
            // handshakeComplete = true
        }

        public void Update()
        {
            // if msg in
            // decypher msg
            // apply to game 

            // make msg from log of events
            // send msg
        }
    }
}
