var sanpham = artifacts.require("./Sanpham");
var user = artifacts.require("./User");
module.exports = function(deployer){
	deployer.deploy(sanpham);
	deployer.deploy(user);
};

