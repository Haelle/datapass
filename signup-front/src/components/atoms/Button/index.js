import React from 'react';

const Button = ({
  href,
  onClick,
  outline = false,
  large = false,
  type,
  icon,
  iconRight = false,
  children,
  className = '',
  ...props
}) => {
  className += ' fr-btn';

  if (!large) {
    className += ' fr-btn--sm';
  }

  if (outline) {
    className += ' fr-btn--secondary';
  }

  if (type) {
    className += ` fr-background-flat--${type} fr-text-inverted--${type}`;
  }

  if (icon) {
    className += ` fr-fi-${icon}-line`;
  }

  if (icon && children) {
    className += iconRight ? ' fr-btn--icon-right' : ' fr-btn--icon-left';
  }

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className={className} {...props}>
        {children}
      </button>
    );
  }
  if (type === 'submit') {
    return (
      <button type={type} className={className} {...props}>
        {children}
      </button>
    );
  }
  throw new Error("Please specify either 'href', 'onClick' or 'type' props");
};

export default Button;
