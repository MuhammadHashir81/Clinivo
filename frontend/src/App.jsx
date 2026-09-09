import { lazy,Suspense } from 'react'; 
import Home from '../Pages/Home/Home'
import { Routes, Route } from "react-router";
import { Oval } from 'react-loader-spinner'




const Patient = lazy(()=>import('../Pages/Patient/Patient'))
const Doctor = lazy(()=>import('../Pages/Doctor/Doctor'))
const Receptionist = lazy(()=>import('../Pages/Receptionist/Receptionist'))

// admin import 
const Admin = lazy(()=>import('../Pages/Admin/Admin'))
const AdminSignin = lazy(()=>import('../Pages/Admin/Pages/Signin'))
const AdminSignup = lazy(()=>import('../Pages/Admin/Pages/Signup'))
const Dashboard = lazy(()=> import('../Pages/Admin/Pages/Dashboard'))
const Doctors =  lazy(()=> import('../Pages/Admin/Pages/Doctors'))
const Receptionists = lazy(()=>import ('../Pages/Admin/Pages/Receptionists'))
const Appointments = lazy(()=>import ('../Pages/Admin/Pages/Appointments'))


// sign in - sign up
const SignIn = lazy( ()=>import('../Pages/Signin') )
const SignUp = lazy( ()=>import('../Pages/Signup') )

const App = () => {
  return (
    <div className=''>
      <Suspense
      fallback={
         <div className="flex items-center justify-center min-h-screen">
              <Oval
              height={40}
              width={40}
              />
          </div>
      }
      >

      <Routes>
        <Route path='/' element={<Home/>}/>

        
        <Route path='/patient' element={<Patient/>}/>
        <Route path='/doctor' element={<Doctor/>}/>
        <Route path='/receptionist' element={<Receptionist/>}/>

        {/* admin routes */}
        <Route path='/admin'  element={<Admin/>}>
        <Route path='dashboard' element={<Dashboard/>}/> 
        <Route path='doctors' element={<Doctors/>}/> 
        <Route path='receptionists' element={<Receptionists/>}/> 
        <Route path='appointments' element={<Appointments/>}/> 
        </Route>


          {/* login - signup */}

        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>

          {/* login - signup */}



      {/* admin signup - login  */}

        <Route path='/admin/sign-up' element={<AdminSignup/>}/> 
        <Route path='/admin/sign-in' element={<AdminSignin/>}/> 

      {/* admin signup - login  */}


              </Routes>
      </Suspense>

      
    </div>
  )
}

export default App
