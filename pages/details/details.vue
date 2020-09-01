<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goods.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{goods.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{goods.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label class="jian" @click="jiannum">-</label>
				  <label class="zhi">{{num}}</label>
				  <label  class="jia" @click="addnum">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1" v-for="item in goods.specsattr" :key="item">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<view v-html="goods.description">
				
			</view>
		</view>
		
		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>					
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg"/>
					<image src="../../static/detail/pingjia2.jpg"/>
					<image src="../../static/detail/pingjia3.jpg"/>
						
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addcart">加入购物车</button>
			<button class="footbtn2" @click="toconfirm">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {getgoodsinfo,cartadd} from '@/utils/api.js'
	import {
		baseUrl
	} from "@/utils/request.js"
	export default{
		data(){
			return{
				goods:{},
				num:1,
				cart:{
					uid:"",
					goodsid:"",
					num:1,
				},
				
			}
		},
		methods:{
			addnum(){
				this.num+=1
			},
			jiannum(){
				if(this.num>1){
					this.num-=1
				}
			},
			async addcart(){
				let userinfo = uni.getStorageSync("userInfo")
				this.cart = {
					uid:userinfo.uid,
					goodsid:this.goods.id,
					num:this.num
				}
				let res = await cartadd(this.cart,{authorization:userinfo.token})
				uni.showToast({
					title:"加入购物车成功"
				})
			},
			async toconfirm(){
				let userinfo = uni.getStorageSync("userInfo")
				this.cart = {
					uid:userinfo.uid,
					goodsid:this.goods.id,
					num:this.num
				}
				let res = await cartadd(this.cart,{authorization:userinfo.token})
				uni.switchTab({
					url:"/pages/cart/cart"
				})
			}
		},
		async onLoad(e){
			let res = await getgoodsinfo(e.id)
			let goods = res.data.list[0]
			goods.img = baseUrl+goods.img
			goods.specsattr = goods.specsattr.split(',')
			this.goods = goods
			
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
	
</style>
	
