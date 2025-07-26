import { PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";

const calloutVariants = cva(
  "mb-8 flex gap-3 rounded-md border p-4",
  {
    variants: {
      variant: {
        default: "bg-muted/50 border-border",
        info: "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800",
        warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/50 dark:border-yellow-800",
        success: "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800",
        error: "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconVariants = cva("flex-shrink-0 mt-0.5", {
  variants: {
    variant: {
      default: "text-primary",
      info: "text-blue-600 dark:text-blue-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      success: "text-green-600 dark:text-green-400",
      error: "text-red-600 dark:text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const textVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      info: "text-blue-900 dark:text-blue-100",
      warning: "text-yellow-900 dark:text-yellow-100",
      success: "text-green-900 dark:text-green-100",
      error: "text-red-900 dark:text-red-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CalloutProps extends PropsWithChildren, VariantProps<typeof calloutVariants> {
  className?: string;
  title?: string;
}

const getIcon = (variant: string | null | undefined) => {
  switch (variant) {
    case "info":
      return <Info className="size-5" />;
    case "warning":
      return <AlertTriangle className="size-5" />;
    case "success":
      return <CheckCircle className="size-5" />;
    case "error":
      return <XCircle className="size-5" />;
    default:
      return <Lightbulb className="size-5" />;
  }
};

export const Callout = ({
  className,
  variant,
  title,
  children,
}: CalloutProps) => (
  <div className={calloutVariants({ variant, className })}>
    <div className={iconVariants({ variant })}>
      {getIcon(variant)}
    </div>
    <div className="min-w-0 flex-1">
      {title && (
        <p className={`font-semibold mb-2 ${textVariants({ variant })}`}>
          {title}
        </p>
      )}
      <div className={textVariants({ variant })}>
        {children}
      </div>
    </div>
  </div>
);