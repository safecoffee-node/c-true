import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { TooltipProvider } from "./ui/tooltip.tsx";
import { SidebarProvider } from "./ui/sidebar.tsx";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}
