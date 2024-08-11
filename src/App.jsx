import { BrowserRouter,Navigate, Routes,Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Account from "./pages/Account"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Settings from "./pages/Settings"
import NewUsers from "./pages/Users"
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import Booking from "./pages/Booking"
import CheckIn from "./pages/CheckIn"
import ProtectedRoute from "./ui/ProtectedRoute"
import { DarkModeProvider } from "./context/DarkModeContext"
import SignUp from "./pages/SignUp"

const queryClient =new QueryClient({defaultOptions:{
  // queries:{staleTime:60*100,}
  queries:{
    staleTime:0, 
  }
}})

function App() {
  return (
    <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyles/>
    <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute> <AppLayout/></ProtectedRoute>} >
      <Route path="/" element={ <Navigate replace to='dashboard'  />} />
      <Route path="dashboard" element={ <Dashboard/>} />
      <Route path="bookings" element={ <Bookings/>} />
      <Route path="bookings/:bookingId" element={ <Booking/>} />
      <Route path="checkin/:bookingId" element={ <CheckIn/>} />
      <Route path="cabins" element={ <Cabins/>} />
      <Route path="account" element={ <Account/>} />
      <Route path="setting" element={ <Settings/>} />
      <Route path="user" element={ <NewUsers/>} />
      </Route>
      <Route path="login" element={ <Login/>} />
      <Route path="signup" element={ <SignUp/>} />
      <Route path="*" element={ <PageNotFound/>} />

    </Routes>
    </BrowserRouter>
    <Toaster 
    position="top-center"
    guttter={12}
    countainerStyle={{margin:'8px'}}
    toastOptions={
      {
        success:{
          duration:3000
        },
        error:{
          duration:5000
        },
        style:{
          fontSize:'16px',
          maxWidth:'500px',
          padding:'16px 24px',
          backgroundColor:'var(--color-grey-0)',
          color:'var(--color-grey-700)'

        }
      }
    }

    />
    </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
