# Open Tender Theme Example

Current as of July 14, 2021, but meant to be a guide only. Please rely on the `theme` object that gets populated in the `config` reducer when the app initially loads for the definitive structure.

```json
{
  "bgColors": {
    "alert": "#f7e1fc",
    "dark": "#000000",
    "error": "#f7e1fc",
    "light": "#ffffff",
    "primary": "#fafafa",
    "secondary": "#ffffff",
    "success": "#e1faf3",
    "tertiary": "#f7e1fc",
    "transparent": "transparent"
  },
  "boldWeight": "600",
  "border": {
    "color": "#efefef",
    "radius": "0",
    "radiusSmall": "0",
    "width": "0"
  },
  "boxShadow": {
    "inset": "inset 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "outer": "0px 1px 3px -1px rgba(0, 0, 0, 0.3)"
  },
  "breakpoints": {
    "laptop": "1280px",
    "mobile": "480px",
    "narrow": "1024px",
    "tablet": "768px"
  },
  "buttons": {
    "colors": {
      "cart": {
        "bgColor": "#FF40DE",
        "borderColor": "#FF40DE",
        "color": "#ffffff"
      },
      "cartHover": {
        "bgColor": "#C93AE8",
        "borderColor": "#C93AE8",
        "color": "#ffffff"
      },
      "header": {
        "bgColor": "transparent",
        "borderColor": "transparent",
        "color": "#000000"
      },
      "headerHover": {
        "bgColor": "transparent",
        "borderColor": "transparent",
        "color": "#FF40DE"
      },
      "primary": {
        "bgColor": "#FF40DE",
        "borderColor": "#FF40DE",
        "color": "#ffffff"
      },
      "primaryHover": {
        "bgColor": "#C93AE8",
        "borderColor": "#C93AE8",
        "color": "#ffffff"
      },
      "secondary": {
        "bgColor": "#5a5aff",
        "borderColor": "#5a5aff",
        "color": "#ffffff"
      },
      "secondaryHover": {
        "bgColor": "#2d2d80",
        "borderColor": "#2d2d80",
        "color": "#ffffff"
      }
    },
    "sizes": {
      "big": {
        "borderRadius": "2.6rem",
        "borderWidth": "0",
        "family": "'Raleway', sans-serif",
        "fontSize": "1.8rem",
        "fontSmoothing": "antialiased",
        "letterSpacing": "0",
        "padding": "1.2rem 2.2rem 1.2rem",
        "textTransform": "none",
        "weight": "500"
      },
      "default": {
        "borderRadius": "2.2rem",
        "borderWidth": "0",
        "family": "'Raleway', sans-serif",
        "fontSize": "1.6rem",
        "fontSmoothing": "antialiased",
        "letterSpacing": "0",
        "padding": "1.1rem 2.0rem 1.1rem",
        "textTransform": "none",
        "weight": "500"
      },
      "header": {
        "borderRadius": "0.5rem",
        "borderWidth": "0",
        "family": "'Raleway', sans-serif",
        "fontSize": "1.4rem",
        "fontSmoothing": "antialiased",
        "letterSpacing": "0",
        "padding": "0.9rem 0 0.9rem",
        "textTransform": "none",
        "weight": "500"
      },
      "small": {
        "borderRadius": "2.0rem",
        "borderWidth": "0",
        "family": "'Raleway', sans-serif",
        "fontSize": "1.4rem",
        "fontSmoothing": "antialiased",
        "letterSpacing": "0",
        "padding": "1.0rem 1.7rem 1.0rem",
        "textTransform": "none",
        "weight": "500"
      }
    }
  },
  "colors": {
    "alert": "#C93AE8",
    "dark": "#000000",
    "error": "#C93AE8",
    "light": "#ffffff",
    "primary": "#000000",
    "secondary": "#222222",
    "success": "#1cb086",
    "title": "#000000"
  },
  "counts": {
    "alerts": {
      "bgColor": "#5a5aff",
      "borderColor": "#ffffff",
      "borderWidth": "0",
      "color": "#ffffff",
      "family": "'Roboto', sans-serif",
      "fontSize": "1.4rem",
      "fontSizeMobile": "1.2rem",
      "fontSmoothing": "antialiased",
      "paddingBottom": "0",
      "paddingTop": "0",
      "weight": "400"
    },
    "quantity": {
      "family": "'Roboto', sans-serif",
      "fontSize": "1.3rem",
      "fontSizeMobile": "1.2rem",
      "fontSmoothing": "antialiased",
      "paddingBottom": "0.1rem",
      "paddingTop": "0",
      "weight": "500"
    }
  },
  "favorite": {
    "iconSize": "1.5rem",
    "size": "3.4rem"
  },
  "fonts": {
    "body": {
      "color": "#222222",
      "family": "'Raleway', sans-serif",
      "fontSmoothing": "antialiased",
      "letterSpacing": "0",
      "textTransform": "none",
      "url": "https://demo.brandibble.co/static/fonts/brands/2/fonts.css",
      "weight": "500"
    },
    "headings": {
      "color": "#000000",
      "family": "'Raleway', serif",
      "fontSmoothing": "antialiased",
      "letterSpacing": "0",
      "textTransform": "none",
      "url": "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap",
      "weight": "700"
    },
    "preface": {
      "family": "'Raleway', sans-serif",
      "fontSize": "1.3rem",
      "fontSmoothing": "antialiased",
      "letterSpacing": "0.1rem",
      "textTransform": "uppercase",
      "weight": "500"
    },
    "sizes": {
      "big": "1.8rem",
      "giga": "13.2rem",
      "h1": "4.4rem",
      "h2": "3.2rem",
      "h3": "2.4rem",
      "h4": "2.2rem",
      "h5": "2.0rem",
      "h6": "1.8rem",
      "main": "1.6rem",
      "mega": "8.8rem",
      "small": "1.4rem",
      "tera": "17.6rem",
      "xBig": "2.4rem",
      "xSmall": "1.2rem"
    }
  },
  "header": {
    "primary": "#ffffff",
    "stuck": "#ffffff"
  },
  "inputs": {
    "bgColor": "#ffffff",
    "bgColorFocus": "#fbf0fd",
    "borderColor": "#ffffff",
    "borderColorFocus": "#fbf0fd",
    "borderWidth": "0",
    "boxShadow": "inset 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
    "color": "#000000",
    "colorFocus": "#000000",
    "family": "'Raleway', sans-serif",
    "fontSize": "1.5rem",
    "fontSmoothing": "antialiased",
    "letterSpacing": "0",
    "lineHeight": "1.10",
    "padding": "1.2rem 1.4rem",
    "placeholderColor": "#999999",
    "radius": "0",
    "textTransform": "none",
    "weight": "400"
  },
  "layout": {
    "containerMaxWidth": "128.0rem",
    "margin": "6.0rem",
    "marginMobile": "3.0rem",
    "maxWidth": "76.8rem",
    "navHeight": "7.2rem",
    "navHeightMobile": "6.0rem",
    "padding": "3.0rem",
    "paddingMobile": "2.0rem"
  },
  "lineHeight": "1.45",
  "links": {
    "dark": {
      "color": "#000000",
      "hover": "#FF40DE"
    },
    "light": {
      "color": "#ffffff",
      "hover": "#FF40DE"
    },
    "primary": {
      "color": "#FF40DE",
      "hover": "#5a5aff"
    },
    "textDecoration": "none",
    "transition": "all 0.150s ease"
  },
  "overlay": {
    "alert": "rgba(239, 35, 60, 0.75)",
    "dark": "rgba(0, 0, 0, 0.60)",
    "light": "rgba(255, 255, 255, 0.50)"
  }
}
```
