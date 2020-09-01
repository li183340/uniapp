<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="../../static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" placeholder="寻找商品" @change="toSearch" v-model="val"/>
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0">
					<text class="uni-tab-item-title uni-tab-item-title-active">
						推荐
					</text>

				</view>

				<view class="uni-tab-item" data-current="0" v-for="item in catelist" :key="item.id" @click="topd(item.id)">
					<text class="uni-tab-item-title">
						{{item.catename}}
					</text>

				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in banner" :key='item.id'>
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" >
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" @click="toclassify"/>
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{time.hours}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.minutes}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.secends}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="activeIndex==0?'active_tag_list':''" @click="tabClick(0)">
					<label for="">热门推荐</label>
				</view>
				<view class="tag_list" :class="activeIndex==1?'active_tag_list':''" @click="tabClick(1)">
					<label for="">发现好货</label>
				</view>
				<view class="tag_list" :class="activeIndex==2?'active_tag_list':''" @click="tabClick(2)">
					<label for="">只看专场</label>
				</view>

			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="item in goodslist[activeIndex].content" :key="item.id">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" alt />
					</view>
					<view class="GoodsCont" @click="todetail(item.id)">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getcate,
		getbanner,
		getseckill,
		getindexgoods,
		getcates,
		getcategoods
		
	} from "@/utils/api.js"
	import {
		baseUrl
	} from "@/utils/request.js"
	export default {
		data() {
			return {
				catelist: [],
				banner: [],
				seckill: {},
				goodslist: [
					{"content":[]},
					{"content":[]},
					{"content":[]}
				],
				activeIndex: 0,
				val:"",
				time:{
					hours:0,
					minutes:0,
					secends:0
				}
			}
		},
		methods: {
			tabClick(index) {
				this.activeIndex = index
			},
			topd(id){
				uni.navigateTo({
					url:"/pages/product/product?id="+id
				})
			},
			todetail(id){
				uni.navigateTo({
					url:'/pages/details/details?id='+id
				})
			},
			toclassify(){
				uni.navigateTo({
					url:'/pages/classify/classify'
				})
			},
			toSearch(){
				uni.navigateTo({
					url:"/pages/product/product?value="+this.val
				})
			},
			times(){
				setInterval(()=>{
					let date = this.seckill.endtime-new Date().getTime()
					let hours = Math.floor(date/1000/60/60)<10?'0'+Math.floor(date/1000/60/60):Math.floor(date/1000/60/60)
					let minutes = Math.floor((date/1000/60)%60)<10?'0'+Math.floor((date/1000/60)%60):Math.floor((date/1000/60)%60)
					let secends = Math.floor((date/1000)%60)<10?'0'+Math.floor((date/1000)%60):Math.floor((date/1000)%60)
					this.time={
						hours,
						minutes,
						secends
					}
				},1000)
			}
		},
		async onLoad() {
			let rescatelist = await getcate()
			this.catelist = rescatelist.data.list
			//banner
			let resbanner = await getbanner()
			let banner = resbanner.data.list
			banner.forEach(item => {
				item.img = baseUrl + item.img
			})
			this.banner = banner
			//getseckill
			let resgetseckill = await getseckill()
			this.seckill = resgetseckill.data.list[0]
			console.log(this.seckill)
			//getindexgoods
			let resgetindexgoods = await getindexgoods()
			let list = resgetindexgoods.data.list
			// return;
			list.forEach(item => {
				item.content.forEach(item1 => {
					item1.img = baseUrl + item1.img
				})
			})
			this.goodslist = list
			this.times()
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
