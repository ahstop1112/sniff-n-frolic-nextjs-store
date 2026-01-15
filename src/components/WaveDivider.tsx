type WaveDividerProps = {
    height?: number;
    waveColor?: string;
    rippleColor?: string;
    bgColor?: string;
  };
  
const WaveDivider = ({
    height = 60,
    waveColor = "var(--wave-color)",
    rippleColor = "var(--wave-ripple)",
    bgColor = "var(--wave-bg)",
  }: WaveDividerProps) => {
    return (
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}
      >
        {/* background */}
        <rect width="1440" height="220" fill={bgColor} />
  
        {/* main wave */}
        <path
          d="M0,150 C160,110 320,190 480,150 C640,110 800,70 960,120 C1120,170 1280,140 1440,110 L1440,220 L0,220 Z"
          fill={waveColor}
        />
  
        {/* ripples */}
        <path
          d="M120,160 C200,140 260,145 330,158"
          fill="none"
          stroke={rippleColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M520,120 C620,95 710,110 790,125"
          fill="none"
          stroke={rippleColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M940,140 C1040,120 1140,135 1230,150"
          fill="none"
          stroke={rippleColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    );
  };
  
  export default WaveDivider;
  