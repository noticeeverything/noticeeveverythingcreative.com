<template>
    <v-footer :dark="$route.path === '/'"
              :color="$route.path === '/' ? '#222' : 'default'"
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

<script src="./footer.ts"></script>
