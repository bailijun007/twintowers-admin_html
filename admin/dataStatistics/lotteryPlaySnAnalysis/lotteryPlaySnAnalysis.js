
$(function(){
	
	// config
	var userCtx = {
		URL_PAGE_QUERY : "/admin/api/order/findlotteryPlaySnAnalysis",
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
			title : '彩种名',
			field : 'lotteryName'
		},{
            title : '投注总注数',
            field : 'betCountTotal'
        }, {
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
        } ,{
            title: '操作',
            field: '#',
            align: 'center',
            formatter : function(value, row, index) {
                return '<a data-id="'+row.lotteryId+'" class="btn-edit"  href="javascript:void(0)">详情</a>';
            }

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

	function add(){
		Dialog.openUrl('edit.html', '添加'+data_label, 800);
	}


	function edit(event){
		Dialog.openUrl('lookUpDetails.html', '查看详情', 1600);
	}


	function other(event){
		console.log(event);
		console.log($(event));
		
		if($(event.target).hasClass('btn-edit')){
			edit(event);
		}
	}
	function del(){
		var idList = table.getSelectedIds();
		if(idList==null || idList.length==0){
			alert('没有选中');
			return;
		}
		var idseq = idList.join(',');
		if(idseq){
			AppUtil.confirm('确定删除吗', function(){
				ajaxRequest(userCtx.URL_BATCH_DEL, {idseq:idseq}, function(data){
					refreshQuery();
				});
			});
		}
	}

	function bindEditor(id) {
		if(id){
			ajaxRequest(userCtx.URL_GET, {id:id}, function(data){
				json2form(data, 'editForm');
			});
		}
	}

	function saveOrUpdate() {
		var postData = form2json('editForm');
		ajaxRequest(userCtx.URL_SAVE, postData, function(data){
			refreshTable();
		},'POST');
	}
	
	function refreshTable(){
		$('#queryForm')[0].reset();
		search();
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

	$('.btn-add').click(add);
	
	$('.btn-save').click(saveOrUpdate);

	$('.btn-edit').click(edit);
	
	$('.btn-del').click(del);
	
	$('#btn_query').click(search);

    $('#btn_reset').click(reset);
	
	$('#data_table').click(other);
	
	if($('#editForm').attr('id')){
		bindEditor(T.p('id'));
	}
	
});

