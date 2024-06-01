export const Bold = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
  </svg>
);

export const Italic = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 4h-9M14 20H5M14.7 4.7L9.2 19.4" />
  </svg>
);

export const BulletList = ({ size = 16, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
    >
      <g
        id="🔍-Product-Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="ic_fluent_text_bullet_list_24_filled"
          fill={color}
          fillRule="nonzero"
        >
          <path
            d="M3.49941508,15.5005496 C4.32751917,15.5005496 4.99883017,16.1718606 4.99883017,16.9999647 C4.99883017,17.8280688 4.32751917,18.4993798 3.49941508,18.4993798 C2.671311,18.4993798 2,17.8280688 2,16.9999647 C2,16.1718606 2.671311,15.5005496 3.49941508,15.5005496 Z M7.50033615,15.9999647 L21.0034765,15.9999647 C21.5557612,15.9999647 22.0034765,16.44768 22.0034765,16.9999647 C22.0034765,17.5128006 21.6174363,17.9354719 21.1200976,17.993237 L21.0034765,17.9999647 L7.50033615,17.9999647 C6.9480514,17.9999647 6.50033615,17.5522495 6.50033615,16.9999647 C6.50033615,16.4871289 6.88637634,16.0644576 7.38371503,16.0066924 L7.50033615,15.9999647 L21.0034765,15.9999647 L7.50033615,15.9999647 Z M3.49941508,10.5005849 C4.32751917,10.5005849 4.99883017,11.1718959 4.99883017,12 C4.99883017,12.8281041 4.32751917,13.4994151 3.49941508,13.4994151 C2.671311,13.4994151 2,12.8281041 2,12 C2,11.1718959 2.671311,10.5005849 3.49941508,10.5005849 Z M7.50033615,11 L21.0034765,11 C21.5557612,11 22.0034765,11.4477153 22.0034765,12 C22.0034765,12.5128358 21.6174363,12.9355072 21.1200976,12.9932723 L21.0034765,13 L7.50033615,13 C6.9480514,13 6.50033615,12.5522847 6.50033615,12 C6.50033615,11.4871642 6.88637634,11.0644928 7.38371503,11.0067277 L7.50033615,11 L21.0034765,11 L7.50033615,11 Z M3.49941508,5.50702465 C4.32751917,5.50702465 4.99883017,6.17833565 4.99883017,7.00643973 C4.99883017,7.83454382 4.32751917,8.50585482 3.49941508,8.50585482 C2.671311,8.50585482 2,7.83454382 2,7.00643973 C2,6.17833565 2.671311,5.50702465 3.49941508,5.50702465 Z M7.50033615,6.00003528 L21.0034765,6.00003528 C21.5557612,6.00003528 22.0034765,6.44775053 22.0034765,7.00003528 C22.0034765,7.51287112 21.6174363,7.93554245 21.1200976,7.99330755 L21.0034765,8.00003528 L7.50033615,8.00003528 C6.9480514,8.00003528 6.50033615,7.55232003 6.50033615,7.00003528 C6.50033615,6.48719945 6.88637634,6.06452812 7.38371503,6.00676302 L7.50033615,6.00003528 L21.0034765,6.00003528 L7.50033615,6.00003528 Z"
            id="🎨-Color"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const OrderedList = ({ size = 16, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M9 4V13"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13H6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 27H6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 19.9999C6 19.9999 9 16.9999 11 20C13 23 6 27 6 27"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.00001 34.5001C6.00001 34.5001 8.00001 31.5 11 33.5C14 35.5 11 38 11 38C11 38 14 40.5 11 42.5C8 44.5 6 41.5 6 41.5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 38H9"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 4L6 6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 24H43"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 38H43"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10H43"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Favorite = ({
  size = 24,
  isLiked = false,
  onClick,
}: {
  size?: number;
  isLiked?: boolean;
  onClick: () => Promise<any>;
}) => {
  return isLiked ? (
    <svg
      onClick={onClick}
      className="favorite-liked"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
    </svg>
  ) : (
    <svg
      onClick={onClick}
      className="favorite"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
    </svg>
  );
};
