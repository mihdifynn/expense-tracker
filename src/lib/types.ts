export interface Account {
    id: string;
    name: string;
    startBalance: number;
}


export interface Expense {
    id: string;
    accountId: string;
    amount: number;
    description: string;
    date: string;
    flow: CashFlow;
}


export interface Loan {
    id: string;
}


export interface AppData {
    expenses: Expense[];
    accounts: Account[];
    loans: Loan[];
    dailyBudget: number;
    savings: number;
    others: number;
}


export type CashFlow = 'in' | 'out';


export interface DataContextType  {
    data: AppData;
    accountNameMap: Map<string, string>;
    addAccount: (account: Account) => void;
    deleteAccount: (id: string) => void;
    editAccountName: (id: string, name: string) => void;
    addExpense: (expense: Expense) => void;
    editExpense: (expense: Expense) => void;
    deleteExpense: (id: string) => void;
    addLoan: (loan: Loan) => void;
    editDailyBudget: (amount: number) => void;
    editSavings: (amount: number) => void;
    editOthers: (amount: number) => void;
}