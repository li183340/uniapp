<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="send">发送</text>
			</view>
			<input type="text" name="code" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">
				收不到验证码？试试
				<text style="color:#00BB00;font-size: 23rpx;">语音验证</text>
			</text>
			<!--   -->
			<button type="primary" @click="doLogin" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>

		<view class="row"><text style="color: #006699;text-align: center;">通过微信授权登录</text></view>
	</view>
</template>

<script>
import { sms, wxlogin } from '@/utils/api.js';
export default {
	data() {
		return {
			phone: '', //手机号
			code: '',	//用户输入的验证码
		};
	},
	methods: {
		//获取验证码
		async send() {
			
			var result = await sms(this.phone);
			//把验证码存入到缓存
			var code = result.data.list.code;
			this.code = code
			wx.setStorageSync('code', code);
			console.log(code)
		},
		//提交表单
		async doLogin() {
			//1.检验验证码
			var code = this.code; //用户输入的验证码
			var codeStorage = wx.getStorageSync('code');
			console.log(code == codeStorage)
			if (code == codeStorage) {
				//2.执行登录
				var result = await wxlogin({ phone: this.phone });
				//3.获取到token、uid等信息，存入到缓存
				console.log(result)
				var userInfo = result.data.list;

				wx.setStorageSync('userInfo', userInfo);
				//4.跳转到我的页面
				wx.reLaunch({
					url: '/pages/mine/mine?show=fromlogin'
				});
			} else {
				wx.showToast({
					title: '验证码不正确',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style>
/* 导入外部的样式文件 */
/* @import url("../../common/css/index.css"); */
.box {
	position: relative;
}

.row {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin: 40rpx;
}
.send {
	display: flex;
	justify-content: space-between;
}
.send text:nth-of-type(2) {
	color: #00bb00;
}
text {
	font-size: 27rpx;
	margin-bottom: 10rpx;
}
input {
	border-bottom: 1rpx solid gray;
	height: 65rpx;
}
</style>
