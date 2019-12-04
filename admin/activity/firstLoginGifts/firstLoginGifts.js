// config
var userCtx = {
    URL_GET: "/admin/activity/action/findFirstLoginSetUp",
};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    $('#btn_query').click(function () {
         var amount=$("#amount").val();
        ajaxRequest(userCtx.URL_GET+"?amount="+amount, '', function(data){
            layer.msg(data);
        },'GET');

    });


    function add() {
        Dialog.openUrl('edit.html', '添加' + data_label, 800);
    }


    function edit(event) {
        var id = $(event.target).data('id');
        Dialog.openUrl('edit.html?id=' + id, '修改' + data_label, 800);
    }

    function other(event) {
        console.log(event);
        console.log($(event));

        if ($(event.target).hasClass('btn-edit')) {
            edit(event);
        }
    }

    function del() {
        var idList = table.getSelectedIds();
        if (idList == null || idList.length == 0) {
            alert('没有选中');
            return;
        }
        var idseq = idList.join(',');
        if (idseq) {
            AppUtil.confirm('确定删除吗', function () {
                ajaxRequest(userCtx.URL_BATCH_DEL, {idseq: idseq}, function (data) {
                    refreshQuery();
                });
            });
        }
    }

    // function bindEditor(id) {
    //     if(id){
    //         ajaxRequest(userCtx.URL_GET, {id:id}, function(data){
    //             json2form(data, 'editForm');
    //         });
    //     }
    // }

    function saveOrUpdate() {
        // debugger
        var postData = form2json('editForm');
        ajaxRequest(userCtx.URL_ADDUSER, postData, function (data) {
            //refreshTable();
            layer.msg('提示', {
                time: 20000, //20s后自动关闭
                btn: [data]
            });

        }, 'POST');
    }

    function refreshTable() {
        $('#queryForm')[0].reset();
        search();
    }

    // function search() {
    //     var amount = $("#amount").val();
    //     alert(amount)
    //     var formData = {"amount": amount};
    //     console.log(formData);
    //     table.filterParams = formData;
    //     table.reload();

        //$('#queryForm')[0].reset();
   // }

    // search();

    // function search(){
    // var formData = form2json('queryForm');
    // console.log(formData);
    // table.filterParams=formData;
    // table.reload();
    //
    // $('#queryForm')[0].reset();
    // }


    $('.btn-add').click(add);

    $('.btn-save').click(saveOrUpdate);

    $('.btn-edit').click(edit);

    $('.btn-del').click(del);

   // $('#btn_query').click(search);

    $('#data_table').click(other);



    // if($('#editForm').attr('id')){
    //     bindEditor(T.p('id'));
    // }

});




