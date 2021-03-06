// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/user/action/getAgentList",
    URL_ADDUSER: "/admin/api/user/action/registerByAdmin"

};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '代理列表';
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
            title: '来源',
            field: 'source'
        }, {
            title: '姓名',
            field: 'name'
        }, {
            title: '层级',
            field: 'agentGrade'
        }, {
            title: '首充用户',
            field: 'firstChargeUser'
        }, {
            title: '注册用户',
            field: 'registerUser'
        }, {
            title: '存款',
            field: 'rechargeAmount'
        }, {
            title: '提现',
            field: 'embodyAmount'
        }, {
            title: '投注',
            field: 'orderAmount'
        }, {
            title: '中奖',
            field: 'winAmount'
        }, {
            title: '佣金比例',
            field: 'rebateRatio'
        }, {
            title: '佣金',
            field: 'rebateMoney'
        }, {
            title: '优惠',
            field: 'discounts'
        }, {
            title: '余额',
            field: 'balance'
        }, {
            title: '盈亏',
            field: 'profitAndLoss'
        }, {
            title: '状态',
            field: 'state'
        }, {
            title: '投注用户',
            field: 'orderUserCount'
        }, {
            title: '在线用户',
            field: 'onlineUserCount'
        }, {
            title: '注册时间',
            field: 'created'
        }, {
            title: '操作',
            field: '#',
            align: 'center',
            formatter: function (value, row, index) {
                return "<a data-id='" + row.id + "' onclick='subordinate(" + JSON.stringify(row.id) + ")'>下级</a>" +
                    "<a data-id='" + row.id + "' onclick='queryAgentLinks(" + JSON.stringify(row.id) + ")'>链接</a>";
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

    $('.btn-save').click(saveOrUpdate);

    $('.btn-edit').click(edit);

    $('.btn-del').click(del);

    $('#btn_query').click(search);

    $('#data_table').click(other);


});

function subordinate(id) {
    Dialog.openUrl('subordinate.html?id=' + id, '查看下级', 1600);

}


function queryAgentLinks(id) {
    Dialog.openUrl('agentLinks.html?id=' + id, '查看推广链接', 1600);
}