   var grid_selector = $("#table_list_jdOrder");
   var height = $("#content-main").height()-186;
   var gridHeight = height;
   $(document).ready(function(){
		$.jgrid.defaults.styleUI="Bootstrap";
		$(grid_selector).jqGrid({
			url:"/jdOrder/queryJdOrderList.do",
		    datatype: "json",
		    mtype: 'POST',
		    postData: {},
			height:gridHeight,
			colNames:[
					  "运单id","订单号","收件人姓名","收件人地址","收件人电话","重量", "操作"
			],
			colModel:[
		     		 {name:"waybillId",index:"waybillId",editable:false,align:"center",width:60},
		     		 {name:"orderNo",index:"orderNo",editable:false,align:"center",align:"center",width:60},
		     		 {name:"consigneeName",index:"consigneeName",editable:false,align:"center",align:"center",width:60},
		     		 {name:"consigneeAddress",index:"consigneeAddress",editable:false,align:"center",align:"center",width:90},
						{name:"consigneeTel",index:"consigneeTel",editable:false,align:"center",align:"center",width:90},
		     		 {name:"weight",index:"weight",editable:false,align:"left",align:"center",width:60},
			 		 {name:"id",editable:false,width:100,sortable:false,align:"center",
		     			formatter:function(cellvalue, options, rowObject){
		     			    var str=[];
		     			    var id = cellvalue;
							str.push("<div class='a-group'>")
							str.push("<a href='javascript:;' onclick=updateJdOrder("+id+")>更新</a>");
							str.push("<a href='javascript:;' onclick=deleteJdOrder("+id+")>删除</a>");
							str.push("<a href='javascript:;' onclick=detailJdOrder("+id+")>详情</a>");
							str.push("</div>")
		     			    return str.join("");
		     		 }}
			],
			rowNum:10,
			pager:'pager_list_jdOrder',
			rownumbers : true,// 添加左侧行号
			hidegrid:false,
			multiboxonly : true,
			sortable : true,
			sortname : 'id',
			sortorder : 'desc',
			autowidth: true,
			autoScroll : true,
			shrinkToFit:true,
			jsonReader : {
				page : "page",
				total : "pages",
				pageSize : "pageSize",
				records : "total",
				rows : "rows"
			},gridComplete:function(){
				resizeGrid(grid_selector);
				dataComplete();
			}
			});
		 $(grid_selector).jqGrid("navGrid","#pager_list_jdOrder",{edit:false,add:false,del:false,search:false,refresh:false});
 		 $("body").bind('click', function() { $(grid_selector).setGridWidth($(".jqGrid_wrapper").width()-10); });
		 $(window).bind("resize",function(){$(grid_selector).setGridWidth($(".jqGrid_wrapper").width()-10)});
		 /***刷新grid***/
		function resizeGrid(grid_selector){
			$(grid_selector).setGridWidth($(".jqGrid_wrapper").width()-10);
		}
		 /** 查询按钮* */
		$("#queryJdOrderBtn").on('click', function() {
			/*未完成*/
			$('#jdOrderModal').modal();
		});

	    /**新增* */
		$("#addJdOrderBtn").on('click', function() {
			$('#jdOrderModal').load("/jdOrder/gotoJdOrderEdit.do").modal();
		});
		/**导出* */
		$("#exportJdOrderBtn").on('click', function() {
			$.exportExcel("/jdOrder/exportJdOrder.do");
		});
});
        /**修改* */
		function updateJdOrder(id){
				if(id=='' ){
					$.alert('请选择行');
					return;
				}else{
					$('#jdOrderModal').load("/jdOrder/gotoJdOrderEdit.do?id="+id).modal();
				}
			}
		/**删除* */
		function deleteJdOrder(id){
			if(id=='' ){
				$.alert('请选择行');
				return;
			}else{
				$.confirm("您确定要删除该任务吗?",function(){
					jQuery.ajax({
						type: "post",
						url: "/jdOrder/deleteJdOrder.do",
						data: "id="+id,
						success: function(data){
							if (data.code == 1) {
								reload();
							} else {
							}
							$.alert(data.msg);
						}
					});
			  });
			}
		}
        /**查看* */
        function detailJdOrder(id){
			if(id=='' ){
				$.alert('请选择行');
				return;
			}else{
				$('#jdOrderModal').load("/jdOrder/gotoJdOrderDetail.do?id="+id).modal();
			}
		}
		/** reload* */
		function reload(){
			$(grid_selector).jqGrid('setGridParam',{ 
	            postData: {
	             },
	            page:1 
	        }).trigger("reloadGrid"); //重新载入 
		}
		/*数据加载完成后,将前进和后退的图标换成bootstrap型的图标*/
		function dataComplete() {

			$("#first_pager_list_jdOrder").find("span").addClass("glyphicon").addClass("glyphicon-step-backward").
			removeClass("ui-icon").removeClass("ui-icon-seek-first");

			$("#prev_pager_list_jdOrder").find("span").addClass("glyphicon").addClass("glyphicon-step-backward").
			removeClass("ui-icon").removeClass("ui-icon-seek-pre");

			$("#next_pager_list_jdOrder").find("span").addClass("glyphicon").addClass("glyphicon-step-forward").
			removeClass("ui-icon").removeClass("ui-icon-seek-next");
			$("#last_pager_list_jdOrder").find("span").addClass("glyphicon").addClass("glyphicon-step-forward").
			removeClass("ui-icon").removeClass("ui-icon-seek-end");
		}
