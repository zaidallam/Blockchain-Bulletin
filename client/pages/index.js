import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react'
import ChannelList from '../components/channelList'
import { Context } from '../Context'

export default function Home() {
    const { BlockchainBulletin, account } = useContext(Context);
    const [channels, setChannels] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [manageChannel, setManageChannel] = useState(false);
    const [manageAdmin, setManageAdmin] = useState(false);
    const [newChannel, setNewChannel] = useState({
        identifier: "",
        description: ""
    });
    const [newAdmin, setNewAdmin] = useState("");
    const [deleteAdmin, setDeleteAdmin] = useState("");

    const createChannel = async () => {
        if (!BlockchainBulletin || !newChannel.identifier) return;

        try {
            await BlockchainBulletin.createChannel(ethers.utils.formatBytes32String(newChannel.identifier), newChannel.description);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }

        setNewChannel({
            identifier: "",
            description: ""
        })
        setManageChannel(false);
    }

    const addAdmin = async () => {
        if (!BlockchainBulletin || !newAdmin) return;

        try {
            await BlockchainBulletin.addAdmin(newAdmin);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    const removeAdmin = async () => {
        if (!BlockchainBulletin || !deleteAdmin) return;

        try {
            await BlockchainBulletin.removeAdmin(deleteAdmin);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    const getData = async () => {
        if (!BlockchainBulletin) return;

        let channels = [];
        let admins = [];

        try {
            channels = await BlockchainBulletin.getChannels();
            admins = await BlockchainBulletin.getAdmins();
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }

        setChannels(channels);
        setAdmins(admins);
    }

    useEffect(() => {
        getData();
    }, [BlockchainBulletin]);

    useEffect(() => {
        if (!account) {
            setIsAdmin(false);
            return;
        }

        setIsAdmin(admins.map(x => x.toUpperCase()).includes(account.toUpperCase()));
    }, [admins, account]);

    return (
        <>
            {account ?
                <div className='h-full'>
                    <div className='min-h-[4em] flex justify-start items-center p-5 bg-slate-800'>
                        <div>
                            {isAdmin ? <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500" onClick={() => { setManageChannel(!manageChannel); setManageAdmin(false); }}>Create Channel</button> : null}
                            {isAdmin ? <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500" onClick={() => { setManageAdmin(!manageAdmin); setManageChannel(false); }}>Manage Admins</button> : null}
                        </div>
                        {manageChannel && !manageAdmin ?
                            <>
                                <div className='fixed h-screen w-screen bg-slate-900 bg-opacity-50 top-0 left-0 duration-500 z-10' onClick={() => setManageChannel(false)} />
                                <div className='bg-white fixed rounded-md w-1/4 h-[min-content] left-[37.5%] top-[30%] p-10 grid gap-5 grid-rows-[min-content_min-content_min-content_min-content] z-10'>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Unique Identifier:</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            maxLength={32} value={newChannel.identifier} onChange={e => setNewChannel({ ...newChannel, identifier: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Description:</label>
                                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={newChannel.description} onChange={e => setNewChannel({ ...newChannel, description: e.target.value })} />
                                    </div>
                                    <button onClick={createChannel} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Create New Channel</button>
                                    <button onClick={() => setManageChannel(false)} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Cancel</button>
                                </div>
                            </>
                            : null}
                        {manageAdmin && !manageChannel ?
                            <>
                                <div className='fixed h-screen w-screen bg-slate-900 bg-opacity-50 top-0 left-0 duration-500 z-10' onClick={() => setManageAdmin(false)} />
                                <div className='bg-white fixed rounded-md w-1/4 h-[min-content] left-[37.5%] top-[30%] p-10 grid gap-5 grid-rows-[min-content_min-content_min-content_min-content_min-content] z-10'>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">New Admin Address:</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={newAdmin} onChange={e => setNewAdmin(e.target.value)} />
                                    </div>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500' onClick={addAdmin}>Make Admin</button>
                                    {admins.length > 1 ?
                                        <>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium">Select an Admin to Remove:</label>
                                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={deleteAdmin} onChange={(e) => setDeleteAdmin(e.target.value)}>
                                                    <option value=""></option>
                                                    {admins.map(admin => admin.toUpperCase() != account.toUpperCase() && <option key={admin} value={admin}>{admin}</option>)}
                                                </select>
                                            </div>
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500' onClick={removeAdmin}>
                                                Remove Admin
                                            </button>
                                        </> : null}
                                    <button onClick={() => setManageAdmin(false)} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Exit</button>
                                </div>
                            </>
                            : null}
                    </div>
                    <ChannelList channels={channels} isAdmin={isAdmin} /> {/* Basic example of component extraction, no need for this small project */}
                </div>
                :
                <div className='bg-orange-600 font-bold text-3xl flex flex-row justify-center items-center h-full text-white'>
                    <span className='drop-shadow-2xl shadow-sky-900'>CONNECT TO METAMASK TO BEGIN USING BLOCKCHAIN BULLETIN!</span>
                </div>
            }
        </>
    )
}
