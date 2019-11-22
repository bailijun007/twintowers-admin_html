
$(function(){
	
	// config
	var userCtx = {
		URL_PAGE_QUERY : "/admin/api/order/findlotteryPlaySnAnalysisDetails",
        URL_LOTTERY_LIST : "/admin/lottery/action/getLotterys"
	};
	
	BeanUtil.setPrefix(userCtx, appConfig.host);
	
	var id = 'data_table';
	var tableUrl = userCtx.URL_PAGE_QUERY;
	var columns = [
		{
			checkbox : true
		}, {
			title : '彩种名',
			field : 'lotteryName'
		}, {
            title : '玩法',
            field : 'playName'
        }, {
            title : '投注总注数',
            field : 'betCountTotal'
        },{
			title : '投注总人数',
			field : 'userNumber'
		}, {
            title : '投注总金额',
            field : 'orderAmountTotal'
        },{
            title : '中奖金额',
            field : 'winAmountTotal'
        },{
            title : '返点金额',
            field : 'rebateAmountTotal'
        },{
            title : '盈亏',
            field : 'profitAndLoss'
        }
	];
	
	//以下基本固定
	
	var table = new MyDataTable(id, tableUrl, columns, true);
	table.ajaxMethod = 'post';
	table.init();
//加载彩票列表
    initLottery();

    function initLottery() {

        ajaxRequest(userCtx.URL_LOTTERY_LIST, '', function(data){
            $.each(data, function (i, item) {
                $("#lottery").append("<option value="+item.lotteryId+">"+item.lotteryName+"</option>");
            });

        },'GET');

    }

    function search(){
        var formData = form2json('queryForm');
        console.log(formData);
        table.filterParams=formData;
        table.reload();

        //$('#queryForm')[0].reset();
    }
    $('#btn_query').click(search);

});

