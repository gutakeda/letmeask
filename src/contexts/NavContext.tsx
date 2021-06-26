import { createContext, ReactNode, useState } from "react";

type NavContextType = {
    currentActive: string,
    changeCurrent: (active: string) => void
}

type NavContextProviderType = {
    children: ReactNode
}

export const NavContext = createContext({} as NavContextType);

export function NavContextProvider(props: NavContextProviderType) {
    const [active, setCurrentActive] = useState('');

    function changeCurrent(active: string) {
        setCurrentActive(active);
    }

    return (
        <NavContext.Provider value={{ currentActive: active, changeCurrent }}>
            {props.children}
        </NavContext.Provider>
    )
}