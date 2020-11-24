<template>
  <div class="sign var-theme">
    <div class="sign-nav">
      <div class="sign-nav-item" :style="{'background-image': `url('${background.image}')`}"></div>
      <div class="nav-item" v-if="background.nav">
        <div class="sign-nav-item" :style="{'background-image': `url('${background.nav}')`}"></div>
      </div>
    </div>
    <div class="sign-sidebar var-theme-pair-4">
      <div class="sign-body">
        <div class="sign-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="28.66px" height="45.20px">
            <g style="transform: scale(.5);">
              <path stroke="#000"
                    d="m21.054845,6.553957c-4.29931,3.25323 -7.53805,6.56319 -10.92111,12.82111c-3.38307,6.25793 -4.74379,9.79716 -6.2871,14.84228c-1.54331,5.04513 -3.8268,17.22095 -3.46909,22.98968c0.35771,5.76873 0.47784,7.85769 2.52966,12.88058c2.05182,5.02289 3.59163,6.633 6.43001,8.94553c2.83838,2.31254 5.04028,4.19811 11.07306,7.35236c6.03278,3.15424 12.59586,5.14369 18.96779,6.15381c1.59299,0.25252 5.71691,0.73565 8.45737,0.63246c2.74046,-0.10319 5.02055,-0.79269 6.61808,-1.6547c3.19506,-1.72403 4.70823,-4.25139 1.16661,-6.95969c-3.54162,-2.7083 -13.14569,-10.50779 -17.65838,-15.04963c-4.51269,-4.54184 -9.46431,-10.56284 -13.53094,-17.97337c-4.06662,-7.41053 -3.21221,-15.01469 -2.34441,-17.21861c0.8678,-2.20392 1.31071,-2.42463 2.34284,-3.27444c1.03213,-0.84981 2.63878,-1.3702 4.4456,-1.43696c1.80682,-0.06676 6.29253,1.24014 8.00418,2.50796c1.71165,1.26782 6.84634,3.11291 10.68547,3.22481c3.83913,0.1119 6.80926,-2.2711 7.77394,-4.36382c0.96468,-2.09272 1.53376,-5.30566 0.12068,-9.26824c-1.41308,-3.96257 -0.7816,-6.06437 -2.79946,-9.02092c-2.01786,-2.95655 -3.76492,-4.77411 -8.32044,-7.30289c-4.55552,-2.52878 -7.06418,-2.32771 -11.38751,-2.55215c-4.32332,-0.22443 -9.7472,2.09823 -11.89685,3.72484z"
                    fill-opacity="null" stroke-opacity="null" stroke-width="0"></path>
              <path d="m39.721669,4.606055c4.18919,-1.8919 6.89191,-2.56758 10.27029,-2.97298c3.37838,-0.4054 8.91893,-0.54054 9.05407,0.54054c0.13513,1.08109 -3.24326,2.83783 -4.32434,4.05405c-1.08108,1.21622 -3.10811,3.3784 -4.05406,5.94597c-0.94595,2.56756 -15.13516,-5.67569 -10.94596,-7.56758z" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000"></path>
            </g>
          </svg>
        </div>
        <form-list ref="formList" :form-value="form.value" :form-list="form[!isCreate ? 'list' : 'list_']" :form-rules="form.rules" label-width="80px">
          <template slot="code" slot-scope="{item:data}">
            <el-form-item :label="data.label" :prop="data.prop">
              <el-input class="form-list-code" v-model="form.value[data.name]" @keyup.enter.native="signIn" select-when-unmatched>
                <template slot="append">
                  <img :src="codeImage" style="display: block; height: 100%;" alt="code" @click="ResetImage">
                </template>
              </el-input>
            </el-form-item>
          </template>
        </form-list>
        <div style="display: flex; align-items: center; padding-left: 70px;">
          <!--          <el-checkbox v-if="!isCreate" v-model="isRemember">记住密码</el-checkbox>-->
          <el-button @click="switchClick" type="text">{{ !isCreate ? '去注册' : '去登录' }}</el-button>
          <span style="margin: 0 auto;"/>
          <el-button type="primary" style="min-width: 80px;" @click="signIn" v-if="!isCreate">登录</el-button>
          <el-button type="primary" style="min-width: 80px;" @click="signUp" v-else>注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import sign from '@/api/sign'
import Cookie from "@/plugin/cookie";
import {codeVerify} from "@/api/api";
import {isEmail} from "@/utils/validator";
import {Component, Vue} from 'vue-property-decorator';
import FormList from "@/components/form-list/index.vue";

@Component({
  components: {FormList}
})
export default class SignIndex extends Vue {
  interval = 0;
  codeImage = '';// 验证码图片
  isCreate = false; // 是否注册
  isRemember = false; // 记住密码
  background = {keys: 0, image: '', nav: ''};
  // message: '邮箱不能为空'
  form = {
    value: {},
    list: {
      'a': {type: 'text', label: "账号", name: "user", prop: 'user'},
      'b': {type: 'password', label: "密码", name: "pass", prop: 'pass'},
      'c': {slot: 'code', label: "验证码", name: "code", prop: 'code'},
    },
    list_: {
      'a': {type: 'text', label: "账号", name: "user", prop: 'user'},
      'b': {type: 'text', label: "邮箱", name: "email", prop: 'email'},
      'c': {type: 'password', label: "密码", name: "pass", prop: 'pass'},
      'd': {slot: 'code', label: "验证码", name: "code", prop: 'code'},
      // 'e': {type: 'input', label: "扩展码", name: "expandCode"},
    },
    rules: {
      user: [
        {required: true, message: '账号不能为空', trigger: 'change'},
        {required: true, min: 4, message: '不能小于4位', trigger: 'change'},
      ],
      pass: [
        {required: true, message: '密码不能为空', trigger: 'change'},
        {required: true, min: 6, message: '不能小于6位', trigger: 'change'},
      ],
      code: [
        {required: true, message: '验证码不能为空', trigger: 'change'}
      ],
      email: [
        {required: true, validator: isEmail, trigger: 'change'}
      ]
    }
  }
  imagePath = (Keys: number) => require(`../../../assets/动态背景/macOS-Big-Sur-${Keys}.jpg`);

  signIn() {
    (this.$refs.formList as FormList).validate((status: boolean) => {
      status && sign('login', {
        data: this.form.value,
        success: ({token}) => {
          Cookie.set('Token', token) // 设置 Token
          this.$router.push({path: '/index'})
        },
        error: ({code, msg}) => {
          code === 204 && this.ResetImage()
          this.$message.error(msg)
        }
      })
    })
  }

  signUp() {
    (this.$refs.formList as FormList).validate((status: boolean) => {
      status && sign('create', {
        data: this.form.value,
        success: ({msg}) => {
          this.$message.success(msg);
        },
        error: ({msg}) => {
          this.$message.error(msg)
        }
      })
    })
  }

  switchClick() {
    this.formReset();
    this.ResetImage();
    this.isCreate = !this.isCreate;
    (this.$refs.formList as Vue).$nextTick(() => {
      (this.$refs.formList as FormList).clearValidate()
    })
  }

  formReset() {
    this.form.value = {};
    this.isRemember = false;
  }

  ResetImage() {
    this.codeImage = `${codeVerify}?uuid=${window.Config['uuid']}&t=` + new Date().getTime();
  }

  backgroundKeys() {
    const hours = new Date().getHours();
    if (hours >= 20 || hours <= 6) return 1;
    // 2，3，4，5，6，7，8 => [6, 8, 10, 12, 14, 16, 18]
    return parseInt(`${(hours - 4) / 2}`) + 1
  }

  switchBackImage() {
    const Keys = this.backgroundKeys()
    this.background.keys = Keys
    this.background.image = this.imagePath(Keys);
    this.interval = setInterval(() => {
      const Keys = this.backgroundKeys()
      if (this.background.keys !== Keys) {
        this.background.keys = Keys
        const imagePath = this.imagePath(Keys);
        this.background.nav = imagePath
        setTimeout(() => {
          this.background.nav = ''
          this.background.image = imagePath
        }, 1000)
      }
    }, 1000)
  }

  mounted() {
    this.$nextTick(() => {
      this.formReset()
      this.ResetImage()
      this.switchBackImage()
    })
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
