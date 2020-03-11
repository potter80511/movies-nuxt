<template>
  <b-modal
    id="login"
    modal-class="login"
    title="登入"
    ok-title="登入"
    cancel-title="取消"
  >
    <div class="login-form">
      <div class="input-group">
        <font-awesome-icon icon="user" />
        <input id="login_name" type="text" placeholder="Email" />
      </div>
      <div class="input-group">
        <font-awesome-icon icon="lock" />
        <input id="login_password" type="password" placeholder="Password" />
      </div>
    </div>
  </b-modal>
</template>

<style lang="scss">
  #login {
    .login-form {
      .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        svg {
          margin-right: 10px;
          font-size: 22px;
        }
        input {
          height: 40px;
          padding: 10px;
        }
      }
    }
  }
</style>