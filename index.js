// async function deleteCountryApi(countryId) {
//     const result = await fetch(`http://api-countries/${id}`, { method: "DELETE" })
//     return result;
// }


// const arr = [
//     { day: "Sunday", temp: 45 },
//     { day: "Monday", temp: 24 },
//     { day: "Tuesday", temp: 30 },
//     { day: "Wed", temp: 22 },
//     { day: "Thursday", temp: 35 },
//     { day: "Friday", temp: 24 },
//     { day: "Saturday", temp: 40 },
//     { day: "Sunday", temp: 33 },
//     { day: "Monday", temp: 24 },
//     { day: "Tuesday", temp: 30 },
//     { day: "Wed", temp: 22 },
//     { day: "Thursday", temp: 35 },
//     { day: "Friday", temp: 21 },
//     { day: "Saturday", temp: 16 },
//     { day: "Sunday", temp: 24 },
//     { day: "Monday", temp: 25 },
//     { day: "Tuesday", temp: 39 },
//     { day: "Wed", temp: 40 },
//     { day: "Thursday", temp: 40 },
//     { day: "Friday", temp: 24 },
//     { day: "Saturday", temp: 11 }
// ]
// // sum=0
// // currentDay = { day: "Monday", temp: 24 },
// const sumAllTemps = arr.reduce((sum, currentDay) => {
//     sum = sum + currentDay.temp
//     return sum
// }, 0)
// console.log("sumAllTemps", sumAllTemps)

// const maxTempForSunday = arr.reduce((sundayMaxTemp, currentDay) => {
//     if (currentDay.day === "Sunday") {
//         if (currentDay.temp > sundayMaxTemp) {
//             sundayMaxTemp = currentDay.temp
//         }
//     }
//     return sundayMaxTemp
// }, 0)
// console.log("maxTempForSunday", maxTempForSunday)

// const maxTempPerDay = arr.reduce((maxTempPerDayObj, currentDay) => {
//     if (maxTempPerDayObj[currentDay.day]) {
//         // check if it is max
//         if (currentDay.temp > maxTempPerDayObj[currentDay.day]){
//             maxTempPerDayObj[currentDay.day] = currentDay.temp
//         }
//     } else {
//         maxTempPerDayObj[currentDay.day] = currentDay.temp
//     }
//     return maxTempPerDayObj
// }, {})
// console.log("maxTempPerDay", maxTempPerDay)
// // result:
// const result = { "Sunday": 33, "Monday": 25, "Wed": 40 }....
// 0

// if you want to order your object values according date
// Object.values(result).sort((d1, d2) => { return new Date(d1.date).getTime() - new Date(d2.date).getTime() })
const aboutBtn = document.querySelector("#about")
aboutBtn.addEventListener("click", () => {
    const aboutText = document.querySelector("#aboutText");
    aboutText.style.display = aboutText.style.display === 'none' ? 'block' : 'none';
})

async function randomUserApi() {
    const result = await fetch("https://randomuser.me/api/?results=10");
    const randomUser = await result.json();
    console.log(randomUser);
    return randomUser.results
}

function generateUserCard(users) {const fragment = document.createDocumentFragment();
    users.forEach(user => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4', 'col-auto');

        const card = document.createElement('div');
        card.classList.add('card', 'cardFinish');

        const img = document.createElement('img');
        img.classList.add('card-img-top', 'userImg');
        img.src = user.picture.large;
        img.alt = 'User Image';
    
       

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = `${user.name.first} ${user.name.last}`;

        const email = document.createElement('p');
        email.classList.add('card-text');
        email.textContent = user.email;

        const location = document.createElement('p');
        location.classList.add('card-text');
        location.textContent = `${user.location.city}, ${user.location.country}`;

        const countryLink = document.createElement('a');
        countryLink.href = '';
        countryLink.textContent = `${user.location.city}, ${user.location.country}`;

        countryLink.addEventListener('click', async (event) => {
            event.preventDefault()
            const countryData = await fetchCountryData(user.location.country);
            if (countryData) {
                const flagImg = document.createElement('img');
                flagImg.src = countryData.flag;
                flagImg.alt = `${user.location.country} Flag`;
                location.appendChild(flagImg);
            }
        });



        cardBody.appendChild(title);
        cardBody.appendChild(email);
        location.appendChild(countryLink)
        cardBody.appendChild(location);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        fragment.appendChild(col);
    });
    return fragment;
}


async function fetchCountryData(country) {
    try {
        const result = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await result.json();
        if (result.ok && data.length > 0) {
            return data[0];
        } else {
            console.error('Error fetching country data:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
    }
}


// async function fetchCountryData() {
//     try {
//         const result = await fetch(`https://restcountries.com/v3.1/all`);
//         const data = await result.json();
//         console.log(data)
//         if (result.ok && data.length > 0) {
//             return data[0];
//         } else {
//             console.error('Error fetching country data:', data.error);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching country data:', error);
//         return null;
//     }
// }
//  fetchCountryData()

const generateBtn = document.querySelector("#generateBtn")
generateBtn.addEventListener("click", async () => {
    const users = await randomUserApi();
    const usersContainer = document.querySelector("#usersContainer");
    usersContainer.innerHTML = "";
    usersContainer.appendChild(generateUserCard(users));
})


// Function to handle button click event
// document.getElementById('generateBtn').addEventListener('click', async () => {
//     const users = await fetchRandomUsers();
//     const usersContainer = document.getElementById('usersContainer');
//     usersContainer.innerHTML = '';
//     usersContainer.appendChild(generateUserCards(users));
// });

// randomUserApi()