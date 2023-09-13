import { PrivateLayout } from "@/components/private-layout";
import Home from "@/pages/home";
import { Receive } from "@/pages/private/receive";
import { Send } from "@/pages/private/send";
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
            <Send />
          </PrivateLayout>
        ),
      },
      {
        path: "/private/receive",
        element: (
          <PrivateLayout>
            <Receive />
          </PrivateLayout>
        ),
      },
    ],
  },
]);
