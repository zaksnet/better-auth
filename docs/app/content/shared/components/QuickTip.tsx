import { PropsWithChildren } from "react";
import { Lightbulb, AlertTriangle, Info, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickTipProps extends PropsWithChildren {
  type?: "tip" | "warning" | "info" | "important";
  className?: string;
}

const tipVariants = {
  tip: {
    container: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    text: "text-blue-900 dark:text-blue-100",
    iconComponent: Lightbulb
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400", 
    text: "text-yellow-900 dark:text-yellow-100",
    iconComponent: AlertTriangle
  },
  info: {
    container: "bg-gray-50 border-gray-200 dark:bg-gray-950/30 dark:border-gray-800",
    icon: "text-gray-600 dark:text-gray-400",
    text: "text-gray-900 dark:text-gray-100", 
    iconComponent: Info
  },
  important: {
    container: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    text: "text-purple-900 dark:text-purple-100",
    iconComponent: Zap
  }
};

export function QuickTip({ type = "tip", className, children }: QuickTipProps) {
  const variant = tipVariants[type];
  const IconComponent = variant.iconComponent;

  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-md border text-sm mb-4",
      variant.container,
      className
    )}>
      <IconComponent className={cn("size-4 mt-0.5 flex-shrink-0", variant.icon)} />
      <div className={cn("flex-1", variant.text)}>
        {children}
      </div>
    </div>
  );
}