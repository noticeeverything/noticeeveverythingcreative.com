<template>
    <div id="project">
        <v-content>
            <v-container>
                <v-alert text type="error" v-if="!loading && !project">{{ error }}</v-alert>
                <div class="project" v-else>
                    <v-btn icon @click="$nuxt.$router.back()" class="float-left">
                        <v-icon>mdi-chevron-double-left</v-icon>
                    </v-btn>
                    <div v-if="project">
                        <h1 class="text-center">
                            {{ project.fields.name }}
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn text color="cyan" x-large type="primary" :href="project.fields.url"
                                           target="_blank" v-on="on">
                                        <v-icon>mdi-link-variant</v-icon>
                                    </v-btn>
                                </template>
                                <span>visit {{ project.fields.url }}</span>
                            </v-tooltip>
                        </h1>
                        <v-divider/>
                        <br>
                        <br>
                        <div class="tech text-center" v-if="project.fields.tech">
                            <h3 class="text-center">
                                made with
                                <v-icon>mdi-heart</v-icon>
                                and a little help from our friends
                            </h3>
                            <br>
                            <section>
                                <v-img transition="scale-transition"
                                       class="d-inline-block mx-auto mr-10 mb-10"
                                       v-for="entry in project.fields.tech"
                                       v-bind:key="entry.fields.file.url" max-width="100" :src="entry.fields.file.url"/>
                            </section>
                            <v-divider/>
                        </div>
                        <br>

                        <div v-if="project.fields.about">
                            <section v-for="item in project.fields.about.content">
                                <v-container v-if="item.content.length" v-bind:key="subitem.value"
                                             v-for="subitem in item.content">
                                    {{ subitem.value }}
                                </v-container>
                            </section>
                        </div>

                        <div v-else>
                            <v-alert type="info" text>
                                work in progress . . .
                            </v-alert>
                        </div>
                    </div>

                </div>
            </v-container>
        </v-content>
    </div>
</template>

<script lang="ts" src="./project.ts"></script>

<style scoped>
    * {
        font-family: 'Poiret One', 'Helvetica Neue', sans-serif;
        letter-spacing: 0.2rem;
        font-weight: bold;
    }
</style>
