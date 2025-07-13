
import React from 'react';

const SideNavButton = () => {
  return (
    <div
      className="fixed right-0 top-0 h-full w-1.5 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div className="h-full w-full bg-gradient-to-b from-accent/0 via-accent/70 to-accent/0"></div>
    </div>
  );
};

export default SideNavButton;