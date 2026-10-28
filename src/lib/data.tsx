import type { DataContextType, Expense, Account, Loan, AppData } from "@/lib/types";

import { useState, useEffect, useMemo } from "react";
import { DataContext } from "@/lib/data-context";
import { deleteOldExpenses } from "@/lib/functions";





interface DataProviderProps {
  children: React.ReactNode;
}


const defaultData: AppData = {
  expenses: [],
  accounts: [],
  loans: [],
  dailyBudget: 0,
  savings: 0,
  others: 0
};


export default function DataProvider(props: DataProviderProps) {

  const { children } = props;

  const [data, setData] = useState<AppData>(() => {
    
    try {

      const storedData = localStorage.getItem('expense-data');

      if (storedData) {
        const data = JSON.parse(storedData);

        return deleteOldExpenses({ ...defaultData, ...data})
      }
      else return defaultData
    }
    catch {
      return defaultData
    }
  });

  const editDailyBudget = (amount: number) => {
    setData(prev => ({
      ...prev,
      dailyBudget: amount
    }))
  }

  const editSavings = (amount: number) => {
    setData(prev => ({
      ...prev,
      savings: amount
    }))
  }

  const editOthers = (amount: number) => {
    setData(prev => ({
      ...prev,
      others: amount
    }))
  }

  const addAccount = (account: Account) => {
    setData(prev => ({
      ...prev,
      accounts: [...prev.accounts, account]
    }));
  }

  const deleteAccount = (id: string) => {
    setData(prev => ({
      ...prev,
      accounts: prev.accounts.filter(acc => acc.id !== id),
      expenses: prev.expenses.filter(exp => exp.accountId !== id)
    }))
  }

  const editAccountName = (id: string, name: string) => {
    setData(prev => ({
      ...prev,
      accounts: prev.accounts.map(acc => {
        return acc.id === id
        ? { ...acc, name }
        : acc
      })
    }))
  }

  const addExpense = (expense: Expense) => {
    setData(prev => ({
      ...prev,
      expenses: [...prev.expenses, expense]
    }));
  }

  const editExpense = (expense: Expense) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.map(exp => {
        return exp.id === expense.id
        ? expense
        : exp
      })
    }));
  }

  const deleteExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(exp => exp.id !== id)
    }));
  }

  const addLoan = (loan: Loan) => {
    setData(prev => ({
      ...prev,
      loans: [...prev.loans, loan]
    }));
  }

  const editLoan = (loan: Loan) => {
    setData(prev => ({
      ...prev,
      loans: prev.loans.map(ln => {
        return loan.id === ln.id
        ? loan
        : ln
      })
    }))
  }

  const deleteLoan = (id: string) => {
    setData(prev => ({
      ...prev,
      loans: prev.loans.filter(ln => ln.id !== id)
    }))
  }

  const accountNameMap = useMemo(() => {
    return new Map(data.accounts.map(acc => [acc.id, acc.name]));
  }, [data.accounts]);

  const providerData: DataContextType = {
    data,
    accountNameMap,
    addAccount,
    deleteAccount,
    editAccountName,
    addExpense,
    editExpense,
    deleteExpense,
    addLoan,
    editLoan,
    deleteLoan,
    editDailyBudget,
    editSavings,
    editOthers
  };

  useEffect(() => {
    localStorage.setItem('expense-data', JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={providerData}>
      {children}
    </DataContext.Provider>
  );
}