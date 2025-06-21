import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";


const useStockStore = create((set, get) => ({

    symbol: "",
    stockData: null,
   
    loading: false,
    error: "",

   

     // Set the stock symbol
    setSymbol: (newSymbol) => set({ symbol: newSymbol }),

    // Always fetch fresh data (no cache)
    fetchStockData: async () => {
        const symbol = get().symbol;
        if (!symbol) {
            set({ error: "No stock symbol selected." });
            return;
        }

        set({ loading: true, error: "", stockData: null });

        try {
            const response = await axios.get(`/stock/${symbol}?fresh=true`);
            set({ stockData: response.data });
        } catch (error) {
            console.error(error);
            set({
                error: err.response?.data?.error || "Something went wrong.",
            });
            toast.error(error.response.data.error || "Something Went Wrong");
        } finally {
            set({ loading: false });
        }
    },

    
}))

export default useStockStore;
