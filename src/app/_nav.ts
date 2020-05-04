interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   title:false,
  //   name:'Manage'
  // },
  {
    name: 'Company',
    url: '/theme/company',
    icon: 'icon-info'
  },
  // {
  //  title:false,
  //  name:'Reports'
  // },
  {
    name: 'Trucks',
    url: '/theme/smssummary',
    icon: 'icon-info'
  },
  {
    name: 'Trailers',
    url: '/theme/smslogs',
    icon: 'icon-info'
  },
  {
    name:'Fuel Cards',
    url:'/theme/numberwise',
    icon: 'icon-info'
  },
  {
    name:'Customers',
    url:'/theme/dndrelease',
    icon:'icon-info'
  },
  {
    name: 'Factoring',
    url: '/theme/deliveryreports',
    icon: 'icon-info'
  },
  // {
  //   title: false,
  //   name: 'Accounts'
  // },
  {
    name: 'Dispatchers',
    url: '/theme/users',
    icon: 'icon-info'
  },
  {
    name: 'Drivers / OPRS',
    url: '/theme/reseller',
    icon: 'icon-info'
  },
  // {
  //   name: 'Sales',
  //   url: '/theme/purchases',
  //   icon: 'icon-note'
  // },
  // {
  //   name: 'Sales(Pendings)',
  //   url: '/theme/transsummary',
  //   icon: 'icon-puzzle'
  // },
  // {
  //   name: 'Payments',
  //   url: '/theme/payments',
  //   icon: 'icon-info'
  // },

  {
    divider: true
  },
];

export const salesNavItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   title: false,
  //   name: 'Sales'
  // },
 
  // {
  //   name: 'Sales',
  //   url: '/theme/salestransactions',
  //   icon: 'icon-note'
  // },
  // {
  //   name: 'Payments',
  //   url: '/theme/salespayments',
  //   icon: 'icon-info'
  // },
  // {
  //   name:'All Users',
  //   url:'/theme/salesallusers',
  //   icon: 'icon-info'
  // }
];
