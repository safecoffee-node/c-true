import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "./ui/tooltip.tsx";
import { useEffect, useState } from "react";
import { actions } from "astro:actions";

export default function Dashboard() {
  const [quotes, setQuotes] = useState<any>();

  useEffect(() => {
    actions.quotesAction.getAllQuotes().then((r) => setQuotes(r.data));
  }, []);

  console.log(quotes);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Build Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4  pt-0 lg:px-[5rem]">
            <div className=" grid grid-cols-3 gap-3">
              {quotes &&
                quotes.map((q) => (
                  <div className="flex flex-col gap-1 px-2 py-5 border border-secondary rounded bg-secondary/40 hover:bg-secondary hover:cursor-pointer transition">
                    <span className="font-mono text-sm"> {q.nationalite} </span>
                    <h5 className=" font-medium font-serif">{q.author} </h5>
                    <p className="font-serif text-sm">{q.body}</p>
                    <span className="text-sm"> {q.topics.name} </span>
                  </div>
                ))}
            </div>

            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
