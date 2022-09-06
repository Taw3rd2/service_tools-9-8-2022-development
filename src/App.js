import React, { lazy, Suspense, useState } from 'react'

import { useAuth } from './firebase/firestore.utils'

import { Routes, Route } from "react-router-dom";

import Topbar from './components/topbar/Topbar';
import Spinner from './components/spinner/Spinner';
import PrintDailySlips from './pages/print_daily_slips/PrintDailySlips.page';
import PrintOneSlip from './pages/print_daily_slips/PrintOneSlip';

//const GeneralLedger = lazy(() => import("./pages/accounting/GeneralLedger.page"))
const HomePage = lazy(() => import("./pages/homepage/HomePage.page"))
//const Invoice = lazy(() => import("./pages/invoice/Invoice.page"))
//const PartsCatalog = lazy(() => import("./pages/parts_catalog/PartsCatalog.page"))
const Schedule = lazy(() => import("./pages/schedule/Schedule.page"))
const Settings = lazy(() => import("./pages/settings/Settings.page"))
const SignIn = lazy(() => import("./pages/sign-in/SignIn"))

function App() {

  const currentUser = useAuth()

  const [user, setUser] = useState({currentUser})


  return (
    <div>
      <Topbar 
        currentUser={user}
        setUser={setUser}
      />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route 
          path="/"
          element= {<SignIn setUser={setUser}/>}
        />
        <Route 
          path="/homepage"
          element= {user ? <HomePage /> : <SignIn />}
        />
        <Route  
          path="/schedule"
          element = {user ? <Schedule /> : <SignIn />}
        />
        {/* <Route  
          path="/accounting"
          element = {currentUser ? <GeneralLedger /> : <SignIn />}
        /> 
                <Route  
          path="/parts_catalog"
          element = {currentUser ? <PartsCatalog /> : <SignIn />}
        />
        <Route  
          path="/invoice"
          element = {currentUser ? <Invoice /> :  <SignIn />}
  /> */}
        <Route  
          path="/settings"
          element = {user ? <Settings /> : <SignIn />}
        />
        <Route  
          path="/print_daily_slips/:state"
          element = {user ? <PrintDailySlips /> : <SignIn />}
        />
        <Route  
          path="/print_one_slip/:state"
          element = {user ? <PrintOneSlip /> : <SignIn />}
        />
        <Route 
          path='*' 
          element={
            <main style={{ padding: "1rem"}}>
              <p>Theres nothing here!</p>
            </main>
          }
        />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
