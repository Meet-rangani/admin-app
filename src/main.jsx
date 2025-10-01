import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Authcontext } from './context.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Authcontext>
      <App />
    </Authcontext>
  </BrowserRouter>,
)
