pragma solidity >= 0.4.0 <0.7.0 ;
pragma experimental ABIEncoderV2;

contract KYC {
address govt;


//Strunct to define the citizen attributes
struct citizensDetails {
    address id;
    string name;
    string aadhar;
    string homeAddr;
    address[] allowed;
    }

mapping(address => citizensDetails) public kycDatabase;
address[] public citizensAdded;
uint counter;
//event LogCitizenAddr(address _addr);

constructor () public {
    govt = msg.sender;
    }

function addCitezenDetails(address _id,string memory _name, string memory _aadhar,string memory _homeAddr) public  returns (bool success) {
    citizensDetails memory citizensDetail;

    citizensDetail.id = _id; //msg.sender;
    citizensDetail.name = _name;
    citizensDetail.aadhar = _aadhar;
    citizensDetail.homeAddr = _homeAddr;
 
    kycDatabase[_id] =citizensDetail;
    citizensAdded.push(_id);
    //counter++
    return true;
    }

//Functrion to set allowed address to be retrieved by thirdparty 
function addAllowed(address _id) public  returns (bool success) {
    kycDatabase[msg.sender].allowed.push(_id);
    return true;
    }

//Function to get all citizen address for reference by govt
function getAllCitizenAddress() view public  returns(address[] memory){
    return citizensAdded;
    }

//Function to get Citizen details by addresss by govt
function getCitizenDetailsbyAddress(address _id) view public  returns (citizensDetails memory ){
      return kycDatabase[_id];
    }


// Function to get single user details - havea a condition to check if msg sender is there in allowed array for thirdparty

    function getCitizenAddrbyChecking(address _id) view public returns (citizensDetails memory ){ 
       for(uint i = 0; i < citizensAdded.length; i++) {
     if(kycDatabase[_id].allowed[i] == msg.sender) {
       return kycDatabase[_id];
        }
     }
}   

}