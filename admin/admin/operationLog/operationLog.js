// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/action/findOperationLog",

};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '操作日志';
    var columns = [
        {
            checkbox: true
        }, {
            title: '用户名',
            field: 'adminName'
        }, {
            title: '时间',
            field: 'created'
        }, {
            title: '操作类型',
            field: 'type'
        }, {
            title: '登录IP',
            field: 'loginIp'
        }, {
            title: '操作描述',
            field: 'operationDescribe'
        }, {
            title: '操作对象',
            field: 'operationObject'
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();

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


    $('#btn_query').click(search);

    $('#btn_reset').click(reset);

});



