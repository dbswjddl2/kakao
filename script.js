var page=1; /*전역변수여야한다.*/
getList();
$("#txtQuery").on("keydown",function(e){
    if(e.keyCode==13){ /*13=엔터값*/
        getList(); /*새로 가져와*/
    }
});
$("#btnSearch").on("click",function(){
    page=1;
    getList();
});
$("#selSize").on("change",function(){
    page=1; 
    getList();
});
$("#btnPre").on("click",function(){
    page--;
    getList();
});
$("#btnNext").on("click",function(){
    page++;
    getList();
});
function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({ /*호출 ajax ->화면을 새로고침하지 않고 일부부만 수정*/
        type:"get",
        url:url,
        headers:{"Authorization": "KakaoAK 296843c37a5753ce7961fe40ba389811"},
        data:{"query":query,"size":size,"page":page},
        datatype:"json",/*받는 형태 json*/
        success:function(data){ /*성공한 결과값이 data에 있다.*/
            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data)); 

            var lastPage=Math.ceil(data.meta.pageable_count/size);
            $("#spanPage").html(page+"/"+lastPage);
            if(page==1){
                $("btnPre").attr("disabled",true); /*이전버튼을 누를수없게 disabled작동하지마*/
            }else{
                $("#btnPre").attr("disabled",false);
            }
            if(page==lastPage){
                $("btnNext").attr("disabled",true);
            }else{
                $("btnNext").attr("disabled",true);
            }
        } 
    });
}