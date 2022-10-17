<template>
	<view class="pageMain  bgimg">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">员工登录</block>
			</cu-custom>
		</view>
		<view>
			<view class="formBox">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<view class="margin-top-xl"></view>
					<u-form-item prop="staffNo" class="margin-top-xl" borderBottom>
						<u--input
							prefixIcon="list-dot"
							prefixIconStyle="font-size: 30px;color: #45BBFD"
							v-model="form.staffNo"
							placeholder="请输入您的职工编号"
							border="none"
						></u--input>
					</u-form-item>
					<view class="margin-top-xl"></view>
					<u-form-item prop="accountName" class="margin-top-xl" borderBottom>
						<u--input
							prefixIcon="account"
							prefixIconStyle="font-size: 30px;color: #45BBFD"
							v-model="form.accountName"
							placeholder="请输入您的姓名"
							border="none"
						></u--input>
					</u-form-item>
					<!-- 	<u-form-item prop="identityCard" class="margin-top-xl" borderBottom>
						<u--input prefixIcon="list-dot"
							prefixIconStyle="font-size: 22px;color: #45BBFD" v-model="form.identityCard" placeholder="请输入您的身份证号码" border="none"></u--input>
					</u-form-item> -->
					<view class="margin-top-xl"></view>
					<u-form-item prop="pwd" class="margin-top-xl" borderBottom>
						<u--input
							prefixIcon="lock"
							prefixIconStyle="font-size: 30px;color: #45BBFD"
							v-model="form.pwd"
							type="password"
							placeholder="请输入您的密码"
							border="none"
						></u--input>
					</u-form-item>
					<view class="margin-top-xl"></view>
				</u--form>
				<view class="margin-tb-xl loginBtn">
					<u-button shape="circle" color="linear-gradient(to bottom, #4ABFFD , #0B93FC)" type="primary" customStyle="fontSize:18px;fontWeight:500;" @click="submit">登&emsp;&emsp;&emsp;录</u-button>
				</view>
				
			</view>
			<view class="contactUs" @click="showCall()">联系工作人员</view>
			<u-popup :show="show" mode="center" :round="10" @close="close" >
				<view class="" style="padding: 30px;">
					拨打&nbsp;&nbsp;<text @click="call()" style="color: cornflowerblue;font-weight: 600;margin: 0 10px;">059187533793</text>
					&nbsp;&nbsp;转播 1028
				</view>
			      
			</u-popup>
		</view>
	</view>
</template>

<script>
import { userLoginApi } from '@/config/login.js';
import Title from './components/Title.vue';
export default {
	components: { Title },
	data() {
		return {
			show:false,
			form: {
				accountName: '',
				pwd: '',
				phone: '',
				identityCard: '',
				staffNo: '',
				inWard: false
			},
			rules: {
				accountName: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				],
				identityCard: [
					{
						required: true,
						message: '请输入身份证',
						trigger: ['blur', 'change']
					}
				],
				staffNo: [
					{
						required: true,
						message: '请输入职工编号',
						trigger: ['blur', 'change']
					}
				],
				// staffNo: [
				// 	{
				// 		required: true,
				// 		message: '请输入工作单位',
				// 		trigger: ['blur', 'change']
				// 	}
				// ],
				pwd: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	onReady() {
		this.$refs.form.setRules(this.rules);
	},
	methods: {
		close() {
				this.show = false;
		},
		showCall(){
			this.show = true;
		},
		call(){
			wx.makePhoneCall({
			      phoneNumber: '059187533793',
			    })
		},
		submit() {
			this.$refs.form
				.validate()
				.then(async res => {
					const result = await userLoginApi(this.form);
					if (result) {
						this.$store.commit('saveToken', result);
						this.$navto.navto('/pages/index/index');
					}
					uni.$u.toast('欢迎进入实训基地展示平台');
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.fixed {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
}
.bgimg {
	padding-top: calc((100vh - 320px) / 2);
	// background:url("@/static/loginbg.png") 100% 100%;
	background-image: url('https://zspt1.5iprint.cloud/wechat/share/background.png');
	background-size: 100% 100%;
}
.margin-tb-xl {
	margin-top: 40px;
}
.margin-top-xl {
	margin-top: 20px;
}
.formBox {
	position: relative;
	width: calc(100vw * 0.86);
	margin: 0 auto 20px;
	background-color: white;
	padding: 25px 40px 40px;
	border-radius: 30px;
	box-shadow: 0 0 10px 4rpx #9b9b9b;
	.loginBtn {
		position: absolute;
		bottom: -40px;
		left: calc(100vw * 0.1);
		width: calc(100vw * 0.66);

		box-shadow: 0px 6px 7px 0px rgba(25, 25, 25, 0.38);
		border-radius: 100px;
	}
}
::v-deep .uni-input-input {
	padding: 0 40px;
	width: calc(100% - 80px);
}

.contactUs{
	color: #45BBFD;
	text-align: center;
	margin-top: 40px;
}
</style>
