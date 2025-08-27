'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, DollarSign, FileText, Mail, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { expenseAPI } from '@/lib/api';

interface Expense {
  _id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'expenses' | 'balance' | 'categories';
  title: string;
  stats?: any;
}

export default function ExpenseModal({ isOpen, onClose, type, title, stats }: ExpenseModalProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && type === 'expenses') {
      fetchExpenses();
    }
  }, [isOpen, type]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await expenseAPI.getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Food: '🍽️',
      Transport: '🚗',
      Entertainment: '🎬',
      Shopping: '🛍️',
      Bills: '💵',
      Healthcare: '🏥',
      Other: '💼'
    };
    return icons[category] || '💼';
  };

  const renderExpensesList = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500">No expenses found</p>
        </div>
      ) : (
        expenses.map((expense) => (
          <motion.div
            key={expense._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(expense.category)}</div>
                <div>
                  <div className="font-semibold text-gray-900">{expense.description}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{expense.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-600">-₹{expense.amount.toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderBalanceDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-sm text-blue-600">Monthly Salary</div>
              <div className="text-2xl font-bold text-blue-800">₹{stats?.salary?.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-sm text-red-600">Total Expenses</div>
              <div className="text-2xl font-bold text-red-800">₹{stats?.totalExpenses?.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${stats?.balancePercentage <= 10 ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50'}`}>
        <div className="flex items-center space-x-4">
          <div className={`text-4xl ${stats?.balancePercentage <= 10 ? 'text-red-600' : 'text-green-600'}`}>
            {stats?.balancePercentage <= 10 ? '⚠️' : '💵'}
          </div>
          <div>
            <div className={`text-sm ${stats?.balancePercentage <= 10 ? 'text-red-600' : 'text-green-600'}`}>
              Remaining Balance
            </div>
            <div className={`text-3xl font-bold ${stats?.balancePercentage <= 10 ? 'text-red-800' : 'text-green-800'}`}>
              ₹{stats?.remainingBalance?.toLocaleString()}
            </div>
            <div className={`text-sm ${stats?.balancePercentage <= 10 ? 'text-red-600' : 'text-green-600'}`}>
              {stats?.balancePercentage?.toFixed(1)}% of salary remaining
            </div>
          </div>
        </div>
      </div>

      {stats?.remainingBalance <= 10000 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Low Balance Alert!</h3>
              <p className="text-orange-100 mb-3">
                Your remaining balance is ₹{stats?.remainingBalance?.toLocaleString()}, which is below ₹10,000.
              </p>
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Email notification has been sent to your registered email address</span>
                </div>
              </div>
              <p className="text-sm text-orange-100">
                Consider reviewing your expenses and planning your budget accordingly.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderCategoriesBreakdown = () => (
    <div className="space-y-4">
      {stats?.monthlyExpenses?.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500">No categories found</p>
        </div>
      ) : (
        stats?.monthlyExpenses?.map((category: any, index: number) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{getCategoryIcon(category._id)}</div>
                <div>
                  <div className="font-semibold text-gray-900">{category._id}</div>
                  <div className="text-sm text-gray-600">{category.count} transactions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">₹{category.total.toLocaleString()}</div>
                <div className="text-sm text-gray-500">
                  {((category.total / stats.totalExpenses) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'expenses':
        return renderExpensesList();
      case 'balance':
        return renderBalanceDetails();
      case 'categories':
        return renderCategoriesBreakdown();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}