import { PrivateLayout } from "@/components/private-layout";
import Home from "@/pages/home";
import { Private } from "@/pages/private";
import { Root } from "@/pages/root";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/private",
        element: (
          <PrivateLayout>
            <Private />
          </PrivateLayout>
        ),
      },
    ],
  },
]);
