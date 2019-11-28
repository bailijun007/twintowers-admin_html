// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/action/findAdminUserLoginLog",

};

BeanUtil.setPrefix(userCtx, appConfig.host);

$(function () {

    //以下基本固定

    var id = 'data_table';
    var tableUrl = userCtx.URL_PAGE_QUERY;
    var data_label = '登录日志';
    var columns = [
        {
            checkbox: true
        }, {
            title: '用户名',
            field: 'username'
        }, {
            title: '登陆IP',
            field: 'ip'
        }, {
            title: '地址',
            field: 'address'
        }, {
            title: '时间',
            field: 'modified'
        },{
            title: '操作',
            field: '#',
            align: 'center',
            formatter : function(value, row, index) {
                return '<a data-id="'+row.username+'" class=""  href="javascript:edit2(\''+row.username+'\')">只看此人</a>';
            }

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


function edit2(username) {
    Dialog.openUrl('lookUpDetails.html?username='+username, '只看此人', 1600);
}
