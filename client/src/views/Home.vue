<template>
  <div>
    <button
      @click="showMessageForm = !showMessageForm"
      type="button"
      class="btn btn-primary mt-3 mb-3"
    >Toggle form</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage">
      <div v-if="error" class="alert alert-dismissible alert-primary">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Oh snap! <strong>{{ error }}.</strong>  Please change a few things upand try submitting again.
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject"
          required
        >
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input
          v-model="message.imageURL"
          type="url"
          class="form-control"
          id="imageURL"
          placeholder="Put an image URL dummy"
        >
      </div>
      <button type="submit" class="btn btn-primary mt-3 mb-3">Submit</button>
    </form>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" :src="message.imageURL" class="mr-3" :alt="message.imageURL">
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{ message.username }}</h5>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          {{ message.message }}
          <br>
          <small>{{ message.created }}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

const API_URL = "http://localhost:1234/messages";

export default {
  name: "home",
  data: () => ({
    showMessageForm: true,
    error: '',
    messages: [],
    message: {
      username: "Anonymous",
      subject: "",
      message: "",
      imageURL: ""
    }
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.message),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            // there was an error
            const error = result.details
              .map(detail => detail.message)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.showMessageForm = false;
            this.messages.push(result);
          }
        });
    }
  }
};
</script>

<style>
hr {
  border: 0.5px black solid;
}

img {
  max-width: 300px;
  height: auto;
}
</style>
