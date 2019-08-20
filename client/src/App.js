import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from "./actions/userActions";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
////
import AsyncComponent from './AsyncComponent ';
import PrivateRouter from './component/commont/PrivateRoute';
import Navbar from './component/header/header';
import store from './store';
import Slideshow from './component/post/listproduct/ImageSlideShow';
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  
    // Redirect to login
    window.location.href = '/';
  }
}
const AsyncSignIn=AsyncComponent(()=>{
  return import('./component/user/signin/signin');
})
const AsyncLogin    = AsyncComponent(() => {
  return import('./component/user/login/login');
});
const AsyncListPost=AsyncComponent(()=>{
  return import('./component/post/Listpost/Listpost');
})
const AsyncNewPost=AsyncComponent(()=>{
  return import('./component/post/newpost/newpost');
})
const AsyncHome=AsyncComponent(()=>{
  return import('./component/home/home');
})
const AsyncEditPost=AsyncComponent(()=>{
  return import('./component/post/editpost/editpost.1');
})
const AsyncDashboar=AsyncComponent(()=>{
  return import('./component/dashboar/profile/profile');
})
const AsyncUpdateImage=AsyncComponent(()=>{
return import('./component/dashboar/UpdateImage');
})
const AsyncUpdateProfile=AsyncComponent(()=>{
  return import('./component/dashboar/updateuser/Updateuser');
})
const AsyncListProduct=AsyncComponent(()=>{
  return import('./component/post/listproduct/listProduct');
})
const  App=()=> {
 
  return (
    <Provider store={store}>
    <Router>
    <Navbar/>
    <div className="App">
    <Route path='/' exact component={AsyncHome}></Route>
  
    <div className='container'>
    <Route path='/SignIn' exact component={AsyncSignIn}></Route>
     <Route path='/Login'  exact component={AsyncLogin}></Route>
     <Route path='/NewPost' exact  component={AsyncNewPost}></Route>
     <Route path='/Slideshow' exact component={Slideshow}></Route>
     <Switch>
       <PrivateRouter path='/ListPost' exact component={AsyncListPost}/>
     </Switch>
     <Route ></Route>
     {/* <Route path='/Modal' exact component={Modal}></Route> */}
     <Route path='/EditPost/:id' component={AsyncEditPost}></Route>
     <Route path='/Dashboar/:id' exact component={AsyncDashboar}/>
     <Route path='/UpdateImage/:id' exact component={AsyncUpdateImage}/>
     <Route path='/UpdateProfile/:id' exact component={AsyncUpdateProfile}/>
     <Route path='/ListProduct' exact component={AsyncListProduct}></Route>
    </div>
     
     </div>
    </Router>
    
  </Provider>
  );
}

export default App;
