

$(function () {

    // config
    var userCtx = {
        URL_PAGE_QUERY: "/admin/api/action/findDataStatistics",
        // URL_POST: "/admin/api/order/orderRefund"
    };

    BeanUtil.setPrefix(userCtx, appConfig.host);


    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '本站数据统计';
    var columns = [
        {
            checkbox: true
        }, {
            title: '充值总额',
            field: 'rechargeTotal'
        }, {
            title: '在线充值',
            field: 'onLineRecharge'
        }, {
            title: '人工入款',
            field: 'labourRecharge'
        }, {
            title: 'BYS入款',
            field: 'bysrecharge'
        }, {
            title: '投注金额',
            field: 'orderAmountTotal'
        }, {
            title: '中奖金额',
            field: 'winAmountTotal'
        }, {
            title: '当月总投注',
            field: 'thisMonthOrderTotal'
        }, {
            title: '当月总中奖',
            field: 'thisMonthWinTotal'
        }, {
            title: '投注单量',
            field: 'bettingCounts'
        }, {
            title: '用户余额总数',
            field: 'userBalanceTotal'
        }, {
            title: '本月损益',
            field: 'thisMonthProfitAndLoss'
        }, {
            title: '上月损益',
            field: 'lastMonthProfitAndLoss'
        }, {
            title: '当日盈利',
            field: 'thisDayProfitAndLoss'
        }, {
            title: '当日盈率',
            field: 'thisDayProfitAndLossRatio'
        }, {
            title: '当月盈利',
            field: 'thisMonthProfitAndLoss2'
        }, {
            title: '当月盈率',
            field: 'thisMonthProfitAndLossRatio'
        }, {
            title: '上月盈利',
            field: 'lastMonthProfitAndLoss2'
        }, {
            title: '上月盈率',
            field: 'lastMonthProfitAndLossRatio'
        }, {
            title: '充值笔数',
            field: 'rechargeNum'
        }, {
            title: '提现笔数',
            field: 'withdrawNum'
        }, {
            title: '注册人数',
            field: 'registerNum'
        }, {
            title: '在线人数',
            field: 'onLineNum'
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();


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

 /*   function bindEditor(id) {
        if(id){
            ajaxRequest(userCtx.URL_GET, {id:id}, function(data){
                json2form(data, 'editForm');
            });
        }
    }*/


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

    function search() {
        var formData = form2json('queryForm');
        console.log(formData);
        table.filterParams = formData;
        table.reload();

        $('#queryForm')[0].reset();
    }

    function reset(){

        $('#queryForm')[0].reset();
    }

    $('.btn-add').click(add);

    $('.btn-save').click(saveOrUpdate);

    //$('.btn-edit').click(edit);

    $('.btn-del').click(del);

    $('#btn_query').click(search);

    $('#btn_reset').click(reset);

    $('#data_table').click(other);

    if ($('#editForm').attr('id')) {
        bindEditor(T.p('id'));
    }

});

