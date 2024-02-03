<script setup>
import { io } from "socket.io-client";
import { ref } from "vue";

const user = ref(null);
const chatHistory = ref([]);
let socket = io("ws://localhost:3005", {
  reconnectionDelayMax: 10000,
});

function setName() {
  user.value = document.getElementById("name").value;
}

function sendMessage() {
  const message = document.getElementById("content").value;
  socket.emit("message", { author: user.value, message });
}

socket.on("connect", (ev) => {
  console.log("connected");

  socket.on('message', (c) => {
    chatHistory.value.push(c);
    console.log(chatHistory.value);
  });
  
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
</script>

<template>
  <article>
    <section v-if="!user">
      <h1>Nickname</h1>
      <input type="text" placeholder="Nickname" id="name" />
      <input type="submit" value="Submit" @click="setName" />
    </section>
    <section v-else>
      <h1>Chat</h1>
      <div>
        <h1>Send a message</h1>
        <textarea placeholder="Message content" id="content"></textarea>
        <br />
        <input type="submit" value="Send" @click="sendMessage"/>
      </div>
      <div>
        <h1 v-if="chatHistory.length < 1">There isn't history :(</h1>
        <div v-for="({id, author, message}, index) in chatHistory" :key="index" id="id">
          <b>{{author}}</b>
          <p>{{ message }}</p>
          <hr/>
        </div>
      </div>
    </section>
  </article>
</template>
