interface PolygonIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function PolygonIcon({ size = 24, className, color = "#8247E5" }: PolygonIconProps) {
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
          d="M15.5 7.5C15.8 7.3 16.2 7.3 16.5 7.5L19.5 9.5C19.8 9.7 20 10.1 20 10.5V14.5C20 14.9 19.8 15.3 19.5 15.5L16.5 17.5C16.2 17.7 15.8 17.7 15.5 17.5L12.5 15.5C12.2 15.3 12 14.9 12 14.5V10.5C12 10.1 12.2 9.7 12.5 9.5L15.5 7.5Z" 
          fill={color}
        />
        
        <path 
          d="M7.5 4.5C7.8 4.3 8.2 4.3 8.5 4.5L11.5 6.5C11.8 6.7 12 7.1 12 7.5V11.5C12 11.9 11.8 12.3 11.5 12.5L8.5 14.5C8.2 14.7 7.8 14.7 7.5 14.5L4.5 12.5C4.2 12.3 4 11.9 4 11.5V7.5C4 7.1 4.2 6.7 4.5 6.5L7.5 4.5Z" 
          fill={color} 
          fillOpacity="0.7"
        />
        
        <path 
          d="M7.5 9.5C7.8 9.3 8.2 9.3 8.5 9.5L11.5 11.5C11.8 11.7 12 12.1 12 12.5V16.5C12 16.9 11.8 17.3 11.5 17.5L8.5 19.5C8.2 19.7 7.8 19.7 7.5 19.5L4.5 17.5C4.2 17.3 4 16.9 4 16.5V12.5C4 12.1 4.2 11.7 4.5 11.5L7.5 9.5Z" 
          fill={color} 
          fillOpacity="0.7"
        />
      </g>
    </svg>
  );
}