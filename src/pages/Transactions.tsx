import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import accountsData from "../store/accounts.json";
import transactionsData from "../store/transactions.json";
import { useSelector } from "react-redux";

console.log(accountsData);
console.log(transactionsData);

// Types
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  accountId: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  color: string;
}

interface ChartData {
  date: string;
  [key: string]: string | number;
}

const Transactions: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("all");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { user } = useSelector((state: any) => state.user) || {};

  useEffect(() => {
    if (!user?.id) return;

    // Filter accounts that belong to the logged-in user
    const userAccounts = accountsData.filter((account) =>
      account.users_id.includes(user.id)
    );
    setAccounts(userAccounts);
    setTransactions(transactionsData);
  }, [user]);

  // Prepare chart data
  useEffect(() => {
    if (transactions.length === 0 || accounts.length === 0) return;

    // Get the last 7 days
    const today = new Date();
    const last7Days: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split("T")[0]);
    }

    // Create chart data
    const data: ChartData[] = last7Days.map((date) => {
      const dailyData: ChartData = { date };

      // Filter accounts based on selection
      const accountsToShow =
        selectedAccount === "all"
          ? accounts
          : accounts.filter((a) => a.id === selectedAccount);

      // Add data for each account
      accountsToShow.forEach((account) => {
        // Sum expenses for this account on this day
        const dailyExpenses = transactions
          .filter(
            (t) =>
              t.date === date &&
              t.accountId === account.id &&
              t.type === "expense"
          )
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        dailyData[account.name] = dailyExpenses;
      });

      return dailyData;
    });

    setChartData(data);
  }, [transactions, accounts, selectedAccount]); // Add selectedAccount to dependencies

  // Filter transactions based on selected account
  const filteredTransactions = transactions.filter(
    (t) => selectedAccount === "all" || t.accountId === selectedAccount
  );

  // Get account color by id
  const getAccountColor = (id: string): string => {
    const account = accounts.find((a) => a.id === id);
    return account ? account.color : "#888888";
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get accounts to display in chart based on selection
  const accountsToDisplay =
    selectedAccount === "all"
      ? accounts
      : accounts.filter((a) => a.id === selectedAccount);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card
            key={account.id}
            className={`overflow-hidden ${
              selectedAccount === account.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{account.name}</CardTitle>
                <CreditCard size={18} className="opacity-70" />
              </div>
              <CardDescription>{account.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {Math.abs(account.balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                {account.balance < 0 && (
                  <span className="text-red-500"> (debt)</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Spending Chart</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        {/* Chart View */}
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedAccount === "all"
                  ? "Spending Trends (Last 7 Days)"
                  : `${
                      accounts.find((a) => a.id === selectedAccount)?.name
                    } Spending (Last 7 Days)`}
              </CardTitle>
              <CardDescription>
                {selectedAccount === "all"
                  ? "Daily expenses across your accounts"
                  : `Daily expenses for ${
                      accounts.find((a) => a.id === selectedAccount)?.name
                    }`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      formatter={(value) => [
                        `$${Number(value).toFixed(2)}`,
                        "",
                      ]}
                      labelFormatter={formatDate}
                    />
                    <Legend />
                    {accountsToDisplay.map((account) => (
                      <Line
                        key={account.id}
                        type="monotone"
                        dataKey={account.name}
                        stroke={account.color}
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Alert */}
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Spending Insights</AlertTitle>
                <AlertDescription>
                  {selectedAccount === "all"
                    ? "This chart shows your daily expenses across all accounts for the past week."
                    : `This chart shows your daily expenses for the ${
                        accounts.find((a) => a.id === selectedAccount)?.name
                      } account for the past week.`}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions View */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                {selectedAccount === "all"
                  ? "Showing transactions from all accounts"
                  : `Showing transactions from ${
                      accounts.find((a) => a.id === selectedAccount)?.name || ""
                    }`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .slice(0, 10)
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          {transaction.type === "income" ? (
                            <div className="p-2 bg-green-100 rounded-full">
                              <ArrowUpCircle className="h-5 w-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-2 bg-red-100 rounded-full">
                              <ArrowDownCircle className="h-5 w-5 text-red-600" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(transaction.date)} •{" "}
                              {transaction.category} •{" "}
                              {
                                accounts.find(
                                  (a) => a.id === transaction.accountId
                                )?.name
                              }
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-bold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No transactions found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
