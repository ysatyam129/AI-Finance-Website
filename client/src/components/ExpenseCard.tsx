'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseCardProps {
  title: string;
  amount: number;
  color?: string;
  percentage?: number;
}

export default function ExpenseCard({ title, amount, color = 'blue', percentage }: ExpenseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{amount.toLocaleString()}</div>
        {percentage !== undefined && (
          <p className={`text-xs ${percentage <= 10 ? 'text-red-600' : 'text-green-600'}`}>
            {percentage.toFixed(1)}% of salary
          </p>
        )}
      </CardContent>
    </Card>
  );
}