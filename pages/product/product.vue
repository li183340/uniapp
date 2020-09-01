<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_" @confirm="_search"></uni-search-bar>
		<view class="list" v-if="searchGoodsList.length > 0">
			
			<view class="row" v-for="item in searchGoodsList" :key="item.id" @click="todetail(item.id)">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>原价￥{{item.market_price}}</text>	
					<text>现价￥{{item.price}}</text>	
				</view>
			</view>
			
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>
<script>
	
	import {getcategoods,search} from '@/utils/api.js'
	 import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	 import {
		baseUrl
	} from "@/utils/request.js"
	export default {
		data(){
			return {
				searchGoodsList:[]
			}
		},
		methods:{
			todetail(id){
				uni.navigateTo({
					url:"/pages/details/details?id="+id
				})
			},
			async _search(e){
				let res = await search(e.value)
				console.log(res)
				let list = res.data.list?res.data.list:[]
				list.forEach(item=>{
					item.img = baseUrl+item.img
				})
				this.searchGoodsList = list
			}
		},
	    async onLoad(e){
			if(e.value){
				this._search(e)
			}else{
				let res=await getcategoods(e.id)
				let list = res.data.list?res.data.list:[]
				list.forEach(item=>{
					item.img = baseUrl+item.img
				})
				this.searchGoodsList = list
			}
		}
	}
</script>

<style>
	.search{
		width: 100%;
		height: 150rpx;
		border: 1px solid red;
	}
</style>
