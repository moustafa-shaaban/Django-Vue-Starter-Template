<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 text-center">
          <v-card-title class="justify-center text-h4">404 - Page Not Found</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">Sorry, the page you're looking for doesn't exist.</p>
            <v-btn color="primary" to="/" class="ma-2">Go to Home</v-btn>
            <!-- <v-btn variant="outlined" to="/login" class="ma-2">Login</v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
