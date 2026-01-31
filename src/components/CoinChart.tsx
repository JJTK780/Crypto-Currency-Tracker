// Components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Context
import { useContext } from 'react'
import { CoinContext } from '../context/CoinProvider'

// Helpers
import getLast7DaysDates from '../helpers/getLast7DaysDates'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
)

interface CoinChartProps {
  name: string
  data: number[]
}

export default function CoinChart({ name, data }: CoinChartProps) {
  const { currency } = useContext(CoinContext)

  // Detect dark mode
  const isDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Last 7d ${name || 'coin'} price`,
        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
      },
      tooltip: {
        displayColors: false,
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        bodyColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const config = {
    labels: getLast7DaysDates(),
    datasets: [
      {
        data,
        label: currency,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgb(16, 185, 129)'
      }
    ]
  }

  return <Line options={options} data={config} />
}
