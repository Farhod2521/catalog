import create from 'zustand'
import {devtools, persist} from "zustand/middleware";
import {config} from "@/config";


let store = (set) => ({
    user: null,
    setUser: (user) => set(state => ({...state, user})),
    currencyList: [],
    setCurrencyList: (currencyList) => set(state => ({...state, currencyList})),
})

let settingsStore = (set) => ({
    token: null,
    darkMode: false,
    lang: config.DEFAULT_APP_LANG,
    setToken: (token) => set(state => ({...state, token})),
    setLang: (lang) => set(state => ({...state, lang})),
    setMode: () => set(state => ({...state, darkMode: !state.darkMode}))
})

let basketStore = (set)=>({
    basket:[],
    setBasket: (basket) => set(state => ({...state, basket})),
})

store = devtools(store);
settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, {name: 'settings'});
basketStore = persist(basketStore, {name: 'basket'});

export const useStore = create(store)
export const useSettingsStore = create(settingsStore)
export const useBasketStore = create(basketStore)

