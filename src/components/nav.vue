<template>
    <v-app-bar :color="$nuxt.$route.path === '/' ? 'transparent' : 'white'" :fixed="true"
               :flat="$nuxt.$route.path === '/'"
               :height="50">

        <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
            <nuxt-link to="/" style="text-decoration: none; font-weight:bold">
                <v-img max-width="40px;" src="/images/nec.png" to="/"
                       alt="Notice Everything Creative | Custom Business Software Solutions in Reno, NV"></v-img>
            </nuxt-link>
        </v-toolbar-title>

        <v-spacer/>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon to="/contact" v-on="on">
                    <v-icon>mdi-email-outline</v-icon>
                </v-btn>
            </template>
            <span>Contact Us</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon to="/projects" v-on="on">
                    <v-icon>mdi-view-quilt</v-icon>
                </v-btn>
            </template>
            <span>Projects</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn href="https://github.com/noticeeverything" icon target="_blank" v-on="on">
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </template>
            <span>Notice Everything on Github</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn href="https://stackoverflow.com/users/3127799/mycompassspins" icon target="_blank" v-on="on">
                    <v-icon>mdi-stack-overflow</v-icon>
                </v-btn>
            </template>
            <span>Notice Everything on StackOverflow</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn href="https://www.linkedin.com/in/justin-mcmahon-8722335/" icon target="_blank" v-on="on">
                    <v-icon>mdi-linkedin</v-icon>
                </v-btn>
            </template>
            <span>Notice Everything on LinkedIn</span>
        </v-tooltip>

    </v-app-bar>
</template>

<style scoped>
    header a, header button {
        color: #17a2b8 !important;
    }
</style>
