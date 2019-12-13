if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/6e2f01b49b384897a521b1ecbba415cd"));
}
ethereum.enable();
var sanphamInstance = new web3.eth.Contract(sanphamABI, "0x09d0e2bff2cd905bed635551013dd16846650596");
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;
function addphanphoi() {
	if ($('#InsertPhanphoiform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = $('#InsertPhanphoiform #idsanphamphanphoi p').text();
            var cosophanphoi = $("#cosophanphoi").val();
            var noiphanphoiden =$("#noiphanphoiden").val();
            var cachthucphanphoi =$("#cachthucphanphoi").val();
            var donggoi =$("#donggoi").val();
            var baoquan =$("#baoquan").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua, phân phối";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            console.log(id);
            batch.add(sanphamInstance.methods.insertphanphoi(id,cosophanphoi,noiphanphoiden,cachthucphanphoi,donggoi,baoquan)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(cosophanphoi);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(cosophanphoi);
                        // console.log("OK Loi~");
                        alert("Vui lòng cập nhật lại trạng thái sản phẩm")
                    }
                }
            ));
            batch.add(sanphamInstance.methods.updatetrangthai(id, thoigianchinhsua,trangthai)
            .send({ from: ac },
                function (error, result) {
                    try {
                        if (error.message.includes("San phẩm denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        //console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#addUsers").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thêm thành công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                location.reload();
            })
            .on('error', console.err)
        );
            try {
                batch.execute();
                if (error.message.includes("JSONRPC method should be specified for params:")) {
                    console.log("Đã fix lỗi.");
                }
            }
            catch (err) {
                console.log("Đã fix lỗi.");
            }
        })
    }
}

function pag() {
    $('#paginationphanphoi').html('')
    var table = '#phanphoi';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#phanphoi tbody tr').length;
    // console.log(totalRows);
    $(table + ' tr:gt(0)').each(function () {
        trnum++
        if (trnum > maxRows) {
            $(this).hide()
        }
        if (trnum <= maxRows) {
            $(this).show()
        }
    })
    if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows)
        for (var i = 1; i <= pagenum;) {
            $('#paginationphanphoi').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationphanphoi li:first-child').addClass('active')
    $('#paginationphanphoi li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationphanphoi li').removeClass('active')
        $(this).addClass('active')
        $(table + ' tr:gt(0)').each(function () {
            trIndex++
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    })
}
// load page
$(window).on('load', function () {
    listphanphoiManagement();
    $(document).ready(function () {
        var table = '#phanphoi';
        var totalRows = $('#phanphoi tbody tr').length;
        var maxRows=5;
        setTimeout(pag, 4000);
        if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows)
                for (var i = 1; i <= pagenum;) {
                    $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.pagination li:first-child').addClass('active')
            $('.pagination li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.pagination li').removeClass('active')
                $(this).addClass('active')
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++
                    if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                })
            })
        })
    });
//modal view phanphoi
function viewphanphoi(id) {
    console.log(id);
    phanphoiInstance.methods.getphanphoi(id).call().then(function (result) {
         
            var table = `<tr>
                                      
                                            <td>` + result[0] + `</td>
                                       
                                            <td>` + result[1] + `</td>
                                        
                                           
                                            <td>` + result[2] + `</td>
                                        
                                  
                                            <td>` + result[3] + `</td>
                                       
                                            <td>` + result[4] + `</td>

                                            <td>` + result[4] + `</td>
                                        </tr>`;
            $("#phanphoi").find("tbody").html(table);
        })
    
}
//Danh sach cay giong
function listphanphoiManagement() {
    var table = "";
    sanphamInstance.methods.getsanphamCount().call().then(function (count) {
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addr) {
                sanphamInstance.methods.getphanphoi(addr).call().then(function (result) {
                    sanphamInstance.methods.getsanpham(addr).call().then(function (resultsanpham) {
                      
                        // console.log(result1);
                        if(resultsanpham[5]=="Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua"){
                            table += `<tr>
                                        <td>
                                        <button class="btn btn-success btn-xs"
                                        data-toggle="modal" data-target="#InsertPhanphoiform"
                                        onclick="insertphanphoi(\`` + result[0] + `\`)" >
                                        <i class="far fa-edit"></i>
                                            Insert
                                        </button>
                                        </td>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>`  + resultsanpham[1] + `</td>
                                        <td>`   + result[1] + `</td>
                                        <td>`   + result[2] + `</td>
                                        <td>`   + result[3] + `</td>
                                        <td>`   + result[4] + `</td>
                                        <td>`   + result[5] + `</td>
                                        <td>`   + result[6] + `</td>
                                        <td>`  + resultsanpham[3] + `</td>
                                        <td>`  + resultsanpham[4] + `</td>
                                        <td>`  + resultsanpham[5] + `</td>
                                            
                                    </tr>`;
                        $("#phanphoi").find("tbody").html(table);
                        }
                        else if(resultsanpham[5]=="Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua, phân phối"){
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updatephanphoiModal"
                                        onclick="frontUpdatephanphoi(
                                            
                                            \`` + result[0] + `\`,
                                            \`` + resultsanpham[1] + `\`,
                                            \`` + result[1] + `\`,
                                            \`` + result[2] + `\`,
                                            \`` + result[3] + `\`,
                                            \`` + result[4] + `\`,
                                            \`` + result[5] + `\`,
                                            \`` + result[6] + `\`,

                                            \`` + resultsanpham[5] + `\`
                                            )" >
                                        <i class="far fa-edit"></i>
                                            update
                                        </button>
                                        </td>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>`  + resultsanpham[1] + `</td>
                                        <td>`   + result[1] + `</td>
                                        <td>`   + result[2] + `</td>
                                        <td>`    + result[3] + `</td>
                                        <td>`   + result[4] + `</td>
                                        <td>`  + result[5] + `</td>
                                        <td>`   + result[6] + `</td>
                                        <td>`  + resultsanpham[3] + `</td>
                                        <td>`  + resultsanpham[4] + `</td>
                                        <td>`  + resultsanpham[5] + `</td>
                                            
                                    </tr>`;
                        $("#phanphoi").find("tbody").html(table);
                                        }
                    })
                })
            })
        }
    })
}
//Update
function updatetencayjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatetencay .modal-body p').text();
        var fullName = $('#valueUpdatetencay').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatetencay(address, fullName, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatetencay").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatecosophanphoijs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatecosophanphoi .modal-body p').text();
        var cosophanphoi = $('#valueUpdatecosophanphoi').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatecosophanphoi(address, cosophanphoi, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatecosophanphoi").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatenoiphanphoidenjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatenoiphanphoiden .modal-body p').text();
        var noiphanphoiden = $('#valueUpdatenoiphanphoiden').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatenoiphanphoiden(address, noiphanphoiden, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatenoiphanphoiden").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatecachthucphanphoijs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatecachthucphanphoi .modal-body p').text();
        var cachthucphanphoi = $('#valueUpdatecachthucphanphoi').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatecachthucphanphoi(address, cachthucphanphoi, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatecachthucphanphoi").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatedonggoijs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatedonggoi .modal-body p').text();
        var donggoi = $('#valueUpdatethovu').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatedonggoi(address, donggoi, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatedonggoi").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatesoluongjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatesoluong .modal-body p').text();
        var soluong = $('#valueUpdatesoluong').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatenoiphanphoiden(address, soluong, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatesoluong").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
function updatebaoquanjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatebaoquan .modal-body p').text();
        var baoquan = $('#valueUpdatebaoquan').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(phanphoiInstance.methods.updatenoiphanphoiden(address, baoquan, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("Cay giong denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#updatebaoquan").hide();
                $("#frontUpdatephanphoi").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thành Công!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}
//modal comfirm update
function insertphanphoi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertPhanphoiform").find("#idsanphamphanphoi").html(parag);
}
function createUpdatetencay(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatetencay").find(".modal-body2").html(parag);
}

function createUpdatecosophanphoi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatecosophanphoi").find(".modal-body2").html(parag);
}
function createUpdatenoiphanphoiden(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatenoiphanphoiden").find(".modal-body2").html(parag);
}
function createUpdatecachthucphanphoi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatecachthucphanphoi").find(".modal-body2").html(parag);
}
function createUpdatedonggoi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatedonggoi").find(".modal-body2").html(parag);
}
function createUpdatesoluong(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatesoluong").find(".modal-body2").html(parag);
}
function createUpdatebaoquan(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatebaoquan").find(".modal-body2").html(parag);
}
function createUpdateisLock(address) {
    var parag = `<p>` + address + `</p>`;
    $("#trangthai").find(".modal-body2").html(parag);
}
//model update school
function frontUpdatephanphoi(address, tensanpham, cosophanphoi, noiphanphoiden, cachthucphanphoi, donggoi,soluong,baoquan, isLocked) {
    var table = "";
    table += `<tr>
                    <th>Address</th>
                    <td id="tdAddress">`+ address + `</td>
                    <td></td>
                <tr>
                    <th>Tên sản phẩm</th>
                    <td id="tdFullName">`+ tensanpham + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatetencay"
                        onclick="createUpdatetencay(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                
                <tr>
                    <th>Khu vưc trồng</th>
                    <td id="kvtrong">`+ cosophanphoi + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatecosophanphoi"
                        onclick="createUpdatecosophanphoi(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Người  Trồng</th>
                    <td id="noiphanphoiden">`+ noiphanphoiden + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatenoiphanphoiden"
                        onclick="createUpdatenoiphanphoiden(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Phân bón</th>
                    <td id="pb">`+ cachthucphanphoi + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatecachthucphanphoi"
                        onclick="createUpdatecachthucphanphoi(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Thời vụ</th>
                    <td id="tv">`+ donggoi + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatedonggoi"
                        onclick="createUpdatedonggoi(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Số lượng</th>
                    <td id="sl">`+ soluong + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatesoluong"
                        onclick="createUpdatesoluong(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Diện tích</th>
                    <td id="sl">`+ baoquan + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatebaoquan"
                        onclick="createUpdatebaoquan(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ isLocked + `</td>
                    <td></td>
                <tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#updatephanphoiModal").find("tbody").html(table);
}