<template>

    <div id="projects-page">
        <v-content class="text-center">
            <v-container>
                <h1>Projects</h1>
                <v-divider/>
                <br>
                <!-- render projects -->
                <v-card v-for="project in projects" v-bind:key="project.fields.name"
                        style="width:25%; min-width: 350px"
                        class="d-inline-block mr-4 mb-4">
                    <nuxt-link :to="'/projects/' + project.fields.slug" append>
                        <v-skeleton-loader transition="fade-transition" type="image" min-width="350" v-if="loading"/>
                        <v-img v-else transition="fade-transition" height="200px" alt=""
                               :src="project.fields.image.fields.file.url"/>
                    </nuxt-link>

                    <v-card-title>
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

                    </v-card-title>

                    <v-card-subtitle>
                        <p class="text-left">
                            {{ project.fields.description }}
                        </p>
                    </v-card-subtitle>

                    <v-card-actions>

                        <v-btn text color="cyan" x-large type="primary" :to="project.fields.slug" class="mx-auto" append>
                            explore
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-content>
    </div>

</template>

<script lang="ts" src="./projects.ts"></script>

<style scoped>
    #projects-page h1 {
        font-family: 'Poiret One', 'Helvetica Neue', sans-serif;
        letter-spacing: 0.2rem;
        font-weight: bold;
        text-align: left;
    }
</style>
