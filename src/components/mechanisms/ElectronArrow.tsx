import { SVGArrow } from '@/types/mechanism';

interface ElectronArrowProps {
  arrow: SVGArrow;
  animationDelay?: number;
}

export default function ElectronArrow({ arrow, animationDelay = 0 }: ElectronArrowProps) {
  const { fromX, fromY, toX, toY, controlX, controlY, arrowType, color = '#60a5fa' } = arrow;

  const path = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
  const arrowheadId = `arrowhead-${arrow.id}`;
  const arrowheadHalfId = `arrowhead-half-${arrow.id}`;
  const delay = `${animationDelay}s`;

  if (arrowType === 'full') {
    return (
      <g>
        <defs>
          <marker
            id={arrowheadId}
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 9 3.5, 0 7"
              fill={color}
              className="arrowhead-animated"
              style={{ animationDelay: delay }}
            />
          </marker>
        </defs>
        {/* Glow effect */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={6}
          opacity={0.15}
          className="arrow-animated"
          style={{ animationDelay: delay }}
          strokeLinecap="round"
        />
        {/* Main arrow */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          markerEnd={`url(#${arrowheadId})`}
          className="arrow-animated"
          style={{ animationDelay: delay }}
          strokeLinecap="round"
        />
      </g>
    );
  }

  // Half arrowhead (radical)
  return (
    <g>
      <defs>
        <marker
          id={arrowheadHalfId}
          markerWidth="8"
          markerHeight="4"
          refX="7"
          refY="2"
          orient="auto"
        >
          <polygon
            points="0 0, 8 2, 0 2"
            fill={color}
            className="arrowhead-animated"
            style={{ animationDelay: delay }}
          />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        markerEnd={`url(#${arrowheadHalfId})`}
        className="arrow-animated"
        style={{ animationDelay: delay }}
        strokeLinecap="round"
      />
    </g>
  );
}
