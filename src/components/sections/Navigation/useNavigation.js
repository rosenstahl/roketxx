import { useEffect } from 'react';

export const useNavigation = () => {
  useEffect(() => {
    const handleHover = (item, index, navItems, isEntering) => {
      // Hauptitem
      if (isEntering) {
        item.classList.add('hover');
      } else {
        item.classList.remove('hover');
      }

      // Geschwister-Elemente
      [-2, -1, 1, 2].forEach(offset => {
        const sibling = navItems[index + offset];
        if (sibling) {
          if (isEntering) {
            if (Math.abs(offset) === 1) {
              sibling.classList.add('sibling-close');
            } else {
              sibling.classList.add('sibling-far');
            }
          } else {
            sibling.classList.remove('sibling-close', 'sibling-far');
          }
        }
      });
    };

    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    
    const listeners = navItems.map((item, index) => {
      const enter = () => handleHover(item, index, navItems, true);
      const leave = () => handleHover(item, index, navItems, false);
      
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
      
      return { item, enter, leave };
    });

    // Cleanup
    return () => {
      listeners.forEach(({ item, enter, leave }) => {
        item.removeEventListener('mouseenter', enter);
        item.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
};