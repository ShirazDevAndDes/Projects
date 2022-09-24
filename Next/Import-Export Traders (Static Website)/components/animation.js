// const popOutVariant = {
//   hidden: { opacity: 0, scale: 0 },
//   visible: { opacity: 1, scale: 1 },
// };

// const fadeInVariant = {
//   hidden: {
//     x: -50,
//     opacity: 0,
//   },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       duration: 1,
//       staggerChildren: 0.5,
//     },
//   },
// };

// const defaultVariant = {
//   hidden: {},
//   visible: {
//     transition: {
//       duration: 1,
//       staggerChildren: 0.5,
//     },
//   },
// };

// export { popOutVariant, fadeInVariant, defaultVariant };

import { motion } from "framer-motion";

export default function Animate({
  children,
  className,
  variant,
  initial,
  animate,
  transition,
  repeatOnce = true,
  viewAmount = 0.7,
  stagger = 0.5,
  scroll = true,
}) {
  let myVariants;
  let myInitial;
  let myAnimate;
  let myTransition;

  switch (variant) {
    case "fadeIn":
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
          },
        },
      };

      myVariants = fadeInVariant;
      myInitial = "hidden";
      myAnimate = "visible";
      myTransition = { ...transition, duration: 1 };
      break;

    case "popIn":
      const popInVariant = {
        hidden: {
          scale: 0,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      };

      myVariants = popInVariant;
      myInitial = "hidden";
      myAnimate = "visible";
      myTransition = { ...transition, duration: 1 };
      break;

    default:
      const defaultVariant = {
        hidden: {},
        visible: {
          transition: {
            duration: 1,
            staggerChildren: stagger,
          },
        },
      };
      myVariants = defaultVariant;
      myInitial = "hidden";
      myAnimate = "visible";
      myTransition = { ...transition, duration: 1 };
      break;
  }

  // console.log({ myVariants, myInitial, myAnimate, myTransition });

  if (variant) {
    return (
      <motion.div
        className={className}
        variants={myVariants}
        viewport={{ once: repeatOnce, amount: viewAmount }}
      >
        {children}
      </motion.div>
    );
  } else {
    if (scroll) {
      return (
        <motion.div
          className={className}
          variants={myVariants}
          initial={myInitial}
          whileInView={myAnimate}
          viewport={{ once: repeatOnce, amount: viewAmount }}
        >
          {children}
        </motion.div>
      );
    } else {
      return (
        <motion.div
          className={className}
          variants={myVariants}
          initial={myInitial}
          animate={myAnimate}
          viewport={{ once: repeatOnce, amount: viewAmount }}
        >
          {children}
        </motion.div>
      );
    }
  }
}
