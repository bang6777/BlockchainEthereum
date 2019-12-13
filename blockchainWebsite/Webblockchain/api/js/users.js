function getName(){{
    $.ajax({
        method: "GET",
        url: "http://localhost:4000/login",
        contentType: "application/json",
        success: function (response)
         {if(response!= "no"){document.getElementById("name").innerHTML="";
         document.getElementById("logout").innerHTML="<a href='http://localhost:4000/signout'>"+"<span class='glyphicon glyphicon-user'>"+response+" <span class='glyphicon glyphicon-log-out'></span></a>"};
        },
        error: function (e) {alert("Đã có lỗi xảy ra!");
        console.log(e);
    }});}}

     