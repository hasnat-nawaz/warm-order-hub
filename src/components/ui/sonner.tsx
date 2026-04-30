import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Site-themed toast styling — warm card surfaces, rounded-2xl pills.
 *
 * We override sonner's default rectangular look with our own classes so
 * confirmation/error popups feel native to the rest of the brand.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:rounded-2xl group-[.toaster]:shadow-card group-[.toaster]:font-medium",
          title: "group-[.toast]:font-semibold",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
          closeButton: "group-[.toast]:rounded-full",
          success:
            "group-[.toaster]:bg-success/15 group-[.toaster]:text-success-foreground group-[.toaster]:border-success/40",
          error:
            "group-[.toaster]:bg-destructive/10 group-[.toaster]:text-destructive group-[.toaster]:border-destructive/40",
          info: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border",
          warning:
            "group-[.toaster]:bg-warning/30 group-[.toaster]:text-warning-foreground group-[.toaster]:border-warning/40",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
