window.tailwind.config = {
  theme: {
    colors: {
      white: '#FFFFFF',
      primary: {
        50: '#ffffff',
        100: '#f7f8fa',
        200: '#f1f3f6',
        300: '#e7ebf0',
        400: '#d5dbe3',
        500: '#8b97a6',
        600: '#1c2430',
        700: '#151b24',
        800: '#10161d',
        900: '#0b1016',
      },

      dark: {
        25:'#f7f8fa',
        50: '#eef1f4',
        100: '#9aa3af',
        200: '#5c6775',
        300: '#3d4654',
        400: '#64748b',
        500: '#1c2430',
        600: '#0b1016',
      },

      secondary: {
        50: '#ffffff',
        100: '#f7f8fa',
        200: '#eef1f4',
        300: '#e2e8f0',
        400: '#d5dbe3',
        500: '#8b97a6',
        600: '#1c2430',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      success: {
        light: "#86efac",
        DEFAULT: "#22c55e",
        dark: "#15803d",
      },
      warning: {
        light: "#fde68a",
        DEFAULT: "#f59e0b",
        dark: "#b45309",
      },
      danger: {
        light: "#fca5a5",
        DEFAULT: "#ef4444",
        dark: "#b91c1c",
      },
    },
    extend: {
      boxShadow: {
        card: "0px 0px 10px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        18: "4.5rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      height: {
        "screen-50": "50vh",
        "screen-75": "75vh",
      },
    },
  },
};
