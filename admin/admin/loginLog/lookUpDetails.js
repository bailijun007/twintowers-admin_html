
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
        }
    ];


    var table = new MyDataTable(id, tableUrl, columns, true);
    table.ajaxMethod = 'post';
    table.init();



    function search(){
        var formData ={"username":T.p('username')};
        console.log(formData);
        table.filterParams=formData;
        table.reload();

        //$('#queryForm')[0].reset();
    }
    search();

});

