
$(function(){
	
	// config
	var userCtx = {
		URL_PAGE_QUERY : "/admin/api/user/action/getAgentCommissionDetail",
       // URL_POST : "/admin/api/order/findlotteryPlaySnAnalysisDetails",
		URL_LOTTERY_LIST : "/admin/lottery/action/getLotterys"
	};
	
	BeanUtil.setPrefix(userCtx, appConfig.host);
	
	var id = 'data_table';
	var tableUrl = userCtx.URL_PAGE_QUERY;
	var data_label = '彩种玩法分析';
	var columns = [
		{
			checkbox : true
		}, {
			title : '用户名',
			field : 'username'
		},{
            title : '账变类型',
            field : 'accountChangeType'
        }, {
			title : '单号',
			field : 'orderNumber'
		}, {
            title : '游戏',
            field : 'lotteryName'
        },{
            title : '玩法',
            field : 'playName'
        },{
            title : '期号',
            field : 'period'
        },{
            title : '佣金',
            field : 'rebateMoney'
        },{
            title : '余额',
            field : 'balance'
        },{
            title : '投注时间',
            field : 'created'
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

    function reset(){

        $('#queryForm')[0].reset();
    }

	$('#btn_query').click(search);

    $('#btn_reset').click(reset);

	
});

