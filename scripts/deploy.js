async function main() {
  const grullTokenAddress = "0x22C4B11b1F5860DB0FAe0200c707b763f84fD4F4";

  const ArbitroChain = await ethers.getContractFactory("ArbitroChain");
  const arbitrChain = await ArbitroChain.deploy(grullTokenAddress);

  console.log("Deployed Contract Address:", await arbitrChain.getAddress());
}
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });