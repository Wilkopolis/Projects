using System;
using System.IO;
using System.Net;
using System.Windows;

namespace FileTransferer
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        void nuffin(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        void Gimme(object sender, RoutedEventArgs e)
        {
            button.Click += nuffin;
            button.Content = "WAIT";
            button.IsEnabled = false;

            string host = Settings.Default.ip;

            try
            {
                WebClient request = new WebClient();
                request.DownloadProgressChanged += (s, ex) =>
                {
                    double bytesIn = double.Parse(ex.BytesReceived.ToString());
                    double totalBytes = double.Parse("8315469824");
                    double percentage = bytesIn / totalBytes * 100;

                    bar.Value = int.Parse(Math.Truncate(percentage).ToString());
                };

                request.DownloadFileCompleted += (s, ex) =>
                {
                    button.Content = "dunzo";
                    button.IsEnabled = true;
                };

                request.Credentials = new NetworkCredential("anon", "dongs");
                request.DownloadFileAsync(new Uri("ftp://" + host + "/PM.iso"), "PM.iso");                
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
