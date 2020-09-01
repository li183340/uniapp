import {request} from '@/utils/request.js';
//banner
async function getbanner(){
	return await request("/api/getbanner");
}
//获取一级分类信息
async function getcate(){
	return await request('/api/getcate')
}
//获取商品全部分类信息(首页全部分类，数据呈递归树状)
async function getcates(){
	return await request('/api/getcates')
}
//获取限时秒杀信息
async function getseckill(){
	return await request('/api/getseckill')
}
//获取商品信息 
async function getindexgoods(){
	return await request('/api/getindexgoods')
}
//搜索（like模糊搜索）
async function search(keywords){
	return await request('/api/search',{keywords:keywords})
}
//获取一级分类下的所有商品
async function getcategoods(id){
	return await request('/api/getcategoods',{fid:id})
}
//获取一级分类下的所有商品（分页版本）
async function getcategoodPage(fid,page,size){
	return await request('/api/getcategoodPage',{fid:fid,page:page,size:size})
}
//获取一个商品信息
async function getgoodsinfo(id){
	return await request('/api/getgoodsinfo',{id:id})
}
//会员注册（vue项目）
async function register(phone,nickname,password){
	return await request('/api/register',{phone:phone,nickname:nickname,password:password},'POST')
}
//会员登录（vue项目）
async function login(phone,password){
	return await request('/api/login',{phone:phone,password:password},"POST")
}
//购物车列表
async function cartlist(uid,authorization ){
	return await request('/api/cartlist',{uid:uid},"GET",{authorization:authorization})
}
//购物车添加
async function cartadd(cart,token){
	return await request('/api/cartadd',cart,"GET",token)
}
//购物车修改
async function cartedit(id,num,checked,authorization){
	return await request('/api/cartedit',{id:id,num:num,checked:checked},"GET",{authorization:authorization})
}
//购物车删除
async function cartdelete(id,authorization){
	return await request('/api/cartdelete',{id:id},"GET",{authorization:authorization})
}
//订单添加
async function orderadd(params,idstr,authorization){
	return await request('/api/orderadd',{params:params,idstr:idstr,authorization:authorization})
}
//订单查询
async function orders(uid,authorization){
	return await request('/api/orders',{uid:uid,authorization:authorization})
}
//发送短信验证码
async function sms(phone){
	return await request('/api/sms',{phone:phone})
}
//微信小程序登录注册（注册即登录  新用户登录	即注册，老用户即登录）
async function wxlogin(phone,cookie){
	return await request('/api/wxlogin',{phone:phone,cookie:cookie})
}
//检测token是否过期
async function checktoken(authorization){
	return await request('/api/checktoken',{authorization:authorization})
}
export {
	getcate,
	getbanner,
	getseckill,
	getindexgoods,
	getcategoods,
	getcates,
	getgoodsinfo,
	cartadd,
	cartlist,
	sms,
	wxlogin,
	cartedit,
	cartdelete,
	orderadd,
	search
}