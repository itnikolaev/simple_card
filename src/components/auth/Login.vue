<template>
    <div class="center-vertical">
        <div class="center-content row form-inline">

            <form id="login-validation" class="col-md-4 col-sm-5 col-xs-11 col-lg-3 form-group col-auto" v-if="!getAccessToken">
                <div id="login-form" class="content-box bg-default">
                    <div class="content-box-wrapper pad20A">
                        <div class="form-group">
                            <div class="alert alert-danger" v-if="auth.error">{{ auth.error }}</div>
                            <div class="input-group">
                                <span class="input-group-addon addon-inside bg-gray">
                                    <i class="glyph-icon icon-envelope-o"></i>
                                </span>
                                <input type="email" 
                                        class="form-control" 
                                        placeholder="Enter email" 
                                        v-model="user.login" 
                                        @blur="isValid()"
                                        >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon addon-inside bg-gray">
                                    <i class="glyph-icon icon-unlock-alt"></i>
                                </span>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="user.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-block btn-primary" @click.prevent="login()" :disabled="resetIsValid">Login</button>
                        </div>
                        <div class="alert alert-danger" v-if="resetIsValid && errorMsg">{{ errorMsg }}</div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import Authentication from '../mixins/authentication';
    
export default {
    mixins: [Authentication],
    data() {
        return {
            errorMsg: '',
            successMsg: '',
            
            user: {
                login: '',
                password: ''
            }
        }
    },
    computed: {
        // validation button send form to email address
        resetIsValid(){
            if (
                (this.user.login == '') || 
                (/^(?:[a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(?:\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(this.user.login) == false)
            ) {
                return true;
            }

            return false;
        }
    },
    methods: {
        login(){
            let hash = this.user.password ? SHA256(this.user.password) : this.user.password;
            let data = JSON.stringify({
                email: this.user.login,
                password: hash.toString()
            });

            localStorage.setItem('user_id', 10); // id default
            localStorage.setItem('access_token', hash.toString());
            localStorage.setItem('email', this.user.login);

            this.setAuthData();
        },

        // check validation on blur and set message error
        isValid(){
            if (this.user.login == '') {
                this.errorMsg = 'Field email is empty!';
            }else if (/^(?:[a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(?:\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(this.user.login) == false) {
                this.errorMsg = 'Please enter correct email to field input!';
            }else{
                this.errorMsg = '';
            }
        }
    }
}
</script>

<style>
.col-auto{
    margin: 0 auto;
}
</style>
