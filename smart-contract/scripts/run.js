const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
	const gameContract = await gameContractFactory.deploy(
	  ["Togepi", "Vaporeon", "Piplup"],       // Names
	  ["https://i.imgur.com/Ccw1St6.png", // Images
	  "https://i.imgur.com/dofLAft.png", 
	  "https://i.imgur.com/lMLHmrs.png"],
	  [100, 500, 300],                    // HP values
	  [150, 200, 100],                       // Attack damage values
	  "Mew", // Boss name
	  "https://i.imgur.com/a3IKWCz.png", // Boss image
	  10000, // Boss hp
	  50 // Boss attack damage
	);
	await gameContract.deployed();
	console.log("Contract deployed to:", gameContract.address);

	let txn;
  	// We only have three characters.
  	// an NFT w/ the character at index 2 of our array.
  	txn = await gameContract.mintCharacterNFT(2);
  	await txn.wait();

	txn = await gameContract.attackBoss();
	await txn.wait();

	txn = await gameContract.attackBoss();
	await txn.wait();
		
  	//// Get the value of the NFT's URI.
  	//let returnedTokenUri = await gameContract.tokenURI(1);
  	//console.log("Token URI:", returnedTokenUri);
  };
  
  const runMain = async () => {
	try {
	  await main();
	  process.exit(0);
	} catch (error) {
	  console.log(error);
	  process.exit(1);
	}
  };
  
  runMain();