

$(function () {

    // config
    var userCtx = {
        URL_PAGE_QUERY: "/admin/api/user/action/viewReport",
        // URL_POST: "/admin/api/order/orderRefund"
    };

    BeanUtil.setPrefix(userCtx, appConfig.host);


    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '查看报表';
    var columns = [
        {
            checkbox: true
        }, {
            title: '日期',
            field: 'modified'
        }, {
            title: '存款金额',
            field: 'rechargeAmount'
        },
        {
            title: '投注金额',
            field: 'orderAmount'
        }, {
            title: '提现金额',
            field: 'embodyAmount'
        }, {
            title: '中奖金额',
            field: 'winAmount'
        }, {
            title: '充值盈亏',
            field: 'rechargeProfitAndLoss'
        }, {
            title: '投注盈亏',
            field: 'orderProfitAndLoss'
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

