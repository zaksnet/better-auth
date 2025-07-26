"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  id: string;
  type?: "info" | "warning" | "success" | "error";
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  autoClose?: number; // milliseconds
}

const notificationVariants = {
  info: {
    container: "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800",
    title: "text-blue-900 dark:text-blue-100",
    content: "text-blue-800 dark:text-blue-200",
    closeButton: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/50 dark:border-yellow-800",
    title: "text-yellow-900 dark:text-yellow-100", 
    content: "text-yellow-800 dark:text-yellow-200",
    closeButton: "text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
  },
  success: {
    container: "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800",
    title: "text-green-900 dark:text-green-100",
    content: "text-green-800 dark:text-green-200", 
    closeButton: "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
  },
  error: {
    container: "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800",
    title: "text-red-900 dark:text-red-100",
    content: "text-red-800 dark:text-red-200",
    closeButton: "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
  }
};

export function Notification({ 
  id,
  type = "info",
  title,
  children,
  className,
  icon,
  dismissible = true,
  autoClose
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const variant = notificationVariants[type];

  useEffect(() => {
    // Auto close if specified
    if (autoClose) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "p-4 rounded-lg border shadow-sm mb-4 transition-all duration-200",
      variant.container,
      className
    )}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-lg mb-2", variant.title)}>
            {title}
          </h3>
          <div className={cn("text-sm", variant.content)}>
            {children}
          </div>
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 p-1 rounded-md transition-colors",
              variant.closeButton
            )}
            aria-label="Dismiss notification"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}