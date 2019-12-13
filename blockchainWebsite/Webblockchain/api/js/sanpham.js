
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https: //rinkeby.infura.io/v3/6e2f01b49b384897a521b1ecbba415cd"));
}
ethereum.enable();
var sanphamInstance = new web3.eth.Contract(sanphamABI, "0x09d0e2bff2cd905bed635551013dd16846650596");
var userInstance = new web3.eth.Contract(userABI, "0x7926587E80cBd9f713D179EB8B25316b874FB7eB");
function addsanpham() {
	if ($('#Insertsanphamform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
            var temp = web3.eth.accounts.create();
            var id = temp.address;
            var tensanpham = $("#tensanpham").val();
            var anh = $("#anhsanpham").val();
            var thoigiantao= new Date(Date.now()).toLocaleString();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Chưa hoàn thành";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(tensanpham);
            console.log(anh);
            batch.add(sanphamInstance.methods.insertsanpham(id,tensanpham,anh,thoigiantao,thoigianchinhsua,trangthai)
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
                    }
                })
            .on('transactionHash', (hash) => {
                $("#Insertsanphamform").hide();
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
        });
    }
}
function addCaygiong() {
	if ($('#InsertCaygiongform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = $('#InsertCaygiongform #idsanphamcaygiong p').text();
            var khuvuctrong = $("#khuvuctrong").val();
            var nguoitrong =$("#nguoitrong").val();
            var phanbon =$("#phanbon").val();
            var thoivu =$("#thoivu").val();
            var dientich =$("#dientich").val();
            var soluong = $("#soluong").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn thành giai đoạn cây giống";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            console.log(id);
            batch.add(sanphamInstance.methods.insertCaygiong(id,khuvuctrong,nguoitrong,phanbon,thoivu,soluong,dientich)
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
function addcayantrai() {
	if ($('#InsertCayantraiform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
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
                $("#InsertCayantraiform").hide();
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
        });
    }
}
function addthumua() {
	if ($('#InsertThumuaform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
            var id = $('#InsertThumuaform #idsanphamthumua p').text();
            var nguoithumua =$("#nguoithumua").val();
            var noithumua = $("#noithumua").val();
            var cachthucthumua =$("#cachthucthumua").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua"
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            batch.add(sanphamInstance.methods.insertthumua(id,nguoithumua,noithumua,cachthucthumua)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(noithumua);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(noithumua);
                        // console.log("OK Loi~");
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
                $("#Insertthumuaform").hide();
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
        });
    }
}

function addphanphoi() {
	if ($('#InsertPhanphoiform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
            var id = $('#InsertPhanphoiform #idsanphamphanphoi p').text();
            var cosophanphoi =$("#cosophanphoi").val();
            var noiphanphoiden = $("#noiphanphoiden").val();
            var cachthucphanphoi =$("#cachthucphanphoi").val();
            var donggoi =$("#donggoi").val();
            var baoquan =$("#baoquan").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn thành giai đoạn cây giống, cây ăn trái, thu mua, phân phối"
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            batch.add(sanphamInstance.methods.insertphanphoi(id,cosophanphoi,noiphanphoiden,cachthucphanphoi,donggoi,baoquan)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(noiphanphoi);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(noiphanphoi);
                        // console.log("OK Loi~");
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
                $("#Insertphanphoiform").hide();
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
        });
    }
}
function addbanle() {
	if ($('#InsertBanleform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
            var id = $('#InsertBanleform #idsanphambanle p').text();
            var nguoibanle =$("#nguoibanle").val();
            var noibanle = $("#noibanle").val();
            var cachthucbanle =$("#cachthucbanle").val();
            var baoquan =$("#baoquanbanle").val();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var trangthai = "Hoàn tất"
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            batch.add(sanphamInstance.methods.insertbanle(id,nguoibanle,noibanle,cachthucbanle,baoquan)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(noibanle);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(noibanle);
                        // console.log("OK Loi~");
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
                $("#Insertbanleform").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Thêm thành công và cập nhật lại trạng thái cây giống!");
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
        });
    }
}
function pag() {
    $('#paginationsanpham').html('')
    var table = '#sanpham';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#sanpham tbody tr').length;
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
            $('#paginationsanpham').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationsanpham li:first-child').addClass('active')
    $('#paginationsanpham li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationsanpham li').removeClass('active')
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
    listsanphamManagement();
    sortTable($('#sanpham'),'desc');
    //listCaygiongManagement()
    $(document).ready(function () {
        var table = '#sanpham';
        var totalRows = $('#sanpham tbody tr').length;
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
//modal view sanpham
function viewsanpham(id) {
    console.log(id);
    sanphamInstance.methods.getsanpham(id).call().then(function (result) {
         
            var table = `<tr>
                                      
                                            <td>` + result[0] + `</td>
                                       
                                            <td>` + result[1] + `</td>
                                        
                                           
                                            <td>` + result[2] + `</td>
                                        
                                  
                                            <td>` + result[3] + `</td>
                                       
                                            <td>` + result[4] + `</td>

                                            <td>` + result[5] + `</td>
                                        </tr>`;
            $("#sanpham").find("tbody").html(table);
        })
    
}
//Danh sach cay giong
function listsanphamManagement() {
    var table = "";
    sanphamInstance.methods.getsanphamCount().call().then(function (count) {
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addr) {
                sanphamInstance.methods.getsanpham(addr).call().then(function (result) {
                      
                        // console.log(result1);
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#detailsanphamModal"
                                        onclick="frontdetailsanpham(
                                            
                                            \`` + result[0] + `\`,
                                            \`` + result[1] + `\`,
                                            \`` + result[2] + `\`,
                                            \`` + result[3] + `\`,
                                            \`` + result[4] + `\`,
                                            \`` + result[5] + `\`)" >
                                        <i class="far fa-edit"></i>
                                           <span class="glyphicon glyphicon-eye-open"></span>
                                        </button>
                                        <button class="btn btn-danger btn-xs"
                                        data-toggle="modal" data-target="#giaidoanModal"
                                        onclick="frontcacgiaidoan(\`` + result[0] + `\`)"><span class="
                                        glyphicon glyphicon-plus-sign"></span></button>
                                        </td>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>` + result[0] + `</td>
                                        <td>` + result[1] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>` + result[3] + `</td>
                                        <td>` + result[4] + `</td>
                                        <td>` + result[5] + `</td>
                                    </tr>`;
                        $("#sanpham").find("tbody").html(table);
            
                })
            })
        }
    })
}
// function listCaygiongManagement() {
//     var table = "";
//     sanphamInstance.methods.getsanphamCount().call().then(function (count) {
        
//         console.log(count);
//         for (let row = 0; row < count; row++) {
//             sanphamInstance.methods.getsanphamAtIndex(row).call().then(function (addr) {
//                 sanphamInstance.methods.getCaygiong(addr).call().then(function (result) {
                      
//                         // console.log(result1);
//                         table += `<tr>
//                                         <td>
//                                         <button class="btn btn-primary btn-xs"
//                                         data-toggle="modal" data-target="#detailcaygiongModal"
//                                         onclick="frontdetailcaygiong(
                                            
//                                             \`` + result[0] + `\`,
//                                             \`` + result[1] + `\`,
//                                             \`` + result[2] + `\`,
//                                             \`` + result[3] + `\`,
//                                             \`` + result[4] + `\`,
//                                             \`` + result[5] + `\`

//                                            )" >
//                                         <i class="far fa-edit"></i>
//                                             Update
//                                         </button>
//                                         </td>
//                                         <td>` + (parseInt(row) + 1) + `</td>
//                                         <td>` + result[0] + `</td>
//                                         <td>` + result[1] + `</td>
//                                         <td>` + result[2] + `</td>
//                                         <td>` + result[3] + `</td>
//                                         <td>` + result[4] + `</td>
//                                         <td>` + result[5] + `</td>

                                       
//                                     </tr>`;
//                         $("#caygiong").find("tbody").html(table);
            
//                     })
//                 })
//         }
//     })
// }
//Update
function updatetrangthai() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatetrangthai .modal-body p').text();
        var trangthai = $('#valueUpdatetrangthai').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(sanphamInstance.methods.updatetrangthai(address, modifiedTime,trangthai)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("San phẩm denied transaction signature")) {
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
                $("#updateanh").hide();
                $("#frontUpdateanh").hide();
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
function createUpdatetrangthai(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatetrangthai").find(".modal-body2").html(parag);
}
function insertcaygiong(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertCaygiongform").find("#idsanphamcaygiong").html(parag);
}
function insertCayantrai(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertCayantraiform").find("#idsanphamcayantrai").html(parag);
}
function insertthumua(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertThumuaform").find("#idsanphamthumua").html(parag);
}
function insertphanphoi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertPhanphoiform").find("#idsanphamphanphoi").html(parag);
}

function insertbanle(address) {
    var parag = `<p>` + address + `</p>`;
    $("#InsertBanleform").find("#idsanphambanle").html(parag);
}


//model update school
function frontdetailsanpham(address, tencay, anh, createdTime, modifiedTime, isLocked) {
    var table = "";
        sanphamInstance.methods.getCaygiong(address).call().then(function (resultcaygiong) {
            sanphamInstance.methods.getcayantrai(address).call().then(function (resultcayantrai) {
                sanphamInstance.methods.getthumua(address).call().then(function (resultthumua) {
                    sanphamInstance.methods.getphanphoi(address).call().then(function (resultphanphoi) {
                        sanphamInstance.methods.getbanle(address).call().then(function (resultbanle) {
    table += `  <tr>
                    <th>Tên Sản phẩm</th>
                    <td id="tdFullName">`+ tencay + `</td>
                </tr>
                
                <tr>
                    <th>Ảnh sản phẩm</th>
                    <td id="kvtrong">`+ anh + `</td>
                    <td></td>
                </tr>
               
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ isLocked + `</td>
                    <td>
                </td>
                </tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">`+ createdTime + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian thay đổi</th>
                    <td id="tdModifiedTime">`+ modifiedTime + `</td>
                    <td></td>
                </tr>
                <tr> 
                <th>Các giai đoạn sản phẩm</th>
                <td>
                <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#detailcaygiongModal"
                    onclick="frontdetailcaygiong(
                                            
                        \`` + resultcaygiong[0] + `\`,
                        \`` + resultcaygiong[1] + `\`,
                        \`` + resultcaygiong[2] + `\`,
                        \`` + resultcaygiong[3] + `\`,
                        \`` + resultcaygiong[4] + `\`,
                        \`` + resultcaygiong[5] + `\`,
                        \`` + resultcaygiong[6] + `\`

                       )" >
                    <i class="far fa-edit"></i>
                        Giai đoạn cây giống
                </button>
                </td>
                </tr>
                <tr> 
                <th></th>
                <td>
                <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#detailcayantraiModal"
                    onclick="frontdetailcayantrai(
                                            
                        \`` + resultcayantrai[0] + `\`,
                        \`` + resultcayantrai[1] + `\`,
                        \`` + resultcayantrai[2] + `\`,
                        \`` + resultcayantrai[3] + `\`,
                        \`` + resultcayantrai[4] + `\`,
                        \`` + resultcayantrai[5] + `\`

                       )" >
                    <i class="far fa-edit"></i>
                        Giai đoạn cây ăn trái
                </button>
                </td>
                </tr>
                <tr> 
                <th></th>
                <td>
                <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#detailthumuaModal"
                    onclick="frontdetailthumua(
                                            
                        \`` + resultthumua[0] + `\`,
                        \`` + resultthumua[1] + `\`,
                        \`` + resultthumua[2] + `\`,
                        \`` + resultthumua[3] + `\`

                       )" >
                    <i class="far fa-edit"></i>
                        Giai đoạn thu mua
                </button>
                </td>
                </tr>
                <tr> 
                <th></th>
                <td>
                <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#detailphanphoiModal"
                    onclick="frontdetailphanphoi(
                                            
                        \`` + resultphanphoi[0] + `\`,
                        \`` + resultphanphoi[1] + `\`,
                        \`` + resultphanphoi[2] + `\`,
                        \`` + resultphanphoi[3] + `\`,
                        \`` + resultphanphoi[4] + `\`,
                        \`` + resultphanphoi[5] + `\`
                        

                       )" >
                    <i class="far fa-edit"></i>
                        Giai đoạn phân phối
                </button>
                </td>
                </tr>
                <tr> 
                <th></th>
                <td>
                <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#detailbanleModal"
                    onclick="frontdetailbanle(
                                            
                        \`` + resultbanle[0] + `\`,
                        \`` + resultbanle[1] + `\`,
                        \`` + resultbanle[2] + `\`,
                        \`` + resultbanle[3] + `\`,
                        \`` + resultbanle[4] + `\`

                       )" >
                    <i class="far fa-edit"></i>
                        Giai đoạn bán lẻ
                </button>
                </td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailsanphamModal").find("tbody").html(table);
                 })
                })
                })
            })
        })
}

function frontdetailcaygiong(address, khuvuctrongcaygiong, nguoitrongcaygiong, phanboncaygiong, thoivucaygiog, soluongcaygiong,dientichcaygiong) {
    var table = "";
    table += `  <tr>
                    <th>Nhà xản suất cây giống</th>
                    <td id="tdFullName">`+ khuvuctrongcaygiong + `</td>
                </tr>
                
                <tr>
                    <th>Người đại diện cho giai đoạn trồng cây giống</th>
                    <td id="kvtrong">`+ nguoitrongcaygiong + `</td>
                    <td></td>
                </tr>
                <tr>
                <th>Ảnh sản phẩm</th>
                <td id="kvtrong">`+ phanboncaygiong + `</td>
                <td></td>
                </tr>
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ thoivucaygiog + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">`+ soluongcaygiong + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian thay đổi</th>
                    <td id="tdModifiedTime">`+ dientichcaygiong + `</td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailcaygiongModal").find("tbody").html(table);
}
function frontdetailcayantrai(address, khuvuctrongcayantrai, nguoitrongcayatrai, phanboncayantrai, thoivucayantrai, soluongcayantrai) {
    var table = "";
    table += `  <tr>
                    <th>Tên Sản phẩm</th>
                    <td id="tdFullName">`+ khuvuctrongcayantrai + `</td>
                </tr>
                
                <tr>
                    <th>Ảnh sản phẩm</th>
                    <td id="kvtrong">`+ nguoitrongcayatrai + `</td>
                    <td></td>
                </tr>
                <tr>
                <th>Ảnh sản phẩm</th>
                <td id="kvtrong">`+ phanboncayantrai + `</td>
                <td></td>
                </tr>
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ thoivucayantrai + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">`+ soluongcayantrai + `</td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailcayantraiModal").find("tbody").html(table);
}

function frontdetailthumua(address, nguoithumua, noithumua, cachthucthumua) {
    var table = "";
    table += `  <tr>
                    <th>Tên Sản phẩm</th>
                    <td id="tdFullName">`+ nguoithumua + `</td>
                </tr>
                
                <tr>
                    <th>Ảnh sản phẩm</th>
                    <td id="kvtrong">`+ noithumua + `</td>
                    <td></td>
                </tr>
                <tr>
                <th>Ảnh sản phẩm</th>
                <td id="kvtrong">`+ cachthucthumua + `</td>
                <td></td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailthumuaModal").find("tbody").html(table);
}
function frontdetailphanphoi(address, diadiemnhan, diadiemphaphoi, cachthucphanphoi, donggoiphanphoi, baoquanphanphoi) {
    var table = "";
    table += `  <tr>
                    <th>Tên Sản phẩm</th>
                    <td id="tdFullName">`+ diadiemnhan + `</td>
                </tr>
                
                <tr>
                    <th>Ảnh sản phẩm</th>
                    <td id="kvtrong">`+ diadiemphaphoi + `</td>
                    <td></td>
                </tr>
                <tr>
                <th>Ảnh sản phẩm</th>
                <td id="kvtrong">`+ cachthucphanphoi + `</td>
                <td></td>
                </tr>
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ donggoiphanphoi + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">`+ baoquanphanphoi + `</td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailphanphoiModal").find("tbody").html(table);
}
function frontdetailbanle(address, nguoibanle, diadiembanle, cachthucbanle, baoquanbanle) {
    var table = "";
    table += `  <tr>
                    <th>Tên Sản phẩm</th>
                    <td id="tdFullName">`+ nguoibanle + `</td>
                </tr>
                
                <tr>
                    <th>Ảnh sản phẩm</th>
                    <td id="kvtrong">`+ diadiembanle + `</td>
                    <td></td>
                </tr>
                <tr>
                <th>Ảnh sản phẩm</th>
                <td id="kvtrong">`+ cachthucbanle + `</td>
                <td></td>
                </tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">` + baoquanbanle + `</td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#detailbanleModal").find("tbody").html(table);
}
function frontcacgiaidoan(address) {
    var table = "";
    table += `<tr>
                    <th>Giai đoạn 1:</th>
                    <td><button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#InsertCaygiongform"
                    onclick="insertcaygiong(\`` + address + `\`)">Giai đoạn cây giống</button></td>
               </tr>
               <tr>
                    <th>Giai đoạn 2:</th>
                    <td><button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#InsertCayantraiform"
                    onclick="insertCayantrai(\`` + address + `\`)">Giai đoạn cây ăn trái</button></td>
               </tr>
               <tr>
                    <th>Giai đoạn 3:</th>
                    <td><button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#InsertThumuaform"
                    onclick="insertthumua(\`` + address + `\`)">Giai đoạn thu mua</button></td>
               </tr>
               <tr>
                    <th>Giai đoạn 4:</th>
                    <td><button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#InsertPhanphoiform"
                    onclick="insertphanphoi(\`` + address + `\`)">Giai đoạn phân phối</button></td>
               </tr>
               <tr>
                    <th>Giai đoạn 5:</th>
                    <td><button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#InsertBanleform"
                    onclick="insertbanle(\`` + address + `\`)">Giai đoạn bán lẻ</button></td>
               </tr>
                <tr>
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#giaidoanModal").find("tbody").html(table);
}

function sortTable(table, order) {
    var asc = order === 'asc',
        tbody = table.find('tbody');

    tbody.find('tr').sort(function (a, b) {
        if (asc) {
            return $('td:stt', a).text().localeCompare($('td:stt', b).text(), false, { numeric: true });
        } else {
            return $('td:stt', b).text().localeCompare($('td:stt', a).text(), false, { numeric: true });
        }
    }).appendTo(tbody);
}