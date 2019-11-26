// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/user/action/pageQueryUser",
    // URL_POST: "/admin/api/order/orderRefund",
    // URL_LOTTERY_LIST: "/admin/lottery/action/getLotterys",
};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '用户';
    var columns = [
        {
            checkbox: true
        }, {
            title: 'ID',
            field: 'id'
        }, {
            title: '用户名',
            field: 'username'
        },
        {
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
            title: '操作',
            field: '#',
            align: 'center',
            formatter: function (value, row, index) {
                return "<a data-id='" + row.lotteryId + "' class='btn-edit'  onclick='edit(" + JSON.stringify(row.period) + "," + JSON.stringify(row.openTime) + "," + JSON.stringify(row.lotteryId) + ")'  href='javascript:void(0)'>退款</a>";
            }
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();
    //加载彩票列表
    initLottery();

    function initLottery() {

        ajaxRequest(userCtx.URL_LOTTERY_LIST, '', function (data) {
            $.each(data, function (i, item) {
                $("#lottery").append("<option value=" + item.lotteryId + ">" + item.lotteryName + "</option>");
            });

        }, 'GET');

    }


    function add() {
        Dialog.openUrl('edit.html', '添加' + data_label, 800);
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

    function bindEditor(lotteryId, period, openTime) {
        if (lotteryId, period, openTime) {
            ajaxRequest(userCtx.URL_GET, {lotteryId: lotteryId, period: period, openTime: openTime}, function (data) {
                json2form(data, 'editForm');
            });
        }
    }


    function saveOrUpdate(lotteryId, period, openTime) {
        var postData = form2json('editForm');
        ajaxRequest(userCtx.URL_SAVE, postData, function (data) {
            refreshTable();
        }, 'POST');
    }

    function refreshTable() {
        $('#queryForm')[0].reset();
        search();
    }

    function reset(){

        $('#queryForm')[0].reset();
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

    //$('.btn-edit').click(edit);

    $('#btn_reset').click(reset);

    $('.btn-del').click(del);

    $('#btn_query').click(search);

    $('#data_table').click(other);

    if ($('#editForm').attr('id')) {
        bindEditor(T.p('id'));
    }

});

function edit(period, openTime, lotteryId) {
    layer.confirm('<span style="color:black">退款操作</span><br/> ' +
        '<span style="color:black">期号：' + JSON.stringify(period) + '</span><br/>' +
        '<span style="color:black">开奖时间：' + JSON.stringify(openTime) + '</span><br/><br/>' +
        '<span style="color:black">温馨提示：</span><br/>' +
        '<span style="color:black">对未开奖用户进行退款处理</span><br/>' +
        '<span style="color:black">退款金额为投注金额的100%</span><br/><br/>', {
        btn: ['取消', '确认退款'] //按钮
    }, function () {
        layer.msg('已取消', {icon: 1});
    }, function () {
        var postData = {"period": period, "lotteryId": lotteryId};
        ajaxRequest(userCtx.URL_POST, postData, function (data) {
            layer.msg('退款提示', {
                time: 20000, //20s后自动关闭
                btn: [data]
            });
        }, 'POST');

    });
}
