import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export function Notification(obj) {
  // let defaultSetting = {
  //   image: '/img/Main_User.svg',
  //   title: 'Notification',
  //   content: 'This is a notification, and it is good.'
  // }
  let image = '/img/Main_User.svg'
  let title = 'Notification'
  let content = 'This is a notification'
  let type = ''
  let sound = false
  // let callback = obj.callback || null
  if (obj) {
    image = obj.image || '/img/Main_User.svg'
    title = obj.title || 'Notification'
    content = obj.content || 'This is a notification'
    type = obj.type || ''
    sound = obj.sound
  }

  let duration = (type == 'announcement') ? 20000 : 5000
  console.log(type);
  console.log(duration);

  Toastify({
    text: `
    <div class="content_wrapper">
    <div class="title">` + title + `</div>
    <div class="content ` + type + `">` + content + `</div>
    </div>

    `,
    duration: duration,
    avatar: image,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    className: "notification ",
    stopOnFocus: false, // Prevents dismissing of toast on hover
    onClick: function () {
      if (obj.onClick) {
        obj.onClick()
      }
    } // Callback after click
  }).showToast();


}

export function PromptStuff(obj, type) {

  let bgColor = '#28a745'
  if (type == 'error') {
    bgColor = '#dc3545'
  } else if (type == 'warning') {
    bgColor = '#e0a800'
  } else if (type == 'info') {
    bgColor = '#17a2b8'
  }


  //console.log(typeof(obj));
  let errors = []
  if (typeof (obj) != 'string') {

    for (const key in obj) {
      // console.log(key);
      obj[key].forEach(message => {
        errors.push(message)
      });
    }
  } else {
    errors.push(obj)
  }

  errors.forEach(function (msg) {
    Toastify({
      text: msg,
      duration: 2000,
      // destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: bgColor,
      stopOnFocus: true, // Prevents dismissing of toast on hover
      // onClick: function(){} // Callback after click
    }).showToast();
  })

}
