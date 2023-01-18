import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Singup from './components/Singup';
import ArticleDetail from './containers/ArticleListDetailView';
import ArticleList from './containers/ArticleListView';
const BaseRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ArticleList />} />
                <Route path='/:id' element={<ArticleDetail />} />
                <Route path='/login/' element={<Login />} />
                <Route path='/singup/' element={<Singup />} />
            </Routes>
        </div>
    )
}
export default BaseRoute;