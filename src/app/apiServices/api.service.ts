import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';

@Injectable()
export class ApiService {
ordersuks
    constructor(private _http: Http) { }
    signInApi = GlobalService.serverApi + 'auth/signin';
    registerApi = GlobalService.serverApi + 'auth/register';
    bannerApi = GlobalService.serverApi + 'advertises';
    blogsApi = GlobalService.serverApi + 'blogs';
    brandsApi = GlobalService.serverApi + 'brands';
    brandsUkApi = GlobalService.serverApi + 'brandsuks';
    contactApi = GlobalService.serverApi + 'contact-us';
    dealsApi = GlobalService.serverApi + 'deals';
    orderApi = GlobalService.serverApi + 'orders';
    orderukApi = GlobalService.serverApi + 'ordersuks';
    scrapApi = GlobalService.serverApi + 'scrappers';
    checkRatesApi = GlobalService.serverApi + 'orders/checkrates';
    checkRatesukApi = GlobalService.serverApi + 'ordersuks/checkrates';
    getOrderApi = GlobalService.serverApi + 'ordersAll';
    getOrderukApi = GlobalService.serverApi + 'ordersAlluk';
    productsApi = GlobalService.serverApi + 'products';
    promoService = GlobalService.serverApi + 'redeem/promo';
    reviewApi = GlobalService.serverApi + 'reviews';
    promotionBarsApi = GlobalService.serverApi + 'promotion-bars';
    subscribeApi = GlobalService.serverApi + 'subscribe-users';
    editUserApi = GlobalService.serverApi + 'users';
    forgotPasswordApi = GlobalService.serverApi + 'auth/forgot';
    resetPasswordApi = GlobalService.serverApi + 'auth/reset';
    deletePromoApi = GlobalService.serverApi + 'used-promo-codes/remove';

    isLogin() {
        if (localStorage.getItem('user')) {
            return true;
        }
        return false;
    }
    hasBill() {
        if (localStorage.getItem('bill')) {
            var bill = JSON.parse(localStorage.getItem('bill'));
            if (bill.items.length > 0) {
                return true;
            }
        }
        return false;
    }
    getUserFirstName() {
        if (this.isLogin()) {
            let user = JSON.parse(localStorage.getItem('user'));
            return user.firstName;
        }
        return null;

    }
    loginUser(data) {
        return this._http.post(this.signInApi, data)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    createUser(data) {
        return this._http.post(this.registerApi, data)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    editUser(data) {
        return this._http.put(this.editUserApi, data)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    forgotPassword(data) {
        return this._http.post(this.forgotPasswordApi, data)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    resetPassword(token, data) {
        return this._http.post(this.resetPasswordApi + '/' + token, data)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getBanners() {
        return this._http.get(this.bannerApi)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getBlogs() {
        return this._http.get(this.blogsApi)
            .map(data => {
                data.json();
                console.log("blogs : ", data.json());
                return data.json();
            });
    }
    getBrands() {
        return this._http.get(this.brandsApi)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getBrandsuk() {
        return this._http.get(this.brandsUkApi)
            .map(data => {
                data.json();
                console.log("brands uk: ", data.json());
                return data.json();
            });
    }
    postMessage(obj) {
        return this._http
            .post(this.contactApi, obj)
            .map(data => {
                data.json();
                console.log("message: ", data.json());
                return data.json();
            });
    }
    getDeals() {
        return this._http
            .get(this.dealsApi)
            .map(data => {
                data.json();
                console.log("Deals: ", data.json());
                return data.json();
            });
    }
    postOrder(obj) {

        return this._http
            .post(this.orderApi, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    postOrderuk(obj) {
        
                return this._http
                    .post(this.orderukApi, obj)
                    .map(data => {
                        data.json();
                        console.log("I CAN SEE DATA HERE: ", data.json());
                        return data.json();
                    });
    }
    scrap(obj) {
        return this._http
            .post(this.scrapApi, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE SCRAP DATA HERE: ", data.json());
                return data.json();
            });
    }
    checkRates(obj) {
        return this._http
            .post(this.checkRatesApi, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    checkRatesuk(obj) {
        return this._http
            .post(this.checkRatesukApi, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getOrders() {
        return this._http
            .get(this.getOrderApi)
            .map(data => {
                data.json();
                console.log("Get Orders: ", data.json());
                return data.json();
            });
    }
    getOrdersuk() {
        return this._http
            .get(this.getOrderukApi)
            .map(data => {
                data.json();
                console.log("Get Orders: ", data.json());
                return data.json();
            });
    }
    getProducts() {
        return this._http.get(this.productsApi)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    checkPromo(obj) {
        return this._http
            .post(this.promoService, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getReviews() {
        return this._http.get(this.reviewApi)
            .map(data => {
                data.json();
                console.log("reviews : ", data.json());
                return data.json();
            });
    }
    getPromotionBar() {
        return this._http.get(this.promotionBarsApi)
            .map(data => {
                data.json();
                console.log("Promotion Bar : ", data.json());
                return data.json();
            });
    }
    subscribe(obj) {
        return this._http
            .post(this.subscribeApi, obj)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    deletePromo() {
        return this._http
            .post(this.deletePromoApi, {})
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }
    getUserName() {
        if (localStorage.getItem('user') != undefined)
            return JSON.parse(localStorage.getItem('user'));
        return null;
    }
}