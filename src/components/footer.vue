<template>
    <v-footer :dark="$nuxt.$route.path === '/'"
              :color="$nuxt.$route.path === '/' ? '#222' : 'default'"
              fixed
              height="40">
        <p style="width: 100%" class="text-center">
            <small>
                custom software
                <v-icon color="red lighten-3">mdi-heart</v-icon>
                made in reno, nv
            </small>
        </p>
    </v-footer>
</template>

<script>
	export default {
		name: 'site-footer'
	};
</script>
