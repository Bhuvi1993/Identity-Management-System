// import the contract artifact
const kycContract = artifacts.require("KYC");

// test starts here
contract('KYC',  (accounts)  => {
  // predefine the contract instance
  it('should deploy smart contract sucessfully', async() => {
    const kyc= await kycContract.deployed();
    assert (kyc,"Contract was not deployed");
  });

  it('should add citizen detais Members', async () => {

    // Setup 3 accounts citizen1,citizen2,thirdparty1.
    //const accountOne = accounts[0];
    //const accountTwo = accounts[1];
    //const accountThree = accounts[2];

    const kycfun = await kycContract.deployed();
    await kycfun.addCitezenDetails(accounts[1],"Ram","12345","BLR");
    const kycfun1 = await kycfun.getCitizenDetailsbyAddress(accounts[1]);
    
    assert.equal(kycfun1[1], "Ram", "First Name should be Ram");
    assert.equal(kycfun1[2], "12345", "Aadhar should be 12345");
    assert.equal(kycfun1[3], "BLR", "Homeaddr should be BLR");
  });

 it('should add citizen detais Members correctly', async () => {

  const kycfun = await kycContract.deployed();
  await kycfun.addCitezenDetails(accounts[1],"Ram","12345","BLR");
  const kycfun1 = await kycfun.getCitizenDetailsbyAddress(accounts[1]);
  
  assert.notEqual(kycfun1[1], "Madhu", "First Name should be Ram");
  assert.equal(kycfun1[2], "12345", "Aadhar should be 12345");
  assert.equal(kycfun1[3], "BLR", "Homeaddr should be BLR");
});

it('should add allowed address detais to citizens address', async () => {

  const kycallowed = await kycContract.deployed();
  await kycallowed.addCitezenDetails(accounts[1],"Ram","12345","BLR");
  const kycallowed1 = await kycallowed.getCitizenDetailsbyAddress(accounts[1]);
  const kycallowed2 = await kycallowed.addAllowed(accounts[3]);
 // console.log(kycallowed2);
 // await kycallowed3.addAllowed(accounts[3]);
  assert.equal(kycallowed2.address);
  // assert.equal(kycallowed2.tx[]receipt.[5]),'0x88d9a58f32e87A2831563B502ccFCD7e385E1890'}, "Thirdparty accouont address should be account3");
}); 
  
it('should add allowed address detais to citizens address', async () => {

  const kycallowed = await kycContract.deployed();
  await kycallowed.addCitezenDetails(accounts[1],"Ram","12345","BLR");
  const kycallowed1 = await kycallowed.getCitizenDetailsbyAddress(accounts[1]);
  const kycallowed2 = await kycallowed.addAllowed(accounts[3]);
 // console.log(kycallowed2);
  assert.notEqual(kycallowed2,"should add the allowed address to correct citizen address");
  // assert.equal(kycallowed2.tx[]receipt.[5]),'0x88d9a58f32e87A2831563B502ccFCD7e385E1890'}, "Thirdparty accouont address should be account3");
});



//  it('should get allowed address detais to citizens address', async () => {

//   const kycallowed = await kycContract.deployed();
//   await kycallowed.addCitezenDetails(accounts[0],"Ram","12345","BLR");
//   //const kycallowed1 = await kycallowed.getCitizenDetailsbyAddress(accounts[0]);
//   const kycallowed1 = await kycallowed.addAllowed(accounts[3]);
//    console.log(kycallowed1);
//    await kycallowed.getCitizenAddrbyChecking(accounts[0]);
//   // assert.equal(addAllowed.address, accounts[0]);

// });

});
