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
function addcayantrai() {
	if ($('#InsertCayantraiform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = $('#InsertCayantraiform #idsanphamcayantrai p').text();
            var khuvuctrong = $("#khuvuctrongcayantrai").val();
            var nguoitrong =$("#nguoitrongcayantrai").val();
            var phanbon =$("#phanboncayantrai").val();
            var thoivu =$("#thoivucayantrai").val();
            var soluong = $("#soluongcayantrai").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn thành giai đoạn cây giống, cây ăn trái";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            console.log(id);
            batch.add(sanphamInstance.methods.insertcayantrai(id,khuvuctrong,nguoitrong,phanbon,thoivu,soluong)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(khuvuctrong);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(khuvuctrong);
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
    $('#paginationcayantrai').html('')
    var table = '#cayantrai';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#cayantrai tbody tr').length;
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
            $('#paginationcayantrai').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationcayantrai li:first-child').addClass('active')
    $('#paginationcayantrai li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationcayantrai li').removeClass('active')
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
    listcayantraiManagement();
    $(document).ready(function () {
        var table = '#cayantrai';
        var totalRows = $('#cayantrai tbody tr').length;
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
//modal view cayantrai
function viewcayantrai(id) {
    console.log(id);
    cayantraiInstance.methods.getcayantrai(id).call().then(function (result) {
         
            var table = `<tr>
                                      
                                            <td>` + result[0] + `</td>
                                       
                                            <td>` + result[1] + `</td>
                                        
                                           
                                            <td>` + result[2] + `</td>
                                        
                                  
                                            <td>` + result[3] + `</td>
                                       
                                            <td>` + result[4] + `</td>

                                            <td>` + result[4] + `</td>
                                        </tr>`;
            $("#cayantrai").find("tbody").html(table);
        })
    
}
//Danh sach cay giong
function listcayantraiManagement() {
    var table = "";
    sanphamInstance.methods.getsanphamCount().call().then(function (count) {
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addr) {
                sanphamInstance.methods.getcayantrai(addr).call().then(function (result) {
                    sanphamInstance.methods.getsanpham(addr).call().then(function (resultsanpham) {
                      
                        // console.log(result1);
                        if(resultsanpham[5]=="Hoàn thành giai đoạn cây giống"){
                            table += `<tr>
                                        <td>
                                        <button class="btn btn-success btn-xs"
                                        data-toggle="modal" data-target="#InsertCayantraiform"
                                        onclick="insertCayantrai(\`` + addr + `\`)" >
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
                        $("#cayantrai").find("tbody").html(table);
                        }
                        else if(resultsanpham[5]=="Hoàn thành giai đoạn cây giống, cây ăn trái"){
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updatecayantraiModal"
                                        onclick="frontUpdatecayantrai(
                                            
                                            \`` + result[0] + `\`,
                                            \`` + resultsanpham[1] + `\`,
                                            \`` + result[1] + `\`,
                                            \`` + result[2] + `\`,
                                            \`` + result[3] + `\`,
                                            \`` + result[4] + `\`,
                                            \`` + result[5] + `\`,
                                                
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
                        $("#cayantrai").find("tbody").html(table);
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
        batch.add(cayantraiInstance.methods.updatetencay(address, fullName, modifiedTime)
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
                $("#frontUpdatecayantrai").hide();
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
function updatekhuvuctrongjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatekhuvuctrong .modal-body p').text();
        var khuvuctrong = $('#valueUpdatekhuvuctrong').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(cayantraiInstance.methods.updatekhuvuctrong(address, khuvuctrong, modifiedTime)
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
                $("#updatekhuvuctrong").hide();
                $("#frontUpdatecayantrai").hide();
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
function updatenguoitrongjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatenguoitrong .modal-body p').text();
        var nguoitrong = $('#valueUpdatenguoitrong').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(cayantraiInstance.methods.updatenguoitrong(address, nguoitrong, modifiedTime)
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
                $("#updatenguoitrong").hide();
                $("#frontUpdatecayantrai").hide();
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
function updatephanbonjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatephanbon .modal-body p').text();
        var phanbon = $('#valueUpdatephanbon').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(cayantraiInstance.methods.updatephanbon(address, phanbon, modifiedTime)
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
                $("#updatephanbon").hide();
                $("#frontUpdatecayantrai").hide();
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
function updatethoivujs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatethoivu .modal-body p').text();
        var thoivu = $('#valueUpdatethovu').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(cayantraiInstance.methods.updatethoivu(address, thoivu, modifiedTime)
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
                $("#updatethoivu").hide();
                $("#frontUpdatecayantrai").hide();
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
        batch.add(cayantraiInstance.methods.updatenguoitrong(address, soluong, modifiedTime)
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
                $("#frontUpdatecayantrai").hide();
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
function updatedientichjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatedientich .modal-body p').text();
        var dientich = $('#valueUpdatedientich').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(cayantraiInstance.methods.updatenguoitrong(address, dientich, modifiedTime)
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
                $("#updatedientich").hide();
                $("#frontUpdatecayantrai").hide();
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
function insertCayantrai(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertCayantraiform").find("#idsanphamcayantrai").html(parag);
}
function createUpdatetencay(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatetencay").find(".modal-body2").html(parag);
}

function createUpdatekhuvuctrong(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatekhuvuctrong").find(".modal-body2").html(parag);
}
function createUpdatenguoitrong(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatenguoitrong").find(".modal-body2").html(parag);
}
function createUpdatephanbon(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatephanbon").find(".modal-body2").html(parag);
}
function createUpdatethoivu(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatethoivu").find(".modal-body2").html(parag);
}
function createUpdatesoluong(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatesoluong").find(".modal-body2").html(parag);
}
function createUpdatedientich(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatedientich").find(".modal-body2").html(parag);
}
function createUpdateisLock(address) {
    var parag = `<p>` + address + `</p>`;
    $("#trangthai").find(".modal-body2").html(parag);
}
//model update school
function frontUpdatecayantrai(address, tensanpham, khuvuctrong, nguoitrong, phanbon, thoivu,soluong,dientich, isLocked) {
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
                    <td id="kvtrong">`+ khuvuctrong + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatekhuvuctrong"
                        onclick="createUpdatekhuvuctrong(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Người  Trồng</th>
                    <td id="nguoitrong">`+ nguoitrong + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatenguoitrong"
                        onclick="createUpdatenguoitrong(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Phân bón</th>
                    <td id="pb">`+ phanbon + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatephanbon"
                        onclick="createUpdatephanbon(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Thời vụ</th>
                    <td id="tv">`+ thoivu + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatethoivu"
                        onclick="createUpdatethoivu(\`` + address + `\`)" >
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
                    <td id="sl">`+ dientich + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatedientich"
                        onclick="createUpdatedientich(\`` + address + `\`)" >
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
    $("#updatecayantraiModal").find("tbody").html(table);
}