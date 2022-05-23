import { useContext } from "react";
import Link from 'next/link';
import { Context } from "../Context";
import { ethers } from "ethers";

export default function ChannelList({ channels, isAdmin }) {
    const { BlockchainBulletin } = useContext(Context);

    const deleteChannel = async (identifier) => {
        if (!BlockchainBulletin || !identifier) return;

        try {
            await BlockchainBulletin.deleteChannel(identifier);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    return (
        <div className="flex flex-row flex-wrap">
            {channels.map(channel => (
                <ChannelCard deleteChannel={deleteChannel} identifier={channel[0]} managers={channel[3]} description={channel[2]} numPosts={channel[4].length} timestamp={channel[1].toNumber()} isAdmin={isAdmin} />
            ))}
        </div>
    )
}

export function ChannelCard({ identifier, managers, description, numPosts, timestamp, isAdmin, deleteChannel }) {
    const { account } = useContext(Context);

    return (
        <div className='m-4 p-4 shadow-lg rounded-md border w-[100%] mobile:w-[400px] relative' key={identifier}>
            <div className="hover:opacity-50 duration-500 mb-3">
                <Link href={`/${identifier}`}>
                    <a>
                        <div className="text-2xl font-bold mb-3">
                            {ethers.utils.parseBytes32String(identifier)} {managers.map(x => x.toUpperCase()).includes(account.toUpperCase()) ? <span className="font-normal text-white text-sm py-[6px] px-3 bg-yellow-400 rounded-full">Managing</span> : null}
                        </div>
                        <div className="font-bold">
                            {description}
                        </div>
                        <div>
                            {numPosts} posts
                        </div>
                    </a>
                </Link>
            </div>
            {isAdmin ? <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full text-xs duration-500' onClick={() => deleteChannel(identifier)}>DELETE</button> : null}
            <span className="block text-xs absolute bottom-1 right-3">creation timestamp: {timestamp}</span>
        </div>
    )
}