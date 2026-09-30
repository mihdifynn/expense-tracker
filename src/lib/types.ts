export interface Account {
    id: number;
    name: string;
    startBalance: number;
}


export interface Expense {

}


export interface Loan {

}


export interface AppData {
    expenses: Expense[];
    accounts: Account[];
    loans: Loan[];
}