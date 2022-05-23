import { createContext, useState } from "react";
import useMetamask from "./hooks/useMetamask";
import useBlockchainBulletin from "./hooks/useBlockchainBulletin";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const { isConnected, provider, signer, connectWallet, account } = useMetamask();
    const BlockchainBulletin = useBlockchainBulletin(isConnected, provider, signer);

    const value = {
        isConnected,
        provider,
        signer,
        connectWallet,
        BlockchainBulletin,
        account
    }

    return (
        <Context.Provider
            value={value}
        >
            {children}
        </Context.Provider>
    )
}