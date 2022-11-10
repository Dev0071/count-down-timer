const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector('.deadline');
const giveAway =  document.querySelector('.giveaway');
const h4Items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);


// let futureDate = new Date(2023, 9, 9, 14, 30, 0);
// console.log(futureDate);
// get year
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes= futureDate.getMinutes();

let month = futureDate.getMonth();
// console.log(months[month]);
month = months[month];

const date = futureDate.getDate();
// console.log(date);

let weekDay = weekdays[futureDate.getDay()];
// console.log(weekDay);


giveAway.textContent = `giveaway ends on ${weekDay}, ${date}th ${month} ${year} ${hours}:${minutes}am.`;

// future date in miliseconds
const futureTime = futureDate.getTime();
// console.log(futureTime);

getRemainingTime = () => {
  const today = new Date().getTime();

const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  format = item => {
    if(item < 10){
      return `0${item}`;
    }
    return item;
  };

  h4Items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML =  `<h4 class="expired">Sorry, these giveaway has expired</h4>`;
  }
};

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();