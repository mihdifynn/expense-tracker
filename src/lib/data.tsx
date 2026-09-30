import type { AppData, Expense, Account, Loan } from "@/lib/types";

import { useState, useEffect, useContext, createContext } from "react";



interface DataContextType  {
  data: AppData;
  addAccount: (account: Account) => void;
  deleteAccount: (id: number) => void;
  editAccountName: (id: number, name: string) => void;
  addExpense: (expense: Expense) => void;
  addLoan: (loan: Loan) => void;
}


const DataContext = createContext<DataContextType | null>(null);



interface DataProviderProps {
  children: React.ReactNode;
}


export default function DataProvider(props: DataProviderProps) {

  const { children } = props;

  const [data, setData] = useState<AppData>(() => {
    const storedData = localStorage.getItem('expense-data');

    if (storedData) {
      return JSON.parse(storedData);
    }
    else return {
      expenses: [],
      accounts: [],
      loans: []
    };
  });

  const addAccount = (account: Account) => {
    setData(prev => ({
      ...prev,
      accounts: [...prev.accounts, account]
    }));
  }

  const deleteAccount = (id: number) => {
    setData(prev => ({
      ...prev,
      accounts: prev.accounts.filter(acc => acc.id !== id)
      // delete expenses from this account
    }))
  }

  const editAccountName = (id: number, name: string) => {
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

  const addLoan = (loan: Loan) => {
    setData(prev => ({
      ...prev,
      loans: [...prev.loans, loan]
    }));
  }

  const providerData: DataContextType = {
    data,
    addAccount,
    deleteAccount,
    editAccountName,
    addExpense,
    addLoan
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


export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}