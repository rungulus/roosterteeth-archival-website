<script>
  const startDate = new Date("May 15, 2024 23:59:00").getTime();

  let countdownTimer;
  let timeElapsed = "Loading...";
  let increment = "";

  function countdownClock() {
    const now = new Date().getTime();
    const distance = startDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
      if (days > 0) {
        timeElapsed = `${days}`;
        increment = "days left of Rooster Teeth";
      } else if (hours > 0) {
        timeElapsed = `${hours}`;
        increment = "hours left of Rooster Teeth";
      } else if (minutes > 0) {
        timeElapsed = `${minutes}`;
        increment = "minutes left of Rooster Teeth";
      } else {
        timeElapsed = `${seconds}`;
        increment = "seconds left of Rooster Teeth :(";
      }
    } else {
      const daysElapsed = Math.abs(days);
      const hoursElapsed = Math.abs(hours);
      const minutesElapsed = Math.abs(minutes);
      const secondsElapsed = Math.abs(seconds);

      if (daysElapsed > 0) {
        timeElapsed = `${daysElapsed}`;
        increment = "days since we were here";
      } else if (hoursElapsed > 0) {
        timeElapsed = `${hoursElapsed}`;
        increment = "hours since we were here";
      } else if (minutesElapsed > 0) {
        timeElapsed = `${minutesElapsed}`;
        increment = "minutes since we were here";
      } else {
        timeElapsed = `${secondsElapsed}`;
        increment = "seconds since we were here";
      }
    }
  }
  countdownTimer = setInterval(countdownClock, 1000);
</script>

<p class="text-center fs-3 runguszone">
  <span class="badge text-bg-danger"
    ><span class="font-weight-bold" id="time">{timeElapsed}</span>
    <span id="increment">{increment}</span></span
  >
</p>