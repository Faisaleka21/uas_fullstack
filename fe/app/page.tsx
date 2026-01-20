'use client';

import Layout from '@/components/ui/Layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { JWTPayloadTypes } from '@/services/data-types/jwt-payload-type';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '@/services/data-types/user-type';
import { service } from '@/services/services';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';



// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Tipe data untuk statistik
type DashboardStats = {
  totalCategories: number;
  totalProducts: number;
  totalVariants: number;
};

// Tipe data untuk grafik
type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth?: number;
    tension?: number;
  }[];
};

export default function Home() {
  const [token] = useState(Cookies.get('token') || '');
  const [user, setUser] = useState<UserType | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalCategories: 0,
    totalProducts: 0,
    totalVariants: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const router = useRouter();


  
  // Fetch data dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        setLoading(true);
        
        // Dekode token untuk mendapatkan user info
        const payload: JWTPayloadTypes = jwtDecode(token);
        setUser(payload.user);

        // Fetch data dari API dashboard stats
        const response = await service('dashboard/stats');
        
        if (response.error) {
          throw new Error(response.message || 'Gagal mengambil data statistik');
        }

        const data = response.data;
        
        setStats({
          totalCategories: data.totalCategories || 0,
          totalProducts: data.totalProducts || 0,
          totalVariants: data.totalVariants || 0,
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Gagal memuat data dashboard. Silakan coba lagi.');
        
        // Fallback data untuk development
        setStats({
          totalCategories: 0,
          totalProducts: 0,
          totalVariants: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, router]);

  // Data untuk chart
  const chartData: ChartData = {
    labels: ['Kategori Produk', 'Produk', 'Varian Produk'],
    datasets: [
      {
        label: 'Jumlah Data',
        data: [stats.totalCategories, stats.totalProducts, stats.totalVariants],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // Biru untuk kategori
          'rgba(16, 185, 129, 0.7)',  // Hijau untuk produk
          'rgba(139, 92, 246, 0.7)',  // Ungu untuk varian
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Opsi untuk chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          color: '#4B5563',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: '#6B7280',
        },
      },
    },
  };

  // Render loading state
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header Dashboard */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Dashboard Admin
              </h1>
              <p className="text-gray-600 mt-1">
                Selamat datang kembali, {user?.name || 'Admin'}!
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Tampilkan error jika ada */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Category Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Kategori Produk</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.totalCategories.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Semua kategori produk aktif</span>
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg mr-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Produk</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.totalProducts.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Produk tersedia dalam sistem</span>
              </div>
            </div>
          </div>

          {/* Total Variants Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg mr-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Varian Produk</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.totalVariants.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Varian produk dalam sistem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Visualisasi Data</h2>
              <p className="text-gray-600 mt-1">Perbandingan jumlah data kategori, produk, dan varian</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    chartType === 'bar'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    chartType === 'line'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Line Chart
                </button>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-80">
            {chartType === 'bar' ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </div>

          {/* Chart Legend */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Kategori Produk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Produk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Varian Produk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-gray-800">Informasi Dashboard</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Dashboard ini menampilkan ringkasan statistik dari sistem manajemen produk. 
              Data diperbarui secara real-time dari database. 
              Gunakan menu navigasi untuk mengelola data lebih detail.
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-gray-800">Statistik Cepat</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Rasio Varian/Produk</p>
                <p className="text-lg font-semibold text-gray-800">
                  {(stats.totalProducts > 0 ? (stats.totalVariants / stats.totalProducts).toFixed(1) : 0)}x
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rata-rata Produk/Kategori</p>
                <p className="text-lg font-semibold text-gray-800">
                  {(stats.totalCategories > 0 ? (stats.totalProducts / stats.totalCategories).toFixed(1) : 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}