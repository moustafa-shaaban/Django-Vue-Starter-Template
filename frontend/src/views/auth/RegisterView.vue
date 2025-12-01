<script setup lang="ts">
import { GalleryVerticalEnd } from "lucide-vue-next"
import { onMounted } from "vue";
import Cookies from 'js-cookie';

import { useForm } from '@tanstack/vue-form';
import { toTypedSchema } from "@vee-validate/zod";
import { cn } from "@/lib/utils"
import { toast } from "vue-sonner";
import { z } from 'zod'
import FieldInfo from "@/components/FieldInfo.vue";
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

import { useAuthStore } from '@/stores/auth';
import RegisterForm from "@/components/RegisterForm.vue";
import { axiosAPI } from "@/api/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!Cookies.get('csrftoken')) {
    try {
      authStore.getCSRFToken();
    } catch (error) {
      console.log(error)
    }
  }
})


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
    register(JSON.stringify(value))
  }
})

async function register(value) {

  try {
    const response = await axiosAPI.post(
      "_allauth/browser/v1/auth/signup",
      value
    );

    // if (
    //   response.status === 401 || response.data.flows
    // ) {
    //   const flows = response.data.flows;
    //   console.log(response.data);
    //   console.log(flows);
    //   router.push({ name: "verify-email", query: value.email });
    //   if (
    //     flows.some((flow) => flow.id === "verify_email" && flow.is_pending)
    //   ) {
    //     router.push({ name: "verify-email", query: value.email }); // Redirect to verification page
    //     return;
    //   }
    // }
  } catch (error) {
    console.log(error)
    if (error.response.status === 401 || error.response.data.flows) {
      console.log(value)
      console.log(value.email)
      router.push({ name: "verify-email", params: { email: value[0] } });
    }
    //router.push({ name: "verify-email", query: value.email });
    toast(error.response.data.errors.map((err) => err.message).join("; "));
  }
}

</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </a>
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
                        <Input :id="field.name" :name="field.name" :value="field.state.value"
                          @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)"
                          @blur="field.handleBlur" />
                        <FieldInfo :state="state" />
                      </template>
                    </form.Field>
                  </div>
                  <div class="grid gap-3">
                    <form.Field name="username">
                      <template v-slot="{ field, state }">
                        <Label for="field.name">Username</Label>
                        <Input :id="field.name" :name="field.name" :value="field.state.value"
                          @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)"
                          @blur="field.handleBlur" />
                        <FieldInfo :state="state" />
                      </template>
                    </form.Field>
                  </div>
                  <div class="grid gap-3">
                    <form.Field name="password">
                      <template v-slot="{ field, state }">
                        <Label for="field.name">Password</Label>
                        <Input type="password" :id="field.name" :name="field.name" :value="field.state.value"
                          @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)"
                          @blur="field.handleBlur" />
                        <FieldInfo :state="state" />
                      </template>
                    </form.Field>
                  </div>
                  <div class="grid gap-3">
                    <form.Field name="password2">
                      <template v-slot="{ field, state }">
                        <Label for="field.name">Password Confirmation</Label>
                        <Input type="password" :id="field.name" :name="field.name" :value="field.state.value"
                          @input="(e: { target: HTMLInputElement; }) => field.handleChange((e.target as HTMLInputElement).value)"
                          @blur="field.handleBlur" />
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
    </div>
  </div>
</template>
