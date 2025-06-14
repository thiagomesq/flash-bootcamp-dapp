interface EthereumIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function EthereumIcon({ size = 24, className, color = "#627EEA" }: EthereumIconProps) {
  const svgStyle: React.CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    display: 'inline-block'
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={svgStyle}
    >
      <g>
        <path 
          d="M12 2L6 12.5L12 9.5L18 12.5L12 2Z" 
          fill={color} 
          fillOpacity="0.6"
        />
        <path 
          d="M12 22L6 12.5L12 15.5L18 12.5L12 22Z" 
          fill={color}
        />
        <path 
          d="M12 2L6 12.5L12 9.5V2Z" 
          fill={color} 
          fillOpacity="0.45"
        />
        <path 
          d="M12 15.5L18 12.5L12 22V15.5Z" 
          fill={color} 
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
}