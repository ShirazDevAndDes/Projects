"use strict";
exports.id = 691;
exports.ids = [691];
exports.modules = {

/***/ 7289:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Animate)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
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


function Animate({ children , className , variant , initial , animate , transition , repeatOnce =true , viewAmount =0.7 , stagger =0.5 , scroll =true ,  }) {
    let myVariants;
    let myInitial;
    let myAnimate;
    let myTransition;
    switch(variant){
        case "fadeIn":
            const fadeInVariant = {
                hidden: {
                    x: -50,
                    opacity: 0
                },
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        duration: 1
                    }
                }
            };
            myVariants = fadeInVariant;
            myInitial = "hidden";
            myAnimate = "visible";
            myTransition = {
                ...transition,
                duration: 1
            };
            break;
        case "popIn":
            const popInVariant = {
                hidden: {
                    scale: 0,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        duration: 0.5
                    }
                }
            };
            myVariants = popInVariant;
            myInitial = "hidden";
            myAnimate = "visible";
            myTransition = {
                ...transition,
                duration: 1
            };
            break;
        default:
            const defaultVariant = {
                hidden: {},
                visible: {
                    transition: {
                        duration: 1,
                        staggerChildren: stagger
                    }
                }
            };
            myVariants = defaultVariant;
            myInitial = "hidden";
            myAnimate = "visible";
            myTransition = {
                ...transition,
                duration: 1
            };
            break;
    }
    // console.log({ myVariants, myInitial, myAnimate, myTransition });
    if (variant) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
            className: className,
            variants: myVariants,
            viewport: {
                once: repeatOnce,
                amount: viewAmount
            },
            children: children
        });
    } else {
        if (scroll) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                className: className,
                variants: myVariants,
                initial: myInitial,
                whileInView: myAnimate,
                viewport: {
                    once: repeatOnce,
                    amount: viewAmount
                },
                children: children
            });
        } else {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                className: className,
                variants: myVariants,
                initial: myInitial,
                animate: myAnimate,
                viewport: {
                    once: repeatOnce,
                    amount: viewAmount
                },
                children: children
            });
        }
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6415:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _components_layout_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1771);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_layout_layout__WEBPACK_IMPORTED_MODULE_2__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_layout_layout__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function PageTransition({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_layout_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                className: "slide-in bg-orange-500",
                initial: {
                    scaleX: 0
                },
                animate: {
                    scaleX: 0
                },
                exit: {
                    scaleX: 1
                },
                transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                className: "slide-out bg-orange-500",
                initial: {
                    scaleX: 1
                },
                animate: {
                    scaleX: 0
                },
                exit: {
                    scaleX: 0
                },
                transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                }
            })
        ]
    });
}
// PageTransition.displayName = "PageTransition";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageTransition);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;