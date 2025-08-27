'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ExpenseCard from '@/components/ExpenseCard';
import ChartWrapper from '@/components/ChartWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expenseAPI } from '@/lib/api';
import { seedAPI } from '@/lib/seedApi';
import { useToast } from '@/context/ToastContext';
import { useSonner } from '@/context/SonnerContext';
import ExpenseModal from '@/components/ExpenseModal';

interface Stats {
  monthlyExpenses: Array<{ _id: string; total: number; count: number }>;
  totalExpenses: number;
  remainingBalance: number;
  balancePercentage: number;
  salary: number;
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'Food',
    amount: '',
    description: ''
  });
  const { showSuccess, showError, showWarning } = useToast();
  const sonner = useSonner();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'expenses' | 'balance' | 'categories';
    title: string;
  }>({ isOpen: false, type: 'expenses', title: '' });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (stats && stats.balancePercentage <= 10) {
      showWarning(
        'Low Balance Alert!', 
        `Only ${stats.balancePercentage.toFixed(1)}% of your salary remaining. Email notification sent.`
      );
      sonner.warning(
        'Critical Balance Warning', 
        `You have only ₹${stats.remainingBalance.toLocaleString()} left this month`
      );
    }
  }, [stats, showWarning, sonner]);

  const fetchStats = async () => {
    try {
      const response = await expenseAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingId = sonner.loading('Adding expense...', 'Please wait');
    
    try {
      await expenseAPI.addExpense({
        category: newExpense.category,
        amount: Number(newExpense.amount),
        description: newExpense.description
      });
      sonner.dismiss(loadingId);
      sonner.success('Expense added!', `₹${newExpense.amount} added to ${newExpense.category}`);
      showSuccess('Expense Added', `Successfully added ₹${newExpense.amount} expense`);
      setNewExpense({ category: 'Food', amount: '', description: '' });
      setShowAddExpense(false);
      fetchStats();
    } catch (error: any) {
      sonner.dismiss(loadingId);
      const errorMessage = error.response?.data?.message || 'Failed to add expense';
      sonner.error('Error', errorMessage);
      showError('Error', errorMessage);
    }
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    const loadingId = sonner.loading('Adding sample data...', 'This may take a moment');
    
    try {
      await seedAPI.addSampleExpenses();
      sonner.dismiss(loadingId);
      sonner.success('Sample data added!', 'Your dashboard now has sample expenses');
      showSuccess('Sample Data Added', 'Sample expenses have been added to your account');
      fetchStats();
    } catch (error: any) {
      sonner.dismiss(loadingId);
      const errorMessage = error.response?.data?.message || 'Error adding sample data';
      sonner.error('Error', errorMessage);
      showError('Error', errorMessage);
    } finally {
      setIsSeeding(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user.name}! 🚀
              </h1>
              <p className="text-xl text-gray-600">Here's your financial overview for this month</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border">
                <div className="text-sm text-gray-500">Current Date</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    💰
                  </div>
                  <div className="text-right">
                    <div className="text-blue-100 text-sm">Monthly Salary</div>
                    <div className="text-3xl font-bold">₹{stats.salary.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={() => setModalState({ isOpen: true, type: 'expenses', title: 'All Expenses' })}
                className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    💳
                  </div>
                  <div className="text-right">
                    <div className="text-red-100 text-sm">Total Expenses</div>
                    <div className="text-3xl font-bold">₹{stats.totalExpenses.toLocaleString()}</div>
                    <div className="text-xs text-red-200 mt-1">Click to view details</div>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={() => setModalState({ isOpen: true, type: 'balance', title: 'Balance Details' })}
                className={`bg-gradient-to-br ${stats.balancePercentage <= 10 ? 'from-orange-500 to-red-500' : 'from-green-500 to-green-600'} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {stats.balancePercentage <= 10 ? '⚠️' : '💵'}
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 text-sm">Remaining Balance</div>
                    <div className="text-3xl font-bold">₹{stats.remainingBalance.toLocaleString()}</div>
                    <div className="text-sm">{stats.balancePercentage.toFixed(1)}% left</div>
                    <div className="text-xs text-white/70 mt-1">Click to view details</div>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={() => setModalState({ isOpen: true, type: 'categories', title: 'Categories Breakdown' })}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    📊
                  </div>
                  <div className="text-right">
                    <div className="text-purple-100 text-sm">Categories</div>
                    <div className="text-3xl font-bold">{stats.monthlyExpenses.length}</div>
                    <div className="text-sm">Active</div>
                    <div className="text-xs text-purple-200 mt-1">Click to view breakdown</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    🥧 Expense Distribution
                  </CardTitle>
                  <p className="text-gray-600">Visual breakdown of your spending categories</p>
                </CardHeader>
                <CardContent>
                  {stats.monthlyExpenses.length > 0 ? (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                      <ChartWrapper data={stats.monthlyExpenses} type="pie" />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📊</div>
                      <p className="text-gray-500 text-lg">No expenses recorded this month</p>
                      <p className="text-gray-400">Add your first expense to see insights!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    📈 Category Analysis
                  </CardTitle>
                  <p className="text-gray-600">Compare spending across different categories</p>
                </CardHeader>
                <CardContent>
                  {stats.monthlyExpenses.length > 0 ? (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
                      <ChartWrapper data={stats.monthlyExpenses} type="bar" />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📈</div>
                      <p className="text-gray-500 text-lg">No data to analyze yet</p>
                      <p className="text-gray-400">Start tracking to see trends!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {stats.balancePercentage <= 10 && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 mb-8 text-white shadow-xl animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">⚠️</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Critical: Low Balance Alert!</h3>
                    <p className="text-lg">You have only <span className="font-bold">{stats.balancePercentage.toFixed(1)}%</span> of your salary remaining this month!</p>
                    <p className="text-red-100 mt-2">Consider reviewing your expenses and planning accordingly.</p>
                    <p className="text-red-100 mt-1 text-sm">📧 Email notification has been sent to your registered email.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quick Actions</h2>
            <p className="text-gray-600">Manage your expenses efficiently</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleSeedData}
              disabled={isSeeding}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSeeding ? '⏳ Adding...' : '🎲 Add Sample Data'}
            </Button>
            <Button 
              onClick={() => setShowAddExpense(!showAddExpense)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showAddExpense ? '❌ Cancel' : '➕ Add Expense'}
            </Button>
          </div>
        </div>

        {showAddExpense && (
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                📝 Add New Expense
              </CardTitle>
              <p className="text-blue-100">Track your spending to stay on budget</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleAddExpense} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="Food">🍽️ Food</option>
                      <option value="Transport">🚗 Transport</option>
                      <option value="Entertainment">🎬 Entertainment</option>
                      <option value="Shopping">🛍️ Shopping</option>
                      <option value="Bills">💵 Bills</option>
                      <option value="Healthcare">🏥 Healthcare</option>
                      <option value="Other">💼 Other</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className="p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Input
                    placeholder="What did you spend on?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                >
                  ✨ Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <ExpenseModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          type={modalState.type}
          title={modalState.title}
          stats={stats}
        />
      </div>
    </div>
  );
}