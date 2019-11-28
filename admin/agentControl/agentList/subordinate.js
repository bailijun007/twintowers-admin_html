// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/user/action/lookUpLower",
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
                return "<a data-id='" + row.id + "' onclick='subordinate(" + JSON.stringify(row.id) + ")'>下级</a>" ;
            }
        }
    ];


    //以下基本固定

    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();


    function search(){
        var formData ={"id":T.p('id')};
        console.log(formData);
        table.filterParams=formData;
        table.reload();

        //$('#queryForm')[0].reset();
    }
    search();


});

function subordinate(id) {
    Dialog.openUrl('subordinate.html?id=' + id, '查看下级', 1600);
}


