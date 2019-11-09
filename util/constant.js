const wxUserReg = new RegExp(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/)
const wxPwdReg = new RegExp(/^[a-zA-Z0-9]{6,10}$/)
const destination = [
	'欢迎您来到艾小小和风早早,希望您在这里可以收获开心',
	'TA的目的： 分享心情，相互激励，相互促进，相互进步，收获开心',
	'TA的特点： 主要通过两人相互许愿对方实现的形式达到TA的目的，在这期间系统也会出一些活动和任务促进双方',
	'登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA',
	'有任何意见都可以加我微信feng--zao'
]
const url = 'https://xiaoai.jiaxiu.club/'
const wechatLogin = url + 'unauth/v1/wechatLogin'
const wechatRegister = url + 'unauth/v1/wechatRegister'
const wechatRegisterName = url + 'unauth/v1/wechatRegisterName'
const getAllUser = url + 'user/v1/getAllUser'
const getUserInfo = url + 'user/v1/getUserInfo'
const addYuan = url + 'user/v1/addYuan'
const getYuan = url + 'user/v1/getYuan'
const addMood = url + 'user/v1/addMood'
const getMood = url + 'user/v1/getMood'
const resetBind = url + 'user/v1/resetBind'
const finishBind = url + 'user/v1/finishBind'
export default {
	url,
	wxUserReg,
	destination,
	wechatLogin,
	wechatRegister,
	wechatRegisterName,
	getUserInfo,
	addYuan,
	getYuan,
	addMood,
	getMood,
	getAllUser,
	resetBind,
	finishBind
}