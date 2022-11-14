import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { ConsignmentPage } from './page/consignment/consignment'
import { DonatePage } from './page/donate/donate'
import { MemberPage } from './page/member/member'
import { PropertyPage } from './page/property/property'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 error page</div>,
    children: [
      {
        path: 'consignment',
        element: <ConsignmentPage />,
      },
      {
        path: 'member',
        element: <MemberPage />,
      },
      {
        path: 'donate',
        element: <DonatePage />,
      },
      {
        path: 'property',
        element: <PropertyPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
