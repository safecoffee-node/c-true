import { Separator } from "@base-ui/react";
import { Fragment, isValidElement, type PropsWithChildren } from "react";
import { Outlet, useLocation, useMatches } from "react-router";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { ModeToggle } from "./components/mode-toogle.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb.tsx";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar.tsx";
import { Skeleton } from "./components/ui/skeleton.tsx";

type BreadcrumbEntry = { name: string; path: string };

export function Layout({ children }: PropsWithChildren) {
  const page = useLocation();
  const href = useMatches();

  const breadcrumbTransform = (item: string): BreadcrumbEntry => {
    const match = href.find((p) => p.pathname.includes(item));
    return {
      name: item,
      path: match?.pathname ?? "/",
    };
  };

  const breadcrumbItems = page.pathname
    .split("/")
    .filter(Boolean)
    .map(breadcrumbTransform);

  const buildBreadcrumb = breadcrumbItems.flatMap((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    return isLast ? [item] : [item, <BreadcrumbSeparator />];
  });

  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex items-center justify-between gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {buildBreadcrumb.map((item, index) =>
                    isValidElement(item) ? (
                      <Fragment key={index}> {item} </Fragment>
                    ) : (
                      <BreadcrumbItem
                        key={(item as BreadcrumbEntry).name}
                        className="hidden md:block"
                      >
                        {pathname === (item as BreadcrumbEntry).path ? (
                          <BreadcrumbPage>
                            {(item as BreadcrumbEntry).name}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={(item as BreadcrumbEntry).path}>
                            {(item as BreadcrumbEntry).name}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    ),
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </div>
        </header>
        <div className="px-20 py-5">{children ?? <Outlet />}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function LayoutSkeleton() {
  return (
    <Layout>
      <div className="w-full  flex flex-col items-start space-y-6">
        <Skeleton className="w-77 h-9" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-50" />
      </div>
    </Layout>
  );
}
