import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  

  &, &.light-mode {
    /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #EEF8FF;
  --color-grey-200: #DEF1FF;
  --color-grey-300: #CEE8FF;
  --color-grey-400: #C2DFFF;
  --color-grey-500: #AED2FF;
  --color-grey-600: #7FA3DB;
  --color-grey-700: #5779B7;
  --color-grey-800: #375493;
  --color-grey-900: #21387A;

  --color-blue-100: #CEE8FA;
  --color-blue-700: #0A2D75;
  --color-green-100: #C4F5CC;
  --color-green-700: #002F24;
  --color-yellow-100: #FFF5CC;
  --color-yellow-700: #B77300;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #F5CCFF;
  --color-indigo-700: #5500B7;

  --color-red-100: #FFE5D4;
  --color-red-700: #B71525;
  --color-red-800: #930D26;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --image-grayscale: 0;
  --image-opacity: 100%;
  }

  

  &.dark-mode {
    --color-grey-0: #0B002C;
    --color-grey-50: #0F0035;
    --color-grey-100: #160042;
    --color-grey-200: #1E004F;
    --color-grey-300: #27005D;
    --color-grey-400: #5E279D;
    --color-grey-500: #9152CE;
    --color-grey-600: #C38FEE;
    --color-grey-700: #E2C5F6;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #0A2D75;
    --color-blue-700: #CEE8FA;
    --color-green-100: #003825;
    --color-green-700: #C4F5CC;
    --color-yellow-100: #B77300;
    --color-yellow-700: #FFF5CC;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #5500B7;
    --color-indigo-700: #F5CCFF;

    --color-red-100: #FFE5D4;
    --color-red-700: #B71525;
    --color-red-800: #930D26;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  /* Indigo */
  --color-brand-50: #FFF8D6;
  --color-brand-100: #FFEEAE;
  --color-brand-200: #FFE286;
  --color-brand-500: #FFC436;
  --color-brand-600: #DBA127;
  --color-brand-700: #B7801B;
  --color-brand-800: #936111;
  --color-brand-900: #7A4B0A;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;

export default GlobalStyles;
