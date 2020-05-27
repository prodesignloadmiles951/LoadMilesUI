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
  {
    name: 'Company',
    url: '/theme/company',
    icon: 'icon-info'
  },
  {
    name: 'Trucks',
    url: '/theme/trucks',
    icon: 'icon-info'
  },
  {
    name: 'Trailers',
    url: '/theme/trailers',
    icon: 'icon-info'
  },
  {
    name: 'Driver',
    url: '/theme/driver',
    icon: 'icon-info'
  },
  {
    name: 'Carrier',
    url: '/theme/carrier',
    icon: 'icon-info'
  },
  {
    name: 'Customers',
    url: '/theme/customers',
    icon: 'icon-info'
  },
  {
    name: 'Dispatcher',
    url: '/theme/dispatcher',
    icon: 'icon-info'
  },
  {
    name: 'Vendor',
    url: '/theme/vendor',
    icon: 'icon-info'
  },
  {
    name: 'Factor',
    url: '/theme/factor',
    icon: 'icon-info'
  },
  {
    name: 'Fuel Card',
    url: '/theme/fuelcard',
    icon: 'icon-info'
  },
  {
    name: 'Accident',
    url: '/theme/accident',
    icon: 'icon-info'
  },
  {
    name: 'Map (Trucks/Drivers)',
    url: '/theme/map',
    icon: 'icon-info'
  },
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
];
