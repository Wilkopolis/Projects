using System;
using Lidgren.Network;

namespace Game
{

	public class Network
	{

		public string Status;
		public bool Flag;
		public bool[,] Flags = new bool[8,5];
		public int myindex = 0;

		private int lastcount = 0;

		public Network ()
		{
			Status = "created";
		}

		public void Server()
		{
			NetPeerConfiguration config = new NetPeerConfiguration ("MineKartServer");
			config.Port = 14242;

			NetServer server = new NetServer (config);
			server.Start ();
			Status = "server started, waiting for connections";
			Flag = true;

			while (true) {
				// send
				if (Flags[0,0]) {
					NetOutgoingMessage sendMsg = server.CreateMessage();
					byte[] tag = {0, 0};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending start signal";
					Flags [0, 0] = false;
					Flag = true;
				}
				if (Flags[0,1]) {
					NetOutgoingMessage sendMsg = server.CreateMessage();
					byte[] tag = {0, 1};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending host jump";
					Flags [0, 1] = false;
					Flag = true;
				}
				if (Flags[0,2]) {
					NetOutgoingMessage sendMsg = server.CreateMessage();
					byte[] tag = {0, 2};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending host dead";
					Flags [0, 2] = false;
					Flag = true;
				}
				if (Flags[0,3]) {
					NetOutgoingMessage sendMsg = server.CreateMessage();
					byte[] tag = {0, 3};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending host win";
					Flags [0, 3] = false;
					Flag = true;
				}
				if (Flags[0,4]) {
					NetOutgoingMessage sendMsg = server.CreateMessage();
					byte[] tag = {0, 4};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending host save";
					Flags [0, 4] = false;
					Flag = true;
				}

				// recieve
				NetIncomingMessage msg;
				while ((msg = server.ReadMessage()) != null)
				{
					Flag = true;
					Status = "message recieved";
					switch (msg.MessageType)
					{
					case NetIncomingMessageType.Data:
						byte[] bits = msg.ReadBytes (2);
						Status += " {" + bits [0].ToString () + "," + bits [1].ToString () + "}";
						Flags [bits [0], bits [1]] = true;
						break;

					default:
//						Console.WriteLine(msg.ReadString());
//						Console.WriteLine("Unhandled type: " + msg.MessageType);
						break;
					}
					server.Recycle(msg);
				}

				// peer discvoery
				if (lastcount < server.Connections.Count) {
					Status = "somebody connected";
					NetOutgoingMessage sendMsg = server.CreateMessage();
					Flags [server.Connections.Count, 0] = true;
					byte[] tag = {(byte)server.Connections.Count, 0};
					sendMsg.Write(tag);
					server.SendMessage(sendMsg, server.Connections, NetDeliveryMethod.ReliableOrdered, 0);
					Flag = true;
				} else if (lastcount > server.Connections.Count) {
					Status = "somebody disconnected";
					Flag = true;
				}
				lastcount = server.Connections.Count;
			}
		}

		public void Client()
		{
			NetPeerConfiguration config = new NetPeerConfiguration("MineKartServer"); // needs to be same on client and server!
			NetClient client = new NetClient(config);

			client.Start ();
			client.Connect("128.175.185.242", 14242);
			while (client.ConnectionStatus == NetConnectionStatus.Disconnected) {
				client.Connect("128.175.185.242", 14242);
				Status = "trying to connect to 128.175.185.242:14242 " + client.ConnectionStatus.ToString ();
				Flag = true;
				System.Threading.Thread.Sleep(2000);
			}

			while (true) {
				// send
				if (Flags [myindex, 1]) {
					NetOutgoingMessage sendMsg = client.CreateMessage ();
					byte[] tag = { (byte)myindex, 1 };
					sendMsg.Write (tag);
					client.SendMessage (sendMsg, client.Connections [0], NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending player " + myindex.ToString () + " jump";
					Flags [myindex, 1] = false;
					Flag = true;
				} 
				if (Flags [myindex, 2]) {
					NetOutgoingMessage sendMsg = client.CreateMessage ();
					byte[] tag = { (byte)myindex, 2 };
					sendMsg.Write (tag);
					client.SendMessage (sendMsg, client.Connections [0], NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending player " + myindex.ToString () + " died";
					Flags [myindex, 2] = false;
					Flag = true;
				}
				if (Flags [myindex, 3]) {
					NetOutgoingMessage sendMsg = client.CreateMessage ();
					byte[] tag = { (byte)myindex, 3 };
					sendMsg.Write (tag);
					client.SendMessage (sendMsg, client.Connections [0], NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending player " + myindex.ToString () + " won";
					Flags [myindex, 3] = false;
					Flag = true;
				}
				if (Flags [myindex, 4]) {
					NetOutgoingMessage sendMsg = client.CreateMessage ();
					byte[] tag = { (byte)myindex, 4 };
					sendMsg.Write (tag);
					client.SendMessage (sendMsg, client.Connections [0], NetDeliveryMethod.ReliableOrdered, 0);
					Status = "sending player " + myindex.ToString () + " save";
					Flags [myindex, 4] = false;
					Flag = true;
				}

				// recieve
				NetIncomingMessage msg;
				while ((msg = client.ReadMessage()) != null)
				{
					Flag = true;
					Status = "message recieved";
					switch (msg.MessageType)
					{
					case NetIncomingMessageType.Data:
						byte[] bits = msg.ReadBytes (2);
						Status += " {" + bits [0].ToString () + "," + bits [1].ToString() + "}";
						Flags [bits [0], bits [1]] = true;
						if (myindex == 0)
							myindex = bits [0];
						break;

					default:
//						Console.WriteLine(msg.ReadString());
//						Console.WriteLine("Unhandled type: " + msg.MessageType);
						break;
					}
					client.Recycle(msg);
				}
			}
		}
	}
}

