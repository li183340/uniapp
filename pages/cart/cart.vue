<template>
	<view class="container">
		<view class="top" >
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in list" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild" >
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="changeone(index)"/>
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common"><image :src="item.img" mode=""></image></view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：{{item.specsattr}}</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="jian(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2"><label for="" @click="del(item.id)">删除</label></view>
			</scroll-view>
		</view>
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="checked" @change="changeall"/>
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{allprice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" >
				<!-- 被选中的商品的个数 -->
				<label @click="toconfirm">去结算({{list.length}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {cartlist,cartdelete,cartedit} from "@/utils/api.js"
	import {baseUrl} from "@/utils/request.js"
export default {
	data(){
		return {
			list:[],
			checked:true,
			allprice:0
			
		}
	},
	methods:{
		//减数量
		async jian(index){
			this.list[index].num-=1
			let {token} = uni.getStorageSync('userInfo')
			let {id,num} = this.list[index]
			// console.log(id,num,token,this.checked)
			let checked = this.list[index].checked?1:0
			let res = await cartedit(id,num,checked,token)
			this.addprice()
		},
		//加数量
		async add(index){
			this.list[index].num+=1
			let {token} = uni.getStorageSync('userInfo')
			let {id,num} = this.list[index]
			let checked = this.list[index].checked?1:0
			let res = await cartedit(id,num,checked,token)
			this.addprice()
			
		},
		//删除
		async del(id){
			let {token} = uni.getStorageSync('userInfo')
			await cartdelete(id,token)
			//渲染
			let userinfo = uni.getStorageSync('userInfo')
			let res= await cartlist(userinfo.uid,userinfo.token)
			let list = res.data.list?res.data.list:[]
			list.forEach(item=>{
				item.img = baseUrl+item.img
				item.checked = item.checked==1?true:false;
			})
			this.list = list
			this.addprice()
		},
		//选中
		changeone(index){
			if(this.list[index].checked){
				this.list[index].checked=false
			}else{
				this.list[index].checked=true
			}
			let a=this.list.every(item=>{
				return 	item.checked==true
			})
			if(a){
				this.checked=true
			}else{
				this.checked=false
			}
			this.addprice()
		},
		//全选
		changeall(){
			this.checked = !this.checked
			if(this.checked==true){
				this.list.forEach(item=>{
					item.checked = true
				})
			}else{
				this.list.forEach(item=>{
					item.checked = false
				})

			}
			this.addprice()
		},
		// 总价
		addprice(){
			this.allprice=0
			this.list.forEach(item=>{
					if(item.checked==1){
						this.allprice += item.num*item.price
					}
				})
		},
		//结算
		toconfirm(){
			let arr=[]
			this.list.forEach(item=>{
				if(item.checked){
					arr.push(item)
				}
			})
			uni.setStorageSync("toconfirm",arr)
			uni.navigateTo({
				url:'/pages/confirm/confirm'
			})
		}
	},
   async onShow(e){
	   let userinfo = uni.getStorageSync('userInfo')
		let res= await cartlist(userinfo.uid,userinfo.token)
		let list = res.data.list?res.data.list:[]
		list.forEach(item=>{
			item.img = baseUrl+item.img
			item.checked = item.checked==1?true:false;
		})
		this.list = list
		this.addprice()
	},
	
};
</script>

<style>
@import url('../../common/css/cart.css');
.cartInfo_image_img {
	width: 120rpx;
	height: 120rpx;
}
</style>
