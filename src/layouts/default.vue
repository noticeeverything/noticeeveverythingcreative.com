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
	import Navigation from '../components/navigation/navigation';
	import Footer from '../components/footer/footer';
	import { Component } from 'vue-property-decorator';

	@Component({
		name: 'default',
		components: { Navigation, Footer }
    })
	export default class DefaultLayout {};
</script>
