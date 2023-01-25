// Layouts
import { HeaderOnly } from '~/components/Layout';

// Pages
import Dashboard from '~/pages/Dashboard';
import Calendar from '~/pages/Calendar';
import Setting from '~/pages/Setting';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';

// Public routes
const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/calendar', component: Calendar },
    { path: '/setting', component: Setting },
    { path: '/user/:user_id', component: Profile },
    { path: '/search', component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
