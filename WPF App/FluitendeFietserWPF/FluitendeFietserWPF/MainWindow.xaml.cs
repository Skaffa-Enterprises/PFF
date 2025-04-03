using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.IO;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;
using System.Text.RegularExpressions;

namespace FluitendeFietserWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        int afktijd = 0;
        string name;
        private DispatcherTimer afktimer;
        public List<string> fietsen = new List<string>();
        public List<string> fietsenprijs = new List<string>();
        public List<string> services = new List<string>();
        public List<string> servicesprijs = new List<string>();
        public List<string> verzekeringen = new List<string>();
        public List<string> verzekeringenprijs = new List<string>();

        public MainWindow()
        {
            InitializeComponent();
            LoadCsvData();

            afktimer = new DispatcherTimer();
            afktimer.Interval = TimeSpan.FromSeconds(1);
            afktimer.Tick += AfkChecker;
            afktimer.Start();
            this.PreviewMouseDown += ResetAfkGeval;
            this.PreviewKeyDown += ResetAfkGeval;
        }

        private void LoadCsvData()
        {
            string filePath = "prijzen_fietsen_verzekeringen_services.csv";
            if (File.Exists(filePath))
            {
                var lines = File.ReadAllLines(filePath);
                foreach (var line in lines)
                {
                    var columns = line.Split(';');
                    if (columns.Length > 2)
                    {
                        string category = columns[0].Trim().ToLower();
                        string value = columns[1].Trim();
                        string price = ExtractPrice(columns[2].Trim());

                        switch (category)
                        {
                            case "fietsen":
                                fietsen.Add(value);
                                fietsenprijs.Add(price);
                                break;
                            case "services":
                                services.Add(value);
                                servicesprijs.Add(price);
                                break;
                            case "verzekeringen":
                                verzekeringen.Add(value);
                                verzekeringenprijs.Add(price);
                                break;
                        }
                    }
                }
                
                ComboBoxFietsen.Items.Clear();
                ComboBoxServices.Items.Clear();
                ComboBoxVerzekeringen.Items.Clear();
                for (int i = 0; i < fietsen.Count; i++)
                {
                    ComboBoxFietsen.Items.Add($"{fietsen[i]} - {fietsenprijs[i]}");
                }
                for (int i = 0; i < services.Count; i++)
                {
                    ComboBoxServices.Items.Add($"{services[i]} - {servicesprijs[i]}");
                }
                for (int i = 0; i < verzekeringen.Count; i++)
                {
                    ComboBoxVerzekeringen.Items.Add($"{verzekeringen[i]} - {verzekeringenprijs[i]}");
                }
            }
            else
            {
                MessageBox.Show("er is een fout met het ophalen van de prijzen probeer opnieuw");
            }
        }
        private string ExtractPrice(string priceText)
        {
            string cleanedPrice = Regex.Match(priceText, @"[\d,.]+").Value;
            return cleanedPrice;
        }
        private void ResetAfkGeval(object sender, EventArgs e)
        {
            afktijd = 0;
            afkbar.Value = 0;
            afktimer.Start();
        }

        private void AfkChecker(object sender, EventArgs e)
        {
            afktijd++;

            if (afkbar != null && afkbar.Value < afkbar.Maximum)
            {
                afkbar.Value++;
            }

            if (afktijd >= 60)
            {
                this.Close();
            }
        }

        private void RekenmachineBTN_Click(object sender, RoutedEventArgs e)
        {
            de_rekenmachine de_rekenmachine = new de_rekenmachine();
            de_rekenmachine.Show();
        }

        private void Timer_Click(object sender, RoutedEventArgs e)
        {
            timer timer = new timer();
            timer.Show();
        }
        private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
         name = ComboBox.NameProperty.Name;
            MessageBox.Show(name);

        }
        private void toevoegbtn_Click(object sender, RoutedEventArgs e)
        {
            
        }
    }
}