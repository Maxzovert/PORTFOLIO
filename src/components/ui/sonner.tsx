import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { useEffect, useState } from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme when available (handles "system" theme), otherwise use theme directly
  const toastTheme = mounted 
    ? (resolvedTheme || theme || "dark") as ToasterProps["theme"]
    : ("dark" as ToasterProps["theme"]);

  return (
    <Sonner
      theme={toastTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:bg-green group-[.toast]:text-green-foreground group-[.toast]:border-green",
          error: "group-[.toast]:bg-red group-[.toast]:text-red-foreground group-[.toast]:border-red",
          info: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          warning: "group-[.toast]:bg-accent group-[.toast]:text-accent-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
