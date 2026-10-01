import type { DataContextType } from "@/lib/types";

import { createContext } from "react";



export const DataContext = createContext<DataContextType | null>(null);