<script>
  const countDownDate = new Date("May 15, 2024 00:00:00").getTime();
  //May 15th according to RT Email

  let countdownTimer;
  let timeLeft = "Loading...";
  let increment = "";

  function countdownClock() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) {
      clearInterval(countdownTimer); //we don't need to run this each second if there are days left
      timeLeft = days;
      increment = "days left of Rooster Teeth";
    } else if (hours > 0) {
      timeLeft = hours;
      increment = "hours left of Rooster Teeth";
    } else if (minutes > 0) {
      timeLeft = minutes;
      increment = "minutes left of Rooster Teeth";
    } else if (seconds > 0) {
      timeLeft = seconds;
      increment = "seconds left of Rooster Teeth :(";
    }
    if (distance < 0) {
      clearInterval(countdownTimer);
      timeLeft = "0 days left :(<br>RIP Rooster Teeth";
      increment = "";
    }
  }
  countdownTimer = setInterval(countdownClock(), 1000);
</script>

<p class="text-center fs-1 runguszone">
  <span class="badge text-bg-warning"
    ><span class="" id="time">{timeLeft}</span>
    <span id="increment">{increment}</span></span
  >
</p>
