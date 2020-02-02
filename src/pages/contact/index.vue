<template>

    <div id="contact-page">
        <v-content>
            <v-container class="poiret mx-auto">
                <!--Section heading-->
                <h2 class="h1 pt-4">Contact us</h2>
                <!--Section description-->
                <p class="pb-4">
                    Curious about how Notice Everything Creative can help you streamline your business processes? In
                    need
                    of a new or better website or back-office application? Already have some custom business software
                    you'd
                    like to bring into the 21st century? Do you spend too much time on manual tasks that could easily be
                    automated? Shoot us a message!
                </p>

                <v-card>
                    <v-form @submit.prevent="submit" ref="form">
                        <input name="form-name" type="hidden" v-model="formValue['form-name']"
                               value="noticeeverything"/>
                        <v-container>
                            <v-row>

                                <v-col>
                                    <v-text-field :rules="nameRules"
                                                  label="Name"
                                                  name="name"
                                                  prepend-icon="mdi-account-outline"
                                                  required
                                                  v-model="formValue.name"/>
                                </v-col>

                                <v-col>
                                    <v-text-field :rules="emailRules"
                                                  label="Email"
                                                  name="email"
                                                  prepend-icon="mdi-email-outline"
                                                  required
                                                  v-model="formValue.email"/>
                                </v-col>

                            </v-row>

                            <v-row>

                                <v-col>
                                    <v-textarea :rules="messageRules"
                                                label="Message"
                                                name="message"
                                                prepend-icon="mdi-pencil-outline"
                                                required
                                                v-model="formValue.message"/>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-btn :disabled="loading"
                                       :loading="loading"
                                       @click="submit"
                                       class="ma-2"
                                       color="secondary"
                                       type="submit"
                                       x-large>
                                    submit
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>

                <v-snackbar v-model="snackbar">
                    {{ response }}
                    <v-btn @click="snackbar = false"
                           color="pink"
                           text>
                        Close
                    </v-btn>
                </v-snackbar>
            </v-container>
        </v-content>
    </div>

</template>

<script lang="ts" src="./contact.ts"></script>

<style scoped>
    #contact-page {
        margin-bottom: 20px;
    }
</style>
