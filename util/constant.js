const wxUserReg = new RegExp(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/)
const wxPwdReg = new RegExp(/^[a-zA-Z0-9]{6,10}$/)
const destination = [
	'欢迎您来到艾小小和风早早,希望您在这里可以收获开心',
	'TA的目的： 分享心情，相互激励，相互促进，相互进步，收获开心',
	'TA的特点： 主要通过两人相互许愿对方实现的形式达到TA的目的，在这期间系统也会出一些活动和任务促进双方',
	'登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA；登录后请第一时间绑定另一个TA',
	'有任何意见都可以加我微信feng--zao'
]
const everyday = [
	{
		content: '今天天气不错',
		createTime: '2019-11-12'
	},
	{
		content: '今天天气不错2',
		createTime: '2019-11-11'
	},
	{
		content: '今天天气不错3',
		createTime: '2019-11-10'
	}
]
const postData = [{
		"post_id": '1',
		"uid": 1,
		"username": "龙葵",
		"header_image": "/static/index/test/header03.jpg",
		"content": {
			"text": "内裤上百条，晒不干一条；衣服晾不干，亲人泪两行",
			"images": ["/static/index/test/test2.jpg"]
		},
		"islike": 0,
		"like": [{
				"uid": 2,
				"username": "小李子,"
			},
			{
				"uid": 3,
				"username": "小张子"
			}
		],
		"comments": {
			"total": 2,
			"comment": [{
					"uid": 2,
					"username": '小爱',
					"content": "加个微信吧!基金基金基金基金基金基金基金基金基金基金基金基金基金基金基金基金基金基金"
				},
				{
					"uid": 3,
					"username": '小虎',
					"content": "一起出去好吗?"
				}
			]
		},
		"timestamp": "5分钟前"
	},
	{
		"post_id": 2,
		"uid": 1,
		"username": "菁英公寓-打造属于你的私密空间 小吴",
		"header_image": "/static/index/test/header04.jpg",
		"content": {
			"text": "租房:东环朝南\n\r2室大衣柜\n\r燃气热水器\n\r5楼采光充足\n\r随时入住",
			"images": [
				"/static/index/test/pig-01.jpg",
				"/static/index/test/pig-02.jpg",
				"/static/index/test/pig-03.jpg",
				"/static/index/test/pig-04.jpg",
				"/static/index/test/pig-05.jpg",
				"/static/index/test/pig-06.jpg",
				"/static/index/test/pig-07.jpg",
				"/static/index/test/pig-08.jpg",
				"/static/index/test/pig-09.jpg"
			]
		},
		"islike": 0,
		"like": [{
				"uid": 2,
				"username": "小王子,"
			},
			{
				"uid": 3,
				"username": "张大大"
			}
		],
		"comments": {
			"total": 2,
			"comment": [{
					"uid": 2,
					"username": '小虎',
					"content": "吃错药了!"
				},
				{
					"uid": 3,
					"username": '小狼',
					"content": "霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍!"
				}
			]
		},
		"timestamp": "1小时前"
	},
	{
		"post_id": 2,
		"uid": 1,
		"username": "BSK 必胜客新苏  小乐",
		"header_image": "/static/index/test/header05.jpg",
		"content": {
			"text": "美食花样多，诱人如北北；迎来小宇宙，幸福两行泪[喵喵]这可是小必的心声啊～",
			"images": ["/static/index/test/header01.jpg", "/static/index/test/header01.jpg",
				"/static/index/test/header01.jpg", "/static/index/test/header01.jpg"
			]
		},
		"islike": 0,
		"like": [{
				"uid": 2,
				"username": "小王子,"
			},
			{
				"uid": 3,
				"username": "张大大"
			}
		],
		"comments": {
			"total": 2,
			"comment": [{
					"uid": 2,
					"username": '小虎',
					"content": "吃错药了!"
				},
				{
					"uid": 3,
					"username": '小狼',
					"content": "霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍霍!"
				}
			]
		},
		"timestamp": "7小时前"
	}
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
const getImagePath = url + 'user/v1/getImagePath'
export default {
	url,
	wxUserReg,
	postData,
	everyday,
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
	finishBind,
	getImagePath
}
