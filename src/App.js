import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import donationABI from "./DonationABI.json";

const contractAddress = "0xa454A09b7F1d061e89e73929130345349601DAc8"; // contract bạn đã deploy

function App() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [totalDonations, setTotalDonations] = useState("0");

  useEffect(() => {
    loadTotalDonations();
  }, []);

  async function connectWallet() {
    const provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Vui lòng cài MetaMask hoặc Celo Wallet Extension!");
    }
  }

  async function donate() {
    if (!account || !amount) return alert("Nhập số CELO muốn donate");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, donationABI, signer);

    const tx = await contract.donate({
      value: ethers.parseEther(amount)
    });
    await tx.wait();

    alert("Gửi thành công!");
    loadTotalDonations();
  }

  async function loadTotalDonations() {
    const provider = new ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org/");
    const contract = new ethers.Contract(contractAddress, donationABI, provider);
    const total = await contract.getDonations();
    setTotalDonations(ethers.formatEther(total));
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎁 Celo Donation DApp</h1>
      {account ? (
        <p>Ví đang kết nối: {account}</p>
      ) : (
        <button onClick={connectWallet}>Kết nối ví</button>
      )}

      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Số CELO muốn donate"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={donate}>Donate</button>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Tổng số CELO donate: {totalDonations} CELO
      </h2>
    </div>
  );
}

export default App;
