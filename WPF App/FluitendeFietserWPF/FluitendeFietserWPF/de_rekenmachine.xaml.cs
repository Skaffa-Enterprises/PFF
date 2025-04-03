using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FluitendeFietserWPF
{
    /// <summary>
    /// Interaction logic for de_rekenmachine.xaml
    /// </summary>
    public partial class de_rekenmachine : Window
    {
        public string totaal1 = "";
        public string totaal2 = "";
        int uitkomst;
        public string skibidi_operator = "";
        bool getal2 = false;
        public de_rekenmachine()
        {
            InitializeComponent();
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (getal2 == false)
            {
                totaal1 += (sender as Button).Content.ToString();
                ResultTB.Text = totaal1;
            }
            else if (getal2 == true)
            {
                totaal2 += (sender as Button).Content.ToString();
                ResultTB.Text = totaal2;
            }

        }
        private void C_Click(object sender, RoutedEventArgs e)
        {
            totaal1 = "";
            totaal2 = "";
            ResultTB.Text = "";
            skibidi_operator = "";
            getal2 = false;

        }
        private void operator_Click(object sender, RoutedEventArgs e)
        {
            if ((sender as Button).Content.ToString() == "x")
            {
                skibidi_operator = "x";
                getal2 = true;
            }
            else if ((sender as Button).Content.ToString() == "/")
            {
                skibidi_operator = "/";
                getal2 = true;
            }
            else if ((sender as Button).Content.ToString() == "-")
            {
                skibidi_operator = "-";
                getal2 = true;
            }
            else if ((sender as Button).Content.ToString() == "+")
            {
                skibidi_operator = "+";
                getal2 = true;
            }
            ResultTB.Text = skibidi_operator;
        }
        private void bereken_Click(object sender, RoutedEventArgs e)
        {
            int eerstegetal = 0;
            int tweedegtal = 0;
            try
            {
                 eerstegetal = Convert.ToInt32(totaal1);
                 tweedegtal = Convert.ToInt32(totaal2);
            }
            catch (Exception)
            {
                MessageBox.Show("klik iets aan");
            }
            if (skibidi_operator == "x")
            {
                uitkomst = eerstegetal * tweedegtal;
            }
            else if(skibidi_operator == "-")
            {
                uitkomst = eerstegetal - tweedegtal;
            }
            else if(skibidi_operator == "/")
            {
                uitkomst = eerstegetal / tweedegtal;
            }
            else if(skibidi_operator == "+"){
                uitkomst = eerstegetal + tweedegtal;
            }
            ResultTB.Text = uitkomst.ToString(); 
            totaal1 = "";
            totaal2 = "";
            skibidi_operator = "";
            getal2 = false;
        }
        
    }
}
