// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/action/findAdminUsers",
    URL_ADDUSER: "/admin/api/action/saveAdminUser",
    URL_UPDATEPASSWORD: "/admin/api/action/updatePassword",
    URL_UPDATEROLE: "/admin/api/action/updateRole",
    URL_DELETED: "/admin/api/action/deleteAdminUser",
};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '管理员列表';
    var columns = [
        {
            checkbox: true
        }, {
            title: 'ID',
            field: 'id'
        }, {
            title: '用户名',
            field: 'name'
        }, {
            title: '登录IP',
            field: 'loginIp'
        }, {
            title: '状态',
            field: 'status'
        }, {
            title: '角色',
            field: 'roleName'
        }, {
            title: '最后登录时间',
            field: 'lastLogin'
        }, {
            title: '操作',
            field: '#',
            align: 'center',
            formatter: function (value, row, index) {
                return "<a data-id='" + row.id + "' onclick='changePassword(" + JSON.stringify(row.id) + ")'>修改密码</a>" +
                    "<a data-id='" + row.id + "' onclick='changeRole(" + JSON.stringify(row.id) + ")'>修改角色</a>" +
                    "<a data-id='" + row.id + "' onclick='deleted(" + JSON.stringify(row.id) + ")'>删除</a>";
            }
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();


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


    function saveChangePassword() {
        // debugger
        var id = T.p('id');
       var password=$("#password").val();
        var newPassword=$("#newPassword").val();
        var rePassword=$("#rePassword").val();
        var postData = {"id":id,"password":password,"newPassword":newPassword,"rePassword":rePassword};
        ajaxRequest(userCtx.URL_UPDATEPASSWORD, postData, function (data) {
            //refreshTable();
            layer.msg('提示', {
                time: 20000, //20s后自动关闭
                btn: [data]
            });

        }, 'POST');
    }


    function saveChangeRole() {
        // debugger
        var adminId = T.p('adminId');
        var roleId=$("#roleId").val();
       // alert(adminId);
        var postData = {"adminId":adminId,"roleId":roleId};
        ajaxRequest(userCtx.URL_UPDATEROLE, postData, function (data) {
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

    function search() {
        var formData = form2json('queryForm');
        console.log(formData);
        table.filterParams = formData;
        table.reload();

        $('#queryForm')[0].reset();
    }


    $('.btn-add').click(add);

    $('#changeRole').click(saveChangeRole);

    $('#changePassword').click(saveChangePassword);

    $('.btn-save').click(saveOrUpdate);

    $('.btn-edit').click(edit);

    $('.btn-del').click(del);

    $('#btn_query').click(search);

    $('#data_table').click(other);


});

function changePassword(id) {
    Dialog.openUrl('changePassword.html?id=' + id, '修改密码', 1600);

}


function changeRole(id) {
    Dialog.openUrl('changeRole.html?adminId=' + id, '修改角色', 1600);
}

function deleted(id) {
    // Dialog.openUrl('changeRole.html?adminId=' + id, '删除', 1600);
    ajaxRequest(userCtx.URL_DELETED+"?adminId="+id, '', function (data) {
        //refreshTable();
        layer.msg('提示', {
            time: 20000, //20s后自动关闭
            btn: [data]
        });

    }, 'GET');
}