// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/user/action/pageQueryUser",
    URL_ADDUSER: "/admin/api/user/action/addUserByAdmin",
    URL_BLOCKED:"/admin/api/user/action/frozenAccount",
    URL_RECHARGE:"/admin/api/user/credit/deposit"
};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '用户列表';
    var columns = [
        {
            checkbox: true
        }, {
            title: 'ID',
            field: 'id'
        }, {
            title: '用户名',
            field: 'username'
        }, {
            title: '姓名',
            field: 'name'
        }, {
            title: '类型',
            field: 'type'
        }, {
            title: '存款总额',
            field: 'rechargeTotal'
        }, {
            title: '提款总额',
            field: 'drawTotal'
        }, {
            title: '实际盈亏',
            field: 'realityGainOrLoss'
        }, {
            title: '总优惠',
            field: 'concessionsTotal'
        }, {
            title: '总盈亏',
            field: 'gainOrLossTotal'
        }, {
            title: '余额',
            field: 'balance'
        }, {
            title: '注册时间',
            field: 'created'
        }, {
            title : '操作',
            field : '#',
            align : 'center',
            formatter: function (value, row, index) {
                return "<a data-id='" + row.id + "' onclick='blockedAccount(" + JSON.stringify(row.id)+ ")'>冻结账户/解冻账户</a>"+
                    "<a data-id='" + row.id + "' onclick='rechargeByAdmin(" + JSON.stringify(row.id)+ ")'>手工充值</a>";
            }
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();


    function add(){
        Dialog.openUrl('edit.html', '添加'+data_label, 800);
    }



    function edit(event){
        var id = $(event.target).data('id');
        Dialog.openUrl('edit.html?id='+id, '修改'+data_label, 800);
    }

    function other(event){
        console.log(event);
        console.log($(event));

        if($(event.target).hasClass('btn-edit')){
            edit(event);
        }
    }

    function del(){
        var idList = table.getSelectedIds();
        if(idList==null || idList.length==0){
            alert('没有选中');
            return;
        }
        var idseq = idList.join(',');
        if(idseq){
            AppUtil.confirm('确定删除吗', function(){
                ajaxRequest(userCtx.URL_BATCH_DEL, {idseq:idseq}, function(data){
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
        ajaxRequest(userCtx.URL_ADDUSER, postData, function(data){
            //refreshTable();
            layer.msg('提示', {
                time: 20000, //20s后自动关闭
                btn: [data]
            });

        },'POST');
    }

    function refreshTable(){
        $('#queryForm')[0].reset();
        search();
    }

    function search(){
        var formData = form2json('queryForm');
        console.log(formData);
        table.filterParams=formData;
        table.reload();

        $('#queryForm')[0].reset();
    }


    $('.btn-add').click(add);

    $('.btn-save').click(saveOrUpdate);

    $('.btn-edit').click(edit);

    $('.btn-del').click(del);

    $('#btn_query').click(search);

    $('#data_table').click(other);



    // if($('#editForm').attr('id')){
    //     bindEditor(T.p('id'));
    // }

});

function blockedAccount(id) {
    layer.confirm('<span style="color:black">冻结账户</span><br/><br/> ' +
        '<span style="color:black">是否冻结该账号？</span><br/><br/>', {
        btn: ['取消', '确认'] //按钮
    }, function () {
        layer.msg('已取消', {icon: 1});
    }, function () {
        ajaxRequest(userCtx.URL_BLOCKED+"?id="+id, '', function (data) {
            layer.msg('提示', {
                time: 20000, //20s后自动关闭
                btn: [data]
            });
        }, 'GET');

    });
}


function rechargeByAdmin(id) {
    layer.confirm('<span style="color:black">手工充值</span><br/><br/> ' +
        '<span style="color:black"> <input class="form-control" type="text" value="" id="amount" placeholder="充值金额" name="amount"><br/><input class="form-control" type="text" value="" id="remark" placeholder="备注" name="remark"><br/> </span><br/><br/>', {
        btn: ['取消', '确认'] //按钮
    }, function () {
        layer.msg('已取消', {icon: 1});
    }, function () {
        var postData = {"userId": id, "amount": $('#amount').val(),"remark": $('#remark').val()};
        ajaxRequest(userCtx.URL_RECHARGE, postData, function (data) {
            layer.msg('提示', {
                time: 20000, //20s后自动关闭
                btn: ["success"]
            });
        }, 'POST');

    });
}