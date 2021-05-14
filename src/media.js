export const devices = {
  mobileSmall: "320px",
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopLarge: "1200px",
  desktop: "1440px",
  desktopLarge: "2560px",
}

export const breakpoints = {
  mobileSmall: `(min-width: ${devices.mobileSmall})`,
  mobile: `(min-width: ${devices.mobile})`,
  tablet: `(min-width: ${devices.tablet})`,
  laptop: `(min-width: ${devices.laptop})`,
  laptopLarge: `(min-width: ${devices.laptopLarge})`,
  desktop: `(min-width: ${devices.desktop})`,
  desktopLarge: `(min-width: ${devices.desktopLarge})`,
}
