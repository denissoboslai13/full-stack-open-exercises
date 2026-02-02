import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'

const queryClient = new QueryClient()
import { NotifContextProvider } from './NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifContextProvider>
      <App />
    </NotifContextProvider>
  </QueryClientProvider>
)