import { FC } from "react";

interface AppExternalURLIconProps {
  theme: {
    lineColor: string;
  };
}

const AppExternalURLIcon: FC<AppExternalURLIconProps> = ({
  theme: { lineColor },
}) => {
  console.log("LINE COLOR: ", lineColor);
  return (
    <svg
      width="10px"
      height="10px"
      viewBox="-2.56 -2.56 69.12 69.12"
      // governs line width
      stroke-width="3.108"
      // governs color of the icon
      stroke={lineColor}
      // stroke="blue"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path d="M55.4,32V53.58a1.81,1.81,0,0,1-1.82,1.82H10.42A1.81,1.81,0,0,1,8.6,53.58V10.42A1.81,1.81,0,0,1,10.42,8.6H32" />

        <polyline points="40.32 8.6 55.4 8.6 55.4 24.18" />

        <line x1="19.32" y1="45.72" x2="54.61" y2="8.91" />
      </g>
    </svg>
  );
};

export default AppExternalURLIcon;
