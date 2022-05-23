import { useMemo } from 'react';
import { ethers } from 'ethers';
import { BLOCKCHAIN_BULLETIN_ABI, BLOCKCHAIN_BULLETIN_ADDRESS } from '../constants';

export default function useBlockchainBulletin(isConnected, provider, signer) {
    return useMemo(() => {
        if (!isConnected || !provider || !signer) {
            return null;
        }

        let contract;

        try {
            contract = new ethers.Contract(BLOCKCHAIN_BULLETIN_ADDRESS, BLOCKCHAIN_BULLETIN_ABI, signer)
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }

        return contract;
    }, [isConnected, provider, signer]);
}