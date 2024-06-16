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
        countryLink.href = `https://restcountries.com/v3.1/name/${user.location.country}`;
        countryLink.textContent = `${user.location.city}, ${user.location.country}`;

        countryLink.addEventListener('click', async (event) => {
            event.preventDefault()
            const countryData = await fetchCountryData(user.location.country);
            if (countryData) {
                const flagImg = document.createElement('img');
                flagImg.src = countryData.flags.png;
                flagImg.alt = `${user.location.country} Flag`;
                location.appendChild(flagImg);
            } return countryData
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

const generateBtn = document.querySelector("#generateBtn")
generateBtn.addEventListener("click", async () => {
    const users = await randomUserApi();
    const usersContainer = document.querySelector("#usersContainer");
    usersContainer.innerHTML = "";
    usersContainer.appendChild(generateUserCard(users));
})