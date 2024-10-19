async function main() {
    const token = await ethers.deployContract("GrullToken");
    console.log("Deployed Token Address:", await token.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });