const authentication = {
    data(){
        return {
            auth: {
                accessToken: '',
                userId: '',
                email: '',
                error: ''
            }
        }
    },
    created(){
        this.storeCommit();
    },
    computed: {
        getUserId(){
            this.auth.userId = this.$store.getters.getAuthUserId;
            return this.auth.userId;
        },
        getAccessToken(){
            this.auth.accessToken = this.$store.getters.getAuthAccessToken;
            return this.auth.accessToken;
        },
        getEmail(){
            this.auth.email = this.$store.getters.getAuthEmail;
            return this.auth.email;
        }
    },
    methods: {
        storeCommit(){
            this.$store.commit('setAuthData', {userId: localStorage.getItem('user_id'), accessToken: localStorage.getItem('access_token'), email: localStorage.getItem('email')});
        },
        setAuthData(){
            this.auth.userId = localStorage.getItem('user_id');
            this.auth.accessToken = localStorage.getItem('access_token');
            this.auth.email = localStorage.getItem('email');

            this.storeCommit();
        },
        logout(){
            localStorage.removeItem('user_id');
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');

            this.setAuthData();
        }
    }
};

export default authentication;