if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/6e2f01b49b384897a521b1ecbba415cd"));
}
ethereum.enable();
var userInstance = new web3.eth.Contract(userABI, "0x7926587E80cBd9f713D179EB8B25316b874FB7eB");
var userssInstance = new web3.eth.Contract(userABIss, "0xe27d6f4f2138d2105caa5fbfa27d80eb28afe3c5"); 
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;
function adduser() {
	if ($('#Insertuserform').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = temp.address;
            var username =$("#usernamedk").val();
            var email = $("#emaildk").val();
            var password =$("#passworddk").val();
            var gender =$(".gender").val();
            var birthday =$("#birthday").val();
            var sdt =$("#sdtuser").val();
            var diachi = $("#diachi").val();
            var anhdaidien = $("#anhuser").val();
            var thoigiantao= new Date(Date.now()).toLocaleString();
            var thoigianchinhsua= new Date(Date.now()).toLocaleString();
            var roleuser = $("#roleuser").val();
            var batch = new web3.BatchRequest();
            var ac = result[0];
            console.log(ac);
            batch.add(userInstance.methods.insertuser(id,username,email,password,gender,birthday,sdt)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(email);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(email);
                        // console.log("OK Loi~");
                    }
                }
            ));
            batch.add(userInstance.methods.insertuserdetail(id,diachi,anhdaidien,thoigiantao,thoigianchinhsua,roleuser)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(email);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(email);
                        // console.log("OK Loi~");
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
        });
    }
}

function adduserss() {
	if ($('#dangnhapss').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
        	var temp = web3.eth.accounts.create();
            var id = temp.address;
            var username =$("#usernamess").val();
            var password =$("#passwordss").val();
            var batch = new web3.BatchRequest();
            var glag=1;
            var ac = result[0];
            console.log(ac);
            batch.add(userssInstance.methods.insertuser(id,username,password)
                .send({
                    from: ac
                }, function (error, result) { 
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                          //  location.reload();
                        }
                        console.log(email);

                    }
                    catch (err) {
                        // console.log(err);
                        // console.log(email);
                        // console.log("OK Loi~");
                    }
                }
                )
            .on('transactionHash', (hash) => {
                $("#addUsers").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                userssInstance.methods.getuser(id).call().then(function (resultss){
                    userInstance.methods.getuserCount().call().then(function (count) {
        
                        console.log(count);
                        for (let row = 0; row < count; row++) {
                            userInstance.methods.getuserAtIndex(row).call().then(function (addr) {
                                userInstance.methods.getuser(addr).call().then(function (resultuser) {
                                        if(resultss[1] == resultuser[1] && resultss[2] == resultuser[3]){
                                            alert("Login thành công!");
                                            row = count;
                                            glag = 2;
                                        }
                                })})}
                                if(glag == 1){
                                    alert("Login khong thành công!");
                                    location.reload();
                                }
                            
                })

            })})
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
    $('#paginationuser').html('')
    var table = '#user';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#user tbody tr').length;
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
            $('#paginationuser').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationuser li:first-child').addClass('active')
    $('#paginationuser li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationuser li').removeClass('active')
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
    listuserManagement();
    $(document).ready(function () {
        var table = '#user';
        var totalRows = $('#user tbody tr').length;
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
//modal view user
function viewuser(id) {
    console.log(id);
    userInstance.methods.getuser(id).call().then(function (result) {
         
            var table = `<tr>
                                      
                                            <td>` + result[0] + `</td>
                                       
                                            <td>` + result[1] + `</td>
                                        
                                           
                                            <td>` + result[2] + `</td>
                                        
                                  
                                            <td>` + result[3] + `</td>
                                       
                                            <td>` + result[4] + `</td>

                                            <td>` + result[4] + `</td>
                                        </tr>`;
            $("#user").find("tbody").html(table);
        })
    
}
//Danh sach cay giong
function listuserManagement() {
    var table = "";
    userInstance.methods.getuserCount().call().then(function (count) {
        
        console.log(count);
        for (let row = 0; row < count; row++) {
            userInstance.methods.getuserAtIndex(row).call().then(function (addr) {
                userInstance.methods.getuser(addr).call().then(function (result) {
                    userInstance.methods.getuserdetail(addr).call().then(function (result1) {
                      
                        // console.log(result1);
                        table += `<tr>
                                        <td>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updateuserModal"
                                        onclick="frontUpdateuser(
                                            
                                            \`` + result[0] + `\`,
                                            \`` + result[1] + `\`,
                                            \`` + result[2] + `\`,
                                            \`` + result[3] + `\`,
                                            \`` + result[4] + `\`,
                                            \`` + result[5] + `\`,
                                            \`` + result1[1] + `\`,

                                            \`` + result[6] + `\`,
                                            \`` + result1[2] + `\`,
                                            \`` + result1[3] + `\`,
                                            \`` + result1[4] + `\`,
                                            \`` + result1[5] + `\`)" >
                                        <i class="far fa-edit"></i>
                                            Update
                                        </button>
                                        </td>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>` + result[0] + `</td>
                                        <td>` + result[1] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>` + result[3] + `</td>
                                        <td>` + result[4] + `</td>
                                        <td>` + result[5] + `</td>
                                        <td>` + result[6] + `</td>

                                        <td>` + result1[1] + `</td>
                                        <td>` + result1[2] + `</td>
                                        <td>` + result1[3] + `</td>
                                        <td>` + result1[4] + `</td>
                                        <td>` + result1[5] + `</td>
                                    </tr>`;
                        $("#user").find("tbody").html(table);
            
                    })
                })
            })
        }
    })
}
//Update
function updateusernamejs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updateusername .modal-body p').text();
        var fullName = $('#valueUpdateusername').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updateusername(address, fullName, modifiedTime)
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
                $("#updateusername").hide();
                $("#frontUpdateuser").hide();
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
function updateemailjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updateemail .modal-body p').text();
        var email = $('#valueUpdateemail').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updateemail(address, email, modifiedTime)
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
                $("#updateemail").hide();
                $("#frontUpdateuser").hide();
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
function updatepasswordjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatepassword .modal-body p').text();
        var password = $('#valueUpdatepassword').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updatepassword(address, password, modifiedTime)
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
                $("#updatepassword").hide();
                $("#frontUpdateuser").hide();
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
function updategenderjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updategender .modal-body p').text();
        var gender = $('#valueUpdategender').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updategender(address, gender, modifiedTime)
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
                $("#updategender").hide();
                $("#frontUpdateuser").hide();
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
function updatebirthdayjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatebirthday .modal-body p').text();
        var birthday = $('#valueUpdatethovu').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updatebirthday(address, birthday, modifiedTime)
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
                $("#updatebirthday").hide();
                $("#frontUpdateuser").hide();
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
function updatediachijs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatediachi .modal-body p').text();
        var diachi = $('#valueUpdatediachi').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updatepassword(address, diachi, modifiedTime)
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
                $("#updatediachi").hide();
                $("#frontUpdateuser").hide();
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
function updatesdtjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updatesdt .modal-body p').text();
        var sdt = $('#valueUpdatesdt').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updatepassword(address, sdt, modifiedTime)
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
                $("#updatesdt").hide();
                $("#frontUpdateuser").hide();
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
function updateroleuserjs() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#updateroleuser .modal-body p').text();
        var role = $('#valueUpdateroleuser').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userInstance.methods.updaterole(address, role, modifiedTime)
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
                $("#updatediachi").hide();
                $("#frontUpdateuser").hide();
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
function createUpdateusername(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updateusername").find(".modal-body2").html(parag);
}

function createUpdateemail(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updateemail").find(".modal-body2").html(parag);
}
function createUpdatepassword(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatepassword").find(".modal-body2").html(parag);
}
function createUpdategender(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updategender").find(".modal-body2").html(parag);
}
function createUpdatebirthday(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatebirthday").find(".modal-body2").html(parag);
}
function createUpdatediachi(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatediachi").find(".modal-body2").html(parag);
}
function createUpdatesdt(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updatesdt").find(".modal-body2").html(parag);
}
function createUpdateroleuser(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updateroleuser").find(".modal-body2").html(parag);
}
function createUpdateanhuser(address) {
    var parag = `<p>` + address + `</p>`;
    $("#updateanhuser").find(".modal-body2").html(parag);
}
//model update school
function frontUpdateuser(address, username, email, password, gender, birthday,diachi,sdt,anhuser, createdTime, modifiedTime, isLocked) {
    var table = "";
    table += `<tr>
                    <th>Address</th>
                    <td id="tdAddress">`+ address + `</td>
                    <td></td>
                <tr>
                    <th>Tên Người Dùng</th>
                    <td id="tdFullName">`+ username + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updateusername"
                        onclick="createUpdateusername(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                
                <tr>
                    <th>Email</th>
                    <td id="kvtrong">`+ email + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updateemail"
                        onclick="createUpdateemail(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Mật Khẩu</th>
                    <td id="password">`+ password + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatepassword"
                        onclick="createUpdatepassword(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Giới Tính</th>
                    <td id="pb">`+ gender + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updategender"
                        onclick="createUpdategender(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Ngày Sinh</th>
                    <td id="tv">`+ birthday + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatebirthday"
                        onclick="createUpdatebirthday(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Địa chỉ</th>
                    <td id="sl">`+ diachi + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatediachi"
                        onclick="createUpdatediachi(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Số điện thoại</th>
                    <td id="sl">`+ sdt + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#updatesdt"
                        onclick="createUpdatesdt(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                <th>Ảnh đại diện</th>
                <td id="sl">`+ anhuser + `</td>
                <td>
                    <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#updateanhuser"
                    onclick="createUpdateanhuser(\`` + address + `\`)" >
                    <i class="far fa-edit"></i>
                        Sửa
                    </button>
                </td>
            </tr>
                <tr>
                <tr>
                    <th>Vai trò</th>
                    <td id="tdisLocked">`+ isLocked + `</td>
                    <td>
                    <button class="btn btn-primary btn-xs"
                    data-toggle="modal" data-target="#updateroleuser"
                    onclick="createUpdateroleuser(\`` + address + `\`)" >
                    <i class="far fa-edit"></i>
                        Sửa
                    </button></td>

                <tr>
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
                    <td>
                    <button type="button" class="btn btn-danger btn-xs" data-dismiss="modal"> <i class="far fa-trash-alt"></i>Hủy</button>
                    </td>
                </tr>`;
    $("#updateuserModal").find("tbody").html(table);
}