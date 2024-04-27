import { React, useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="toggle">
      <div style={hideWhenVisible}>
        <button className="blue-button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="blue-button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});
Togglable.displayName = 'Togglable';

export default Togglable;
