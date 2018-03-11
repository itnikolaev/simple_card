<template>
    <div id="app">
        <div v-if="getAccessToken">
            <header>
                <h1>Simple Store</h1>
            </header>
            <main>
                <router-view></router-view>
            </main>
            <footer>
                <div>@copy; Footer</div>
            </footer>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Authentication from './components/mixins/authentication';

export default {
    name: 'app',
    data () {
        return {
            
        }
    },
    computed: {
        
    },
    mixins: [Authentication]
}
</script>
