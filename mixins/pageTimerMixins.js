export default {
	data() {
		return {
			switchTimer: false,
			timer: null,
			count: null
		}
	},
	watch: {
		switchTimer(val) {
			if (val == true) {
				this.openTimer()
			} else {
				this.closeTimer()
			}
		}
	},
	created() {

	},
	methods: {
		openTimer(val=60) {
			console.log('倒计时开始');
			this.count = val;
			let _this = this;
			if (!this.timer) {
				this.timer = setInterval(function fun() {
					if (_this.count < 0) {
						clearInterval(_this.timer); //倒计时为0之后停止倒计时
						console.log('倒计时结束');
					}
					_this.count--;
				}, 1000)

			}
		},
		closeTimer() {
			console.log('清除倒计时');
			if(this.timer){
				clearInterval(this.timer); 
			}
		}
	},
	destroyed(){
		this.closeTimer()
	}
}
