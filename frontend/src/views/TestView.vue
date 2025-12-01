<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import FieldInfo from '@/components/FieldInfo.vue'
import { z } from 'zod'

const ZodSchema = z.object({
  firstName: z
    .string()
    .min(3, '[Zod] You must have a length of at least 3')
    .startsWith('A', "[Zod] First name must start with 'A'"),
  lastName: z.string().min(3, '[Zod] You must have a length of at least 3'),
})

const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
  },
  validators: {
    // DEMO: You can switch between schemas seamlessly
    onChange: ZodSchema,
    // onChange: ValibotSchema,
    // onChange: ArkTypeSchema,
    // onChange: EffectSchema,
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    alert(JSON.stringify(value))
  },
})

async function onChangeFirstName({ value }: { value: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return value.includes(`error`) && `No 'error' allowed in first name`
}
</script>

<template>
  <form
    @submit="
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }
    "
  >
    <div>
      <form.Field
        name="firstName"
        :validators="{
          onChange: ({ value }) =>
            !value
              ? `A first name is required`
              : value.length < 3
                ? `First name must be at least 3 characters`
                : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: onChangeFirstName,
        }"
      >
        <template v-slot="{ field, state }">
          <label :htmlFor="field.name">First Name:</label>
          <input
            :id="field.name"
            :name="field.name"
            :value="field.state.value"
            @input="
              (e) => field.handleChange((e.target as HTMLInputElement).value)
            "
            @blur="field.handleBlur"
          />
          <FieldInfo :state="state" />
        </template>
      </form.Field>
    </div>
    <div>
      <form.Field name="lastName">
        <template v-slot="{ field, state }">
          <label :htmlFor="field.name">Last Name:</label>
          <input
            :id="field.name"
            :name="field.name"
            :value="field.state.value"
            @input="
              (e) => field.handleChange((e.target as HTMLInputElement).value)
            "
            @blur="field.handleBlur"
          />
          <FieldInfo :state="state" />
        </template>
      </form.Field>
    </div>
    <form.Subscribe>
      <template v-slot="{ canSubmit, isSubmitting }">
        <button type="submit" :disabled="!canSubmit">
          {{ isSubmitting ? '...' : 'Submit' }}
        </button>
      </template>
    </form.Subscribe>
  </form>
</template>