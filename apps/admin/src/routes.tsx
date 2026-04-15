import {
  createBrowserRouter,
  useRouteError,
  type RouteObject,
} from "react-router";
import { Layout, LayoutSkeleton } from "./layout.tsx";
import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

function ErrorBoundary() {
  const error = useRouteError() as { message: string };
  return <div> {error?.message} </div>;
}

type AppRoute = {
  Component?: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
  fallback?: ComponentType<{}> | null;
  children?: AppRoute[];
} & Omit<RouteObject, "Component" | "children">;

export const routes = [
  {
    path: "/",
    Component: Layout,
    fallback: LayoutSkeleton,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "/quotes",
        children: [
          {
            index: true,
            Component: lazy(() =>
              import("./pages/quotes/quotes.tsx").then((r) => ({
                default: r.default,
              })),
            ),
          },
          {
            path: "collections",
            Component: lazy(() =>
              import("./pages/quotes/collections.tsx").then((r) => ({
                default: r.default,
              })),
            ),
          },
          {
            path: "planning",
            Component: lazy(() =>
              import("./pages/quotes/planning.tsx").then((r) => ({
                default: r.default,
              })),
            ),
          },
        ],
      },
    ],
  },
] satisfies AppRoute[];

const routerTranformer = ({
  fallback: FalllbackComponent,
  ...route
}: AppRoute): RouteObject => {
  let result = { ...route };
  if (FalllbackComponent) {
    result = {
      ...result,
      Component: (props: any) => {
        return (
          <Suspense fallback={<FalllbackComponent />}>
            {route.Component && <route.Component {...props} />}
          </Suspense>
        );
      },
    };
  }

  return {
    ...result,
    children: route.children?.map(routerTranformer),
  } as RouteObject;
};

export const router = createBrowserRouter(routes.map(routerTranformer));
