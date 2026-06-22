"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-0 right-0 z-[100] p-4 sm:p-6 md:p-8 flex flex-col gap-3 w-full sm:w-auto sm:min-w-[320px] sm:max-w-[420px] pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const config = {
              success: { icon: CheckCircle, color: 'text-[#2E7D32]', bg: 'bg-[#EBF5EB]', border: 'border-[rgba(46,125,50,0.15)]' },
              error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
              info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' }
            }[toast.type];
            const Icon = config.icon;

            return (
              <motion.div
                layout
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border bg-white ${config.border}`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`}>
                  <Icon size={20} />
                </div>
                <div className="ml-4 mr-6 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-[#1A2E1A] leading-relaxed">{toast.message}</p>
                </div>
                <button 
                  onClick={() => removeToast(toast.id)} 
                  className="shrink-0 text-[#78909C] hover:text-[#1A2E1A] transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
