left emoji effect
left PWA
remove to only 1 user chat if cannot


//   created() {
//     console.log(`chatRoom.${this.source}`)
//     let pusher = new Pusher(`1467268`, {
//             cluster: `ap1`,
//             encrypted: false,
//             wsPort: 6001,
//   wssPort: 6001
//           });

//           //Subscribe to the channel we specified in our Adonis Application
//           let channel = pusher.subscribe(`chatRoom.${this.source}`)

//           channel.bind('MessageCreatedEvent', (data) => {
//                console.log(data);
//               this.dispatch('messenger/GET_MESSAGES', data)
//             // this.$store.commit('ADD_COMMENT', data.comment)
//           });

// // Echo.private(`chatRoom.${this.source}`)
// // .listen('MessageCreatedEvent', (e) => {

// //                console.log(e);

// //        });
//   },