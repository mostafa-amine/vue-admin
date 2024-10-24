export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'Users Management',
    to: '/users',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'Users',
        to: '/users',
      },
    ],
  },
]
