import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'
//creating a query client instance for react query and setting the default options for queries to not refresh on window focus so that we don't have to worry about refreshing data when the user switches tabs or comes back to the app after being away for a while and we are aso setting the default options for queries to not retry on failure so that we can handle errors in our components and show appropriate error messages to the user instead of having react query automatically retrying the request and potentially causing more issues if the error is not resolved
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  }
})
//we are wrapping our app with the query client provider so that we can use react query in our app and we are also wrapping our app with the auth0 provider so that we can use auth0 in our app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <Toaster visibleToasts={1} position="top-right" richColors />
          <AppRoutes />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
