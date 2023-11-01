import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    /**
     * PAGES
     */

    homePage: false,
    loginPage: false,
    signupPage: false,
    profilePage: false,
    myAlbumPage: false,
    watchingPage: false,
    allMoviesPage: true,
    categoriesPage: false,
    showMoviesPage: false,
    /**
     * DATA
     */
    showsForAllMoviesPage: null,
    showsForShowMoviesPage: null,
    showToPlay: null,
    /**
     * WINOW
     */
    mobileSizedWindow: false,
  },
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload;
    },
    loginPage: (state, actions) => {
      state.loginPage = actions.payload;
    },
    signupPage: (state, actions) => {
      state.signupPage = actions.payload;
    },
    profilePage: (state, actions) => {
      state.profilePage = actions.payload;
    },
    allMoviesPage: (state, actions) => {
      state.allMoviesPage = actions.payload;
    },
    homePage: (state, actions) => {
      state.homePage = actions.payload;
    },
    categoriesPage: (state, actions) => {
      state.categoriesPage = actions.payload;
    },
    myAlbumPage: (state, actions) => {
      state.myAlbumPage = actions.payload;
    },
    watchingPage: (state, actions) => {
      state.watchingPage = actions.payload;
    },
    showMoviesPage: (state, actions) => {
      state.showMoviesPage = actions.payload;
    },
    showsForAllMoviesPage: (state, actions) => {
      state.showsForAllMoviesPage = actions.payload;
    },
    showsForShowMoviesPage: (state, actions) => {
      state.showsForShowMoviesPage = actions.payload;
    },
    showToPlay: (state, actions) => {
      state.showToPlay = actions.payload;
    },
    mobileSizedWindow: (state, actions) => {
      state.mobileSizedWindow = actions.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  login,
  logout,
  homePage,
  loginPage,
  signupPage,
  showToPlay,
  profilePage,
  myAlbumPage,
  watchingPage,
  allMoviesPage,
  categoriesPage,
  showMoviesPage,
  mobileSizedWindow,
  showsForAllMoviesPage,
  showsForShowMoviesPage,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectHomePage = (state) => state.homePage;
export const selectLoginPage = (state) => state.loginPage;
export const selectSignupPage = (state) => state.signupPage;
export const selectShowToPlay = (state) => state.showToPlay;
export const selectMyAlbumPage = (state) => state.myAlbumPage;
export const selectProfilePage = (state) => state.profilePage;
export const selectWatchingPage = (state) => state.watchingPage;
export const selectAllMoviesPage = (state) => state.allMoviesPage;
export const selectCategoriesPage = (state) => state.categoriesPage;
export const selectShowMoviesPage = (state) => state.showMoviesPage;
export const selectMobileSizedWindow = (state) => state.mobileSizedWindow;
export const selectShowsForAllMoviesPage = (state) =>
  state.showsForAllMoviesPage;
export const selectShowsForShowMoviesPage = (state) =>
  state.showsForShowMoviesPage;

export default userSlice.reducer;
