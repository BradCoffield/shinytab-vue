<template>
    <div id="my-thing-template">
        <div class="my-thing" @click="edit">
            <div v-if="!editing">{{ thing }}</div>
            <div v-else>
                <form @submit.prevent="onSubmit">
                    <input type="text" v-model="form.title">
                    <button type="submit">Submit</button>
                    <button @click="cancelEdit">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      form: {
        title: "Supppp"
      }
    };
  },
  props: ["thing"],
  template: "#my-thing-template",
  watch: {
    thing(val) {
      this.form.title = val;
    }
  },
  methods: {
    edit() {
      this.editing = true;
    },
    cancelEdit() {
      this.editing = false;
    },
    onSubmit() {
      // something with this.thingTitle
    }
  }
};
</script>
