import React from "react";

const GlassIcons = ({ items, className }) => {
  const renderIcon = (item) => {
    if (
      typeof item.icon === "string" &&
      (item.icon.startsWith("http") || item.icon.startsWith("/"))
    ) {
      return (
        <img
          src={item.icon}
          className="w-full h-full object-contain"
          style={{
            filter: `
              drop-shadow(0 0 10px rgba(167, 39, 255, 0.6))
              drop-shadow(0 0 20px rgba(167, 39, 255, 0.4))
              drop-shadow(0 0 30px rgba(167, 39, 255, 0.2))
            `,
          }}
        />
      );
    }
    return (
      <div
        className="w-[3.5em] h-[3.5em] flex items-center justify-center"
        style={{
          filter: `
            drop-shadow(0 0 10px rgba(167, 39, 255, 0.6))
            drop-shadow(0 0 20px rgba(167, 39, 255, 0.4))
            drop-shadow(0 0 30px rgba(167, 39, 255, 0.2))
          `,
          transform: "scale(1.5)",
        }}
      >
        {item.icon}
      </div>
    );
  };

  return (
    <div
      className={`grid gap-[3em] grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto py-[2em] overflow-visible ${
        className || ""
      }`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`relative bg-transparent outline-none w-[6em] h-[6em] [perspective:30em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
            item.customClass || ""
          }`}
        >
          {/* Back layer - smaller size */}
          <span
            className="absolute top-[15%] left-[15%] w-[70%] h-[70%] rounded-[1.5em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
            style={{
              background:
                "linear-gradient(145deg, hsl(283, 90%, 50%), hsl(268, 90%, 45%))",
            }}
          ></span>

          {/* Front layer - full size */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-[1.5em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2.5em)]"
            style={{
              boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <span
              className="m-auto w-[3.5em] h-[3.5em] flex items-center justify-center"
              aria-hidden="true"
            >
              {renderIcon(item)}
            </span>
          </span>
          {/* Label */}
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
