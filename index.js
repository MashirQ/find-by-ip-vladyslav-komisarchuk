"use strict"

const Ip = 'https://api.ipify.org/?format=json';
const lData = 'https://ip-api.com/';
const ipButton = document.querySelector('.btn');
const div = document.querySelector('.container');
const text = document.querySelector('.text')

ipButton.addEventListener('click', (e) => {
    e.preventDefault();
    const a = getData();
    a.then(data => {
        const {
            continent,
            country,
            regionName,
            city,
            district,
        } = data;

        div.style.opacity = 1;

        div.insertAdjacentHTML('beforeend', `
        <div class="text-div">
            <p class="text" >Континент: ${continent}</p>
            <p class="text">Країна: ${country}</p>
            <p class="text">Регіон: ${regionName}</p>
            <p class="text">Місто: ${city}</p>
            <p class="text">Район: ${district}</p>
            </div>`)
            
    }) 
}, {once: true});

const getIp = async () => {
    try {
        const ip = await fetch(Ip).then(response => response.json());
        return ip;
    } catch (err) {
        console.error(err);
    }
};

const getData = async () => {
    const {
        ip
    } = await getIp();

    try {
        const data = await fetch(`http://ip-api.com/json/${ip}?fields=continent,country,regionName,city,district&lang=ru`).then(response => response.json());

        return data;
    } catch (err) {
        console.error(err);
    }
};