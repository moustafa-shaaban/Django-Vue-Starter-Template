<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useForm } from '@tanstack/vue-form';
import z from 'zod';
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FieldInfo from "@/components/FieldInfo.vue";

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const ZodSchema = z.object({
  email: z.email(),
  username: z.string().min(4),
  password: z.string().min(4),
  password2: z.string().min(4),
})

const form = useForm({
  defaultValues: {
    email: '',
    username: '',
    password: '',
    password2: '',
  },
  validators: {
    onBlur: ZodSchema,
    //onChange: ZodSchema,
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    authStore.register(JSON.stringify(value))
  }
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Register
        </CardTitle>
        <CardDescription>
          Create a new Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="
          (e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }
        ">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <div class="grid gap-3">
                <form.Field name="email">
                  <template v-slot="{ field, state }">
                    <Label for="field.name">Email</Label>
                    <Input 
                      :id="field.name" 
                      :name="field.name" 
                      :value="field.state.value" 
                      @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)" 
                      @blur="field.handleBlur" 
                    />
                    <FieldInfo :state="state" />
                  </template>
                </form.Field>
              </div>
              <div class="grid gap-3">
                <form.Field name="username">
                  <template v-slot="{ field, state }">
                    <Label for="field.name">Username</Label>
                    <Input 
                      :id="field.name" 
                      :name="field.name" 
                      :value="field.state.value" 
                      @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)" 
                      @blur="field.handleBlur" 
                    />
                    <FieldInfo :state="state" />
                  </template>
                </form.Field>
              </div>
              <div class="grid gap-3">
                <form.Field name="password">
                  <template v-slot="{ field, state }">
                    <Label for="field.name">Password</Label>
                    <Input 
                      type="password" 
                      :id="field.name" 
                      :name="field.name" 
                      :value="field.state.value" 
                      @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)" 
                      @blur="field.handleBlur" 
                    />
                    <FieldInfo :state="state" />
                  </template>
                </form.Field>
              </div>
              <div class="grid gap-3">
                <form.Field name="password2">
                  <template v-slot="{ field, state }">
                    <Label for="field.name">Password Confirmation</Label>
                    <Input 
                      type="password" 
                      :id="field.name" 
                      :name="field.name" 
                      :value="field.state.value" 
                      @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)" 
                      @blur="field.handleBlur" 
                    />
                    <FieldInfo :state="state" />
                  </template>
                </form.Field>
              </div>
              <Button type="submit" class="w-full">
                Register
              </Button>
            </div>
            <div class="text-center text-sm">
              Don't have an account?
              <RouterLink :to="{ name: 'login' }" class="underline underline-offset-4">
                Sign In instead
              </RouterLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <!-- <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div> -->
  </div>
</template>
