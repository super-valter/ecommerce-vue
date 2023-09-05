import { DiscountPercentage } from '@/filters/DiscountPercentage';
import { IProducts, IProductsCart, IReponseApiProdutos } from '@/interfaces/IProducts';
import Products from '@/services/Products';
import Vuex from 'vuex'

export default new Vuex.Store({
	state: {
		listProductFavoriteId: JSON.parse(localStorage.getItem('FavoriteId') || '[]'),
		listProductFavorite: JSON.parse(localStorage.getItem('Favorite') || '[]'),
		cartProducts: JSON.parse(localStorage.getItem('cartProdutosVisie') || '[]'),
		products: {} as IProducts[],
		productsTotal: {} as number,
		productsSkip: {} as number,
		drawerCart: false,
		drawerFavoritos: false
	},
	mutations: {
		['setProducts'](state, products: IReponseApiProdutos) {
			state.products = [...products.products]
			state.productsTotal = products.total
			state.productsSkip = products.skip
		},
		['addFavorite'](state, product: IProducts) {
			/* Somente id */
			state.listProductFavoriteId.push(product.id);
			const favoriteJsonId = JSON.stringify(state.listProductFavoriteId);
			localStorage.setItem('FavoriteId', favoriteJsonId);
			/* Produto inteiro */
			state.listProductFavorite.push(product);
			const favoriteJson = JSON.stringify(state.listProductFavorite);
			localStorage.setItem('Favorite', favoriteJson);
		},
		['removeFavorite'](state, product: IProducts) {
			/* Somente id */
			const removeFavoriteitenID = state.listProductFavoriteId.indexOf(product.id);
			state.listProductFavoriteId.splice(removeFavoriteitenID, 1);
			const favoriteJsonId = JSON.stringify(state.listProductFavoriteId);
			localStorage.setItem('FavoriteId', favoriteJsonId);
			/* Produto inteiro */
			const removeFavoriteiten = state.listProductFavorite.map((value: IProducts) => value.id).indexOf(product.id);
			state.listProductFavorite.splice(removeFavoriteiten, 1);
			const favoriteJson = JSON.stringify(state.listProductFavorite);
			localStorage.setItem('Favorite', favoriteJson);
		},
		['addCart'](state, productItem) {
			state.cartProducts.push(productItem);
			const favoriteJson = JSON.stringify(state.cartProducts);
			localStorage.setItem('cartProdutosVisie', favoriteJson);
		},
		['cartProductRemove'](state, idProduct: number) {
			state.cartProducts.splice(idProduct, 1);
			const favoriteJson = JSON.stringify(state.listProductFavorite);
			localStorage.setItem('cartProdutosVisie', favoriteJson);
		},
		['qtdCartPlus'](state, indexProduct: number) {
			state.cartProducts[indexProduct].qtd++
			const favoriteJson = JSON.stringify(state.cartProducts);
			localStorage.setItem('cartProdutosVisie', favoriteJson);
		},
		['qtdCartMinus'](state, indexProduct: number) {
			state.cartProducts[indexProduct].qtd--
			const favoriteJson = JSON.stringify(state.cartProducts);
			localStorage.setItem('cartProdutosVisie', favoriteJson);
		},
		['drawerCart'](state, stateDrawer) {
			state.drawerCart = stateDrawer
		},
		['drawerFavoritos'](state, stateDrawer) {
			state.drawerFavoritos = stateDrawer
		}
	},
	getters: {
		searchCartProducts(state) {
			return state.cartProducts
		},
		searchLProduct(state) {
			return state.products
		},
		searchLProductFavoriteId(state) {
			return state.listProductFavoriteId
		},
		searchLProductFavorite(state) {
			return state.listProductFavorite
		},
		drawerCart(state) {
			return state.drawerCart
		},
		drawerFavoritos(state) {
			return state.drawerFavoritos
		},
		totalCart(state) {
			return state.cartProducts.reduce((total: number, products: IProductsCart) => total + products.price*products.qtd, 0)
		},
		totalCartdiscount(state) {
			return state.cartProducts.reduce((total: number, products: IProductsCart) => total + Number(DiscountPercentage(products.price*products.qtd,products.discountPercentage, false)), 0)
		},
		totalCartitens(state) {
			return state.cartProducts.reduce((total: number, products: IProductsCart) => total + products.qtd, 0)
		},
		totalProdutos(state) {
			return state.productsTotal
		},
	},
	actions: {
		async setProducts({ commit }, setProducts: number) {
			const reponseApi = await Products.productsAll(setProducts);
			commit("setProducts", reponseApi);
		},
		async setProductsCategory({ commit }, searchLProduct: string) {
			const reponseApi = await Products.productAllCategories(searchLProduct);
			commit("setProducts", reponseApi);
		},
		async setProductsSearch({ commit }, category: string) {
			const reponseApi = await Products.productAllSearch(category);
			commit("setProducts", reponseApi);
		},
		addCart({ commit, state }, productItem: IProducts) {
			const listProductS = state.cartProducts;
			const listProduct = listProductS.filter((valor: IProductsCart) => valor.id === productItem.id);
			const altQtdCart = listProductS.findIndex((valor: IProductsCart) => valor.id === productItem.id);

			const arrayProdutQtd: IProductsCart = {
				id: productItem.id,
				price: productItem.price,
				discountPercentage: productItem.discountPercentage,
				stock: productItem.stock,
				title: productItem.title,
				thumbnail: productItem.thumbnail,
				brand: productItem.brand,
				qtd: 1
			}

			if (listProduct.length === 0) commit("addCart", arrayProdutQtd);
			if (listProduct.length != 0) commit("qtdCartPlus", altQtdCart);
		},
		altQtdCartPlus({commit, state}, idProduct: number){
			const listProductS = state.cartProducts;
			const altQtdCart = listProductS.findIndex((valor: IProductsCart) => valor.id === idProduct);			
			commit("qtdCartPlus", altQtdCart);
		},
		altQtdCartMinus({commit, state}, idProduct: number){
			const listProductS = state.cartProducts;
			const altQtdCart = listProductS.findIndex((valor: IProductsCart) => valor.id === idProduct);			
			commit("qtdCartMinus", altQtdCart);
		},
		cartProductRemove({commit, state}, idProduct: number){
			const listProductS = state.cartProducts;
			const cartProductRemove = listProductS.findIndex((valor: IProductsCart) => valor.id === idProduct);			
			commit("cartProductRemove", cartProductRemove);
		},
	},
	modules: {}
})
