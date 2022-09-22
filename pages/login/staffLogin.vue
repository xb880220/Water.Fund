<template>
	<view class="pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">访客登录</block>
		</cu-custom>
		<view>
			<Title>登录</Title>
			<view class="formBox">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<u-form-item prop="staffNo" class="margin-top-xl" borderBottom>
						<u--input v-model="form.staffNo" placeholder="请输入您的职工编号" border="none"></u--input>
					</u-form-item>
					<u-form-item prop="accountName" class="margin-top-xl" borderBottom>
						<u--input v-model="form.accountName" placeholder="请输入您的姓名" border="none"></u--input>
					</u-form-item>
					<u-form-item prop="identityCard" class="margin-top-xl" borderBottom>
						<u--input v-model="form.identityCard" placeholder="请输入您的身份证号码" border="none"></u--input>
					</u-form-item>


					<u-form-item prop="pwd" class="margin-top-xl" borderBottom>
						<u--input v-model="form.pwd" type="password" placeholder="请输入您的密码" border="none"></u--input>
					</u-form-item>
				</u--form>
				<div class="margin-tb-xl"><u-button shape="circle" :plain="true" type="primary" @click="submit">登录</u-button></div>
			</view>
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
			form: {
				accountName: '',
				pwd: '',
				phone: '',
				identityCard: '',
				staffNo: '',
				inWard:false
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
		submit() {
			this.$refs.form
				.validate()
				.then(async res => {
						const result = await userLoginApi(this.form);
						if(result){
							this.$store.commit('saveToken', result);
							this.$navto.navto('/pages/index/index');
						}
					uni.$u.toast('校验通过');
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		},
	}
};
</script>

<style lang="scss" scoped>
.margin-tb-xl {
	margin-top: 40px;
}
.formBox {
	width: 80%;
	margin: 40px auto 20px;
}
::v-deep .uni-input-input {
	padding: 0 40px;
	width: calc(100% - 80px);
}
</style>
