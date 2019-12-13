if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/254c4bff32bb42aead82bc5a2013286c"));
}
ethereum.enable();
var userInstance = new web3.eth.Contract(userABI, "0x30EA0B253B0db92e20873C0b43f0A151F9392961");
var userloginInstance = new web3.eth.Contract(userloginABI, "0x202A8E34bE521D8cba889A240f3067a542B0e388");
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;

// function dangnhap(){
//     if($('#DangnhapUserform').parsley().validate()){
//         web3.eth.getAccounts(function (error, resultac) {
//         var temp = web3.eth.accounts.create();
//         var id = temp.address;
//         var email= $("#emaildangnhap").val();
//         var pass =$("#passdangnhap").val();
//         var thoigiantao = new Date(Date.now()).toLocaleString();
//         var thoigianchinhsua= new Date(Date.now()).toLocaleString();
//         var batch = new web3.BatchRequest();
//         var ac = resultac[0];
//         batch.add(userloginInstance.methods.insertUserlogin(id,email,pass,thoigiantao,thoigianchinhsua).send({from: ac}))
//         userloginInstance.methods.getUserloginCount().call().then(function (counts){
//         for (let rows = 0; rows < counts; rows++){
//             userloginInstance.methods.getUserloginAtIndex(rows).call().then(function (addrs) {
//                  userloginInstance.methods.getUserlogin(addrs).call().then(function (resultlogin) {
//         userInstance.methods.getUserCount().call().then(function (count) {
//         console.log(count);
//         for (let row = 0; row < count; row++) {
//             userInstance.methods.getUserAtIndex(row).call().then(function (addr) {
//                 userInstance.methods.getUser(addr).call().then(function (result) {
//                             if(result[2] == resultlogin[1] && result[3] == resultlogin[2])
//                         {       
//                                 window.location.replace("http://localhost:8080/indexlogin");  
//                                 var username = result[1]
//                                 $("#usersname").find("p").html(username);
//                                 row = count;                              
//                         }
//                         else {
//                             var ids = row; 
//                         }
//                         if(ids==count-1)
//                         {
//                             alert("Địa chỉ email hoặc mật khẩu không đúng");
//                         }
//                     })
//                 })
//         }
        
//     })
//         })
//      })
//     }})
// })
//  }

// }
// function login(){
//     userloginInstance.methods.getUserloginCount().call().then(function (counts){
//         for (let rows = 0; rows < counts; rows++){
//             userloginInstance.methods.getUserloginAtIndex(rows).call().then(function (addrs) {
//                  userloginInstance.methods.getUserlogin(addrs).call().then(function (resultlogin) {
//         userInstance.methods.getUserCount().call().then(function (count) {
//         console.log(count);
//         for (let row = 0; row < count; row++) {
//             userInstance.methods.getUserAtIndex(row).call().then(function (addr) {
//                 userInstance.methods.getUser(addr).call().then(function (result) {
//                             if(result[2] == resultlogin[1] && result[3] == resultlogin[2])
//                         {
//                                 var username = result[1]
//                                 $("#usersname").find("p").html(username);
//                                 row = count;
//                                 //window.location.replace("http://localhost:8080/indexlogin");                                
//                         }
//                     })
//                 })
//         }
//     })
// })
//             })
//     }})
// }
// //delete quan ly nguoi dung
// function logout() {
//     web3.eth.getAccounts(function (error, result) {
//         userloginInstance.methods.getUserloginCount().call().then(function (counts){
//             for (let rows = 0; rows < counts; rows++){
//                 userloginInstance.methods.getUserloginAtIndex(rows).call().then(function (addrs) {
//                      userloginInstance.methods.getUserlogin(addrs).call().then(function (resultlogin) {
//         var tempId = web3.eth.accounts.create();
//         var randomId = tempId.address;
//         var idHistory = randomId;
//         var account = result[0];
        
//         var degreeKindId = resultlogin[0];
                    
//         var id = degreeKindId.slice(0, 42);
//         var date = new Date(Date.now()).toString();

//         var batch = new web3.BatchRequest();

//         var id1 = degreeKindId.slice(42, degreeKindId.length)
//         var thaoTac = "Xóa loại văn bằng " + id1;
//         batch.add(userloginInstance.methods.deleteUser(id)
//             .send({ from: account },
//            // window.location.replace("http://localhost:8080/home")
//         ));
        
//     })
// })
// }
// }
// )
// })}
function dangnhap(){
        userInstance.methods.getUserCount().call().then(function (count) {
        console.log(count);
        let username=0;
        let row = 0;
        while(row < count && username == 0) {
            userInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                userInstance.methods.getUser(addr).call().then(function (result) {
                    if($('#DangnhapUserform').parsley().validate()){
                        var email= $("#emaildangnhap").val();
                        var pass =$("#passdangnhap").val();
                            if(result[2] == email && result[3] == pass)
                        {       
                                username = result[1];
                                window.location.replace("http://localhost:8080/indexlogin");  
                               // $("#usersname").find("p").html(result[1]);
                                row = count;                              
                        }
                        else {
                            var ids = row; 
                        }
                        if(ids==count-1)
                        {
                            alert("Địa chỉ email hoặc mật khẩu không đúng");
                        }
                    }
                    })

                })
                row++;
        }
        
    })
    return username;
}

$(window).on('load', function () {
    var ten = dangnhap();
    alert(ten);
    $("#usersname").find("p").html(ten);
 });