if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/254c4bff32bb42aead82bc5a2013286c"));
}



ethereum.enable();
var sanphamInstance = new web3.eth.Contract(sanphamABI, "0x09d0e2BFf2cd905beD635551013DD16846650596");
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;
function createqr(address, idqr){
                    sanphamInstance.methods.getsanpham(address).call().then(function (resultsanpham) {
                        if(resultsanpham[5] == "Hoàn tất"){
                            var qrcode = new QRCode("id_qrcode", {text:idqr,width:300,height:300,	colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.L});
                        }
                        else {
                           
                            $("#id_qrcode").html("Sản phẩm chưa hoàn tất không thể tạo mã qr");
                         }
                    })
                    }

$(window).on('load', function () {
    listqrcode();
})
function listqrcode() {
    var table = "";
    sanphamInstance.methods.getsanphamCount().call().then(function (count){
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addrsanpham) {
                sanphamInstance.methods.getsanpham(addrsanpham).call().then(function (resultsanpham) {
                        // console.log(result1);
                        var idqrcode = resultsanpham[0];
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#qrcode"
                                        onclick="createqr(\`` + addrsanpham + `\`,
                                            \`` + idqrcode + `\`)">
                                        <i class="far fa-edit"></i>
                                                create
                                        </button>
                                        </td>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>` + resultsanpham[1] + `</td>
                                        <td>` + resultsanpham[5] + `</td>
                                       
                                    </tr>`;
                        $("#createqrModal").find("tbody").html(table);
                                        
            
                    })
                })
        }
    })
}
