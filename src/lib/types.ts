

export interface Account {
    id: string;
    name: string;
    startBalance: number;
}


interface BaseExpense {
    id: string;
    accountId: string;
    amount: number;
    date: string;
    description: string;
}

interface InOutExpense extends BaseExpense {
    flow: 'in' | 'out';
}

interface TransferExpense extends BaseExpense {
    flow: 'transfer';
    toAccountId: string;
}

export type Expense = InOutExpense | TransferExpense;


export interface Loan {
    id: string;
    name: string;
    notes: string;
    flow: 'in' | 'out';
    amount: number;
}


export interface AppData {
    expenses: Expense[];
    accounts: Account[];
    loans: Loan[];
    dailyBudget: number;
    savings: number;
    others: number;
}


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
    editLoan: (loan: Loan) => void;
    deleteLoan: (id: string) => void;
    editDailyBudget: (amount: number) => void;
    editSavings: (amount: number) => void;
    editOthers: (amount: number) => void;
}