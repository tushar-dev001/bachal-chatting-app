import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/HomeDesign/Home";
import Messege from './components/Message/Message'
import RootLayOut from "./components/RootLayOut/RootLayOut";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Registration />}></Route>
//       <Route path="/login" element={<Login />}></Route>
//       <Route path="/home" element={<Home />}></Route>
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "message",
        element: <Messege />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
