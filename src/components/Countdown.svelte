<script>
  const startDate = 1715835540 * 1000;
  // May 15th, 2024 15:59 CDT

  let countdownTimer;
  let timeElapsed = "loading...";
  let increment = "";
  let isCountingUp = true;

  function countdownClock() {
    const now = new Date().getTime();
    const distance = startDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   // const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //isCountingUp = true;
    const daysElapsed = Math.abs(days);
    const hoursElapsed = Math.abs(hours);
    const minutesElapsed = Math.abs(minutes);
    //const secondsElapsed = Math.abs(seconds);

    if (minutesElapsed > 0) {
      timeElapsed = `${minutesElapsed}`;
      increment =
        minutesElapsed === 1
          ? "minute since we were here"
          : "minutes since we were here";
    } else if (hoursElapsed > 0 && minutesElapsed === 0) {
      timeElapsed = `${hoursElapsed}`;
      increment =
        hoursElapsed === 1
          ? "hour since we were here"
          : "hours since we were here";
    } else {
      clearInterval(countdownTimer); //dont run this when there are days left
      timeElapsed = `${daysElapsed}`;
      increment =
        daysElapsed === 1
          ? "day since we were here"
          : "days since we were here";
    }
  }
  countdownTimer = setInterval(countdownClock, 1000);
</script>

<p class="text-center fs-3 runguszone">
  <span class={isCountingUp ? "badge text-bg-info" : "badge text-bg-danger"}
    ><span class="font-weight-bold" id="time">{timeElapsed}</span>
    <span id="increment">{increment}</span></span
  >
</p>
