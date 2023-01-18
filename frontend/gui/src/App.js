import './App.css';
import 'antd/dist/reset.css'
import CustomLayout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom';
import BaseRoute from './routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import { useEffect } from 'react';
function App(props) {
  useEffect(() => {
    props.onTryAutoSingUp()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <CustomLayout {...props}> 
          <BaseRoute />
        </CustomLayout>
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = state => {
  return { isAuthenticated: state.token }
}
const mapDispatchToProps = dispatch => {
  return { onTryAutoSingUp: () => dispatch(actions.authCheckState()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
