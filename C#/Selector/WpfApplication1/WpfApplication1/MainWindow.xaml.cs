using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using NReco.VideoConverter;
using System.Threading;

namespace Selector
{

    public partial class MainWindow : Window
    {
        bool CWD_LAST = false;

        string FILEDB_PATH = @"FileDb.filedb";

        List<FileInfo> Media = new List<FileInfo>();
        List<DirectoryInfo> EndFolders = new List<DirectoryInfo>();
        List<FileInfo> ResultSet = new List<FileInfo>();

        List<String> WhiteList = new List<String>();
        List<String> GrayList = new List<String>();

        DirectoryInfo cwd;

        static Random rand = new Random();

        BitmapImage Loading;

        public MainWindow()
        {
            // set up window styles and bind event handlers
            Init();

            // start rendering our window
            InitializeComponent();
        }

        public void Init()
        {
            // bind the event handler(s)
            this.KeyDown += new KeyEventHandler(MainWindow_KeyDown);
            this.Loaded += new RoutedEventHandler(Window_Loaded);
            // remove the windows default boarder
            this.WindowStyle = WindowStyle.None;
            // don't allow me to accidentally resize it
            this.ResizeMode = ResizeMode.NoResize;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            // load settings db
            LoadSettingsAndFiles();
        }

        void MainWindow_KeyDown(object sender, KeyEventArgs e)
        {
            // exit
            if (e.Key == Key.F10 || e.Key == Key.Escape || e.Key == Key.Back)
            {
                Application.Current.Shutdown();
            }
        }

        public void LoadSettingsAndFiles()
        {
            // this will be our cwd
            cwd = new DirectoryInfo(@"F:\Media");

            // loading image
            Loading = new BitmapImage();
            Loading.BeginInit();
            Loading.UriSource = new Uri(@"E:\Dropbox\C#\Selector\WpfApplication1\loading.png");
            Loading.EndInit();
            Loading.Freeze();

            // set up the random suggestion
            Random.Click += OpenFile;
            Random.MouseUp += HandleRandom;
            // set the randomize suggestions button
            Randomize.Click += OpenRandomFolderFile;
            Randomize.MouseUp += HandleRandomize;

            // set the back button
            ListView resultsBox = FindChild<ListView>(this, "Results");
            resultsBox.MouseRightButtonUp += UpALevel;

            // set thumbnail on click
            thumb1.MouseLeftButtonUp += OpenThumbnailFile;
            thumb2.MouseLeftButtonUp += OpenThumbnailFile;
            thumb3.MouseLeftButtonUp += OpenThumbnailFile;
            thumb4.MouseLeftButtonUp += OpenThumbnailFile;
            thumb5.MouseLeftButtonUp += OpenThumbnailFile;
            thumb6.MouseLeftButtonUp += OpenThumbnailFile;
            thumb7.MouseLeftButtonUp += OpenThumbnailFile;
            thumb8.MouseLeftButtonUp += OpenThumbnailFile;
            thumb9.MouseLeftButtonUp += OpenThumbnailFile;
            thumb10.MouseLeftButtonUp += OpenThumbnailFile;
            thumb11.MouseLeftButtonUp += OpenThumbnailFile;
            thumb12.MouseLeftButtonUp += OpenThumbnailFile;
            thumb13.MouseLeftButtonUp += OpenThumbnailFile;
            thumb14.MouseLeftButtonUp += OpenThumbnailFile;
            thumb15.MouseLeftButtonUp += OpenThumbnailFile;
            thumb16.MouseLeftButtonUp += OpenThumbnailFile;
            thumb17.MouseLeftButtonUp += OpenThumbnailFile;
            thumb18.MouseLeftButtonUp += OpenThumbnailFile;
            thumb19.MouseLeftButtonUp += OpenThumbnailFile;
            thumb20.MouseLeftButtonUp += OpenThumbnailFile;

            // used for stuff
            List<String> ImportPaths = new List<String>();
            List<String> ExcludeNames = new List<String>();
            List<String> ExcludeExtensions = new List<String>();

            // load the .tagdb
            string FileContents = File.ReadAllText(FILEDB_PATH, Encoding.UTF8);
            string FileFilters = FileContents.Split('=')[1];

            // load the filter settings
            foreach (string S in Regex.Split(FileFilters, "\r\n"))
            {
                if (S == "")
                    continue;
                string[] Line = S.Split('|');
                int code = Convert.ToInt32(Line[0]);
                string param = Line[1];
                switch (code)
                {
                    case 0: ImportPaths.Add(param); break;
                    case 1: ExcludeNames.Add(param); break;
                    case 2: ExcludeExtensions.Add(param); break;
                    case 3: WhiteList.Add(param); break;
                    case 4: GrayList.Add(param); break;
                }
            }
            // load the goods
            DirectoryInfo DirectoryInfo = new DirectoryInfo(@"F:\Media");

            Stack<DirectoryInfo> tempFolders = new Stack<DirectoryInfo>(new DirectoryInfo[] { DirectoryInfo }); // List that hold direcotries that cannot be accessed

            DirectoryInfo currentFolder = tempFolders.Pop();

            while (true)
            {
                // add to the fileSet
                foreach (FileInfo f in currentFolder.GetFiles())
                {
                    int lastDot = f.Name.LastIndexOf('.');
                    string fileExtension = f.Name.Substring(lastDot + 1, f.Name.Length - lastDot - 1);
                    if (WhiteList.Contains(fileExtension))
                        Media.Add(f);
                }
                // add to the folderSet
                foreach (DirectoryInfo d in currentFolder.GetDirectories())
                {
                    if (!ExcludeNames.Contains(d.Name))
                        tempFolders.Push(d);
                    if (d.GetFiles().Count() != 0)
                        EndFolders.Add(d);
                }
                if (tempFolders.Count == 0)
                    break;
                currentFolder = tempFolders.Pop();
            }

            // populate the listbox with our cwd options
            UpdateCwdList();

            // run in background
            InitializeComponent();

            // pick a random one and populate the random slot
            UpdateRandomFile();

            // pick a random folder and pick 10 or so of those
            UpdateRandomFolder();
        }

        void UpdateCwdList()
        {
            // add the include(s)
            ListView resultsBox = FindChild<ListView>(this, "Results");
            // result the items
            resultsBox.Items.Clear();
            // process each directory
            foreach (DirectoryInfo d in cwd.GetDirectories())
            {
                ListViewItem dirEntry = new ListViewItem();
                dirEntry.Content = d.Name;
                dirEntry.MouseUp += HandleDir;
                bool Gray = d.GetDirectories().Count() == 0;
                foreach (FileInfo f in d.GetFiles())
                {
                    int lastDot = f.Name.LastIndexOf('.');
                    string fileExtension = f.Name.Substring(lastDot + 1, f.Name.Length - lastDot - 1);
                    if (WhiteList.Contains(fileExtension))
                    {
                        Gray = false;
                        break;
                    }
                }
                dirEntry.Background = Gray ? new SolidColorBrush(Color.FromRgb(150, 100, 222)) : new SolidColorBrush(Color.FromRgb(255, 100, 100));
                resultsBox.Items.Add(dirEntry);
            }
            // list the files
            foreach (FileInfo f in cwd.GetFiles())
            {
                int lastDot = f.Name.LastIndexOf('.');
                string fileExtension = f.Name.Substring(lastDot + 1, f.Name.Length - lastDot - 1);
                if (WhiteList.Contains(fileExtension) || GrayList.Contains(fileExtension))
                {
                    ListViewItem fileEntry = new ListViewItem();
                    fileEntry.Content = f.Name;
                    fileEntry.MouseLeftButtonUp += OpenFile;
                    fileEntry.Background = new SolidColorBrush(Color.FromRgb(100, 100, 255));
                    resultsBox.Items.Add(fileEntry);
                }
            }
        }

        void UpALevel(Object sender, MouseEventArgs e)
        {
            cwd = cwd.Parent;
            UpdateCwdList();
            UpdateRandomFolder(cwd);
        }

        void HandleDir(Object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Middle)
            {
                string fileName = (string)((ListViewItem)sender).Content;
                System.Diagnostics.Process.Start(cwd.FullName + "\\" + fileName);
            }
            else if (e.ChangedButton == MouseButton.Left)
            {
                string dirName = (string)((ListViewItem)sender).Content;
                cwd = new DirectoryInfo(cwd.FullName + "\\" + dirName);
                UpdateCwdList();
                UpdateRandomFolder(cwd);
                CWD_LAST = true;
            }
        }
        
        void HandleRandom(Object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Middle)
            {
                DirectoryInfo dirName = (DirectoryInfo)((Button)sender).Resources["path"];
                System.Diagnostics.Process.Start(dirName.FullName);
            }
            else if (e.ChangedButton == MouseButton.Right)
            {
                UpdateRandomFile();
            }
        }

        void HandleRandomize(Object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Middle)
            {
                DirectoryInfo dirName = (DirectoryInfo)((Button)sender).Resources["path"];
                System.Diagnostics.Process.Start(dirName.FullName);
            }
            else if (e.ChangedButton == MouseButton.Right)
            {
                if (CWD_LAST)
                    UpdateRandomFolder(cwd);
                else
                    UpdateRandomFolder();
            }
        }
        
        void OpenRandomFolderFile(Object sender, RoutedEventArgs e)
        {
            if (Keyboard.IsKeyDown(Key.LeftCtrl) || Keyboard.IsKeyDown(Key.RightCtrl))
            {
                FileInfo[] files = ((DirectoryInfo)((Button)e.Source).Resources["path"]).GetFiles();
                FileInfo file = files.ElementAt(rand.Next(files.Length));

                System.Diagnostics.Process.Start(file.FullName);
            }
            
            DirectoryInfo folderName = (DirectoryInfo)((Button)sender).Resources["path"];
            UpdateRandomFolder(folderName);
        }

        void ResetDir(Object sender, RoutedEventArgs e)
        {
            cwd = new DirectoryInfo(@"F:\Media");
            UpdateCwdList();
            CWD_LAST = false;
        }

        void OpenThumbnailFile(Object sender, MouseEventArgs e)
        {
            string fileName = (string)((Image)sender).Resources["path"];
            System.Diagnostics.Process.Start(fileName);
        }

        void OpenFile(Object sender, MouseEventArgs e)
        {
            string fileName = (string)((ListViewItem)sender).Content;
            System.Diagnostics.Process.Start(cwd.FullName + "\\" + fileName);
        }

        void OpenFolder(Object sender, MouseEventArgs e)
        {
            string fileName = (string)((ListViewItem)sender).Content;
            System.Diagnostics.Process.Start(cwd.FullName + "\\" + fileName);
        }

        void OpenFile(Object sender, RoutedEventArgs e)
        {
            FileInfo fileInfo = (FileInfo)((Button)sender).Content;
            System.Diagnostics.Process.Start(fileInfo.FullName + "");

            ListView resultsBox = FindChild<ListView>(this, "Results");
            resultsBox.Focus();
        }

        void UpdateRandomFile()
        {
            FileInfo randomChoice = Media.ElementAt(rand.Next(Media.Count));
            Random.Content = randomChoice;
            Random.Resources["path"] = randomChoice.Directory;
            int fontSize = Math.Min(Math.Max(2 * (int)Random.Width / randomChoice.Name.Count(), 24), 60);
            Random.FontSize = fontSize;
            // get images
            int duration = GetDuration(randomChoice);
            SetImageSource(randomChoice, thumb1, (int)duration * 1 / 5);
            SetImageSource(randomChoice, thumb2, (int)duration * 2 / 5);
            SetImageSource(randomChoice, thumb3, (int)duration * 3 / 5);
            SetImageSource(randomChoice, thumb4, (int)duration * 4 / 5);
        }

        void UpdateRandomFile(Object sender, MouseEventArgs e)
        {
            UpdateRandomFile();
        }

        void SetImageSource(FileInfo fileInfo, Image source, int timeCode = 0)
        {
            MemoryStream imageStream = new MemoryStream();
            source.Resources["path"] = fileInfo.FullName;
            // image
            if (timeCode == 0)
            {
                try
                {
                    BitmapImage LoadImage = new BitmapImage();
                    LoadImage.BeginInit();
                    LoadImage.UriSource = new Uri(fileInfo.FullName);
                    LoadImage.EndInit();
                    LoadImage.Freeze();
                    source.Source = LoadImage;
                }
                catch (Exception e)
                {
                    Console.Write(e.Data);
                }
            }
            // video
            else
            {
                NReco.VideoConverter.FFMpegConverter ffMpeg = new NReco.VideoConverter.FFMpegConverter();
                ffMpeg.GetVideoThumbnail(fileInfo.FullName, imageStream, timeCode);
                imageStream.Seek(0, SeekOrigin.Begin);
                using (var stream = imageStream)
                {
                    var bitmap = new BitmapImage();
                    bitmap.BeginInit();
                    bitmap.StreamSource = stream;
                    bitmap.CacheOption = BitmapCacheOption.OnLoad;
                    bitmap.EndInit();
                    bitmap.Freeze();
                    source.Source = bitmap;
                }
            }
        }

        void UpdateRandomFolder(DirectoryInfo path = null)
        {
            // either shuffle the current path or pick a new one
            DirectoryInfo randomChoice = EndFolders.ElementAt(rand.Next(EndFolders.Count));
            if (path != null)
                randomChoice = path;
            // set up the button resource
            Randomize.Resources["path"] = randomChoice;
            FileInfo[] files = randomChoice.GetFiles();
            Shuffle<FileInfo>(files);
            int fileIndex = 0;
            int i = 0;
            for (int j = 0; j < 16; j++)
            {
                Image element = FindChild<Image>(this, "thumb" + (j + 5).ToString());
                element.Source = Loading;
            }
            while (i < 16)
            {
                // get the Image element
                Image element = FindChild<Image>(this, "thumb" + (i + 5).ToString());
                // exit the loop
                if (fileIndex >= files.Count())
                {
                    element.Source = null;
                    i++;
                    continue;
                }
                FileInfo file = files[fileIndex];
                // get the file extension
                int lastDot = file.Name.LastIndexOf('.');
                string fileExtension = file.Name.Substring(lastDot + 1, file.Name.Length - lastDot - 1);
                // video
                if (WhiteList.Contains(fileExtension))
                {
                    int duration = GetDuration(file);
                    SetImageSource(file, element, (int)(rand.Next(duration * 10) / 12) + duration / 12);
                    i++;
                }
                // image
                else if (GrayList.Contains(fileExtension))
                {
                    SetImageSource(file, element);
                    i++;
                }
                fileIndex++;
            }
        }

        void UpdateRandomFolder(Object sender, RoutedEventArgs e)
        {
            UpdateRandomFolder();
        }

        int GetDuration(FileInfo videoFile)
        {
            try
            {
                // Start the child process.
                Process p = new Process();
                // Redirect the output stream of the child process.
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardOutput = true;
                p.StartInfo.RedirectStandardError = true;
                p.StartInfo.CreateNoWindow = true;
                p.StartInfo.FileName = "cmd.exe";
                p.StartInfo.Arguments = "/C ffmpeg -i \"" + videoFile.FullName + "\"";
                p.Start();
                // Read the output stream first and then wait.
                // THANKS FFMPEG
                string output = p.StandardError.ReadToEnd();
                p.WaitForExit();
                // fuck yes
                int start = output.IndexOf("Duration");
                int end = output.IndexOf(',', start);
                string[] durations = output.Substring(start, end - start).Split(':');
                int hours = Convert.ToInt32(Regex.Replace(durations[1], @"\s+", ""));
                int minutes = Convert.ToInt32(Regex.Replace(durations[2], @"\s+", ""));
                int seconds = Convert.ToInt32(Regex.Replace(durations[3].Split('.')[0], @"\s+", ""));
                return hours * 3600 + minutes * 60 + seconds;
            }
            catch (Exception e)
            {
                Console.Write(e.ToString());
            }

            return -1;
        }

        public static T FindChild<T>(DependencyObject parent, string childName) where T : DependencyObject
        {
            T foundChild = null;

            int childrenCount = VisualTreeHelper.GetChildrenCount(parent);
            for (int i = 0; i < childrenCount; i++)
            {
                var child = VisualTreeHelper.GetChild(parent, i);
                // If the child is not of the request child type child
                T childType = child as T;
                if (childType == null)
                {
                    // recursively drill down the tree
                    foundChild = FindChild<T>(child, childName);

                    // If the child is found, break so we do not overwrite the found child. 
                    if (foundChild != null) break;
                }
                else if (!string.IsNullOrEmpty(childName))
                {
                    var frameworkElement = child as FrameworkElement;
                    // If the child's name is set for search
                    if (frameworkElement != null && frameworkElement.Name == childName)
                    {
                        // if the child's name is of the request name
                        foundChild = (T)child;
                        break;
                    }
                }
                else
                {
                    // child element found.
                    foundChild = (T)child;
                    break;
                }
            }

            return foundChild;
        }

        static void Shuffle<T>(T[] array)
        {
            int n = array.Length;
            for (int i = 0; i < n; i++)
            {
                int r = i + (int)(rand.NextDouble() * (n - i));
                T t = array[r];
                array[r] = array[i];
                array[i] = t;
            }
        }
    }
}