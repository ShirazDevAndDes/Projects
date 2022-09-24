const popOutVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const fadeInVariant = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const defaultVariant = {
  hidden: {},
  visible: {
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

export { popOutVariant, fadeInVariant, defaultVariant };

// variants = fadeInVariant;
// initial = "hidden";
// animate = "visible";
// transition = {
//   duration: 1,
// };
