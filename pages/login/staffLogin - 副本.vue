<template>
	<view class="pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">导航栏</block>
		</cu-custom>
		<view>
			<Title>登录</Title>
			<view class="formBox">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<u-form-item prop="name" class="margin-top-xl" borderBottom><u--input v-model="form.name" placeholder="请输入您的姓名" border="none"></u--input></u-form-item>
					<u-form-item prop="idNo" class="margin-top-xl" borderBottom>
						<u--input v-model="form.idNo" placeholder="请输入您的身份证号码" border="none"></u--input>
					</u-form-item>


					<u-form-item prop="password" class="margin-top-xl" borderBottom>
						<u--input v-model="form.password" type="password" placeholder="请输入您的密码" border="none"></u--input>
					</u-form-item>
				</u--form>
				<div class="margin-tb-xl">
				<u-button  shape="circle" :plain="true" type="primary" @click="submit">登录</u-button>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
import Title from './components/Title.vue';
export default {
	components: { Title },
	data() {
		return {
			form: {
				name: '',
				password: '',
				phone: '',
				idNo: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				],
				idNo: [
					{
						required: true,
						message: '请输入身份证',
						trigger: ['blur', 'change']
					}
				],
				phone: [
					{
						required: true,
						message: '请输入电话',
						trigger: ['blur', 'change']
					}
				],
				password: [
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
				.then(res => {
					uni.$u.toast('校验通过');
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		},
		rules: {
			name: [
				{
					required: true,
					message: '请输入姓名',
					trigger: ['blur', 'change']
				}
			]
		}
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
