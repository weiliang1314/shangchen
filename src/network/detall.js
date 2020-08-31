//调用封装的模块
import { request } from './request'
export function getdetall(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })

}
//详情页推荐数据
export function getrecommend() {
    return request({
        url: '/recommend'
    })
}
//定义类，详情页名称价格等数据;通过类将复杂的数据进行整合
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        //最低价
        this.lowNowPrice = itemInfo.lowNowPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        //this.discountBgColor = itemInfo.discountBgColor;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}
//详情页店铺数据
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
//详情页商品参数数据
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}