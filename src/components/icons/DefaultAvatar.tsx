interface DefaultAvatarProps {
  size?: number;
  className?: string;
  address?: string;
}

export function DefaultAvatar({ size = 40, className, address }: DefaultAvatarProps) {
  // Gera cores para gradiente baseado no endereço
  const getGradientFromAddress = (addr?: string) => {
    if (!addr) return { from: '#6B7280', to: '#4B5563' };
    
    const gradients = [
      { from: '#EF4444', to: '#DC2626' }, // Red
      { from: '#F97316', to: '#EA580C' }, // Orange
      { from: '#F59E0B', to: '#D97706' }, // Amber
      { from: '#22C55E', to: '#16A34A' }, // Green
      { from: '#06B6D4', to: '#0891B2' }, // Cyan
      { from: '#3B82F6', to: '#2563EB' }, // Blue
      { from: '#8B5CF6', to: '#7C3AED' }, // Violet
      { from: '#EC4899', to: '#DB2777' }, // Pink
    ];
    
    const hash = addr.slice(2, 8);
    const index = parseInt(hash, 16) % gradients.length;
    return gradients[index];
  };

  const gradient = getGradientFromAddress(address);
  const gradientId = `gradient-${address?.slice(2, 8) || 'default'}`;
  
  const svgStyle: React.CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    display: 'inline-block'
  };

  return (
    <svg 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={svgStyle}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      
      {/* Background circle with gradient */}
      <circle 
        cx="20" 
        cy="20" 
        r="20" 
        fill={`url(#${gradientId})`}
      />
      
      {/* Person silhouette */}
      <g>
        {/* Head */}
        <circle 
          cx="20" 
          cy="15" 
          r="5.5" 
          fill="white" 
          fillOpacity="0.9"
        />
        
        {/* Body */}
        <path 
          d="M9 32c0-6.1 4.9-11 11-11s11 4.9 11 11v8H9v-8z" 
          fill="white" 
          fillOpacity="0.9"
        />
      </g>
      
      {/* Subtle inner border */}
      <circle 
        cx="20" 
        cy="20" 
        r="19" 
        fill="none" 
        stroke="white" 
        strokeWidth="1" 
        strokeOpacity="0.2"
      />
    </svg>
  );
}