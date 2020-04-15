const good = (id, name, price, image) => ({id, name, price, image})

const goods = [
	good('1', 'Крест серёжка', '2000', 'img/1.jpg'),
	good('2', 'Крест серёжка', '2000', 'img/2.jpg'),
	good('3', 'Крест серёжка', '2000', 'img/3.jpg')
]

var arrCart = []

if (localStorage["arrayGoods"] !== null) {
	arrCart = localStorage["arrayGoods"] ? JSON.parse(localStorage["arrayGoods"]) : []
}

Vue.component('item-shop', {
	template: '\
		<div class="col-md-4">\
			<div class="item-shop">\
				<img \
					v-bind:src="product_data.image"\
					v-bind:alt="product_data.name"\
				/>\
				<div class="name">{{ product_data.name }}</div>\
				<div class="price">{{ product_data.price }}</div>\
				<button \
					v-on:click="addToCart"\
					class="btn btn-primary"> {{ buttonBuyText }} </button>\
			</div>\
		</div>\
	',
	data: function () {
		return {
			inCart: false
		}
	},
	props: {
		product_data: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	methods: {
		addToCart() {
			this.inCart = !this.inCart
			if( this.inCart == true ) {
				arrCart.push(this.product_data.id)
			} else {
				const index = arrCart.indexOf(this.product_data.id);
				if (index > -1) {
				  arrCart.splice(index, 1);
				}
			}
			localStorage["arrayGoods"] = JSON.stringify(arrCart);
			/*this.inCart ? arrCart.push(this.product_data.id) : arrCart.splice( this.product_data.id, 1 )*/
		}
	},
	computed: {
		buttonBuyText() {
			return this.inCart ? 'Убрать из корзины' : 'В корзину'
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			if (localStorage["arrayGoods"] !== null) {
				const index = JSON.parse(localStorage["arrayGoods"]).indexOf(this.product_data.id)
				if (index > -1) {
					this.inCart = !this.inCart
				}
			}
		})
	}
})

new Vue({
	el: '#app',
	data: {
		goods: goods,
		arrCart: arrCart,
		cartVal: arrCart.length
	},
	methods: {
		
	},
	computed: {
		
	},
	watch: {
		arrCart: function (newVal, oldVal) {
			this.cartVal = this.arrCart.length
		}
	}
})
