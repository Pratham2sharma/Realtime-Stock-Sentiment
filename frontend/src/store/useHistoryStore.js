import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const useHistoryStore = create((set , get) => ({
     
     historyData: [],
     loading: false,
     error: null,


     fetchHistory: async (symbol) => {
        set({loading: true , error: null});
        try {
            const res = await axios.get(`/stock/history/${symbol}`);
            set({historyData: res.data.history, loading:false});
        } catch (error) {
            set({error: error.message || "Something went Wrong in Fetching History"});
            toast.error(error.res?.data?.error || `No History For ${symbol} currently `);
        }
     }
}));

export default useHistoryStore;