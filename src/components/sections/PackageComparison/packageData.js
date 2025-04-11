export const packageColors = {
  startup: '#FF7043',
  digital: '#007AFF',
  makeover: '#00B27A',
  growth: '#9C27B0'
};

export const packageIcons = {
  startup: 'Rocket',
  digital: 'Laptop',
  makeover: 'Paintbrush',
  growth: 'TrendingUp'
};

export const packages = [
  {
    id: 'startup',
    title: 'Startup All-in-One',
    idealFor: 'Ideal für Neugründungen und Entrepreneure',
    isPopular: true,
    color: packageColors.startup
  },
  {
    id: 'digital',
    title: 'Digital Transform',
    idealFor: 'Ideal für etablierte, aber analog arbeitende Unternehmen',
    isPopular: false,
    color: packageColors.digital
  },
  {
    id: 'makeover',
    title: 'Brand Makeover',
    idealFor: 'Ideal für Unternehmen in der Umbruchphase',
    isPopular: false,
    color: packageColors.makeover
  },
  {
    id: 'growth',
    title: 'Growth Paket',
    idealFor: 'Ideal für wachstumsorientierte Firmen',
    isPopular: false,
    color: packageColors.growth
  }
];

export const getPackageColor = (packageId) => packageColors[packageId];
export const getPackageIcon = (packageId) => packageIcons[packageId];