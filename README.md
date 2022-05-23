<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/zaidallam/Blockchain-Bulletin">
    <img src="./logo.png" alt="Logo" width="600" height="82">
  </a>

  <h3 align="center">Blockchain Bulletin</h3>

  <p align="center">
    Decentralized message board dApp using the Truffle Suite, Next, and Ethers
    <br />
    <a href="https://github.com/zaidallam/Blockchain-Bulletin"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

## About The Project

This is a concept dApp that allows users to participate in mass, decentralized communication through a channel-based bulletin board. The bulletin board is comprised of customizable channels, which are, in turn, comprised of posts that contain a title, message, and even resource URL. The project features a basic permissions system that dictates which accounts are allowed to modify certain data, including channels, posts, and even other address' permissions. 
This is a two-page concept project that was built using several fameworks and libraries, including but not limited to the Truffle Suite, Ethers, Next, and Tailwind.
The project is meant to showcase how smart contracts may be used manage a bulletin board in a decentralized manner. This means that, as far as the UI goes, it is still missing some polishing such as loading animations, double-request protection, input validation, and other similar features. These features were deemed unnecessary for the purposes of this concept project. That said, the project still has an aesthetic but simple frontend.
This project and its code were engineered solely by Zaid Allam.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Truffle Suite](https://github.com/trufflesuite)
* [Ethers](https://github.com/ethers-io/ethers.js/)
* [Next](https://github.com/vercel/next.js/)
* [Tailwind](https://github.com/tailwindlabs/tailwindcss)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Getting started is easy. Simply download the repository and run `npm i` in both the `/client` and `/blockchain` directories. Then, open two separate terminals.
In the second terminal, navigate to the blockchain directory and run `truffle migrate`. Once that has completed, run `truffle deploy` and keep note of the Blockchain Bulletin contract deployment address. Finally, run `truffle develop`.
In the first terminal, navigate to the client directory. Before running `npm run dev` or `npm run build`, navigate to `./constants.js` and add the address of your instance of the Blockchain Bulletin contract.
Finally, once all the above steps have been compeleted, launch your browser and open localhost:3000. You should be all set!

## Prerequisites

This project requires you to have Node.js and npm installed on your system.

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

See the developer's portfolio, zaidallam.com, for contact info.

<p align="right">(<a href="#top">back to top</a>)</p>