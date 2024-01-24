
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './Config/AppRouter';

function App() {

  return (<>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
    {/* Same as */}
    <ToastContainer />

    <AppRouter />;
  </>
  )
}

export default App;
