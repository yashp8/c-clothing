import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListner,
  createDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import setCurrentUser from './store/user/user.action';

function App() {
  const dispath = useDispatch();
  useEffect(() => {
    const authData = async () => {
      const unsuscribe = onAuthStateChangedListner((user) => {
        if (user) {
          createDocumentFromAuth(user);
        }
        dispath(setCurrentUser(user));
      });
      return unsuscribe;
    };
    authData().catch();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
