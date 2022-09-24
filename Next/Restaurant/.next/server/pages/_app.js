/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"@fortawesome/fontawesome-svg-core\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ \"./node_modules/@fortawesome/fontawesome-svg-core/styles.css\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/store */ \"./redux/store.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! redux-persist/integration/react */ \"redux-persist/integration/react\");\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_12__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_7__]);\nreact_toastify__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__.config.autoAddCss = false;\n\n\n// import Layout from \"../layout/Layout\";\n\n\n\n\nfunction MyApp({ Component , pageProps: { session , ...pageProps }  }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        __webpack_require__(/*! bootstrap/dist/js/bootstrap */ \"bootstrap/dist/js/bootstrap\");\n    }, []);\n    const getLayout = Component.getLayout || ((page)=>page\n    );\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_9__.SessionProvider, {\n        session: session,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_11__.Provider, {\n            store: _redux_store__WEBPACK_IMPORTED_MODULE_10__.store,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_12__.PersistGate, {\n                loading: null,\n                persistor: _redux_store__WEBPACK_IMPORTED_MODULE_10__.persistor,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_7__.ToastContainer, {\n                        theme: \"colored\",\n                        autoClose: false\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n                        lineNumber: 30,\n                        columnNumber: 11\n                    }, this),\n                    Component.auth ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Auth, {\n                        options: Component.authOptions,\n                        children: getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                            ...pageProps\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n                            lineNumber: 33,\n                            columnNumber: 26\n                        }, this))\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n                        lineNumber: 32,\n                        columnNumber: 13\n                    }, this) : getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n                        lineNumber: 36,\n                        columnNumber: 23\n                    }, this))\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n                lineNumber: 29,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n            lineNumber: 28,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\Git Repo Public\\\\Next\\\\Restaurant\\\\pages\\\\_app.js\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\nfunction Auth({ options , children  }) {\n    // if `{ required: true }` is supplied, `status` can only be \"loading\" or \"authenticated\"\n    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_9__.useSession)({\n        required: true\n    });\n    const route = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    if (status != \"loading\") {\n        if (!session) {\n            // console.log(\"not session\");\n            react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(\"You are not Logged In\");\n            route.push(\"/admin\");\n        } else {\n            // console.log(\"session\");\n            if (session.user.role != options.role) {\n                if (session.user.role === \"admin\") {\n                    react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(\"You are not allowed because you are a the admin\");\n                    route.push(\"/admin\");\n                } else if (session.user.role === \"user\") {\n                    react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(\"You are not allowed because you are a User\");\n                    route.push(\"/\");\n                } else {\n                    react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(\"Something went wrong\");\n                    route.push(\"/\");\n                }\n            } else {\n                return children;\n            }\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NBQ0Y7S0FDRjtDQUNGO0FBRUQsaUVBQWVkLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIjtcbmltcG9ydCBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZS9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCI7XG5jb25maWcuYXV0b0FkZENzcyA9IGZhbHNlO1xuaW1wb3J0IHsgVG9hc3RDb250YWluZXIsIHRvYXN0IH0gZnJvbSBcInJlYWN0LXRvYXN0aWZ5XCI7XG5pbXBvcnQgXCJyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzXCI7XG4vLyBpbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9sYXlvdXQvTGF5b3V0XCI7XG5cbmltcG9ydCB7IFNlc3Npb25Qcm92aWRlciwgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IHN0b3JlLCBwZXJzaXN0b3IgfSBmcm9tIFwiLi4vcmVkdXgvc3RvcmVcIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5cbmltcG9ydCB7IFBlcnNpc3RHYXRlIH0gZnJvbSBcInJlZHV4LXBlcnNpc3QvaW50ZWdyYXRpb24vcmVhY3RcIjtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wczogeyBzZXNzaW9uLCAuLi5wYWdlUHJvcHMgfSB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVxdWlyZShcImJvb3RzdHJhcC9kaXN0L2pzL2Jvb3RzdHJhcFwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdldExheW91dCA9IENvbXBvbmVudC5nZXRMYXlvdXQgfHwgKChwYWdlKSA9PiBwYWdlKTtcblxuICByZXR1cm4gKFxuICAgIDxTZXNzaW9uUHJvdmlkZXIgc2Vzc2lvbj17c2Vzc2lvbn0+XG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgPFBlcnNpc3RHYXRlIGxvYWRpbmc9e251bGx9IHBlcnNpc3Rvcj17cGVyc2lzdG9yfT5cbiAgICAgICAgICA8VG9hc3RDb250YWluZXIgdGhlbWU9XCJjb2xvcmVkXCIgYXV0b0Nsb3NlPXtmYWxzZX0gLz5cbiAgICAgICAgICB7Q29tcG9uZW50LmF1dGggPyAoXG4gICAgICAgICAgICA8QXV0aCBvcHRpb25zPXtDb21wb25lbnQuYXV0aE9wdGlvbnN9PlxuICAgICAgICAgICAgICB7Z2V0TGF5b3V0KDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz4pfVxuICAgICAgICAgICAgPC9BdXRoPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBnZXRMYXlvdXQoPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPilcbiAgICAgICAgICApfVxuICAgICAgICA8L1BlcnNpc3RHYXRlPlxuICAgICAgPC9Qcm92aWRlcj5cbiAgICA8L1Nlc3Npb25Qcm92aWRlcj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXV0aCh7IG9wdGlvbnMsIGNoaWxkcmVuIH0pIHtcbiAgLy8gaWYgYHsgcmVxdWlyZWQ6IHRydWUgfWAgaXMgc3VwcGxpZWQsIGBzdGF0dXNgIGNhbiBvbmx5IGJlIFwibG9hZGluZ1wiIG9yIFwiYXV0aGVudGljYXRlZFwiXG4gIGNvbnN0IHsgZGF0YTogc2Vzc2lvbiwgc3RhdHVzIH0gPSB1c2VTZXNzaW9uKHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbiAgY29uc3Qgcm91dGUgPSB1c2VSb3V0ZXIoKTtcblxuICBpZiAoc3RhdHVzICE9IFwibG9hZGluZ1wiKSB7XG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm5vdCBzZXNzaW9uXCIpO1xuICAgICAgdG9hc3QuZXJyb3IoXCJZb3UgYXJlIG5vdCBMb2dnZWQgSW5cIik7XG4gICAgICByb3V0ZS5wdXNoKFwiL2FkbWluXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInNlc3Npb25cIik7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyLnJvbGUgIT0gb3B0aW9ucy5yb2xlKSB7XG4gICAgICAgIGlmIChzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJhZG1pblwiKSB7XG4gICAgICAgICAgdG9hc3QuZXJyb3IoXCJZb3UgYXJlIG5vdCBhbGxvd2VkIGJlY2F1c2UgeW91IGFyZSBhIHRoZSBhZG1pblwiKTtcbiAgICAgICAgICByb3V0ZS5wdXNoKFwiL2FkbWluXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNlc3Npb24udXNlci5yb2xlID09PSBcInVzZXJcIikge1xuICAgICAgICAgIHRvYXN0LmVycm9yKFwiWW91IGFyZSBub3QgYWxsb3dlZCBiZWNhdXNlIHlvdSBhcmUgYSBVc2VyXCIpO1xuICAgICAgICAgIHJvdXRlLnB1c2goXCIvXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvYXN0LmVycm9yKFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIik7XG4gICAgICAgICAgcm91dGUucHVzaChcIi9cIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUm91dGVyIiwiY29uZmlnIiwiYXV0b0FkZENzcyIsIlRvYXN0Q29udGFpbmVyIiwidG9hc3QiLCJTZXNzaW9uUHJvdmlkZXIiLCJ1c2VTZXNzaW9uIiwic3RvcmUiLCJwZXJzaXN0b3IiLCJQcm92aWRlciIsIlBlcnNpc3RHYXRlIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJzZXNzaW9uIiwicmVxdWlyZSIsImdldExheW91dCIsInBhZ2UiLCJsb2FkaW5nIiwidGhlbWUiLCJhdXRvQ2xvc2UiLCJhdXRoIiwiQXV0aCIsIm9wdGlvbnMiLCJhdXRoT3B0aW9ucyIsImNoaWxkcmVuIiwiZGF0YSIsInN0YXR1cyIsInJlcXVpcmVkIiwicm91dGUiLCJlcnJvciIsInB1c2giLCJ1c2VyIiwicm9sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./redux/cartSlice.js":
/*!****************************!*\
  !*** ./redux/cartSlice.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addProducts\": () => (/* binding */ addProducts),\n/* harmony export */   \"cartItems\": () => (/* binding */ cartItems),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"itemsCount\": () => (/* binding */ itemsCount),\n/* harmony export */   \"itemsTotal\": () => (/* binding */ itemsTotal),\n/* harmony export */   \"removeItem\": () => (/* binding */ removeItem),\n/* harmony export */   \"resetCart\": () => (/* binding */ resetCart)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst initialState = {\n    items: [],\n    // quantity: [],\n    totalPrice: 0\n};\nconst cartSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"cart\",\n    initialState,\n    reducers: {\n        addProducts: (state, action)=>{\n            const itemID = action.payload.itemInfo._id;\n            const quantity = action.payload.itemQuantity;\n            const size = action.payload.itemSize;\n            const existedItem = state.items.reduce((acc, cur)=>cur.itemInfo._id === itemID ? ++acc : acc\n            , 0);\n            const existedSize = state.items.reduce((acc, cur)=>cur.itemInfo._id === itemID && cur.itemSize === size ? ++acc : acc\n            , 0);\n            if (existedItem) {\n                if (existedSize) {\n                    state.items.forEach((item)=>{\n                        if (item.itemInfo._id === itemID && item.itemSize === size) {\n                            if (item.itemQuantity != quantity) {\n                                item.itemQuantity = quantity;\n                            }\n                        }\n                    });\n                } else {\n                    state.items.push(action.payload);\n                }\n            } else {\n                state.items.push(action.payload);\n            }\n        },\n        removeItem: (state, action)=>{\n            // console.log(action.payload);\n            state.items.splice(action.payload, 1);\n        },\n        resetCart: (state)=>{\n            // console.log(state.items);\n            state.items = [];\n            state.totalPrice = 0;\n        }\n    }\n});\nconst { addProducts , removeItem , resetCart  } = cartSlice.actions;\nconst cartItems = (state)=>state.cart.items\n;\nconst itemsCount = (state)=>state.cart.items.length\n;\nconst itemsTotal = (state)=>{\n    let total = 0;\n    state.cart.items.forEach((item)=>{\n        total += parseInt(item.itemInfo.price[item.itemSize]) * item.itemQuantity;\n    });\n    return total;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9jYXJ0U2xpY2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXdEO0FBRXhELE1BQU1FLFlBQVksR0FBRztJQUNuQkMsS0FBSyxFQUFFLEVBQUU7SUFDVCxnQkFBZ0I7SUFDaEJDLFVBQVUsRUFBRSxDQUFDO0NBQ2Q7QUFFRCxNQUFNQyxTQUFTLEdBQUdMLDZEQUFXLENBQUM7SUFDNUJNLElBQUksRUFBRSxNQUFNO0lBQ1pKLFlBQVk7SUFDWkssUUFBUSxFQUFFO1FBQ1JDLFdBQVcsRUFBRSxDQUFDQyxLQUFLLEVBQUVDLE1BQU0sR0FBSztZQUM5QixNQUFNQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ0UsT0FBTyxDQUFDQyxRQUFRLENBQUNDLEdBQUc7WUFDMUMsTUFBTUMsUUFBUSxHQUFHTCxNQUFNLENBQUNFLE9BQU8sQ0FBQ0ksWUFBWTtZQUM1QyxNQUFNQyxJQUFJLEdBQUdQLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDTSxRQUFRO1lBRXBDLE1BQU1DLFdBQVcsR0FBR1YsS0FBSyxDQUFDTixLQUFLLENBQUNpQixNQUFNLENBQ3BDLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxHQUFNQSxHQUFHLENBQUNULFFBQVEsQ0FBQ0MsR0FBRyxLQUFLSCxNQUFNLEdBQUcsRUFBRVUsR0FBRyxHQUFHQSxHQUFHO1lBQUMsRUFDekQsQ0FBQyxDQUNGO1lBRUQsTUFBTUUsV0FBVyxHQUFHZCxLQUFLLENBQUNOLEtBQUssQ0FBQ2lCLE1BQU0sQ0FDcEMsQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEdBQ1BBLEdBQUcsQ0FBQ1QsUUFBUSxDQUFDQyxHQUFHLEtBQUtILE1BQU0sSUFBSVcsR0FBRyxDQUFDSixRQUFRLEtBQUtELElBQUksR0FBRyxFQUFFSSxHQUFHLEdBQUdBLEdBQUc7WUFBQSxFQUNwRSxDQUFDLENBQ0Y7WUFFRCxJQUFJRixXQUFXLEVBQUU7Z0JBQ2YsSUFBSUksV0FBVyxFQUFFO29CQUNmZCxLQUFLLENBQUNOLEtBQUssQ0FBQ3FCLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLEdBQUs7d0JBQzVCLElBQUlBLElBQUksQ0FBQ1osUUFBUSxDQUFDQyxHQUFHLEtBQUtILE1BQU0sSUFBSWMsSUFBSSxDQUFDUCxRQUFRLEtBQUtELElBQUksRUFBRTs0QkFDMUQsSUFBSVEsSUFBSSxDQUFDVCxZQUFZLElBQUlELFFBQVEsRUFBRTtnQ0FDakNVLElBQUksQ0FBQ1QsWUFBWSxHQUFHRCxRQUFRLENBQUM7NkJBQzlCO3lCQUNGO3FCQUNGLENBQUMsQ0FBQztpQkFDSixNQUFNO29CQUNMTixLQUFLLENBQUNOLEtBQUssQ0FBQ3VCLElBQUksQ0FBQ2hCLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDLENBQUM7aUJBQ2xDO2FBQ0YsTUFBTTtnQkFDTEgsS0FBSyxDQUFDTixLQUFLLENBQUN1QixJQUFJLENBQUNoQixNQUFNLENBQUNFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFDRGUsVUFBVSxFQUFFLENBQUNsQixLQUFLLEVBQUVDLE1BQU0sR0FBSztZQUM3QiwrQkFBK0I7WUFDL0JELEtBQUssQ0FBQ04sS0FBSyxDQUFDeUIsTUFBTSxDQUFDbEIsTUFBTSxDQUFDRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFDRGlCLFNBQVMsRUFBRSxDQUFDcEIsS0FBSyxHQUFLO1lBQ3BCLDRCQUE0QjtZQUM1QkEsS0FBSyxDQUFDTixLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCTSxLQUFLLENBQUNMLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDdEI7S0FDRjtDQUNGLENBQUM7QUFFSyxNQUFNLEVBQUVJLFdBQVcsR0FBRW1CLFVBQVUsR0FBRUUsU0FBUyxHQUFFLEdBQUd4QixTQUFTLENBQUN5QixPQUFPLENBQUM7QUFFakUsTUFBTUMsU0FBUyxHQUFHLENBQUN0QixLQUFLLEdBQUtBLEtBQUssQ0FBQ3VCLElBQUksQ0FBQzdCLEtBQUs7QUFBQSxDQUFDO0FBQzlDLE1BQU04QixVQUFVLEdBQUcsQ0FBQ3hCLEtBQUssR0FBS0EsS0FBSyxDQUFDdUIsSUFBSSxDQUFDN0IsS0FBSyxDQUFDK0IsTUFBTTtBQUFBLENBQUM7QUFFdEQsTUFBTUMsVUFBVSxHQUFHLENBQUMxQixLQUFLLEdBQUs7SUFDbkMsSUFBSTJCLEtBQUssR0FBRyxDQUFDO0lBQ2IzQixLQUFLLENBQUN1QixJQUFJLENBQUM3QixLQUFLLENBQUNxQixPQUFPLENBQUMsQ0FBQ0MsSUFBSSxHQUFLO1FBQ2pDVyxLQUFLLElBQUlDLFFBQVEsQ0FBQ1osSUFBSSxDQUFDWixRQUFRLENBQUN5QixLQUFLLENBQUNiLElBQUksQ0FBQ1AsUUFBUSxDQUFDLENBQUMsR0FBR08sSUFBSSxDQUFDVCxZQUFZLENBQUM7S0FDM0UsQ0FBQyxDQUFDO0lBRUgsT0FBT29CLEtBQUssQ0FBQztDQUNkLENBQUM7QUFFRixpRUFBZS9CLFNBQVMsQ0FBQ2tDLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQvLi9yZWR1eC9jYXJ0U2xpY2UuanM/ZTA3MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTbGljZSwgY3VycmVudCB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgaXRlbXM6IFtdLFxyXG4gIC8vIHF1YW50aXR5OiBbXSxcclxuICB0b3RhbFByaWNlOiAwLFxyXG59O1xyXG5cclxuY29uc3QgY2FydFNsaWNlID0gY3JlYXRlU2xpY2Uoe1xyXG4gIG5hbWU6IFwiY2FydFwiLFxyXG4gIGluaXRpYWxTdGF0ZSxcclxuICByZWR1Y2Vyczoge1xyXG4gICAgYWRkUHJvZHVjdHM6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1JRCA9IGFjdGlvbi5wYXlsb2FkLml0ZW1JbmZvLl9pZDtcclxuICAgICAgY29uc3QgcXVhbnRpdHkgPSBhY3Rpb24ucGF5bG9hZC5pdGVtUXVhbnRpdHk7XHJcbiAgICAgIGNvbnN0IHNpemUgPSBhY3Rpb24ucGF5bG9hZC5pdGVtU2l6ZTtcclxuXHJcbiAgICAgIGNvbnN0IGV4aXN0ZWRJdGVtID0gc3RhdGUuaXRlbXMucmVkdWNlKFxyXG4gICAgICAgIChhY2MsIGN1cikgPT4gKGN1ci5pdGVtSW5mby5faWQgPT09IGl0ZW1JRCA/ICsrYWNjIDogYWNjKSxcclxuICAgICAgICAwXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBleGlzdGVkU2l6ZSA9IHN0YXRlLml0ZW1zLnJlZHVjZShcclxuICAgICAgICAoYWNjLCBjdXIpID0+XHJcbiAgICAgICAgICBjdXIuaXRlbUluZm8uX2lkID09PSBpdGVtSUQgJiYgY3VyLml0ZW1TaXplID09PSBzaXplID8gKythY2MgOiBhY2MsXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGV4aXN0ZWRJdGVtKSB7XHJcbiAgICAgICAgaWYgKGV4aXN0ZWRTaXplKSB7XHJcbiAgICAgICAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1JbmZvLl9pZCA9PT0gaXRlbUlEICYmIGl0ZW0uaXRlbVNpemUgPT09IHNpemUpIHtcclxuICAgICAgICAgICAgICBpZiAoaXRlbS5pdGVtUXVhbnRpdHkgIT0gcXVhbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXRlbVF1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RhdGUuaXRlbXMucHVzaChhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXRlLml0ZW1zLnB1c2goYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlSXRlbTogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICBzdGF0ZS5pdGVtcy5zcGxpY2UoYWN0aW9uLnBheWxvYWQsIDEpO1xyXG4gICAgfSxcclxuICAgIHJlc2V0Q2FydDogKHN0YXRlKSA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXRlLml0ZW1zKTtcclxuICAgICAgc3RhdGUuaXRlbXMgPSBbXTtcclxuICAgICAgc3RhdGUudG90YWxQcmljZSA9IDA7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHsgYWRkUHJvZHVjdHMsIHJlbW92ZUl0ZW0sIHJlc2V0Q2FydCB9ID0gY2FydFNsaWNlLmFjdGlvbnM7XHJcblxyXG5leHBvcnQgY29uc3QgY2FydEl0ZW1zID0gKHN0YXRlKSA9PiBzdGF0ZS5jYXJ0Lml0ZW1zO1xyXG5leHBvcnQgY29uc3QgaXRlbXNDb3VudCA9IChzdGF0ZSkgPT4gc3RhdGUuY2FydC5pdGVtcy5sZW5ndGg7XHJcblxyXG5leHBvcnQgY29uc3QgaXRlbXNUb3RhbCA9IChzdGF0ZSkgPT4ge1xyXG4gIGxldCB0b3RhbCA9IDA7XHJcbiAgc3RhdGUuY2FydC5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICB0b3RhbCArPSBwYXJzZUludChpdGVtLml0ZW1JbmZvLnByaWNlW2l0ZW0uaXRlbVNpemVdKSAqIGl0ZW0uaXRlbVF1YW50aXR5O1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdG90YWw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYXJ0U2xpY2UucmVkdWNlcjtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiY3VycmVudCIsImluaXRpYWxTdGF0ZSIsIml0ZW1zIiwidG90YWxQcmljZSIsImNhcnRTbGljZSIsIm5hbWUiLCJyZWR1Y2VycyIsImFkZFByb2R1Y3RzIiwic3RhdGUiLCJhY3Rpb24iLCJpdGVtSUQiLCJwYXlsb2FkIiwiaXRlbUluZm8iLCJfaWQiLCJxdWFudGl0eSIsIml0ZW1RdWFudGl0eSIsInNpemUiLCJpdGVtU2l6ZSIsImV4aXN0ZWRJdGVtIiwicmVkdWNlIiwiYWNjIiwiY3VyIiwiZXhpc3RlZFNpemUiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJyZW1vdmVJdGVtIiwic3BsaWNlIiwicmVzZXRDYXJ0IiwiYWN0aW9ucyIsImNhcnRJdGVtcyIsImNhcnQiLCJpdGVtc0NvdW50IiwibGVuZ3RoIiwiaXRlbXNUb3RhbCIsInRvdGFsIiwicGFyc2VJbnQiLCJwcmljZSIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./redux/cartSlice.js\n");

/***/ }),

/***/ "./redux/counterSlice.js":
/*!*******************************!*\
  !*** ./redux/counterSlice.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"counterSlice\": () => (/* binding */ counterSlice),\n/* harmony export */   \"decrement\": () => (/* binding */ decrement),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"increment\": () => (/* binding */ increment),\n/* harmony export */   \"incrementAsync\": () => (/* binding */ incrementAsync),\n/* harmony export */   \"incrementByAmount\": () => (/* binding */ incrementByAmount),\n/* harmony export */   \"selectCount\": () => (/* binding */ selectCount)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst counterSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"counter\",\n    initialState: {\n        value: 1200\n    },\n    reducers: {\n        increment: (state)=>{\n            state.value += 1;\n        },\n        decrement: (state)=>{\n            state.value -= 1;\n        },\n        incrementByAmount: (state, action)=>{\n            state.value += action.payload;\n        }\n    }\n});\nconst { increment , decrement , incrementByAmount  } = counterSlice.actions;\nconst incrementAsync = (amount)=>(dispatch)=>{\n        setTimeout(()=>{\n            dispatch(incrementByAmount(amount));\n        }, 1000);\n    }\n;\nconst selectCount = (state)=>state.counter.value\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (counterSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9jb3VudGVyU2xpY2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQStDO0FBRXhDLE1BQU1DLFlBQVksR0FBR0QsNkRBQVcsQ0FBQztJQUN0Q0UsSUFBSSxFQUFFLFNBQVM7SUFDZkMsWUFBWSxFQUFFO1FBQ1pDLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDREMsUUFBUSxFQUFFO1FBQ1JDLFNBQVMsRUFBRSxDQUFDQyxLQUFLLEdBQUs7WUFDcEJBLEtBQUssQ0FBQ0gsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNsQjtRQUNESSxTQUFTLEVBQUUsQ0FBQ0QsS0FBSyxHQUFLO1lBQ3BCQSxLQUFLLENBQUNILEtBQUssSUFBSSxDQUFDLENBQUM7U0FDbEI7UUFDREssaUJBQWlCLEVBQUUsQ0FBQ0YsS0FBSyxFQUFFRyxNQUFNLEdBQUs7WUFDcENILEtBQUssQ0FBQ0gsS0FBSyxJQUFJTSxNQUFNLENBQUNDLE9BQU8sQ0FBQztTQUMvQjtLQUNGO0NBQ0YsQ0FBQyxDQUFDO0FBRUksTUFBTSxFQUFFTCxTQUFTLEdBQUVFLFNBQVMsR0FBRUMsaUJBQWlCLEdBQUUsR0FBR1IsWUFBWSxDQUFDVyxPQUFPLENBQUM7QUFFekUsTUFBTUMsY0FBYyxHQUFHLENBQUNDLE1BQU0sR0FBSyxDQUFDQyxRQUFRLEdBQUs7UUFDdERDLFVBQVUsQ0FBQyxJQUFNO1lBQ2ZELFFBQVEsQ0FBQ04saUJBQWlCLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDckMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNWO0FBQUEsQ0FBQztBQUVLLE1BQU1HLFdBQVcsR0FBRyxDQUFDVixLQUFLLEdBQUtBLEtBQUssQ0FBQ1csT0FBTyxDQUFDZCxLQUFLO0FBQUEsQ0FBQztBQUUxRCxpRUFBZUgsWUFBWSxDQUFDa0IsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3JlZHV4L2NvdW50ZXJTbGljZS5qcz9hNDdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjb3VudGVyU2xpY2UgPSBjcmVhdGVTbGljZSh7XHJcbiAgbmFtZTogXCJjb3VudGVyXCIsXHJcbiAgaW5pdGlhbFN0YXRlOiB7XHJcbiAgICB2YWx1ZTogMTIwMCxcclxuICB9LFxyXG4gIHJlZHVjZXJzOiB7XHJcbiAgICBpbmNyZW1lbnQ6IChzdGF0ZSkgPT4ge1xyXG4gICAgICBzdGF0ZS52YWx1ZSArPSAxO1xyXG4gICAgfSxcclxuICAgIGRlY3JlbWVudDogKHN0YXRlKSA9PiB7XHJcbiAgICAgIHN0YXRlLnZhbHVlIC09IDE7XHJcbiAgICB9LFxyXG4gICAgaW5jcmVtZW50QnlBbW91bnQ6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgIHN0YXRlLnZhbHVlICs9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB7IGluY3JlbWVudCwgZGVjcmVtZW50LCBpbmNyZW1lbnRCeUFtb3VudCB9ID0gY291bnRlclNsaWNlLmFjdGlvbnM7XHJcblxyXG5leHBvcnQgY29uc3QgaW5jcmVtZW50QXN5bmMgPSAoYW1vdW50KSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGRpc3BhdGNoKGluY3JlbWVudEJ5QW1vdW50KGFtb3VudCkpO1xyXG4gIH0sIDEwMDApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbGVjdENvdW50ID0gKHN0YXRlKSA9PiBzdGF0ZS5jb3VudGVyLnZhbHVlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY291bnRlclNsaWNlLnJlZHVjZXI7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVTbGljZSIsImNvdW50ZXJTbGljZSIsIm5hbWUiLCJpbml0aWFsU3RhdGUiLCJ2YWx1ZSIsInJlZHVjZXJzIiwiaW5jcmVtZW50Iiwic3RhdGUiLCJkZWNyZW1lbnQiLCJpbmNyZW1lbnRCeUFtb3VudCIsImFjdGlvbiIsInBheWxvYWQiLCJhY3Rpb25zIiwiaW5jcmVtZW50QXN5bmMiLCJhbW91bnQiLCJkaXNwYXRjaCIsInNldFRpbWVvdXQiLCJzZWxlY3RDb3VudCIsImNvdW50ZXIiLCJyZWR1Y2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./redux/counterSlice.js\n");

/***/ }),

/***/ "./redux/store.js":
/*!************************!*\
  !*** ./redux/store.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"persistor\": () => (/* binding */ persistor),\n/* harmony export */   \"store\": () => (/* binding */ store)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _counterSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counterSlice */ \"./redux/counterSlice.js\");\n/* harmony import */ var _cartSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartSlice */ \"./redux/cartSlice.js\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst persistConfig = {\n    key: \"root\",\n    version: 1,\n    storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_5___default())\n};\nconst rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_3__.combineReducers)({\n    cart: _cartSlice__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\nconst persistedReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_4__.persistReducer)(persistConfig, rootReducer);\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n    reducer: persistedReducer,\n    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({\n            serializableCheck: {\n                ignoredActions: [\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.FLUSH,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.REHYDRATE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.PAUSE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.PERSIST,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.PURGE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_4__.REGISTER\n                ]\n            }\n        })\n});\nlet persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_4__.persistStore)(store); // export default configureStore({\n //   reducer: {\n //     counter: counterReducer,\n //     cart: cartReducer,\n //   },\n // });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9zdG9yZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0Q7QUFDTjtBQUNOO0FBRUU7QUFVakI7QUFDeUI7QUFFaEQsTUFBTWEsYUFBYSxHQUFHO0lBQ3BCQyxHQUFHLEVBQUUsTUFBTTtJQUNYQyxPQUFPLEVBQUUsQ0FBQztJQUNWSCxPQUFPO0NBQ1I7QUFFRCxNQUFNSSxXQUFXLEdBQUdiLHNEQUFlLENBQUM7SUFDbENjLElBQUksRUFBRWYsa0RBQVc7Q0FDbEIsQ0FBQztBQUVGLE1BQU1nQixnQkFBZ0IsR0FBR2IsNkRBQWMsQ0FBQ1EsYUFBYSxFQUFFRyxXQUFXLENBQUM7QUFFNUQsTUFBTUcsS0FBSyxHQUFHbkIsZ0VBQWMsQ0FBQztJQUNsQ29CLE9BQU8sRUFBRUYsZ0JBQWdCO0lBQ3pCRyxVQUFVLEVBQUUsQ0FBQ0Msb0JBQW9CLEdBQy9CQSxvQkFBb0IsQ0FBQztZQUNuQkMsaUJBQWlCLEVBQUU7Z0JBQ2pCQyxjQUFjLEVBQUU7b0JBQUNsQixnREFBSztvQkFBRUMsb0RBQVM7b0JBQUVDLGdEQUFLO29CQUFFQyxrREFBTztvQkFBRUMsZ0RBQUs7b0JBQUVDLG1EQUFRO2lCQUFDO2FBQ3BFO1NBQ0YsQ0FBQztDQUNMLENBQUMsQ0FBQztBQUVJLElBQUljLFNBQVMsR0FBR3JCLDJEQUFZLENBQUNlLEtBQUssQ0FBQyxDQUFDLENBRTNDLGtDQUFrQztDQUNsQyxlQUFlO0NBQ2YsK0JBQStCO0NBQy9CLHlCQUF5QjtDQUN6QixPQUFPO0NBQ1AsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQvLi9yZWR1eC9zdG9yZS5qcz8zNTQ5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZ3VyZVN0b3JlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuaW1wb3J0IGNvdW50ZXJSZWR1Y2VyIGZyb20gXCIuL2NvdW50ZXJTbGljZVwiO1xyXG5pbXBvcnQgY2FydFJlZHVjZXIgZnJvbSBcIi4vY2FydFNsaWNlXCI7XHJcblxyXG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tIFwicmVkdXhcIjtcclxuaW1wb3J0IHtcclxuICBwZXJzaXN0U3RvcmUsXHJcbiAgcGVyc2lzdFJlZHVjZXIsXHJcbiAgRkxVU0gsXHJcbiAgUkVIWURSQVRFLFxyXG4gIFBBVVNFLFxyXG4gIFBFUlNJU1QsXHJcbiAgUFVSR0UsXHJcbiAgUkVHSVNURVIsXHJcbn0gZnJvbSBcInJlZHV4LXBlcnNpc3RcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcInJlZHV4LXBlcnNpc3QvbGliL3N0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IHBlcnNpc3RDb25maWcgPSB7XHJcbiAga2V5OiBcInJvb3RcIixcclxuICB2ZXJzaW9uOiAxLFxyXG4gIHN0b3JhZ2UsXHJcbn07XHJcblxyXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgY2FydDogY2FydFJlZHVjZXIsXHJcbn0pO1xyXG5cclxuY29uc3QgcGVyc2lzdGVkUmVkdWNlciA9IHBlcnNpc3RSZWR1Y2VyKHBlcnNpc3RDb25maWcsIHJvb3RSZWR1Y2VyKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcclxuICByZWR1Y2VyOiBwZXJzaXN0ZWRSZWR1Y2VyLFxyXG4gIG1pZGRsZXdhcmU6IChnZXREZWZhdWx0TWlkZGxld2FyZSkgPT5cclxuICAgIGdldERlZmF1bHRNaWRkbGV3YXJlKHtcclxuICAgICAgc2VyaWFsaXphYmxlQ2hlY2s6IHtcclxuICAgICAgICBpZ25vcmVkQWN0aW9uczogW0ZMVVNILCBSRUhZRFJBVEUsIFBBVVNFLCBQRVJTSVNULCBQVVJHRSwgUkVHSVNURVJdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGxldCBwZXJzaXN0b3IgPSBwZXJzaXN0U3RvcmUoc3RvcmUpO1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlU3RvcmUoe1xyXG4vLyAgIHJlZHVjZXI6IHtcclxuLy8gICAgIGNvdW50ZXI6IGNvdW50ZXJSZWR1Y2VyLFxyXG4vLyAgICAgY2FydDogY2FydFJlZHVjZXIsXHJcbi8vICAgfSxcclxuLy8gfSk7XHJcbiJdLCJuYW1lcyI6WyJjb25maWd1cmVTdG9yZSIsImNvdW50ZXJSZWR1Y2VyIiwiY2FydFJlZHVjZXIiLCJjb21iaW5lUmVkdWNlcnMiLCJwZXJzaXN0U3RvcmUiLCJwZXJzaXN0UmVkdWNlciIsIkZMVVNIIiwiUkVIWURSQVRFIiwiUEFVU0UiLCJQRVJTSVNUIiwiUFVSR0UiLCJSRUdJU1RFUiIsInN0b3JhZ2UiLCJwZXJzaXN0Q29uZmlnIiwia2V5IiwidmVyc2lvbiIsInJvb3RSZWR1Y2VyIiwiY2FydCIsInBlcnNpc3RlZFJlZHVjZXIiLCJzdG9yZSIsInJlZHVjZXIiLCJtaWRkbGV3YXJlIiwiZ2V0RGVmYXVsdE1pZGRsZXdhcmUiLCJzZXJpYWxpemFibGVDaGVjayIsImlnbm9yZWRBY3Rpb25zIiwicGVyc2lzdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./redux/store.js\n");

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/styles.css ***!
  \*******************************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "bootstrap/dist/js/bootstrap":
/*!**********************************************!*\
  !*** external "bootstrap/dist/js/bootstrap" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("bootstrap/dist/js/bootstrap");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();