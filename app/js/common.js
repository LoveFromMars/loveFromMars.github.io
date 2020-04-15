const good = (id, name, price, image) => ({id, name, price, image})

const goods = [
	good('1', 'Крест серёжка золото', '15800', 'img/1.jpg'),
	good('2', 'Крест серёжка серебро', '13150', 'img/2.jpg'),
	good('3', 'Моносерьга Крест с камнями', '15800', 'img/3.jpg'),
	good('4', 'Кафф PEACE silver', '15800', 'img/4.jpg'),
	good('5', 'Кафф LOVE gold', '15800', 'img/5.jpg'),
	good('6', 'Кафф PEACE silver', '8700', 'img/11.jpg'),
	good('7', 'Кафф PEACE silver', '8700', 'img/7.jpg'),
	good('8', 'Кафф PEACE silver', '8700', 'img/8.jpg'),
	good('9', 'Кафф PEACE silver', '8700', 'img/9.jpg'),
	good('10', 'Кафф PEACE silver', '8700', 'img/10.jpg'),
	good('11', 'Кафф PEACE silver', '8700', 'img/1.jpg'),
	good('12', 'Кафф PEACE silver', '8700', 'img/2.jpg'),
	good('13', 'Кафф PEACE silver', '8700', 'img/3.jpg'),
	good('14', 'Кафф PEACE silver', '8700', 'img/4.jpg'),
	good('15', 'Кафф PEACE silver', '8700', 'img/5.jpg'),
	good('16', 'Кафф PEACE silver', '8700', 'img/11.jpg'),
	good('17', 'Кафф PEACE silver', '8700', 'img/7.jpg'),
	good('18', 'Кафф PEACE silver', '8700', 'img/8.jpg'),
	good('19', 'Кафф PEACE silver', '8700', 'img/9.jpg'),
	good('20', 'Кафф PEACE silver', '8700', 'img/10.jpg'),
	good('21', 'Кафф PEACE silver', '8700', 'img/1.jpg'),
	good('22', 'Кафф PEACE silver', '8700', 'img/2.jpg'),
	good('23', 'Кафф PEACE silver', '8700', 'img/3.jpg'),
	good('24', 'Кафф PEACE silver', '8700', 'img/4.jpg'),
	good('25', 'Кафф PEACE silver', '8700', 'img/5.jpg')
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
