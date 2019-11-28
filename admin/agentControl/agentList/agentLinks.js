// config
var userCtx = {
    URL_PAGE_QUERY: "/admin/api/user/action/queryAgentLinks",


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
            title: '返点',
            field: 'inferiorOdds'
        }, {
            title: '邀请码',
            field: 'invitationCode'
        }, {
            title: '邀请链接',
            field: 'agentLink'
        }
    ];


    //以下基本固定

    // var table = new MyDataTable(id, tableUrl, columns, true);
    // table.ajaxMethod = 'get';
    // table.init();
    search();

    function search() {
       var id= T.p('id');
       //alert(id);
        ajaxRequest(userCtx.URL_PAGE_QUERY + "?userId=" + id, '', function (data) {
           // layer.msg(data);
        }, 'GET');
    }

        // $('#btn_query').click(function () {
        //     var amount=$("#amount").val();
        //     ajaxRequest(userCtx.URL_PAGE_QUERY+"?amount="+amount, '', function(data){
        //         layer.msg(data);
        //     },'GET');

        // var formData ={"id":T.p('id')};
        // console.log(formData);
        // table.filterParams=formData;
        // table.reload();

        //$('#queryForm')[0].reset();




});




