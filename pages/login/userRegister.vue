<template>
	<view class="pageMain bgimg">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">访客注册</block>
			</cu-custom>
		</view>
		<view>
			<view class="formBox">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<div class="margin-top-xl"></div>
					<u-form-item prop="accountName" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/xm.png"
									style="width: 20px;height: 20px;margin-top: 8px;margin-left: 15px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.accountName" placeholder="请输入您的真实姓名"
									:customStyle="{ borderColor: '#f8f8f8 !important;',borderRadius:'10px !important;' }">
								</u--input>
							</view>
						</view>
					</u-form-item>
					<div class="margin-top-xl"></div>
					<u-form-item prop="identityCard" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/sfz.png"
									style="width: 20px;height: 18px;margin-top: 9px;margin-left: 15px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.identityCard" placeholder="请输入您的身份证号"
									:customStyle="{ borderColor: '#f8f8f8 !important;' }"></u--input>
							</view>
						</view>

					</u-form-item>
					<div class="margin-top-xl"></div>
					<u-form-item prop="phone" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/sj.png"
									style="width: 14px;height: 20px;margin-top: 8px;margin-left: 18px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.phone" placeholder="请输入您的手机号"
									:customStyle="{ borderColor: '#f8f8f8 !important;' }"></u--input>
							</view>
						</view>
					</u-form-item>
					<div class="margin-top-xl"></div>
					<u-form-item prop="company" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/dw.png"
									style="width: 20px;height: 20px;margin-top: 8px;margin-left: 15px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.company" placeholder="请输入您的单位全称"
									:customStyle="{ borderColor: '#f8f8f8 !important;' }"></u--input>
							</view>
						</view>

					</u-form-item>
					<div class="margin-top-xl"></div>
					<u-form-item prop="pwd" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/mm.png"
									style="width: 20px;height: 20px;margin-top: 8px;margin-left: 15px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.pwd" type="password" placeholder="请输入您的密码"
									:customStyle="{ borderColor: '#f8f8f8 !important;' }"></u--input>
							</view>
						</view>
					</u-form-item>
					<div class="margin-top-xl"></div>
					<u-form-item prop="pwd2" class="margin-top-xl" bg="#f8f8f8 !important">
						<view class="flex justify-between">
							<view><img src="@/static/icon/mm.png"
									style="width: 20px;height: 20px;margin-top: 8px;margin-left: 15px;" alt="" /></view>
							<view style="width: calc(100% - 40px)">
								<u--input v-model="form.pwd2" type="password" placeholder="确认密码"
									:customStyle="{ borderColor: '#f8f8f8 !important;' }"></u--input>
							</view>
						</view>
					</u-form-item>
					<div class="margin-top-xl"></div>
				</u--form>
				<div class="margin-tb-xl loginBtn">
					<u-button shape="circle" color="linear-gradient(to bottom, #4ABFFD , #0B93FC)" type="primary"
				customStyle="fontSize:18px;fontWeight:500;"  @click="submit">注&emsp;&emsp;&emsp;册</u-button>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		registerApi
	} from '@/config/login.js';
	import Title from './components/Title.vue';
	export default {
		components: {
			Title
		},
		data() {
			return {
				form: {
					company: '',
					accountName: '',
					pwd: '',
					phone: '',
					identityCard: '',
					
				},
				rules: {
					company: [{
						required: true,
						message: '请输入您的单位全称',
						trigger: ['blur', 'change']
					}],

					accountName: [{
						required: true,
						message: '请输入您的真实姓名',
						trigger: ['red', 'change']
					}],
					identityCard: [{
						required: true,
						message: '请输入您的身份证号',
						trigger: ['blur', 'change']
					}],
					phone: [{
						required: true,
						message: '请输入您的手机号',
						trigger: ['blur', 'change']
					}],
					pwd: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					pwd2: [{
							required: true,
							message: '请确认密码',
							trigger: ['change', 'blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								if (value == this.form.pwd) return true;
								else return false;
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								// return uni.$u.test.mobile(value);
							},
							message: '两次输入不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur']
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
				let _this = this;
				this.$refs.form
					.validate()
					.then(async res => {
						// uni.$u.toast('校验通过');
						const result = await registerApi(this.form);
						if (result) {
							uni.$u.toast(result);
							setTimeout(function() {
								_this.$navto.navBack();
							}, 2000);
						}
					})
					.catch(errors => {
						console.log(errors);
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
		padding-top: calc((100vh - 400px) / 2);
		// background:url("@/static/loginbg.png") 100% 100%;
		background-image: url('https://zspt1.5iprint.cloud/wechat/share/background.png');
		background-size: 100% 100%;
	}

	.margin-tb-xl {
		margin-top: 40px;
	}

	.margin-top-xl {
		margin-top: 0px;
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

	.margin-tb-xl {
		margin-top: 40px;
	}

	::v-deep .uni-input-input {
		padding: 0 40px;
		width: calc(100% - 80px);
	}

	.loginSize {
		font-size: 18px;
		font-weight: 500;
	}
</style>
