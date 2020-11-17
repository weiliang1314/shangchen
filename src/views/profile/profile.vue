<template>
  <div id="profile">
    <navbar class="profile-nav">
      <div slot="center">
        个人中心
      </div>
    </navbar>
    
    <div>
      <userinfo></userinfo>
    </div>
   
    <div class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </div>

    
      <listview :list-data="orderList" class="order-list"></listview>
      <listview :list-data="serviceList" class="service-list"></listview>
      <listview :list-data="moreList" class="more-list"></listview>
  </div>

</template>

<script>
import navbar from 'components/common/navbar/navbar';
import userinfo from './child/userinfo';
import listview from './child/listview';

export default {
  name: 'profile',
  data() { 
    return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ],
        moreList:[
          {icon: '#expired', iconColor: '#ff8198', info: '设置'},
          {icon: '#vip', iconColor: '#ff8198', info: '更多'},
        ]
    }
  },
  methods:{
    test(){


    }
  },
  components:{
    navbar,
    userinfo,
    listview
  }
 }
</script>

<style scoped>
#profile{
  
  height: 100vh;
  position: relative;
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;

}
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px ;
    
  }
  .order-list, .more-list {
    margin-top: 12px;
  }

</style>