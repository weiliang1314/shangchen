<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      
      <div class="tupian"><slot name="user-icon"><img src="~assets/img/profile/t.png"></slot></div>
      
      <div class="login-info left">
      <div class="username">
        <slot name="user-nickname">
          <div >登录/注册</div>
        </slot>
      </div>
        <div class="phone">
       
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    
    </a>
  </div>
</template>

<script>
	export default {
		name: "userinfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  
  }

  #user-info .tupian {
    float: left;
    width: 69px;
    height: 69px;
    background-color: #fff;
    border-radius: 50%;
    
  }
  
  

  
  

  #user-info .login-info {
    float: left;
    
    color: #fff;
    margin: 10px 0 0 10px;
  }
#user-info .login-info .username{
  font-size: 18px;
  width: 80px;
  height: 20px;
  margin-left: 24px;
  
}
  #user-info .login-info .phone {
    width: 120px;
    height: 20px;
   
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

 
</style>
