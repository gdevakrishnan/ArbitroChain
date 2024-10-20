async function main() {
  const grullTokenAddress = "0xE890f155432a67C6DE6db70fa2560fEd0a26934a";

  const ArbitroChain = await ethers.getContractFactory("ArbitroChain");
  const arbitrChain = await ArbitroChain.deploy(grullTokenAddress);

  console.log("Deployed Contract Address:", await arbitrChain.getAddress());
}
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });