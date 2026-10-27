import { CASH_FLOWS } from "@/lib/constants";



export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(amount)
}


export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function isCashFlow(value: unknown): value is typeof CASH_FLOWS[number] {
    return (CASH_FLOWS as readonly unknown[]).includes(value);
}


export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}