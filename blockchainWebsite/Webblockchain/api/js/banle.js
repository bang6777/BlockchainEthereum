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
function addbanle() {
	if ($('#InsertBanleform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = $('#InsertBanleform #idsanphambanle p').text();
            var cosobanle = $("#nguoibanle").val();
            var noibanleden =$("#noibanle").val();
            var cachthucbanle =$("#cachthucbanle").val();
            var baoquanbanle =$("#baoquanbanle").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn tất";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            console.log(id);
            batch.add(sanphamInstance.methods.insertbanle(id,cosobanle,noibanleden,cachthucbanle,baoquanbanle)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(cosobanle);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(cosobanle);
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
    $('#paginationbanle').html('')
    var table = '#banle';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#banle tbody tr').length;
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
            $('#paginationbanle').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationbanle li:first-child').addClass('active')
    $('#paginationbanle li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationbanle li').removeClass('active')
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
    listbanleManagement();
    $(document).ready(function () {
        var table = '#banle';
        var totalRows = $('#banle tbody tr').length;
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
//modal view banle
function viewbanle(id) {
    console.log(id);
    banleInstance.methods.getbanle(id).call().then(function (result) {
         
            var table = `<tr>
                                      
                                            <td>` + result[0] + `</td>
                                       
                                            <td>` + result[1] + `</td>
                                        
                                           
                                            <td>` + result[2] + `</td>
                                        
                                  
                                            <td>` + result[3] + `</td>
                                       
                                            <td>` + result[4] + `</td>

                                            <td>` + result[4] + `</td>
                                        </tr>`;
            $("#banle").find("tbody").html(table);
        })
    
}
//Danh sach cay giong
function listbanleManagement() {
    var table = "";
    sanphamInstance.methods.getsanphamCount().call().then(function (count) {
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addr) {
                sanphamInstance.methods.getbanle(addr).call().then(function (result) {
                    sanphamInstance.methods.getsanpham(addr).call().then(function (resultsanpham) {
                      
                        // console.log(result1);
                        if(resultsanpham[5]=="Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua, phân phối"){
                            table += `<tr>
                                        <td>
                                        <button class="btn btn-success btn-xs"
                                        data-toggle="modal" data-target="#InsertBanleform"
                                        onclick="insertbanle(\`` + result[0] + `\`)" >
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
                                        <td>`  + resultsanpham[3] + `</td>
                                        <td>`  + resultsanpham[4] + `</td>
                                        <td>`  + resultsanpham[5] + `</td>
                                            
                                    </tr>`;
                        $("#banle").find("tbody").html(table);
                        }
                        else if(resultsanpham[5]=="Hoàn tất"){
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updatebanleModal"
                                        onclick="frontUpdatebanle(
                                            
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
                                        <td>`  + resultsanpham[3] + `</td>
                                        <td>`  + resultsanpham[4] + `</td>
                                        <td>`  + resultsanpham[5] + `</td>
                                            
                                    </tr>`;
                        $("#banle").find("tbody").html(table);
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
        batch.add(banleInstance.methods.updatetencay(address, fullName, modifiedTime)
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
                $("#frontUpdatebanle").hide();
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
function updatecosobanlejs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatecosobanle .modal-body p').text();
        var cosobanle = $('#valueUpdatecosobanle').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(banleInstance.methods.updatecosobanle(address, cosobanle, modifiedTime)
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
                $("#updatecosobanle").hide();
                $("#frontUpdatebanle").hide();
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
function updatenoibanledenjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatenoibanleden .modal-body p').text();
        var noibanleden = $('#valueUpdatenoibanleden').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(banleInstance.methods.updatenoibanleden(address, noibanleden, modifiedTime)
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
                $("#updatenoibanleden").hide();
                $("#frontUpdatebanle").hide();
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
function updatecachthucbanlejs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatecachthucbanle .modal-body p').text();
        var cachthucbanle = $('#valueUpdatecachthucbanle').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(banleInstance.methods.updatecachthucbanle(address, cachthucbanle, modifiedTime)
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
                $("#updatecachthucbanle").hide();
                $("#frontUpdatebanle").hide();
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
        batch.add(banleInstance.methods.updatedonggoi(address, donggoi, modifiedTime)
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
                $("#frontUpdatebanle").hide();
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
        batch.add(banleInstance.methods.updatenoibanleden(address, soluong, modifiedTime)
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
                $("#frontUpdatebanle").hide();
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
        batch.add(banleInstance.methods.updatenoibanleden(address, baoquan, modifiedTime)
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
                $("#frontUpdatebanle").hide();
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
function insertbanle(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertBanleform").find("#idsanphambanle").html(parag);
}
function createUpdatetencay(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatetencay").find(".modal-body2").html(parag);
}

function createUpdatecosobanle(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatecosobanle").find(".modal-body2").html(parag);
}
function createUpdatenoibanleden(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatenoibanleden").find(".modal-body2").html(parag);
}
function createUpdatecachthucbanle(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatecachthucbanle").find(".modal-body2").html(parag);
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
function frontUpdatebanle(address, tensanpham, cosobanle, noibanleden, cachthucbanle, donggoi,soluong,baoquan, isLocked) {
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
                    <td id="kvtrong">`+ cosobanle + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatecosobanle"
                        onclick="createUpdatecosobanle(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Người  Trồng</th>
                    <td id="noibanleden">`+ noibanleden + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatenoibanleden"
                        onclick="createUpdatenoibanleden(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Phân bón</th>
                    <td id="pb">`+ cachthucbanle + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatecachthucbanle"
                        onclick="createUpdatecachthucbanle(\`` + address + `\`)" >
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
    $("#updatebanleModal").find("tbody").html(table);
}