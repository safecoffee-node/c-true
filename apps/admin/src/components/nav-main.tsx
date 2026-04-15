import { type ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocation, useMatch } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: ReactElement;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            render={<SidebarMenuItem />}
            defaultOpen={pathname.startsWith(item.url)}
          >
            <SidebarMenuButton
              render={<a href={item.url} />}
              tooltip={item.title}
              isActive={pathname.startsWith(item.url)}
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>

            {item.items?.length ? (
              <>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuAction className="data-[state=open]:rotate-90" />
                  }
                >
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem
                        aria-current="page"
                        key={subItem.title}
                      >
                        <SidebarMenuSubButton
                          isActive={pathname === subItem.url}
                          render={<a href={subItem.url} />}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
