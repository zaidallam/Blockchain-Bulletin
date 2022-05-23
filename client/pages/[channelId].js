import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'

export default function Channel() {
    const router = useRouter();
    const { channelId } = router.query;

    const { BlockchainBulletin, account } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [managers, setManagers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [managePost, setManagePost] = useState(false);
    const [manageManager, setManageManager] = useState(false);
    const [newPost, setNewPost] = useState({
        identifier: "",
        message: ""
    });
    const [newManager, setNewManager] = useState("");
    const [deleteManager, setDeleteManager] = useState("");

    const createPost = async () => {
        if (!BlockchainBulletin || !newPost.identifier) return;

        try {
            await BlockchainBulletin.createPost(channelId, ethers.utils.formatBytes32String(newPost.identifier), newPost.message, "");
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    const addManager = async () => {
        if (!BlockchainBulletin || !newManager || !channelId) return;

        try {
            await BlockchainBulletin.addManager(channelId, newManager);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    const removeManager = async () => {
        if (!BlockchainBulletin || !deleteManager || !channelId) return;

        try {
            await BlockchainBulletin.removeManager(channelId, deleteManager);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }
    }

    const getData = async () => {
        if (!BlockchainBulletin || !channelId) return;

        let admins = [];
        let posts = [];
        let managers = [];

        try {
            admins = await BlockchainBulletin.getAdmins();
            posts = await BlockchainBulletin.getPosts(channelId);
            managers = await BlockchainBulletin.getManagers(channelId);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }

        setAdmins(admins);
        setPosts([...posts].reverse());
        setManagers(managers);
    }

    useEffect(() => {
        getData();
    }, [BlockchainBulletin, channelId]);

    useEffect(() => {
        if (!account) {
            setIsAdmin(false);
            return;
        }

        setIsAdmin(admins.map(x => x.toUpperCase()).includes(account.toUpperCase()));
    }, [admins, account]);

    useEffect(() => {
        if (!account) {
            setIsAdmin(false);
            return;
        }

        setIsManager(managers.map(x => x.toUpperCase()).includes(account.toUpperCase()));
    }, [managers, account]);

    const isAuthorized = isAdmin || isManager;

    return (
        <>
            {account ?
                <div className='h-full'>
                    <div className='min-h-[4em] flex justify-start items-center p-5 bg-slate-800'>
                        <div>
                            {isAuthorized ? <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500" onClick={() => { setManagePost(!managePost); setManageManager(false); }}>Create Post</button> : null}
                            {isAuthorized ? <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500" onClick={() => { setManageManager(!manageManager); setManagePost(false); }}>Manage Managers</button> : null}
                        </div>
                        {managePost && !manageManager ?
                            <>
                                <div className='fixed h-screen w-screen bg-slate-900 bg-opacity-50 top-0 left-0 duration-500 z-10' onClick={() => setManagePost(false)} />
                                <div className='bg-white fixed rounded-md w-1/4 h-[min-content] left-[37.5%] top-[30%] p-10 grid gap-5 grid-rows-[min-content_min-content_min-content_min-content] z-10'>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Identifier:</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={newPost.identifier} onChange={e => setNewPost({ ...newPost, identifier: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Message:</label>
                                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={newPost.message} onChange={e => setNewPost({ ...newPost, message: e.target.value })} />
                                    </div>
                                    <button onClick={createPost} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Create New Post</button>
                                    <button onClick={() => setManagePost(false)} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Cancel</button>
                                </div>
                            </>
                            : null}
                        {manageManager && !managePost ?
                            <>
                                <div className='fixed h-screen w-screen bg-slate-900 bg-opacity-50 top-0 left-0 duration-500 z-10' onClick={() => setManageManager(false)} />
                                <div className='bg-white fixed rounded-md w-1/4 h-[min-content] left-[37.5%] top-[30%] p-10 grid gap-5 grid-rows-[min-content_min-content_min-content_min-content_min-content] z-10'>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">New Manager Address</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={newManager} onChange={e => setNewManager(e.target.value)} />
                                    </div>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500' onClick={addManager}>Make Manager</button>
                                    {managers.length > 1 ?
                                        <>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium">Select a Manager to Remove:</label>
                                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={deleteManager} onChange={(e) => setDeleteManager(e.target.value)}>
                                                    <option value=""></option>
                                                    {managers.map(manager => manager.toUpperCase() != account.toUpperCase() && <option key={manager} value={manager}>{manager}</option>)}
                                                </select>
                                            </div>
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500' onClick={removeManager}>
                                                Remove Manager
                                            </button>
                                        </> : null}
                                    <button onClick={() => setManageManager(false)} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full duration-500'>Exit</button>
                                </div>
                            </>
                            : null}
                    </div>
                    <div className="flex flex-row flex-wrap">
                        {posts.map(post => (
                            <div className='m-4 p-4 shadow-lg rounded-md border w-full relative' key={post[0]}>
                                <div className="text-2xl font-bold mb-3">
                                    {ethers.utils.parseBytes32String(post[0])}
                                </div>
                                <div>
                                    {post[2]}
                                </div>
                                <div className='my-3 text-sm italic'>
                                    Posted by {post[3]}
                                </div>
                                <span className="block text-xs absolute bottom-1 right-3">creation timestamp: {post[1].toNumber()}</span>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className='bg-orange-600 font-bold text-3xl flex flex-row justify-center items-center h-full text-white'>
                    <span className='drop-shadow-2xl shadow-sky-900'>Connect to MetaMask to begin using Blockchain Bulletin!</span>
                </div>
            }
        </>
    )
}
