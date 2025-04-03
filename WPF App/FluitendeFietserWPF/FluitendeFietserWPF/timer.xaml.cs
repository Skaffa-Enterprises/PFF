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
using System.Windows.Threading;

namespace FluitendeFietserWPF
{
    /// <summary>
    /// Interaction logic for timer.xaml
    /// </summary>
    public partial class timer : Window
    {
        private DispatcherTimer timerr;
        private TimeSpan timeLeft;
        private bool isRunning = false;

        public timer()
        {
            InitializeComponent();
            timerr = new DispatcherTimer();
            timerr.Interval = TimeSpan.FromSeconds(1);
            timerr.Tick += Timer_Tick;
        }

        private void settimer_Click(object sender, RoutedEventArgs e)
        {
            if (isRunning)
            {
                timerr.Stop();
                ResetTimer();
                isRunning = false;
            }
            else
            {
                StartTimer();
                isRunning = true;
            }
        }

        private void StartTimer()
        {

            try
            {
                int hour = Convert.ToInt32(hours.Text);
                int minutes = Convert.ToInt32(minuten.Text);
                int seconds = Convert.ToInt32(seconden.Text);
                timeLeft = new TimeSpan(hour, minutes, seconds);
                timerr.Start();
            }
            catch (Exception)
            {
                MessageBox.Show("vul elke vakje in en probeer het opnieuw");
            }

        }

        private void ResetTimer()
        {
            timerr.Stop();
            hours.Text = "0";
            minuten.Text = "0";
            seconden.Text = "0";
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            if (timeLeft.TotalSeconds > 0)
            {
                timeLeft = timeLeft.Subtract(TimeSpan.FromSeconds(1));
                hours.Text = timeLeft.Hours.ToString();
                minuten.Text = timeLeft.Minutes.ToString();
                seconden.Text = timeLeft.Seconds.ToString();
            }
            else
            {
                timerr.Stop();
                isRunning = false;
                MessageBox.Show("Timer is afgelopen!");
            }
        }
    }
}
