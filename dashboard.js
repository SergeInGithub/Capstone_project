import { api } from "./api.js";


console.log(api);


const messages = document.querySelector('#t-body');

const fetchMessages =async() => {
    try {
      const response = await fetch(`${api}/contact/messages`, {
        method: 'GET'
      }) 
      const sentMessages = response.json();
      return sentMessages
    } catch (error) {
        console.log('Error fetching Messages: ', error.message);
    }
}

fetchMessages().then(res => {
    console.log(res);
    res.forEach((item, index) => {
        messages.insertAdjacentHTML(
            `afterbegin`,
            `
            <tr>
            <td>${index}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.message}</td>
            </tr>
            `
        )
    });
});
