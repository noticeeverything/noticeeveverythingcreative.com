<template>
    <v-app app id="inspire">
        <Navigation/>
        <VSlideYTransition>
            <Nuxt/>
        </VSlideYTransition>
        <Footer/>
    </v-app>
</template>

<script>
	import Navigation from '../components/nav';
	import Footer from '../components/footer';

	export default {
		name: 'default',
		components: { Navigation, Footer }
	};
</script>
