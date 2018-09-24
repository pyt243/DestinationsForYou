//var Coment = require("../../models/comment");
console.log("hi");
$('#inst').keypress(function(e){
   if(e.which === 13){
      var comtex = $(this).val();
       $(this).val("");
       var st = $("#com").attr("data-test-value");
       console.log(st);
       var obj = JSON.parse(st);
       obj.text = comtex;
       var cid;
      // $("#com").append(`<div class="col-md-12"><strong>${obj.currentUser.username}</strong><p style="padding-top=0">` + comtex + `</p></div>`);
      // $.post("/commentNew",obj);
      $.ajax({
        url:"/commentNew",
        data:obj,
        type:"POST",
        success:function(resdata){
          console.log(resdata);
           $("#com").append(`<div class="col-md-8"><strong>${obj.currentUser.username}</strong><p style="padding-top=0">` + comtex + `</p></div>`);
           $("#com").append(`<div class="col-md-4">
              <button class="btn btn-danger btn-sm del" data-test-value=` + resdata + `>Delete</a>
           </div>`);
        },
        error:console.error
      });
    //  console.log(cid);
  }
});
$(".del").on("click",function(e){
  var cid = $(this).attr("data-test-value");
  var obj = {cid:cid};
  $(this).parent().prev().remove();
  $(this).parent().remove();
  $.ajax({
    url:"/commentRemove",
    data:obj,
    type:"POST",
    success:function(rd){
      console.log("comment removed successfully");
    },
    error:console.error
  });
});
