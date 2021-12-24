import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';


import App from './App.vue';
import TeamsList from './pages/TeamsList';
import UsersList from './pages/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter';
import UsersFooter from './pages/UsersFooter';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams',
            path: '/teams',
            meta: { needsAuth: true },
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users',
            components: { default: UsersList, footer: UsersFooter }
        },

        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active-link',
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    }
});

router.beforeEach(function(to, from, next) {
    console.log('Global beforeEach')
    console.log(to, from);

    if (to.meta.needsAuth) {
        console.log('Needs auth!');
        next()
    } else {
        next()
    }
    // if (to.name === 'team-members') {
    //     next()
    // } else {
    //     next({ name: 'team-members', params: { teamId: 't2' } });
    // }
    next();
})

router.afterEach(function(to, from) {
    // sending analytics data
    console.log('Global afterEach');
    console.log(to, from);
});

const app = createApp(App)

app.use(router);

app.mount('#app');