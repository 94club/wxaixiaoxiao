const wxUserReg = / ^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
const wxPwdReg = / ^[a-zA-Z0-9]{6,10}$/
const debug = true
const url = debug ? 'http://xiaoai.jiaxiu.club:8002/' : 'https://xiaoai.jiaxiu.club/'
const yuanTypes = [
	{
		value: 0,
		name: '心愿任务'
	},
	{
		value: 1,
		name: '双人任务'
	},
	{
		value: 2,
		name: '特殊任务'
	},
]
const destination = [
	'欢迎您来到艾小小和风早早,希望您在这里可以收获开心',
	'TA的目的： 分享心情，相互激励，相互促进，相互进步，收获开心',
	'TA的特点： 主要通过两人相互许愿对方实现的形式达到TA的目的，在这期间系统也会出一些活动和任务促进双方',
	'登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA',
	'有任何意见都可以加我微信muduo770@我'
]
const wechatLogin = url + 'unauth/wechatLogin'
const wechatRegister = url + 'unauth/wechatRegister'
const userLogin = url + 'unauth/v1/userLogin'
const getUserInfo = url + 'user/v1/getUserInfo'
const saveYuan = url + 'user/v1/saveYuan'
const saveMood = url + 'user/v1/saveMood'
const getMood = url + 'user/v1/getMood'
export default {
	wxUserReg,
	wxPwdReg,
	destination,
	url,
	wechatLogin,
	wechatRegister,
	yuanTypes,
	userLogin,
	getUserInfo,
	saveYuan,
	saveMood,
	getMood
}