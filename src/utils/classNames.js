export const classNames = (...classes) => {
  if (process.env.NODE_ENV === 'development') {
    classes.forEach(cls => {
      if (cls && typeof cls !== 'string' && typeof cls !== 'object') {
        console.warn(
          `Invalid className type provided to classNames: ${typeof cls}`
        );
      }
    });
  }
  return classes.filter(Boolean).join(' ');
};

export default classNames;