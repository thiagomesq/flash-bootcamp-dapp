interface DevIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function DevIcon({ size = 24, className, color = "#10B981" }: DevIconProps) {
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
        {/* Terminal window */}
        <path 
          d="M3 6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6z" 
          fill="none" 
          stroke={color} 
          strokeWidth="2"
        />
        
        {/* Terminal header */}
        <path 
          d="M3 6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2H3V6z" 
          fill={color} 
          fillOpacity="0.2"
        />
        
        {/* Terminal dots */}
        <circle cx="6" cy="6" r="0.5" fill={color}/>
        <circle cx="8" cy="6" r="0.5" fill={color}/>
        <circle cx="10" cy="6" r="0.5" fill={color}/>
        
        {/* Code brackets */}
        <path 
          d="M8 12L6 14L8 16" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M16 12L18 14L16 16" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Code slash */}
        <path 
          d="M13 11L11 17" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}